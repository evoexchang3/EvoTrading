import { db } from '../db';
import { auditLogs } from '@shared/schema';

export class AuditService {
  static async log(data: {
    clientId?: string;
    action: string;
    entity: string;
    entityId?: string;
    details?: any;
    ipAddress?: string;
    userAgent?: string;
  }) {
    await db.insert(auditLogs).values({
      clientId: data.clientId,
      action: data.action,
      entity: data.entity,
      entityId: data.entityId,
      details: data.details,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
    });
  }
}
