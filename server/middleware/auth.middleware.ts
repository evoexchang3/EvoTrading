import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { db } from '../db';
import { clients } from '@shared/schema';
import { eq } from 'drizzle-orm';

export interface AuthRequest extends Request {
  clientId?: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const { clientId } = AuthService.verifyAccessToken(token);
    req.clientId = clientId;

    const [client] = await db
      .select({
        id: clients.id,
        email: clients.email,
        firstName: clients.firstName,
        lastName: clients.lastName,
        role: clients.role,
      })
      .from(clients)
      .where(eq(clients.id, clientId))
      .limit(1);

    if (client) {
      req.user = client;
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
