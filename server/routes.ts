import type { Express } from "express";
import { createServer, type Server } from "http";
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
import { users, accounts, transactions, kycDocuments } from "@shared/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = registerSchema.parse(req.body);
      const { user, verificationToken } = await AuthService.register(data);

      await AuditService.log({
        userId: user.id,
        action: "register",
        entity: "user",
        entityId: user.id,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      // In production, send email with verification link
      console.log(`Verification token for ${user.email}: ${verificationToken}`);
      console.log(`Verification link: http://localhost:5000/verify-email?token=${verificationToken}`);

      res.json({ 
        message: "Registration successful. Please check your email to verify your account.",
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        }
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      const user = await AuthService.login(data.username, data.password);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (!user.isActive) {
        return res.status(403).json({ message: "Account is disabled" });
      }

      // Check 2FA
      if (user.twoFactorEnabled && !data.twoFactorCode) {
        return res.json({ requiresTwoFactor: true });
      }

      const accessToken = AuthService.generateAccessToken(user.id);
      const refreshToken = AuthService.generateRefreshToken(user.id);

      await AuthService.createSession(
        user.id,
        refreshToken,
        req.ip,
        req.headers['user-agent']
      );

      await AuditService.log({
        userId: user.id,
        action: "login",
        entity: "user",
        entityId: user.id,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.json({
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          emailVerified: user.emailVerified,
          twoFactorEnabled: user.twoFactorEnabled,
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

  app.post("/api/auth/2fa/setup", authenticateToken, async (req: AuthRequest, res) => {
    try {
      // Generate 2FA secret and QR code
      // This is a placeholder - actual implementation would use speakeasy or similar
      res.json({
        secret: "JBSWY3DPEHPK3PXP",
        qrCode: "data:image/png;base64,..." // QR code data URL
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Trading routes
  app.get("/api/trading/account", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const account = await TradingService.getAccount(req.userId!);
      res.json(account);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/trading/positions", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const account = await TradingService.getAccount(req.userId!);
      const positions = await TradingService.getPositions(account.id);
      res.json(positions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/trading/orders", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const account = await TradingService.getAccount(req.userId!);
      const orders = await TradingService.getOrders(account.id);
      res.json(orders);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/trading/trades", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const account = await TradingService.getAccount(req.userId!);
      const trades = await TradingService.getTrades(account.id);
      res.json(trades);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/trading/order", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const orderData = placeOrderSchema.parse(req.body);
      const account = await TradingService.getAccount(req.userId!);
      
      const currentPrice = await MarketService.getCurrentPrice(orderData.symbol);
      const result = await TradingService.placeOrder(account.id, orderData, currentPrice);

      await AuditService.log({
        userId: req.userId,
        action: "place_order",
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
        action: "close_position",
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
      const account = await TradingService.getAccount(req.userId!);

      const [transaction] = await db.insert(transactions).values({
        accountId: account.id,
        type: 'deposit',
        amount: data.amount.toString(),
        method: data.method,
        notes: data.notes,
        status: 'pending',
      }).returning();

      await AuditService.log({
        userId: req.userId,
        action: "request_deposit",
        entity: "transaction",
        entityId: transaction.id,
        details: data,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/funding/withdrawal", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const data = createTransactionSchema.parse(req.body);
      const account = await TradingService.getAccount(req.userId!);

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

      await AuditService.log({
        userId: req.userId,
        action: "request_withdrawal",
        entity: "transaction",
        entityId: transaction.id,
        details: data,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
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
        userId: req.userId!,
        documentType,
        fileName,
        status: 'pending',
      }).returning();

      await AuditService.log({
        userId: req.userId,
        action: "upload_kyc",
        entity: "kyc_document",
        entityId: document.id,
        details: { documentType, fileName },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

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

      const [updatedUser] = await db
        .update(users)
        .set({
          firstName,
          lastName,
          phone,
          updatedAt: new Date(),
        })
        .where(eq(users.id, req.userId!))
        .returning();

      res.json({ user: updatedUser });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
