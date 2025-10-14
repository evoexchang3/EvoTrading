import { db } from '../db';
import { auditLogs } from '@shared/schema';

export class AuditService {
  static async log(data: {
    clientId?: string;
    userId?: string;
    action: string;
    entity?: string;
    targetType?: string;
    entityId?: string;
    targetId?: string;
    details?: any;
    ipAddress?: string;
    userAgent?: string;
  }) {
    await db.insert(auditLogs).values({
      userId: data.userId || data.clientId,
      action: data.action,
      targetType: data.targetType || data.entity,
      targetId: data.targetId || data.entityId,
      details: data.details,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
    });
  }
}
