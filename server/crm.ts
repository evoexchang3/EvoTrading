import axios from 'axios';
import crypto from 'crypto';
import { db } from './db';
import { ssoTokens, clients, users } from '@shared/schema';
import { eq } from 'drizzle-orm';
import type { Express } from 'express';

const CRM_BASE_URL = process.env.CRM_BASE_URL;
const CRM_SERVICE_TOKEN = process.env.CRM_SERVICE_TOKEN;

let WEBHOOK_SECRET: string;

if (process.env.WEBHOOK_SECRET) {
  WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
} else if (process.env.SITE_WEBHOOK_SECRET) {
  console.warn('⚠️  WARNING: SITE_WEBHOOK_SECRET is deprecated! Please use WEBHOOK_SECRET instead.');
  console.warn('⚠️  Support for SITE_WEBHOOK_SECRET will be removed in a future release.');
  WEBHOOK_SECRET = process.env.SITE_WEBHOOK_SECRET;
} else {
  throw new Error(
    'CRITICAL: WEBHOOK_SECRET environment variable is required. ' +
    'This secret is used to sign webhooks to the CRM system. ' +
    'Generate a secure secret with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
  );
}

// SSO Impersonation endpoint
export function setupCRMIntegration(app: Express) {
  // SSO Impersonation - CRM can generate token to impersonate client
  app.post('/api/crm/sso-token', async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      if (authHeader !== `Bearer ${CRM_SERVICE_TOKEN}`) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { clientId, adminId, reason } = req.body;

      if (!clientId || !adminId) {
        return res.status(400).json({ message: 'clientId and adminId are required' });
      }

      // Verify client exists
      const [client] = await db
        .select()
        .from(clients)
        .where(eq(clients.id, clientId))
        .limit(1);

      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 600000); // 10 minutes

      await db.insert(ssoTokens).values({
        token,
        clientId,
        adminId,
        reason: reason || 'CRM admin impersonation',
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

      // Log impersonation event
      const { AuditService } = await import('./services/audit.service');
      await AuditService.log({
        userId: ssoToken.adminId || 'unknown',
        action: 'impersonation',
        targetType: 'client',
        targetId: ssoToken.clientId,
        details: {
          reason: ssoToken.reason,
          ssoTokenId: ssoToken.id,
          method: 'sso_token',
          crmServerIp: ssoToken.ipAddress, // CRM server IP (token generation)
        },
        ipAddress: req.ip, // Admin's browser IP (actual impersonator)
        userAgent: req.headers['user-agent'],
      });

      // Generate access token
      const { AuthService } = await import('./services/auth.service');
      const accessToken = AuthService.generateAccessToken(ssoToken.clientId);
      const refreshToken = AuthService.generateRefreshToken(ssoToken.clientId);

      // Redirect to dashboard with tokens
      res.redirect(`/dashboard?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Service API for CRM - get client info
  app.get('/api/crm/clients/:clientId', async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      if (authHeader !== `Bearer ${CRM_SERVICE_TOKEN}`) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { clientId } = req.params;

      const [client] = await db
        .select()
        .from(clients)
        .where(eq(clients.id, clientId))
        .limit(1);

      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      res.json({
        id: client.id,
        email: client.email,
        firstName: client.firstName,
        lastName: client.lastName,
        phone: client.phone,
        role: client.role,
        kycStatus: client.kycStatus,
        emailVerified: client.emailVerified,
        twoFactorEnabled: client.twoFactorEnabled,
        isActive: client.isActive,
        status: client.status,
        createdAt: client.createdAt,
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
