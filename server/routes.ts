import type { Express } from "express";
import { createServer, type Server } from "http";
import crypto from "crypto";
import speakeasy from "speakeasy";
import { db } from "./db";
import { AuthService } from "./services/auth.service";
import { TradingService } from "./services/trading.service";
import { MarketService } from "./services/market.service";
import { AuditService } from "./services/audit.service";
import { economicService } from "./services/economic.service";
import { newsService } from "./services/news.service";
import { courseService } from "./services/course.service";
import { authenticateToken, type AuthRequest } from "./middleware/auth.middleware";
import type { Response, NextFunction } from "express";
import { 
  registerSchema, 
  loginSchema, 
  placeOrderSchema,
  createTransactionSchema 
} from "@shared/schema";
import { clients, accounts, transactions, kycDocuments, userPreferences, users, symbols } from "@shared/schema";
import { eq, sql } from "drizzle-orm";

function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}

export function registerRoutes(app: Express): Server {
  // Health check endpoint for production monitoring
  app.get("/api/health", async (req, res) => {
    try {
      // Check database connectivity
      const startTime = Date.now();
      await db.execute(sql`SELECT 1`);
      const dbLatency = Date.now() - startTime;

      // Return health status
      res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: {
          status: "connected",
          latency: `${dbLatency}ms`
        },
        memory: {
          used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
          total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`
        },
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development'
      });
    } catch (error: any) {
      res.status(503).json({
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error.message
      });
    }
  });

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = registerSchema.parse(req.body);
      const { client } = await AuthService.register(data);

      await AuditService.log({
        clientId: client.id,
        action: "client_create",
        entity: "client",
        entityId: client.id,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.json({ 
        message: "Registration successful. You can now login.",
        client: {
          id: client.id,
          email: client.email,
          firstName: client.firstName,
          lastName: client.lastName,
        }
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      const client = await AuthService.login(data.email, data.password);

      if (!client) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (!client.isActive) {
        return res.status(403).json({ message: "Account is disabled" });
      }

      if (client.twoFactorEnabled && client.twoFactorSecret) {
        const { totpCode } = req.body;
        
        if (!totpCode || !/^\d{6}$/.test(totpCode)) {
          return res.status(401).json({ 
            message: "2FA code required",
            requires2FA: true 
          });
        }

        const verified = speakeasy.totp.verify({
          secret: client.twoFactorSecret,
          encoding: 'base32',
          token: totpCode,
          window: 2
        });

        if (!verified) {
          return res.status(401).json({ message: "Invalid 2FA code" });
        }
      }

      const accessToken = AuthService.generateAccessToken(client.id);
      const refreshToken = AuthService.generateRefreshToken(client.id);

      await AuthService.createSession(
        client.id,
        refreshToken,
        req.ip,
        req.headers['user-agent']
      );

      await AuditService.log({
        clientId: client.id,
        action: "login",
        entity: "client",
        entityId: client.id,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.json({
        accessToken,
        refreshToken,
        user: {
          id: client.id,
          email: client.email,
          firstName: client.firstName,
          lastName: client.lastName,
          role: client.role,
        },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      const resetToken = await AuthService.requestPasswordReset(email);

      if (resetToken) {
        // In production, send email with reset link
        console.log(`Password reset token for ${email}: ${resetToken}`);
        console.log(`Reset link: http://localhost:5000/reset-password?token=${resetToken}`);
      }

      // Always return success to prevent email enumeration
      res.json({ message: "If an account exists, a password reset link has been sent" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { token, password } = req.body;
      const success = await AuthService.resetPassword(token, password);

      if (!success) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
      }

      res.json({ message: "Password reset successful" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/refresh", async (req, res) => {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token required" });
      }

      const { clientId } = AuthService.verifyRefreshToken(refreshToken);
      const accessToken = AuthService.generateAccessToken(clientId);
      
      res.json({ accessToken });
    } catch (error: any) {
      res.status(403).json({ message: "Invalid refresh token" });
    }
  });

  app.get("/api/auth/verify-email", async (req, res) => {
    try {
      const { token } = req.query;
      
      if (!token) {
        return res.status(400).json({ message: "Verification token required" });
      }

      const user = await AuthService.verifyEmail(token as string);
      
      if (!user) {
        return res.status(400).json({ message: "Invalid verification token" });
      }

      res.json({ message: "Email verified successfully", user: {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
      }});
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/2fa/setup", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const secret = speakeasy.generateSecret({
        name: `TradingPlatform (${req.user!.email})`,
        issuer: 'TradingPlatform'
      });
      
      await db
        .update(clients)
        .set({ twoFactorSecret: secret.base32 })
        .where(eq(clients.id, req.user!.id));

      res.json({
        secret: secret.base32,
        qrCode: secret.otpauth_url
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/2fa/verify", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { code } = req.body;
      
      if (!/^\d{6}$/.test(code)) {
        return res.status(400).json({ message: "Invalid code format" });
      }

      const [client] = await db
        .select()
        .from(clients)
        .where(eq(clients.id, req.user!.id))
        .limit(1);

      if (!client?.twoFactorSecret) {
        return res.status(400).json({ message: "2FA not set up" });
      }

      const verified = speakeasy.totp.verify({
        secret: client.twoFactorSecret,
        encoding: 'base32',
        token: code,
        window: 2
      });

      if (!verified) {
        return res.status(400).json({ message: "Invalid verification code" });
      }

      await db
        .update(clients)
        .set({ twoFactorEnabled: true })
        .where(eq(clients.id, req.user!.id));

      res.json({ message: "2FA enabled successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/2fa/disable", authenticateToken, async (req: AuthRequest, res) => {
    try {
      await db
        .update(clients)
        .set({ 
          twoFactorEnabled: false,
          twoFactorSecret: null,
        })
        .where(eq(clients.id, req.user!.id));

      res.json({ message: "2FA disabled successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/request-email-verification", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const [client] = await db
        .select()
        .from(clients)
        .where(eq(clients.id, req.user!.id))
        .limit(1);

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      if (client.emailVerified) {
        return res.status(400).json({ message: "Email already verified" });
      }

      await AuthService.generateAndStoreEmailVerificationToken(client.id);

      res.status(202).json({ 
        message: "Verification email has been sent. Please check your email." 
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get user profile (alias endpoint)
  app.get("/api/auth/me", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const [client] = await db
        .select()
        .from(clients)
        .where(eq(clients.id, req.clientId!))
        .limit(1);

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      // Return client data directly for DashboardPage
      res.json(client);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get user profile
  app.get("/api/auth/profile", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const [client] = await db
        .select()
        .from(clients)
        .where(eq(clients.id, req.clientId!))
        .limit(1);

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.json({
        user: {
          id: client.id,
          email: client.email,
          firstName: client.firstName,
          lastName: client.lastName,
          role: client.role,
        },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Trading routes
  // Account endpoint - returns trading account with balance, equity, margin
  app.get("/api/account", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const account = await TradingService.getAccount(req.clientId!);
      res.json(account);
    } catch (error: any) {
      console.error("Error fetching account:", error);
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/trading/account", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const account = await TradingService.getAccount(req.clientId!);
      res.json(account);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/trading/positions", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const account = await TradingService.getAccount(req.clientId!);
      if (!account) {
        return res.status(404).json({ message: "Trading account not found" });
      }
      const positions = await TradingService.getPositions(account.id);
      res.json(positions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/trading/orders", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const account = await TradingService.getAccount(req.clientId!);
      if (!account) {
        return res.status(404).json({ message: "Trading account not found" });
      }
      const orders = await TradingService.getOrders(account.id);
      res.json(orders);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/trading/trades", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const account = await TradingService.getAccount(req.clientId!);
      if (!account) {
        return res.status(404).json({ message: "Trading account not found" });
      }
      const trades = await TradingService.getTrades(account.id);
      res.json(trades);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/trading/order", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const orderData = placeOrderSchema.parse(req.body);
      const account = await TradingService.getAccount(req.clientId!);
      if (!account) {
        return res.status(404).json({ message: "Trading account not found" });
      }
      
      // Use frontend-provided live WebSocket price if available and recent
      let currentPrice: number = 0;
      let quoteTimestamp: Date = new Date();
      let useFrontendPrice = false;
      
      if (orderData.currentPrice && orderData.priceTimestamp) {
        // Frontend provided live price with timestamp - validate it
        const frontendTimestamp = new Date(orderData.priceTimestamp);
        const now = Date.now();
        
        // Validate timestamp and check staleness (4.5s margin to account for clock skew and processing)
        const isValidTimestamp = !isNaN(frontendTimestamp.getTime());
        const isNotFuture = frontendTimestamp.getTime() <= now;
        const age = now - frontendTimestamp.getTime();
        const isFresh = age < 4500; // 4.5s margin before TradingService 5s threshold
        
        if (isValidTimestamp && isNotFuture && isFresh) {
          // Valid frontend price - use it
          currentPrice = orderData.currentPrice;
          quoteTimestamp = frontendTimestamp;
          useFrontendPrice = true;
        }
      }
      
      if (!useFrontendPrice) {
        // Fallback to REST API (invalid/stale frontend data or not provided)
        const quote = await MarketService.getCurrentPriceWithTimestamp(orderData.symbol);
        currentPrice = quote.price;
        quoteTimestamp = quote.timestamp;
      }
      
      const result = await TradingService.placeOrder(account.id, orderData, currentPrice, quoteTimestamp);

      await AuditService.log({
        userId: req.user!.id,
        action: "trade_create",
        entity: "order",
        entityId: result.order.id,
        details: orderData,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/trading/close/:positionId", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { positionId } = req.params;
      const result = await TradingService.closePosition(positionId);

      await AuditService.log({
        userId: req.user!.id,
        action: "trade_close",
        entity: "position",
        entityId: positionId,
        details: result,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/trading/order/:orderId", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { orderId } = req.params;
      // Implementation for cancelling pending order
      res.json({ message: "Order cancelled" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Market data routes
  // Symbol search with pagination (lazy loading)
  app.get("/api/symbols/search", async (req, res) => {
    try {
      const { q = '', type = '', limit = '20', offset = '0' } = req.query;
      const { and, or, ilike } = await import('drizzle-orm');
      
      const conditions = [eq(symbols.isActive, true)];
      
      // Search by symbol or name
      if (q) {
        const searchTerm = `%${q}%`;
        conditions.push(
          or(
            ilike(symbols.symbol, searchTerm),
            ilike(symbols.name, searchTerm)
          )!
        );
      }
      
      // Filter by type
      if (type) {
        conditions.push(eq(symbols.type, type as string));
      }
      
      const results = await db
        .select()
        .from(symbols)
        .where(and(...conditions))
        .limit(parseInt(limit as string))
        .offset(parseInt(offset as string))
        .orderBy(symbols.symbol);
      
      res.json(results);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get popular/featured symbols
  app.get("/api/symbols/popular", async (req, res) => {
    try {
      const { limit = '10' } = req.query;
      
      // Popular symbols - hardcoded for now, could be based on trading volume later
      const popularSymbols = ['EURUSD', 'GBPUSD', 'USDJPY', 'BTCUSD', 'ETHUSD', 'XAUUSD', 'SPY', 'QQQ', 'AAPL', 'TSLA'];
      
      const results = await db
        .select()
        .from(symbols)
        .where(
          sql`${symbols.symbol} = ANY(${popularSymbols})`
        )
        .limit(parseInt(limit as string));
      
      res.json(results);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get all symbols with cursor-based pagination for infinite scroll
  app.get("/api/market/symbols", async (req, res) => {
    try {
      const { 
        cursor, 
        limit = '100', 
        type = '', 
        search = '',
        sort = 'symbol' 
      } = req.query;
      
      const { and, or, gt, ilike, desc } = await import('drizzle-orm');
      
      // Validate and parse limit parameter
      const parsedLimit = parseInt(limit as string);
      const pageSize = isNaN(parsedLimit) || parsedLimit < 1 
        ? 100  // Default to 100 if invalid
        : Math.min(parsedLimit, 500); // Cap at 500 per page
      
      // Build filter conditions
      const conditions = [eq(symbols.isActive, true)];
      
      if (type) {
        conditions.push(eq(symbols.type, type as string));
      }
      
      if (search && (search as string).length >= 2) {
        const searchTerm = `%${search}%`;
        const searchCondition = or(
          ilike(symbols.symbol, searchTerm),
          ilike(symbols.name, searchTerm)
        );
        if (searchCondition) {
          conditions.push(searchCondition);
        }
      }
      
      // Cursor pagination: cursor format is "sortValue:id"
      // For sort=symbol: "EURUSD:abc-123", for sort=name: "Euro vs US Dollar:abc-123"
      if (cursor && typeof cursor === 'string') {
        const lastColonIndex = cursor.lastIndexOf(':');
        if (lastColonIndex > 0) {
          const cursorValue = cursor.substring(0, lastColonIndex);
          const cursorId = cursor.substring(lastColonIndex + 1);
          
          // Tuple comparison: (sortField > cursorValue) OR (sortField = cursorValue AND id > cursorId)
          const sortField = sort === 'name' ? symbols.name : symbols.symbol;
          const cursorCondition = or(
            gt(sortField, cursorValue),
            and(
              eq(sortField, cursorValue),
              gt(symbols.id, cursorId)
            )
          );
          if (cursorCondition) {
            conditions.push(cursorCondition);
          }
        }
      }
      
      // Fetch one extra to determine if there are more results
      // Always order by primary sort field + id for deterministic pagination
      const sortField = sort === 'name' ? symbols.name : symbols.symbol;
      const results = await db
        .select({
          id: symbols.id,
          symbol: symbols.symbol,
          name: symbols.name,
          type: symbols.type,
          twelveDataSymbol: symbols.twelveDataSymbol,
          exchange: symbols.exchange,
          currency: symbols.currency,
          digits: symbols.digits,
        })
        .from(symbols)
        .where(and(...conditions))
        .orderBy(sortField, symbols.id)
        .limit(pageSize + 1);
      
      const hasMore = results.length > pageSize;
      const data = hasMore ? results.slice(0, pageSize) : results;
      
      // Generate next cursor from last item using the active sort field
      let nextCursor: string | undefined;
      if (hasMore && data.length > 0) {
        const lastItem = data[data.length - 1];
        const sortValue = sort === 'name' ? lastItem.name : lastItem.symbol;
        nextCursor = `${sortValue}:${lastItem.id}`;
      }
      
      res.json({
        data,
        nextCursor,
        hasMore
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/market/quote/:symbol", async (req, res) => {
    try {
      const { symbol } = req.params;
      const quote = await MarketService.getQuote(symbol);
      res.json(quote);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/market/candles/:symbol", async (req, res) => {
    try {
      const { symbol } = req.params;
      const { interval = '1h', limit = '100' } = req.query;
      const candles = await MarketService.getCandles(symbol, interval as string, parseInt(limit as string));
      res.json(candles);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/market/symbols/:symbol", async (req, res) => {
    try {
      const { symbol } = req.params;
      const symbolInfo = await MarketService.getSymbolInfo(symbol);
      if (!symbolInfo) {
        return res.status(404).json({ message: "Symbol not found" });
      }
      res.json(symbolInfo);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/market/status/:symbol", async (req, res) => {
    try {
      const { symbol } = req.params;
      const status = await MarketService.getMarketStatus(symbol);
      res.json(status);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Funding routes
  app.post("/api/funding/deposit", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const data = createTransactionSchema.parse(req.body);
      const account = await TradingService.getAccount(req.clientId!);

      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }

      const fundType = data.fundType || 'real';
      const [transaction] = await db.insert(transactions).values({
        accountId: account.id,
        type: 'deposit',
        fundType,
        amount: data.amount.toString(),
        method: data.method,
        notes: data.notes,
        status: 'completed',
        processedAt: new Date(),
      }).returning();

      // Update the appropriate balance field
      const updateData: any = {};
      if (fundType === 'real') {
        updateData.realBalance = (parseFloat(account.realBalance || '0') + data.amount).toString();
      } else if (fundType === 'demo') {
        updateData.demoBalance = (parseFloat(account.demoBalance || '0') + data.amount).toString();
      } else if (fundType === 'bonus') {
        updateData.bonusBalance = (parseFloat(account.bonusBalance || '0') + data.amount).toString();
      }
      
      // Update total balance
      const newRealBalance = fundType === 'real' ? parseFloat(updateData.realBalance) : parseFloat(account.realBalance || '0');
      const newDemoBalance = fundType === 'demo' ? parseFloat(updateData.demoBalance) : parseFloat(account.demoBalance || '0');
      const newBonusBalance = fundType === 'bonus' ? parseFloat(updateData.bonusBalance) : parseFloat(account.bonusBalance || '0');
      updateData.balance = (newRealBalance + newDemoBalance + newBonusBalance).toString();

      await db.update(accounts).set(updateData).where(eq(accounts.id, account.id));

      // Send webhook for deposit completion
      const { sendWebhook } = await import('./crm');
      await sendWebhook('deposit.completed', {
        accountId: account.id,
        fundType,
        amount: data.amount.toString(),
        transactionId: transaction.id,
        completedAt: new Date().toISOString()
      });

      res.json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/funding/withdrawal", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const data = createTransactionSchema.parse(req.body);
      const account = await TradingService.getAccount(req.clientId!);

      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }

      // Check balance based on fund type
      const fundType = data.fundType || 'real';
      let availableBalance = 0;
      
      if (fundType === 'real') {
        availableBalance = parseFloat(account.realBalance || '0');
      } else if (fundType === 'demo') {
        availableBalance = parseFloat(account.demoBalance || '0');
      } else if (fundType === 'bonus') {
        // Bonus funds are non-withdrawable
        return res.status(400).json({ message: "Bonus funds cannot be withdrawn" });
      }

      if (availableBalance < data.amount) {
        return res.status(400).json({ message: `Insufficient ${fundType} balance` });
      }

      const [transaction] = await db.insert(transactions).values({
        accountId: account.id,
        type: 'withdrawal',
        fundType,
        amount: data.amount.toString(),
        method: data.method,
        notes: data.notes,
        status: 'completed',
        processedAt: new Date(),
      }).returning();

      // Update the appropriate balance field
      const updateData: any = {};
      if (fundType === 'real') {
        updateData.realBalance = (parseFloat(account.realBalance || '0') - data.amount).toString();
      } else if (fundType === 'demo') {
        updateData.demoBalance = (parseFloat(account.demoBalance || '0') - data.amount).toString();
      }
      
      // Update total balance
      const newRealBalance = fundType === 'real' ? parseFloat(updateData.realBalance) : parseFloat(account.realBalance || '0');
      const newDemoBalance = fundType === 'demo' ? parseFloat(updateData.demoBalance) : parseFloat(account.demoBalance || '0');
      const newBonusBalance = parseFloat(account.bonusBalance || '0');
      updateData.balance = (newRealBalance + newDemoBalance + newBonusBalance).toString();

      await db.update(accounts).set(updateData).where(eq(accounts.id, account.id));

      // Send webhook for withdrawal completion
      const { sendWebhook } = await import('./crm');
      await sendWebhook('withdrawal.completed', {
        accountId: account.id,
        fundType,
        amount: data.amount.toString(),
        transactionId: transaction.id,
        completedAt: new Date().toISOString()
      });

      res.json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // KYC routes
  app.post("/api/kyc/upload", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { documentType, fileName } = req.body;

      const [document] = await db.insert(kycDocuments).values({
        clientId: req.user!.id,
        documentType,
        fileName,
        status: 'pending',
      }).returning();

      res.json(document);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/kyc/documents", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const documents = await db
        .select()
        .from(kycDocuments)
        .where(eq(kycDocuments.clientId, req.user!.id));

      res.json(documents);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Profile routes
  app.patch("/api/auth/profile", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { firstName, lastName, phone } = req.body;

      const [updatedClient] = await db
        .update(clients)
        .set({
          firstName,
          lastName,
          phone,
          updatedAt: new Date(),
        })
        .where(eq(clients.id, req.clientId!))
        .returning();

      res.json({ user: updatedClient });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // User Preferences routes
  app.get("/api/preferences", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const [prefs] = await db
        .select()
        .from(userPreferences)
        .where(eq(userPreferences.clientId, req.clientId!))
        .limit(1);

      if (!prefs) {
        // Create default preferences
        const [newPrefs] = await db
          .insert(userPreferences)
          .values({
            clientId: req.clientId!,
          })
          .returning();
        return res.json(newPrefs);
      }

      res.json(prefs);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/preferences", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { displayCurrency, theme, defaultLotSize, layoutConfig, favorites, notifications } = req.body;

      const updateData: any = { updatedAt: new Date() };
      if (displayCurrency !== undefined) updateData.displayCurrency = displayCurrency;
      if (theme !== undefined) updateData.theme = theme;
      if (defaultLotSize !== undefined) updateData.defaultLotSize = defaultLotSize;
      if (layoutConfig !== undefined) updateData.layoutConfig = layoutConfig;
      if (favorites !== undefined) updateData.favorites = favorites;
      if (notifications !== undefined) updateData.notifications = notifications;

      const [updatedPrefs] = await db
        .update(userPreferences)
        .set(updateData)
        .where(eq(userPreferences.clientId, req.clientId!))
        .returning();

      if (!updatedPrefs) {
        // Create if doesn't exist
        const [newPrefs] = await db
          .insert(userPreferences)
          .values({
            clientId: req.clientId!,
            ...updateData,
          })
          .returning();
        return res.json(newPrefs);
      }

      res.json(updatedPrefs);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Economic Calendar routes (public - informational data)
  app.get("/api/economic-calendar", async (req, res) => {
    try {
      const { startDate, endDate, currency, impact } = req.query;
      
      const events = await economicService.getEconomicCalendar(
        startDate as string,
        endDate as string,
        currency as string,
        impact as string
      );

      res.json(events);
    } catch (error: any) {
      console.error("Economic calendar error:", error);
      res.status(500).json({ message: "Failed to fetch economic calendar" });
    }
  });

  // News routes (public - informational data)
  app.get("/api/news", async (req, res) => {
    try {
      const { category, sentiment, limit } = req.query;
      
      const news = await newsService.getForexNews(
        category as string,
        sentiment as string,
        limit ? parseInt(limit as string) : 20
      );

      res.json(news);
    } catch (error: any) {
      console.error("News fetch error:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  // Course Progress routes
  app.get("/api/course-progress/:courseId", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { courseId } = req.params;
      const progress = await courseService.getUserProgress(req.clientId!, courseId);
      res.json(progress);
    } catch (error: any) {
      console.error("Course progress fetch error:", error);
      res.status(500).json({ message: "Failed to fetch course progress" });
    }
  });

  app.post("/api/course-progress", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { courseId, moduleId, lessonId, completed, quizScore } = req.body;
      
      const progress = await courseService.saveProgress({
        clientId: req.clientId!,
        courseId,
        moduleId,
        lessonId,
        completed,
        quizScore,
      });

      res.json(progress);
    } catch (error: any) {
      console.error("Course progress save error:", error);
      res.status(500).json({ message: "Failed to save course progress" });
    }
  });

  app.get("/api/course-completion/:courseId", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const { courseId } = req.params;
      const completion = await courseService.getCourseCompletion(req.clientId!, courseId);
      res.json(completion);
    } catch (error: any) {
      console.error("Course completion fetch error:", error);
      res.status(500).json({ message: "Failed to fetch course completion" });
    }
  });

  // Site Configuration endpoint (public)
  app.get("/api/site-config", async (_req, res) => {
    try {
      const fs = await import("fs");
      const path = await import("path");
      const yaml = await import("js-yaml");
      
      // Support custom config path via environment variable
      const configPath = process.env.SITE_CONFIG_PATH || path.resolve(process.cwd(), "site-config.yml");
      
      if (!fs.existsSync(configPath)) {
        console.warn(`Site config not found at ${configPath}, using defaults`);
        return res.status(404).json({ message: "Site configuration not found" });
      }
      
      const fileContents = fs.readFileSync(configPath, "utf8");
      const config = yaml.load(fileContents);
      
      res.json(config);
    } catch (error: any) {
      console.error("Site config load error:", error);
      res.status(500).json({ message: "Failed to load site configuration" });
    }
  });

  // Admin Site Configuration endpoints
  app.get("/api/admin/site-config", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const fs = await import("fs");
      const path = await import("path");
      const yaml = await import("js-yaml");
      
      const configPath = process.env.SITE_CONFIG_PATH || path.resolve(process.cwd(), "site-config.yml");
      
      if (!fs.existsSync(configPath)) {
        return res.status(404).json({ message: "Site configuration not found" });
      }
      
      const fileContents = fs.readFileSync(configPath, "utf8");
      const config = yaml.load(fileContents);
      
      await AuditService.log({
        userId: req.user!.id,
        action: "export",
        entity: "site_config",
        entityId: "site-config.yml",
        details: { action: "view_site_config" },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });
      
      res.json(config);
    } catch (error: any) {
      console.error("Admin site config load error:", error);
      res.status(500).json({ message: "Failed to load site configuration" });
    }
  });

  app.put("/api/admin/site-config", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const fs = await import("fs");
      const path = await import("path");
      const yaml = await import("js-yaml");
      
      const configPath = process.env.SITE_CONFIG_PATH || path.resolve(process.cwd(), "site-config.yml");
      const backupPath = process.env.SITE_CONFIG_PATH 
        ? path.dirname(process.env.SITE_CONFIG_PATH) + '/site-config.backup.yml'
        : path.resolve(process.cwd(), "site-config.backup.yml");
      
      const newConfig = req.body;
      
      // Validate configuration structure - check for required fields
      if (!newConfig.version) {
        return res.status(400).json({ message: "Missing required field: version" });
      }
      if (!newConfig.branding || !newConfig.branding.companyName) {
        return res.status(400).json({ message: "Missing required field: branding.companyName" });
      }
      if (!newConfig.localization || !newConfig.localization.defaultLanguage) {
        return res.status(400).json({ message: "Missing required field: localization.defaultLanguage" });
      }
      
      // Create backup of current config before updating
      if (fs.existsSync(configPath)) {
        const currentConfig = fs.readFileSync(configPath, "utf8");
        fs.writeFileSync(backupPath, currentConfig, "utf8");
      }
      
      // Write new config to SITE_CONFIG_PATH
      const yamlContent = yaml.dump(newConfig, {
        indent: 2,
        lineWidth: 100,
        noRefs: true,
      });
      
      fs.writeFileSync(configPath, yamlContent, "utf8");
      
      // Log admin config change to audit log
      await AuditService.log({
        userId: req.user!.id,
        action: "import",
        entity: "site_config",
        entityId: "site-config.yml",
        details: { 
          action: "update_site_config",
          changes: newConfig,
          backupCreated: true,
          backupPath,
        },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });
      
      res.json(newConfig);
    } catch (error: any) {
      console.error("Admin site config update error:", error);
      res.status(500).json({ message: "Failed to update site configuration" });
    }
  });

  // Get default configuration
  app.get("/api/admin/site-config/defaults", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      // Import DEFAULT_SITE_CONFIG from shared module
      const { DEFAULT_SITE_CONFIG } = await import("../shared/site-config.js");
      
      await AuditService.log({
        userId: req.user!.id,
        action: "export",
        entity: "site_config",
        entityId: "defaults",
        details: { action: "view_default_config" },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });
      
      res.json(DEFAULT_SITE_CONFIG);
    } catch (error: any) {
      console.error("Failed to load default config:", error);
      res.status(500).json({ message: "Failed to load default configuration" });
    }
  });

  // Reset configuration to defaults
  app.post("/api/admin/site-config/reset", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const fs = await import("fs");
      const path = await import("path");
      const yaml = await import("js-yaml");
      const { DEFAULT_SITE_CONFIG } = await import("../shared/site-config.js");
      
      const { section } = req.body; // Optional: reset specific section only
      
      const configPath = process.env.SITE_CONFIG_PATH || path.resolve(process.cwd(), "site-config.yml");
      const backupPath = process.env.SITE_CONFIG_PATH 
        ? path.dirname(process.env.SITE_CONFIG_PATH) + '/site-config.backup-reset.yml'
        : path.resolve(process.cwd(), "site-config.backup-reset.yml");
      
      // Create backup before reset
      if (fs.existsSync(configPath)) {
        const currentConfig = fs.readFileSync(configPath, "utf8");
        fs.writeFileSync(backupPath, currentConfig, "utf8");
      }
      
      let newConfig;
      
      if (section) {
        // Reset specific section only
        const currentConfigContents = fs.readFileSync(configPath, "utf8");
        const currentConfig = yaml.load(currentConfigContents) as any;
        
        if (section in DEFAULT_SITE_CONFIG) {
          currentConfig[section] = (DEFAULT_SITE_CONFIG as any)[section];
          newConfig = currentConfig;
        } else {
          return res.status(400).json({ message: `Invalid section: ${section}` });
        }
      } else {
        // Full reset
        newConfig = DEFAULT_SITE_CONFIG;
      }
      
      // Write reset config
      const yamlContent = yaml.dump(newConfig, {
        indent: 2,
        lineWidth: 100,
        noRefs: true,
      });
      
      fs.writeFileSync(configPath, yamlContent, "utf8");
      
      // Log reset action
      await AuditService.log({
        userId: req.user!.id,
        action: "delete",
        entity: "site_config",
        entityId: "site-config.yml",
        details: { 
          action: section ? "reset_section" : "reset_full",
          section: section || "all",
          backupCreated: true,
          backupPath,
        },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });
      
      res.json({ 
        message: section ? `Section '${section}' reset to defaults` : "Configuration reset to defaults",
        config: newConfig,
        backup: backupPath
      });
    } catch (error: any) {
      console.error("Failed to reset config:", error);
      res.status(500).json({ message: "Failed to reset configuration" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
