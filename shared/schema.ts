import { sql } from "drizzle-orm";
import { 
  pgTable, 
  text, 
  varchar, 
  timestamp, 
  decimal, 
  integer, 
  boolean,
  jsonb,
  pgEnum
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const orderTypeEnum = pgEnum('order_type', ['market', 'limit', 'stop', 'stop_limit']);
export const orderSideEnum = pgEnum('order_side', ['buy', 'sell']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'filled', 'partial', 'cancelled', 'rejected']);
export const transactionTypeEnum = pgEnum('transaction_type', ['deposit', 'withdrawal']);
export const transactionStatusEnum = pgEnum('transaction_status', ['pending', 'approved', 'rejected', 'processing', 'completed']);
export const fundTypeEnum = pgEnum('fund_type', ['real', 'demo', 'bonus']);
export const kycStatusEnum = pgEnum('kyc_status', ['pending', 'approved', 'rejected', 'under_review']);
export const clientStatusEnum = pgEnum('client_status', ['new', 'active', 'inactive', 'suspended']);
export const userRoleEnum = pgEnum('user_role', ['client', 'admin']);
export const auditActionEnum = pgEnum('audit_action', [
  'login', 'logout',
  'client_create', 'client_edit', 'client_delete',
  'trade_create', 'trade_edit', 'trade_close', 'trade_delete',
  'balance_adjust',
  'role_create', 'role_edit', 'role_delete',
  'permission_change',
  'import', 'export',
  'impersonation',
  'api_key_create', 'api_key_revoke', 'api_key_use'
]);

// Clients table (CRM structure)
export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  country: text("country"),
  dateOfBirth: timestamp("date_of_birth"),
  role: userRoleEnum("role").notNull().default('client'),
  kycStatus: kycStatusEnum("kyc_status").notNull().default('pending'),
  kycDocuments: jsonb("kyc_documents").default('[]'),
  assignedAgentId: varchar("assigned_agent_id"),
  teamId: varchar("team_id"),
  mustResetPassword: boolean("must_reset_password").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  twoFactorSecret: text("two_factor_secret"),
  twoFactorEnabled: boolean("two_factor_enabled").notNull().default(false),
  passwordResetToken: text("password_reset_token"),
  passwordResetExpires: timestamp("password_reset_expires"),
  emailVerificationToken: text("email_verification_token"),
  emailVerified: boolean("email_verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  status: clientStatusEnum("status").notNull().default('new'),
});

// Trading accounts (CRM structure)
export const accounts = pgTable("accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").references(() => clients.id).notNull(),
  accountNumber: text("account_number").notNull().unique(),
  currency: text("currency").notNull().default('USD'),
  balance: decimal("balance", { precision: 18, scale: 2 }).notNull().default('0'),
  realBalance: decimal("real_balance", { precision: 18, scale: 2 }).notNull().default('0'),
  demoBalance: decimal("demo_balance", { precision: 18, scale: 2 }).notNull().default('0'),
  bonusBalance: decimal("bonus_balance", { precision: 18, scale: 2 }).notNull().default('0'),
  equity: decimal("equity", { precision: 18, scale: 2 }).notNull().default('0'),
  margin: decimal("margin", { precision: 18, scale: 2 }).notNull().default('0'),
  freeMargin: decimal("free_margin", { precision: 18, scale: 2 }).notNull().default('0'),
  marginLevel: decimal("margin_level", { precision: 8, scale: 2 }).default('0'),
  leverage: integer("leverage").notNull().default(100),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Symbols
