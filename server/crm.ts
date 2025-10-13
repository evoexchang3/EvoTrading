import axios from 'axios';
import crypto from 'crypto';
import { db } from './db';
import { ssoTokens, users } from '@shared/schema';
import { eq } from 'drizzle-orm';
import type { Express } from 'express';

const CRM_BASE_URL = process.env.CRM_BASE_URL;
const CRM_SERVICE_TOKEN = process.env.CRM_SERVICE_TOKEN;
const WEBHOOK_SECRET = process.env.SITE_WEBHOOK_SECRET || 'default-webhook-secret';

// SSO Impersonation endpoint
export function setupCRMIntegration(app: Express) {
  // SSO Impersonation - CRM can generate token to impersonate user
  app.post('/api/crm/sso-token', async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      if (authHeader !== `Bearer ${CRM_SERVICE_TOKEN}`) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { userId, adminId, reason } = req.body;

      // Verify user exists
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 600000); // 10 minutes

      await db.insert(ssoTokens).values({
        token,
        userId,
        adminId,
        reason,
        ipAddress: req.ip,
        expiresAt,
      });

      res.json({
        ssoToken: token,
        expiresAt,
        loginUrl: `${req.protocol}://${req.get('host')}/api/crm/sso-login?token=${token}`,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // SSO Login endpoint
  app.get('/api/crm/sso-login', async (req, res) => {
    try {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({ message: 'Token required' });
      }

      const [ssoToken] = await db
        .select()
        .from(ssoTokens)
        .where(eq(ssoTokens.token, token as string))
        .limit(1);

      if (!ssoToken || ssoToken.consumed || ssoToken.expiresAt < new Date()) {
        return res.status(400).json({ message: 'Invalid or expired SSO token' });
      }

      // Mark token as consumed
      await db
        .update(ssoTokens)
        .set({
          consumed: true,
          consumedAt: new Date(),
        })
        .where(eq(ssoTokens.id, ssoToken.id));

      // Generate access token
      const { AuthService } = await import('./services/auth.service');
      const accessToken = AuthService.generateAccessToken(ssoToken.userId);
      const refreshToken = AuthService.generateRefreshToken(ssoToken.userId);

      // Redirect to dashboard with tokens
      res.redirect(`/dashboard?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Service API for CRM - get user info
  app.get('/api/crm/users/:userId', async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      if (authHeader !== `Bearer ${CRM_SERVICE_TOKEN}`) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { userId } = req.params;

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        emailVerified: user.emailVerified,
        twoFactorEnabled: user.twoFactorEnabled,
        isActive: user.isActive,
        tradingEnabled: user.tradingEnabled,
        externalId: user.externalId,
        createdAt: user.createdAt,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
}

// Webhook sending to CRM
export async function sendWebhook(event: string, data: any) {
  if (!CRM_BASE_URL) {
    console.log('CRM_BASE_URL not configured, skipping webhook');
    return;
  }

  try {
    const payload = {
      event,
      data,
      timestamp: new Date().toISOString(),
    };

    const signature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(JSON.stringify(payload))
      .digest('hex');

    await axios.post(`${CRM_BASE_URL}/api/webhooks/trading`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'Authorization': `Bearer ${CRM_SERVICE_TOKEN}`,
      },
    });

    console.log(`Webhook sent: ${event}`);
  } catch (error) {
    console.error('Failed to send webhook:', error);
  }
}
