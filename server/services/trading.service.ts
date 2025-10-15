import { db } from '../db';
import { accounts, orders, positions, symbols } from '@shared/schema';
import { eq, and, sql } from 'drizzle-orm';
import type { PlaceOrderRequest } from '@shared/schema';

export class TradingService {
  static async getAccount(clientId: string) {
    const [account] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.clientId, clientId))
      .limit(1);

    if (!account) {
      return null;
    }

    // Calculate total unrealized P/L from open positions
    const pnlResult = await db.execute(sql`
      SELECT COALESCE(SUM(COALESCE(unrealized_pnl, 0)), 0) as total_pnl
      FROM positions 
      WHERE account_id = ${account.id} AND status = 'open'
    `);
    
    const totalPnl = pnlResult.rows[0]?.total_pnl || '0';

    return {
      ...account,
      totalPnl,
    };
  }

  static async getPositions(accountId: string) {
    // Use raw SQL to avoid schema mismatch issues
    // Only return open positions (status='open')
    const result = await db.execute(sql`
      SELECT 
        id,
        account_id as "accountId",
        symbol,
        side,
        COALESCE(volume, quantity) as volume,
        open_price as "openPrice",
        current_price as "currentPrice",
        take_profit as "takeProfit",
        stop_loss as "stopLoss",
        commission,
        swap,
        COALESCE(profit, unrealized_pnl) as profit,
        margin_required as "marginRequired",
        COALESCE(contract_multiplier, 1) as "contractMultiplier",
        COALESCE(fees, 0) as fees,
        COALESCE(created_at, opened_at) as "createdAt"
      FROM positions
      WHERE account_id = ${accountId} AND status = 'open'
    `);
    return result.rows;
  }

  static async getOrders(accountId: string) {
    // Use raw SQL to match actual database schema (quantity not volume)
    const result = await db.execute(sql`
      SELECT 
        id,
        account_id as "accountId",
        symbol,
        type,
        side,
        quantity as volume,
        price,
        stop_loss as "stopLoss",
        take_profit as "takeProfit",
        status,
        created_at as "createdAt"
      FROM orders
      WHERE account_id = ${accountId} AND status = 'pending'
      ORDER BY created_at DESC
    `);
    return result.rows;
  }

  static async getTrades(accountId: string) {
    // Query closed positions from positions table (CRM stores closed positions here, not in separate trades table)
    // Use CRM-calculated realized_pnl (Option 1 from CRM recommendations)
    const result = await db.execute(sql`
      SELECT 
        id,
        account_id as "accountId",
        symbol,
        side,
        COALESCE(volume, quantity) as volume,
        open_price as "openPrice",
        close_price as "closePrice",
        take_profit as "takeProfit",
        stop_loss as "stopLoss",
        commission,
        swap,
        COALESCE(realized_pnl, profit, unrealized_pnl) as profit,
        COALESCE(fees, 0) as fees,
        opened_at as "openedAt",
        closed_at as "closedAt"
      FROM positions
      WHERE account_id = ${accountId} AND status = 'closed'
      ORDER BY closed_at DESC
    `);
    return result.rows;
  }

  static async placeOrder(accountId: string, orderData: PlaceOrderRequest, currentPrice: number, quoteTimestamp?: Date) {
    const account = await db
      .select()
      .from(accounts)
      .where(eq(accounts.id, accountId))
      .limit(1)
      .then(rows => rows[0]);

    if (!account) {
      throw new Error('Account not found');
    }

    const [symbol] = await db
      .select()
      .from(symbols)
      .where(eq(symbols.symbol, orderData.symbol))
      .limit(1);

    if (!symbol) {
      throw new Error('Symbol not found');
    }

    // Check market data staleness (5 second threshold)
    if (quoteTimestamp) {
      const quoteAge = Date.now() - quoteTimestamp.getTime();
      if (quoteAge > 5000) {
        throw new Error(`Cannot place order: Market data for ${orderData.symbol} is stale (age: ${quoteAge}ms > 5000ms threshold)`);
      }
    }

    // Calculate quantity and margin
    const contractSize = parseFloat(symbol.contractSize || '100000');
    const contractMultiplier = contractSize;
    const leverage = account.leverage || 1;
    
    let quantity: number;
    let marginRequired: number;
    
    if (orderData.margin) {
      // Margin-based order: Calculate quantity from margin
      const positionSize = orderData.margin * leverage;
      quantity = positionSize / (currentPrice * contractMultiplier);
      marginRequired = orderData.margin;
    } else if (orderData.quantity) {
      // Quantity-based order: Calculate margin from quantity
      quantity = orderData.quantity;
      marginRequired = (quantity * contractSize * currentPrice) / leverage;
    } else {
      throw new Error('Either quantity or margin must be provided');
    }

    const freeMargin = parseFloat(account.freeMargin || account.balance || '0');
    if (marginRequired > freeMargin) {
      throw new Error('Insufficient margin');
    }

    // For market orders, create position immediately
    if (orderData.type === 'market') {
      // Calculate 0.05% opening fee
      const positionValue = quantity * currentPrice * contractMultiplier;
      const openFee = positionValue * 0.0005; // 0.05% fee
      
      const [order] = await db
        .insert(orders)
        .values({
          accountId,
          symbol: orderData.symbol,
          type: orderData.type,
          side: orderData.side,
          quantity: quantity.toString(),
          margin: orderData.margin?.toString(),
          price: currentPrice.toString(),
          openPrice: currentPrice.toString(),
          takeProfit: orderData.takeProfit?.toString(),
          stopLoss: orderData.stopLoss?.toString(),
          status: 'filled',
          leverage: leverage.toString(),
          commission: openFee.toString(),
        })
        .returning();

      const [position] = await db
        .insert(positions)
        .values({
          accountId,
          orderId: order.id,
          symbol: orderData.symbol,
          side: orderData.side,
          quantity: quantity.toString(),
          openPrice: currentPrice.toString(),
          currentPrice: currentPrice.toString(),
          takeProfit: orderData.takeProfit?.toString(),
          stopLoss: orderData.stopLoss?.toString(),
          commission: order.commission,
          fees: openFee.toString(),
          marginRequired: marginRequired.toString(),
          contractMultiplier: contractMultiplier.toString(),
          marginMode: 'isolated',
          marginUsed: marginRequired.toString(),
          leverage: leverage.toString(),
          profit: (-openFee).toString(),
          unrealizedPnl: (-openFee).toString(),
        })
        .returning();

      // Update account margin
      await this.updateAccountMargin(accountId);

      return { order, position };
    } else {
      // For pending orders
      const [order] = await db
        .insert(orders)
        .values({
          accountId,
          symbol: orderData.symbol,
          type: orderData.type,
          side: orderData.side,
          quantity: quantity.toString(),
          margin: orderData.margin?.toString(),
          price: orderData.price?.toString(),
          takeProfit: orderData.takeProfit?.toString(),
          stopLoss: orderData.stopLoss?.toString(),
          leverage: leverage.toString(),
          status: 'pending',
        })
        .returning();

      return { order };
    }
  }

  static async closePosition(positionId: string) {
    const [position] = await db
      .select()
      .from(positions)
      .where(eq(positions.id, positionId))
      .limit(1);

    if (!position) {
      throw new Error('Position not found');
    }

    const currentPrice = parseFloat(position.currentPrice || position.openPrice);
    const openPrice = parseFloat(position.openPrice);
    const volume = parseFloat(position.volume || position.quantity);

    // Calculate profit with contract multiplier
    const [symbol] = await db
      .select()
      .from(symbols)
      .where(eq(symbols.symbol, position.symbol))
      .limit(1);

    const contractMultiplier = parseFloat(position.contractMultiplier || symbol?.contractSize || '100000');
    const priceDiff = position.side === 'buy' 
      ? currentPrice - openPrice 
      : openPrice - currentPrice;
    
    // Gross P&L with contract multiplier
    const grossProfit = priceDiff * volume * contractMultiplier;
    
    // Calculate closing fee (0.05%)
    const closePositionValue = volume * currentPrice * contractMultiplier;
    const closeFee = closePositionValue * 0.0005; // 0.05% fee
    
    // Net P&L after all fees
    const openFees = parseFloat(position.fees || position.commission || '0');
    const totalFees = openFees + closeFee + parseFloat(position.swap || '0');
    const totalProfit = grossProfit - totalFees;

    // Update account balance
    const [account] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.id, position.accountId))
      .limit(1);

    await db
      .update(accounts)
      .set({
        balance: (parseFloat(account.balance) + totalProfit).toString(),
      })
      .where(eq(accounts.id, position.accountId));

    // Update position to closed status (CRM stores closed positions in positions table)
    await db
      .update(positions)
      .set({
        status: 'closed',
        closePrice: currentPrice.toString(),
        profit: totalProfit.toString(),
        realizedPnl: totalProfit.toString(),
        commission: totalFees.toString(),
        closedAt: new Date(),
      })
      .where(eq(positions.id, positionId));

    // Update account margin
    await this.updateAccountMargin(position.accountId);

    return { profit: totalProfit };
  }

  static async updatePositionPrices(symbol: string, currentPrice: number) {
    // Only update open positions (not closed positions)
    const openPositions = await db
      .select()
      .from(positions)
      .where(and(
        eq(positions.symbol, symbol),
        eq(positions.status, 'open')
      ));

    for (const position of openPositions) {
      const openPrice = parseFloat(position.openPrice);
      const volume = parseFloat(position.volume || position.quantity);

      const [symbolData] = await db
        .select()
        .from(symbols)
        .where(eq(symbols.symbol, symbol))
        .limit(1);

      const contractMultiplier = parseFloat(position.contractMultiplier || symbolData?.contractSize || '100000');
      const priceDiff = position.side === 'buy'
        ? currentPrice - openPrice
        : openPrice - currentPrice;
      
      // Gross P&L with contract multiplier
      const grossProfit = priceDiff * volume * contractMultiplier;
      
      // Net P&L after fees
      const totalFees = parseFloat(position.fees || position.commission || '0') + parseFloat(position.swap || '0');
      const unrealizedPnl = grossProfit - totalFees;

      await db
        .update(positions)
        .set({
          currentPrice: currentPrice.toString(),
          profit: unrealizedPnl.toString(),
          unrealizedPnl: unrealizedPnl.toString(),
        })
        .where(eq(positions.id, position.id));

      // Check TP/SL
      if (position.takeProfit && currentPrice >= parseFloat(position.takeProfit) && position.side === 'buy') {
        await this.closePosition(position.id);
      } else if (position.takeProfit && currentPrice <= parseFloat(position.takeProfit) && position.side === 'sell') {
        await this.closePosition(position.id);
      } else if (position.stopLoss && currentPrice <= parseFloat(position.stopLoss) && position.side === 'buy') {
        await this.closePosition(position.id);
      } else if (position.stopLoss && currentPrice >= parseFloat(position.stopLoss) && position.side === 'sell') {
        await this.closePosition(position.id);
      }
    }
  }

  static async updateAccountMargin(accountId: string) {
    const [account] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.id, accountId))
      .limit(1);

    // Only process open positions for margin calculation
    const openPositions = await db
      .select()
      .from(positions)
      .where(and(
        eq(positions.accountId, accountId),
        eq(positions.status, 'open')
      ));

    let usedMargin = 0;
    let totalProfit = 0;

    for (const position of openPositions) {
      usedMargin += parseFloat(position.marginRequired || '0');
      totalProfit += parseFloat(position.profit || '0');
    }

    const balance = parseFloat(account.balance);
    const equity = balance + totalProfit;
    const freeMargin = equity - usedMargin;
    const marginLevel = usedMargin > 0 ? (equity / usedMargin) * 100 : 0;

    await db
      .update(accounts)
      .set({
        equity: equity.toString(),
        margin: usedMargin.toString(),
        freeMargin: freeMargin.toString(),
        marginLevel: marginLevel.toString(),
      })
      .where(eq(accounts.id, accountId));

    // Check for margin call or stop out
    if (marginLevel < 50 && marginLevel > 0) {
      // Stop out - close all positions
      for (const position of openPositions) {
        await this.closePosition(position.id);
      }
    }
  }
}
