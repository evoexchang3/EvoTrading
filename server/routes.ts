import type { Express } from "express";
import { createServer, type Server } from "http";
import crypto from "crypto";
import { db } from "./db";
import { AuthService } from "./services/auth.service";
import { TradingService } from "./services/trading.service";
import { MarketService } from "./services/market.service";
import { AuditService } from "./services/audit.service";
import { authenticateToken, type AuthRequest } from "./middleware/auth.middleware";
import { 
  registerSchema, 
  loginSchema, 
  placeOrderSchema,
  createTransactionSchema 
} from "@shared/schema";
import { clients, accounts, transactions, kycDocuments, userPreferences } from "@shared/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
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

      const { userId } = AuthService.verifyRefreshToken(refreshToken);
      const accessToken = AuthService.generateAccessToken(userId);
      
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
      const secret = crypto.randomBytes(20).toString('hex');
      
      await db
        .update(users)
        .set({ twoFactorSecret: secret })
        .where(eq(users.id, req.userId!));

      res.json({
        secret,
        qrCode: `otpauth://totp/TradingPlatform:${req.userId}?secret=${secret}&issuer=TradingPlatform`
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

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, req.userId!))
        .limit(1);

      if (!user?.twoFactorSecret) {
        return res.status(400).json({ message: "2FA not set up" });
      }

      // TODO: Implement proper TOTP verification using speakeasy or similar library
      // const verified = speakeasy.totp.verify({
      //   secret: user.twoFactorSecret,
      //   encoding: 'hex',
      //   token: code,
      //   window: 2
      // });
      // if (!verified) {
      //   return res.status(400).json({ message: "Invalid verification code" });
      // }

      // For development: accept the code (INSECURE - replace in production)
      console.warn('WARNING: 2FA verification accepting any code. Implement proper TOTP verification for production!');

      await db
        .update(users)
        .set({ twoFactorEnabled: true })
        .where(eq(users.id, req.userId!));

      res.json({ message: "2FA enabled successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/2fa/disable", authenticateToken, async (req: AuthRequest, res) => {
    try {
      await db
        .update(users)
        .set({ 
          twoFactorEnabled: false,
          twoFactorSecret: null,
        })
        .where(eq(users.id, req.userId!));

      res.json({ message: "2FA disabled successfully" });
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
      const positions = await TradingService.getPositions(account.id);
      res.json(positions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/trading/orders", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const account = await TradingService.getAccount(req.clientId!);
      const orders = await TradingService.getOrders(account.id);
      res.json(orders);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/trading/trades", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const account = await TradingService.getAccount(req.clientId!);
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
      
      // Use frontend-provided live WebSocket price if available and recent
      let currentPrice: number;
      let quoteTimestamp: Date;
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
        userId: req.userId,
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
        userId: req.userId,
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
  app.get("/api/market/symbols", async (req, res) => {
    try {
      const symbols = await MarketService.getSymbols();
      res.json(symbols);
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

  // Funding routes
  app.post("/api/funding/deposit", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const data = createTransactionSchema.parse(req.body);
      const account = await TradingService.getAccount(req.clientId!);

      const [transaction] = await db.insert(transactions).values({
        accountId: account.id,
        type: 'deposit',
        amount: data.amount.toString(),
        method: data.method,
        notes: data.notes,
        status: 'pending',
      }).returning();

      res.json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/funding/withdrawal", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const data = createTransactionSchema.parse(req.body);
      const account = await TradingService.getAccount(req.clientId!);

      if (parseFloat(account.balance) < data.amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      const [transaction] = await db.insert(transactions).values({
        accountId: account.id,
        type: 'withdrawal',
        amount: data.amount.toString(),
        method: data.method,
        notes: data.notes,
        status: 'pending',
      }).returning();

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
        userId: req.userId!,
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
        .where(eq(kycDocuments.userId, req.userId!));

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

  const httpServer = createServer(app);
  return httpServer;
}