export const symbols = pgTable("symbols", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  symbol: text("symbol").notNull().unique(),
  twelveDataSymbol: text("twelve_data_symbol"), // Original format from Twelve Data (e.g. "EUR/USD", "BTC/USD")
  name: text("name").notNull(),
  type: text("type").default('forex'), // forex, crypto, commodity, index, stock, etf
  digits: integer("digits").default(5),
  contractSize: decimal("contract_size", { precision: 18, scale: 2 }).default('100000'),
  minLot: decimal("min_lot", { precision: 10, scale: 2 }).default('0.01'),
  maxLot: decimal("max_lot", { precision: 10, scale: 2 }).default('100'),
  lotStep: decimal("lot_step", { precision: 10, scale: 2 }).default('0.01'),
  spread: decimal("spread", { precision: 10, scale: 5 }).default('0.00002'),
  commission: decimal("commission", { precision: 10, scale: 2 }).default('0'),
  swapLong: decimal("swap_long", { precision: 10, scale: 2 }).default('0'),
  swapShort: decimal("swap_short", { precision: 10, scale: 2 }).default('0'),
  exchange: text("exchange"), // For stocks/ETFs
  exchangeTimezone: text("exchange_timezone"), // IANA timezone (e.g. "America/New_York" for NYSE)
  tradingHours: jsonb("trading_hours"), // Market open/close times in exchange timezone
  country: text("country"), // For stocks/ETFs
  currency: text("currency"), // Base currency
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Candles cache
export const candles = pgTable("candles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  symbol: text("symbol").notNull(),
  interval: text("interval").notNull(), // 1min, 5min, 15min, 1h, 1day, 1week
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(), // UTC timestamp with timezone
  open: decimal("open", { precision: 18, scale: 8 }).notNull(),
  high: decimal("high", { precision: 18, scale: 8 }).notNull(),
  low: decimal("low", { precision: 18, scale: 8 }).notNull(),
  close: decimal("close", { precision: 18, scale: 8 }).notNull(),
  volume: decimal("volume", { precision: 18, scale: 2 }),
  cachedAt: timestamp("cached_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  // Unique constraint for upsert operations
  uniqueCandle: sql`UNIQUE (symbol, interval, timestamp)`,
}));

// Orders
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountId: varchar("account_id").references(() => accounts.id).notNull(),
  symbol: text("symbol").notNull(),
  type: orderTypeEnum("type").notNull(),
  side: orderSideEnum("side").notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  price: decimal("price", { precision: 18, scale: 8 }),
  stopLoss: decimal("stop_loss", { precision: 18, scale: 8 }),
  takeProfit: decimal("take_profit", { precision: 18, scale: 8 }),
  status: orderStatusEnum("status").default('pending'),
  filledQuantity: decimal("filled_quantity", { precision: 10, scale: 2 }).default('0'),
  avgFillPrice: decimal("avg_fill_price", { precision: 18, scale: 8 }),
  commission: decimal("commission", { precision: 18, scale: 2 }).default('0'),
  swap: decimal("swap", { precision: 18, scale: 2 }).default('0'),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  filledAt: timestamp("filled_at"),
  cancelledAt: timestamp("cancelled_at"),
  subaccountId: varchar("subaccount_id"),
  initiatorType: text("initiator_type").default('client'),
  initiatorId: varchar("initiator_id"),
  leverage: decimal("leverage", { precision: 10, scale: 2 }).default('1'),
  spread: decimal("spread", { precision: 18, scale: 8 }).default('0'),
  fees: decimal("fees", { precision: 18, scale: 2 }).default('0'),
});

// Positions (open trades)
export const positions = pgTable("positions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountId: varchar("account_id").references(() => accounts.id).notNull(),
  orderId: varchar("order_id").references(() => orders.id),
  symbol: text("symbol").notNull(),
  side: orderSideEnum("side").notNull(),
  quantity: decimal("quantity", { precision: 18, scale: 8 }).notNull(),
  volume: decimal("volume", { precision: 10, scale: 2 }),
  openPrice: decimal("open_price", { precision: 18, scale: 8 }).notNull(),
  currentPrice: decimal("current_price", { precision: 18, scale: 8 }),
  takeProfit: decimal("take_profit", { precision: 18, scale: 8 }),
  stopLoss: decimal("stop_loss", { precision: 18, scale: 8 }),
  commission: decimal("commission", { precision: 18, scale: 2 }).default('0'),
  swap: decimal("swap", { precision: 18, scale: 2 }).default('0'),
  profit: decimal("profit", { precision: 18, scale: 2 }).default('0'),
  marginRequired: decimal("margin_required", { precision: 18, scale: 2 }),
  contractMultiplier: decimal("contract_multiplier", { precision: 18, scale: 2 }).default('1'),
  marginMode: text("margin_mode").default('isolated'),
  marginUsed: decimal("margin_used", { precision: 18, scale: 2 }).default('0'),
  leverage: decimal("leverage", { precision: 10, scale: 2 }).default('1'),
  spread: decimal("spread", { precision: 18, scale: 8 }).default('0'),
  fees: decimal("fees", { precision: 18, scale: 2 }).default('0'),
  unrealizedPnl: decimal("unrealized_pnl", { precision: 18, scale: 8 }).default('0'),
  realizedPnl: decimal("realized_pnl", { precision: 18, scale: 8 }).default('0'),
  closePrice: decimal("close_price", { precision: 18, scale: 8 }),
  status: text("status").default('open'),
  openedAt: timestamp("opened_at").defaultNow(),
  closedAt: timestamp("closed_at"),
  subaccountId: varchar("subaccount_id"),
  initiatorType: text("initiator_type").default('client'),
  initiatorId: varchar("initiator_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Note: CRM database stores both open and closed positions in the positions table
// using a 'status' field. No separate trades table is used.

// Deposits & Withdrawals
export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountId: varchar("account_id").references(() => accounts.id).notNull(),
  type: transactionTypeEnum("type").notNull(),
  fundType: fundTypeEnum("fund_type").notNull().default('real'),
  amount: decimal("amount", { precision: 18, scale: 2 }).notNull(),
  currency: text("currency").default('USD'),
  status: transactionStatusEnum("status").default('pending'),
  method: text("method"), // bank_transfer, card, crypto, etc
  reference: text("reference"),
  notes: text("notes"),
  processedBy: text("processed_by"), // CRM user id
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  processedAt: timestamp("processed_at"),
});

