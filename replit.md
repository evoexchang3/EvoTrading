# Trading Platform

## Overview

This project is a professional client-facing trading platform for real-time trading of forex, cryptocurrencies, and commodities. It provides a complete trading ecosystem including live market data, order execution, position management, and account management. The platform features a modern, Material Design 3-inspired dark interface optimized for financial data visualization and integrates with an external CRM. Its purpose is to offer a robust and intuitive trading experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:** React 18 (TypeScript), Vite, Wouter, TanStack Query, Tailwind CSS.
**UI Component System:** shadcn/ui (Radix UI), custom financial and professional trading components.
**Page Structure:** Divided into Public Pages (Home, About, Contact, Market Info, Company, Legal) and Authenticated Pages (Dashboard, Trading, Deposits, Withdrawals, Profile, Settings, KYC, Tools, Education).
**State Management:** TanStack Query for server state, React Context for global state, local hooks for UI state, WebSocket hook for real-time data.
**Design System:** Dark mode, Bloomberg Terminal-inspired density, HSL-based semantic trading colors.
**Internationalization (i18n):** Custom context-based system with 9 languages, browser detection, persistent preference, and RTL support.
**Runtime Customization:** `site-config.yml` for branding, layout variants (15 themes), and feature toggles, integrated via `SiteConfigContext`.

### Backend Architecture

**Technology Stack:** Node.js (TypeScript), Express.js, WebSocket (ws library), Drizzle ORM.
**Authentication & Security:** JWT-based with access/refresh tokens, bcrypt hashing, session management with audit logging, optional TOTP 2FA.
**API Architecture:** RESTful, Zod for validation, standardized error handling, authentication middleware, audit logging.
**Trading Engine:** In-memory simulated order execution supporting various order types (Market, Limit, Stop, Stop-Limit), real-time P/L, TP/SL, margin/leverage calculations, partial close, and a full audit trail.
**Market Data Integration:** Twelve Data API for quotes, WebSocket for real-time streaming, REST for historical data with caching and automatic fallback.
**Webhook Integration:** Comprehensive notifications for trading and funding events (`order.placed`, `order.executed`, `position.opened`, `position.closed`, `deposit.completed`, `withdrawal.completed`).

### Data Storage

**Database Solution:** PostgreSQL (Neon/Supabase) with Drizzle ORM for type-safe schema and migration management.
**Schema Design:** Tables for Users, Trading Accounts, Symbols, Orders, Positions, Trades, Transactions, KYC Documents, Sessions, SSO Tokens, Audit Logs, and Candles.
**Caching Strategy:** Historical candle data in PostgreSQL with TTL, in-memory caching for market data, TanStack Query for frontend query caching.
**Balance Type System:** Support for Real, Demo, and Bonus balances with corresponding schema fields and transaction `fundType` enum.

## External Dependencies

**Market Data Provider:**
- **Twelve Data API:** Used for real-time quotes and historical OHLCV data across Forex, Crypto, and Commodities. Configured via `TWELVEDATA_API_KEY`.
**CRM Integration:**
- External CRM system for administrative functions, utilizing an SSO impersonation endpoint, webhook events, and a service API for data synchronization. Authenticated via `CRM_SERVICE_TOKEN`.
**Database Service:**
- **Neon or Supabase PostgreSQL:** Provides persistent data storage for the platform. Connection via `DATABASE_URL`.
**News Service:**
- **Marketaux Pro:** For enhanced news coverage, sentiment analysis, and entity metadata for various asset classes.
**Economic Calendar Data:**
- **EODHD:** Provides economic calendar event data.