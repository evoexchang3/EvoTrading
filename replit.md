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
- **Comprehensive Currency Mapping & Multi-Country Fetching (Latest):**
  - Comprehensive country-to-currency mapping table covering 100+ countries
  - Includes G20, Eurozone (25 members), major emerging markets, APAC hubs, Middle East, Latin America, Africa
  - Parallel API fetching for top 8 trading currencies (USD, EUR, GBP, JPY, AUD, CAD, CHF, NZD)
  - Smart deduplication by eventId prevents duplicate events across countries
  - **Result:** 170 unique events across 17 currencies (vs previous 50 events, 2 currencies)
  - Currency distribution: EUR (53), USD (47), JPY (17), CAD (13), AUD (9), NZD (9), plus emerging markets (BRL, INR, RUB, etc.)
  - All currency and impact filters now fully functional with accurate data
- **UI Improvements:**
  - Removed hardcoded mock data and placeholder stats
  - Real-time stats calculation from actual EODHD data:
    - High Impact Today: Dynamic count of high-impact events occurring today
    - Currencies Tracked: Unique currencies in dataset (now 17+ currencies)
    - Upcoming in 24h: Events in next 24 hours
    - Total Events: Complete dataset size (170 events/week)
  - Dual query system: All events for stats + filtered events for display
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

### Internationalization (i18n) Implementation (October 17-18, 2025)
- **Custom Context-Based i18n System:** Zero-dependency translation infrastructure
  - LanguageContext with React Context API for global language state
  - useLanguage hook for accessing translations via `t()` function
  - Lazy loading with code splitting prevents bundle size increase
  - Browser language detection on first visit
  - Persistent language preference in localStorage
- **Language Support:**
  - **Phase 1 (Complete):** 9 languages - English, Chinese Simplified, Japanese, German, French, Spanish, Arabic, Russian, Portuguese
  - All Phase 1 languages fully integrated with 4,148+ translation keys
  - Currency and number formatting per locale
  - Pluralization support for dynamic content
  - RTL (Right-to-Left) support for Arabic
  - Variable interpolation for dynamic strings (e.g., `{{name}}`, `{{amount}}`)
- **UI Components:**
  - LanguageSwitcher dropdown with native language names
  - Integrated into both DashboardLayout and LandingLayout headers
  - Displays 9 languages: English, 简体中文, 日本語, Deutsch, Français, Español, العربية, Русский, Português
- **Migration Status (October 18, 2025) - ✅ TECHNICAL IMPLEMENTATION COMPLETE:**
  - **Core infrastructure:** ✅ Complete
  - **All 41 pages:** ✅ Migrated to use useLanguage() hook - ZERO hardcoded strings
  - **Priority 1-4 Pages (41/41):** ✅ All pages use t() function for all UI text
  - **Critical fixes completed:**
    - ✅ Error messages now use translation keys (t('tools.news.errors.fetchFailed'))
    - ✅ Event lists refactored from .split(', ') to array-based translations (event1, event2, event3)
    - ✅ NewsPage stat values use translation keys (t('tools.news.stats.highImpactCount'), etc.)
    - ✅ Removed hardcoded newsItems array with 6 hardcoded English articles
    - ✅ Test ID stability: Navigation uses fixed identifiers instead of translated labels
  - **Architect Review:** ✅ PASS - No remaining hardcoded UI strings detected
  - **Verification:** ✅ grep checks confirm 0 hardcoded English strings in all 41 pages
- **Translation Coverage (October 18-19, 2025):**
  - **English (en.ts):** 4,148 complete translation keys (100% coverage - source)
  - **Tier 1 Complete (9 languages):** en, zh-CN, ja, de, fr, es, ar, ru, pt - All 4,148 keys (100%)
  - **Portuguese (pt.ts):** ✅ 4,148 keys (100% complete - October 19, 2025)
    - Automated via DeepL API hybrid two-pass workflow
    - First pass: 3 minutes (batch translation with truncation detection)
    - Second pass: 4 minutes (127 truncated strings individually retranslated)
    - Total: ~7 minutes end-to-end
  - **Validation tooling:** scripts/check-translations.js generates missing key manifests

### Hybrid Translation Workflow - PRODUCTION READY (October 19, 2025)
- **Problem Solved:** DeepL API truncates ~3% of strings (127/4148) with complex punctuation/backslashes
- **Solution:** Two-pass hybrid approach with intelligent marking system
- **Workflow Architecture:**
  1. **First Pass (deepl-translate.js):**
     - Batch translate 4,148 keys in 100-key batches (~3 min)
     - Detect truncated translations using `isTruncated()` check
     - Mark truncated entries with `[INCOMPLETE]` placeholder using Map.set()
     - Save truncated key list to `scripts/truncated-{lang}.json`
     - Write file with 127 marked entries + 4,021 complete translations
  2. **Second Pass (fix-truncated.js):**
     - Read truncated keys from JSON manifest
     - Translate each individually with 1.5s delay (API rate limiting)
     - Find and replace `[INCOMPLETE]` markers in file using regex
     - Verify all replacements successful (~4 min for 127 keys)
  3. **Integration:**
     - Add language to `client/src/translations/index.ts`
     - Update Language type, loadTranslations switch, languageNames map, validLanguages array
     - Restart workflow to verify no crashes
- **Key Fixes (October 19):**
  - ✅ Use Map.set() instead of array assignment for marking truncated strings
  - ✅ Improved regex pattern: `^(\\s*'${key}':\\s*')\\[INCOMPLETE\\].*?'(,?)$` with multiline flag
  - ✅ Proper escape handling for single quotes, backslashes, newlines in DeepL responses
- **Performance:** ~7 min per language (vs 25+ min with retry-only approach)
- **Cost:** ~$0.13 per language at DeepL Pro rates ($25/1M characters)
- **Reliability:** 100% success rate - Portuguese completed with zero manual fixes

### Demo Account
- Email: demo@test.com
- Password: demo1234