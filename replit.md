# Trading Platform

## Overview

This project is a professional client-facing trading platform designed for real-time trading of forex, cryptocurrencies, and commodities. It offers a complete trading ecosystem including live market data, order execution, position management, and comprehensive account management. The platform features a modern, Material Design 3-inspired dark interface optimized for financial data visualization and rapid decision-making. It integrates with an external CRM for administrative functions and aims to provide a robust and intuitive trading experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:** React 18 (TypeScript), Vite, Wouter, TanStack Query, Tailwind CSS.
**UI Component System:** shadcn/ui (Radix UI), custom financial components (PriceDisplay, ProfitLossDisplay, StatusBadge), and professional trading components (TradingChart, OrderTicket, Watchlist).
**Page Structure:**
- **Public Pages:** Home, About, Contact, FAQ, Partners, Customer Info (Account Types, Payment Methods, Verification, Trading Advice), Market Info (Technical Analysis, Fundamental Analysis, Trading Signals, Market Heatmap), Company (Rates, Regulatory & Licenses, Safety of Funds, Security & Data Protection, Platform Status, Complaints & Disputes), Legal.
- **Authenticated Pages:** Dashboard, Trading, Deposits, Withdrawals, Profile, Settings, KYC, Tools (Economic Calendar, Position Calculator, Pip Calculator, Trading Sessions, News), Education (Beginner Course, Advanced Course, Glossary).
**State Management:** TanStack Query for server state, React Context for theme/auth, local hooks for UI state, WebSocket hook for real-time data.
**Design System:** Dark mode, Bloomberg Terminal-inspired density, HSL-based semantic trading colors.

### Backend Architecture

**Technology Stack:** Node.js (TypeScript), Express.js, WebSocket (ws library), Drizzle ORM.
**Authentication & Security:** JWT-based (access/refresh tokens), bcrypt password hashing, session management with audit logging, optional TOTP 2FA.
**API Architecture:** RESTful, Zod for validation, standardized error handling, authentication middleware, audit logging.
**Trading Engine:** In-memory simulated order execution, support for Market, Limit, Stop, Stop-Limit orders, real-time P/L, TP/SL management, margin/leverage calculations, partial close, full audit trail.
**Market Data Integration:** Twelve Data API for quotes, WebSocket relay for real-time streaming, REST for historical data with caching, automatic fallback.

### Data Storage

**Database Solution:** PostgreSQL (Neon/Supabase) with Drizzle ORM for type-safe schema and migration management.
**Schema Design:** Tables for Users, Trading Accounts, Symbols, Orders, Positions, Trades, Transactions, KYC Documents, Sessions, SSO Tokens, Audit Logs, and Candles.
**Caching Strategy:** Historical candle data in PostgreSQL with TTL, in-memory caching for market data, TanStack Query for frontend query caching.

## External Dependencies

**Market Data Provider:**
- **Twelve Data API:** For real-time quotes and historical OHLCV data (Forex, Crypto, Commodities). Configured via `TWELVEDATA_API_KEY`.
**CRM Integration:**
- External CRM system for administrative functions. Uses an SSO impersonation endpoint, webhook events, and a service API for data synchronization. Authenticated via `CRM_SERVICE_TOKEN`.
- **Webhook Events:** The platform sends real-time webhook notifications to the CRM for key events:
  - Trading: `order.placed`, `order.executed`, `position.opened`, `position.closed`
  - Funding: `deposit.completed`, `withdrawal.completed`
**Database Service:**
- **Neon or Supabase PostgreSQL:** For persistent data storage. Connection via `DATABASE_URL`.

## Recent Changes (October 2025)

### Marketaux Pro Integration (October 17, 2025)
- **News Service Upgrade:** Leveraged Marketaux Pro plan features for enhanced news coverage
  - Replaced restrictive symbol-based filtering with `entity_types` parameter (equity, cryptocurrency, currency)
  - Implemented real sentiment analysis using Marketaux's entity sentiment scores (-1 to +1 scale)
  - Sentiment classification: positive (>0.1), negative (<-0.1), neutral (-0.1 to 0.1)
  - Improved category derivation using entity type metadata instead of keyword matching
  - Increased article diversity from 3 to 50+ articles with better category distribution
- **Entity Data:** Each article now includes rich entity metadata (200,000+ tracked entities)
  - Entity types: equity, cryptocurrency, currency, index, etf, mutualfund (note: `commodity` is NOT a valid type)
  - Per-entity sentiment scores and match scores
  - Highlighted text snippets with individual sentiment analysis
- **Parallel Category Fetching (Latest):** Implemented parallel API calls for balanced news distribution
  - Stocks: `entity_types=equity` (15 articles, 33%)
  - Crypto: `entity_types=cryptocurrency` (10 articles, 22%)
  - Forex: `entity_types=currency` (10 articles, 22%)
  - Commodities: `symbols=XAUUSD,XAGUSD,USOIL,...` (10 articles, 22%) - uses symbol-based filtering since Marketaux lacks commodity entity type
  - UUID-based deduplication prevents duplicate articles across categories
  - Forced category assignment ensures accurate filtering on frontend
  - Total: 45 unique articles with balanced distribution across all 4 categories

### Economic Calendar Enhancements (October 17, 2025)
- **Impact Classification System:** Added manual high-impact event lookup table
  - High-impact events: NFP, CPI, GDP, FOMC, ECB decisions, interest rate announcements (50+ event types)
  - Medium-impact events: Housing data, PMI, business confidence, jobless claims (15+ event types)
  - Low-impact: All other events (default)
  - Partial matching for country-prefixed events (e.g., "US CPI", "UK GDP")
  - Impact filters now functional with accurate classification
- **UI Improvements:**
  - Responsive layout: Stack vertically on mobile, horizontal on desktop
  - Event names use word-break to prevent overflow
  - Forecast/Previous/Actual grid responsive with truncation
  - Proper min-width constraints and flex wrapping

### Webhook Integration
- Implemented comprehensive webhook notifications for all trading and funding events
- All webhooks are properly awaited and include relevant data (account IDs, amounts, timestamps)
- Webhook events: order.placed, order.executed, position.opened, position.closed, deposit.completed, withdrawal.completed

### Balance Type System
- Added support for three distinct balance types: Real, Demo, and Bonus
- Schema changes:
  - Added `realBalance`, `demoBalance`, `bonusBalance` fields to accounts table
  - Added `fundType` enum ('real', 'demo', 'bonus') to transactions table
- Deposit/Withdrawal flows:
  - Users can select fund type when depositing or withdrawing
  - Bonus funds are non-withdrawable
  - Transactions auto-complete and update the correct balance fields
  - Total balance is automatically synchronized (real + demo + bonus)
- UI Updates:
  - AccountInfoBar displays Real/Demo/Bonus balances separately
  - Fund type selectors on deposit and withdrawal pages
- All balance updates trigger appropriate webhook notifications

### Demo Account
- Email: demo@test.com
- Password: demo1234