// KYC Documents
export const kycDocuments = pgTable("kyc_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").references(() => clients.id).notNull(),
  documentType: text("document_type").notNull(), // passport, id_card, proof_address
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url"),
  status: kycStatusEnum("status").default('pending'),
  reviewNotes: text("review_notes"),
  reviewedBy: text("reviewed_by"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
});

// Audit Logs (CRM structure - no foreign key enforcement)
export const auditLogs = pgTable("audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"), // Maps to CRM's user_id column (can be client or user id)
  action: auditActionEnum("action").notNull(),
  targetType: text("target_type"), // Maps to CRM's target_type column
  targetId: varchar("target_id"), // Maps to CRM's target_id column
  details: jsonb("details"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

// SSO Tokens (for impersonation) 
export const ssoTokens = pgTable("sso_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  token: text("token").notNull().unique(),
  clientId: varchar("client_id").references(() => clients.id).notNull(),
  adminId: text("admin_id"), // CRM admin who initiated
  reason: text("reason"),
  ipAddress: text("ip_address"),
  consumed: boolean("consumed").default(false),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  consumedAt: timestamp("consumed_at"),
});

// Sessions
export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").references(() => clients.id).notNull(),
  refreshToken: text("refresh_token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Users (CRM admin users)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  roleId: varchar("role_id"),
  teamId: varchar("team_id"),
  isActive: boolean("is_active").notNull().default(true),
  mustResetPassword: boolean("must_reset_password").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// User Preferences
export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").references(() => clients.id).notNull().unique(),
  displayCurrency: text("display_currency").notNull().default('USD'), // USD, EUR, GBP, JPY
  theme: text("theme").default('dark'), // dark, light
  timezone: text("timezone").default('UTC'), // IANA timezone string (e.g. "America/New_York")
  autoDetectTimezone: boolean("auto_detect_timezone").notNull().default(true),
  defaultLotSize: decimal("default_lot_size", { precision: 10, scale: 2 }).default('0.01'),
  layoutConfig: jsonb("layout_config"), // Stores panel positions, sizes, visibility
  favorites: text("favorites").array().default(sql`ARRAY[]::text[]`), // Favorite symbols
  notifications: jsonb("notifications").default('{"trades": true, "deposits": true, "margin": true}'),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Course Progress (for tracking user learning progress)
export const courseProgress = pgTable("course_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").references(() => clients.id).notNull(),
  courseId: text("course_id").notNull(), // 'beginner' or 'advanced'
  moduleId: text("module_id").notNull(),
  lessonId: text("lesson_id"),
  completed: boolean("completed").notNull().default(false),
  quizScore: integer("quiz_score"), // 0-100
  lastAccessedAt: timestamp("last_accessed_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Economic Events (cached calendar data from FMP API)
export const economicEvents = pgTable("economic_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: text("event_id").notNull(), // External API event ID
  datetime: timestamp("datetime").notNull(),
  country: text("country").notNull(),
  currency: text("currency"), // USD, EUR, GBP, etc.
  event: text("event").notNull(), // Event name (NFP, CPI, etc.)
  impact: text("impact"), // high, medium, low
  forecast: text("forecast"),
  previous: text("previous"),
  actual: text("actual"),
  source: text("source").default('fmp'), // fmp, other
  cachedAt: timestamp("cached_at").notNull().defaultNow(),
});

// News Articles (cached news from Marketaux API)
export const newsArticles = pgTable("news_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  newsId: text("news_id").notNull().unique(), // External API news ID
  publishedAt: timestamp("published_at").notNull(),
  title: text("title").notNull(),
  summary: text("summary"),
  source: text("source").notNull(),
  url: text("url").notNull(),
  sentiment: text("sentiment"), // positive, neutral, negative
  symbols: text("symbols").array().default(sql`ARRAY[]::text[]`), // Related symbols
  category: text("category"), // forex, markets, general
  cachedAt: timestamp("cached_at").notNull().defaultNow(),
});

