import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { db } from '../db';
import { users, accounts, sessions } from '@shared/schema';
import { eq } from 'drizzle-orm';
import type { User } from '@shared/schema';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || crypto.randomBytes(64).toString('hex');
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || crypto.randomBytes(64).toString('hex');

// Warn if using default secrets
if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
  console.warn('WARNING: Using generated JWT secrets. Set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET in production!');
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
  }

  static generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  }

  static verifyAccessToken(token: string): { userId: string } {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  }

  static verifyRefreshToken(token: string): { userId: string } {
    return jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string };
  }

  static generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static generateVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static async register(data: {
    email: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }): Promise<{ user: User; verificationToken: string }> {
    const hashedPassword = await this.hashPassword(data.password);
    const verificationToken = this.generateVerificationToken();

    const [user] = await db
      .insert(users)
      .values({
        email: data.email,
        username: data.username,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        verificationToken,
      })
      .returning();

    // Create default trading account
    await db.insert(accounts).values({
      userId: user.id,
      balance: '10000', // Demo balance
      leverage: 100,
    });

    return { user, verificationToken };
  }

  static async login(username: string, password: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (!user) {
      const [userByEmail] = await db
        .select()
        .from(users)
        .where(eq(users.email, username))
        .limit(1);

      if (!userByEmail) return null;

      const validPassword = await this.comparePassword(password, userByEmail.password);
      return validPassword ? userByEmail : null;
    }

    const validPassword = await this.comparePassword(password, user.password);
    return validPassword ? user : null;
  }

  static async createSession(
    userId: string,
    refreshToken: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    await db.insert(sessions).values({
      userId,
      refreshToken,
      ipAddress,
      userAgent,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });
  }

  static async verifyEmail(token: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.verificationToken, token))
      .limit(1);

    if (!user) return null;

    const [updatedUser] = await db
      .update(users)
      .set({
        emailVerified: true,
        verificationToken: null,
      })
      .where(eq(users.id, user.id))
      .returning();

    return updatedUser;
  }

  static async requestPasswordReset(email: string): Promise<string | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) return null;

    const resetToken = this.generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await db
      .update(users)
      .set({
        resetToken,
        resetTokenExpiry,
      })
      .where(eq(users.id, user.id));

    return resetToken;
  }

  static async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.resetToken, token))
      .limit(1);

    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return false;
    }

    const hashedPassword = await this.hashPassword(newPassword);

    await db
      .update(users)
      .set({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      })
      .where(eq(users.id, user.id));

    return true;
  }
}
