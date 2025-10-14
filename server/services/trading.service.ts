import { db } from '../db';
import { accounts, orders, positions, trades, symbols } from '@shared/schema';
import { eq, and, sql } from 'drizzle-orm';
import type { PlaceOrderRequest } from '@shared/schema';

export class TradingService {
  static async getAccount(userId: string) {
    const [account] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, userId))
      .limit(1);

    return account;
  }

  static async getPositions(accountId: string) {
    // Use raw SQL to avoid schema mismatch issues
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
        COALESCE(created_at, opened_at) as "createdAt"
      FROM positions
      WHERE account_id = ${accountId}
    `);
    return result.rows;
  }

  static async getOrders(accountId: string) {
    return await db
      .select()
      .from(orders)
      .where(and(
        eq(orders.accountId, accountId),
        eq(orders.status, 'pending')
      ));
  }

  static async getTrades(accountId: string) {
    return await db
      .select()
      .from(trades)
      .where(eq(trades.accountId, accountId))
      .orderBy(trades.closedAt);
  }

  static async placeOrder(accountId: string, orderData: PlaceOrderRequest, currentPrice: number) {
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

    // Calculate margin required
    const contractSize = parseFloat(symbol.contractSize || '100000');
    const leverage = account.leverage || 1;
    const marginRequired = (orderData.volume * contractSize * currentPrice) / leverage;

    const freeMargin = parseFloat(account.freeMargin || account.balance || '0');
    if (marginRequired > freeMargin) {
      throw new Error('Insufficient margin');
    }

    // For market orders, create position immediately
    if (orderData.type === 'market') {
      const [order] = await db
        .insert(orders)
        .values({
          accountId,
          symbol: orderData.symbol,
          type: orderData.type,
          side: orderData.side,
          volume: orderData.volume.toString(),
          price: currentPrice.toString(),
          openPrice: currentPrice.toString(),
          takeProfit: orderData.takeProfit?.toString(),
          stopLoss: orderData.stopLoss?.toString(),
          status: 'filled',
          commission: (orderData.volume * parseFloat(symbol.commission || '0')).toString(),
        })
        .returning();

      const [position] = await db
        .insert(positions)
        .values({
          accountId,
          orderId: order.id,
          symbol: orderData.symbol,
          side: orderData.side,
          volume: orderData.volume.toString(),
          openPrice: currentPrice.toString(),
          currentPrice: currentPrice.toString(),
          takeProfit: orderData.takeProfit?.toString(),
          stopLoss: orderData.stopLoss?.toString(),
          commission: order.commission,
          marginRequired: marginRequired.toString(),
          profit: '0',
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
          volume: orderData.volume.toString(),
          price: orderData.price?.toString(),
          stopPrice: orderData.stopPrice?.toString(),
          takeProfit: orderData.takeProfit?.toString(),
          stopLoss: orderData.stopLoss?.toString(),
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
    const volume = parseFloat(position.volume);

    // Calculate profit
    const [symbol] = await db
      .select()
      .from(symbols)
      .where(eq(symbols.symbol, position.symbol))
      .limit(1);

    const contractSize = parseFloat(symbol?.contractSize || '100000');
    const priceDiff = position.side === 'buy' 
      ? currentPrice - openPrice 
      : openPrice - currentPrice;
    const profit = priceDiff * volume * contractSize;
    const totalProfit = profit - parseFloat(position.commission || '0') - parseFloat(position.swap || '0');

    // Create trade record
    await db.insert(trades).values({
      accountId: position.accountId,
      positionId: position.id,
      orderId: position.orderId,
      symbol: position.symbol,
      side: position.side,
      volume: position.volume,
      openPrice: position.openPrice,
      closePrice: currentPrice.toString(),
      takeProfit: position.takeProfit,
      stopLoss: position.stopLoss,
      commission: position.commission,
      swap: position.swap,
      profit: totalProfit.toString(),
      closedBy: 'manual',
      openedAt: position.createdAt,
      closedAt: new Date(),
    });

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

    // Delete position
    await db.delete(positions).where(eq(positions.id, positionId));

    // Update account margin
    await this.updateAccountMargin(position.accountId);

    return { profit: totalProfit };
  }

  static async updatePositionPrices(symbol: string, currentPrice: number) {
    const openPositions = await db
      .select()
      .from(positions)
      .where(eq(positions.symbol, symbol));

    for (const position of openPositions) {
      const openPrice = parseFloat(position.openPrice);
      const volume = parseFloat(position.volume);

      const [symbolData] = await db
        .select()
        .from(symbols)
        .where(eq(symbols.symbol, symbol))
        .limit(1);

      const contractSize = parseFloat(symbolData?.contractSize || '100000');
      const priceDiff = position.side === 'buy'
        ? currentPrice - openPrice
        : openPrice - currentPrice;
      const profit = priceDiff * volume * contractSize;
      const totalProfit = profit - parseFloat(position.commission || '0') - parseFloat(position.swap || '0');

      await db
        .update(positions)
        .set({
          currentPrice: currentPrice.toString(),
          profit: totalProfit.toString(),
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

    const openPositions = await db
      .select()
      .from(positions)
      .where(eq(positions.accountId, accountId));

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
        usedMargin: usedMargin.toString(),
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