// Insert schemas
export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAccountSchema = createInsertSchema(accounts).omit({
  id: true,
  createdAt: true,
});

export const insertSymbolSchema = createInsertSchema(symbols).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  filledAt: true,
  cancelledAt: true,
});

export const insertPositionSchema = createInsertSchema(positions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  processedAt: true,
});

export const insertKycDocumentSchema = createInsertSchema(kycDocuments).omit({
  id: true,
  uploadedAt: true,
  reviewedAt: true,
});

export const insertAuditLogSchema = createInsertSchema(auditLogs).omit({
  id: true,
  createdAt: true,
});

export const insertCourseProgressSchema = createInsertSchema(courseProgress).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertEconomicEventSchema = createInsertSchema(economicEvents).omit({
  id: true,
  cachedAt: true,
});

export const insertNewsArticleSchema = createInsertSchema(newsArticles).omit({
  id: true,
  cachedAt: true,
});

export const insertSsoTokenSchema = createInsertSchema(ssoTokens).omit({
  id: true,
  createdAt: true,
  consumedAt: true,
});

// Types
export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type Account = typeof accounts.$inferSelect;
export type InsertAccount = z.infer<typeof insertAccountSchema>;

export type Symbol = typeof symbols.$inferSelect;
export type InsertSymbol = z.infer<typeof insertSymbolSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type Position = typeof positions.$inferSelect;
export type InsertPosition = z.infer<typeof insertPositionSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type KycDocument = typeof kycDocuments.$inferSelect;
export type InsertKycDocument = z.infer<typeof insertKycDocumentSchema>;

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = z.infer<typeof insertAuditLogSchema>;

export type SsoToken = typeof ssoTokens.$inferSelect;
export type InsertSsoToken = z.infer<typeof insertSsoTokenSchema>;

export type Session = typeof sessions.$inferSelect;
export type UserPreference = typeof userPreferences.$inferSelect;

export type CourseProgress = typeof courseProgress.$inferSelect;
export type InsertCourseProgress = z.infer<typeof insertCourseProgressSchema>;

export type EconomicEvent = typeof economicEvents.$inferSelect;
export type InsertEconomicEvent = z.infer<typeof insertEconomicEventSchema>;

export type NewsArticle = typeof newsArticles.$inferSelect;
export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;

// API Request/Response schemas
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const placeOrderSchema = z.object({
  symbol: z.string(),
  type: z.enum(['market', 'limit', 'stop', 'stop_limit']),
  side: z.enum(['buy', 'sell']),
  quantity: z.number().positive().optional(),
  margin: z.number().positive().optional(),
  price: z.number().positive().optional(),
  takeProfit: z.number().positive().optional(),
  stopLoss: z.number().positive().optional(),
  // Frontend-provided live WebSocket price (optional, fallback to REST API)
  currentPrice: z.number().positive().optional(),
  priceTimestamp: z.string().optional(), // ISO timestamp string
}).refine(
  (data) => data.quantity !== undefined || data.margin !== undefined,
  { message: "Either quantity or margin must be provided" }
);

export const modifyOrderSchema = z.object({
  takeProfit: z.number().positive().optional(),
  stopLoss: z.number().positive().optional(),
  price: z.number().positive().optional(),
});

export const createTransactionSchema = z.object({
  type: z.enum(['deposit', 'withdrawal']),
  fundType: z.enum(['real', 'demo', 'bonus']).default('real'),
  amount: z.number().positive(),
  method: z.string().optional(),
  notes: z.string().optional(),
});

export type RegisterRequest = z.infer<typeof registerSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type PlaceOrderRequest = z.infer<typeof placeOrderSchema>;
export type ModifyOrderRequest = z.infer<typeof modifyOrderSchema>;
export type CreateTransactionRequest = z.infer<typeof createTransactionSchema>;
