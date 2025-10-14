import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { db } from '../db';
import { clients, accounts, sessions } from '@shared/schema';
import { eq } from 'drizzle-orm';
import type { Client } from '@shared/schema';

// JWT Secret configuration - always use secrets from environment
if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error(
    'CRITICAL: JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set in Replit Secrets. ' +
    'These secrets are required for both development and production.'
  );
}

const JWT_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

console.log('✓ JWT secrets loaded from environment');

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateAccessToken(clientId: string): string {
    return jwt.sign({ clientId }, JWT_SECRET, { expiresIn: '15m' });
  }

  static generateRefreshToken(clientId: string): string {
    return jwt.sign({ clientId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  }

  static verifyAccessToken(token: string): { clientId: string } {
    return jwt.verify(token, JWT_SECRET) as { clientId: string };
  }

  static verifyRefreshToken(token: string): { clientId: string } {
    return jwt.verify(token, JWT_REFRESH_SECRET) as { clientId: string };
  }

  static generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static generateVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<{ client: Client }> {
    const hashedPassword = await this.hashPassword(data.password);

    const [client] = await db
      .insert(clients)
      .values({
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      })
      .returning();

    // Create default trading account with generated account number
    const accountNumber = `ACC${Date.now()}${Math.floor(Math.random() * 1000)}`;
    await db.insert(accounts).values({
      clientId: client.id,
      accountNumber,
      balance: '10000', // Demo balance
      equity: '10000',
      leverage: 100,
    });

    return { client };
  }

  static async login(email: string, password: string): Promise<Client | null> {
    const [client] = await db
      .select()
      .from(clients)
      .where(eq(clients.email, email))
      .limit(1);

    if (!client) return null;

    const validPassword = await this.comparePassword(password, client.password);
    return validPassword ? client : null;
  }

  static async createSession(
    clientId: string,
    refreshToken: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await db.insert(sessions).values({
      clientId,
      refreshToken,
      ipAddress,
      userAgent,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });
  }

  // Note: CRM doesn't support email verification or password reset tokens
  // These features are managed in the CRM system
}
