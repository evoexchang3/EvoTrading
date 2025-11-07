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
**Per-Language Branding:** Language-specific overrides for company name and support email via `getBranding(language)` function, enabling multi-regional deployments with localized branding.
**Admin Configuration UI:** Web-based admin interface at `/admin/config` for runtime configuration management (branding, layouts, features, language overrides) without code changes or redeployment.

### Backend Architecture

**Technology Stack:** Node.js (TypeScript), Express.js, WebSocket (ws library), Drizzle ORM.
**Authentication & Security:** JWT-based with access/refresh tokens, bcrypt hashing, session management with audit logging, optional TOTP 2FA.
**API Architecture:** RESTful, Zod for validation, standardized error handling, authentication middleware, audit logging.
**Admin API:** Role-based admin endpoints (GET/PUT `/api/admin/site-config`) with JWT authentication, YAML validation, automatic backup, and comprehensive audit logging.
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

## Enterprise Features (November 2025)

The platform includes three major enterprise enhancements for production deployments:

### 1. Admin Web UI for Configuration Management
**Purpose:** Runtime configuration changes without code modifications or redeployment.
**Access:** `/admin/config` (requires `role='admin'`)
**Features:**
- **Branding Tab:** Update company name and support email
- **Layout Tab:** Select from 15 pre-built layout variants with live preview
- **Features Tab:** Toggle account types (Standard, Professional, VIP) and payment methods
- **Languages Tab:** Configure per-language branding overrides for multi-regional deployments
**Security:** JWT authentication + role-based access control, automatic YAML backup before updates, comprehensive audit logging
**API Endpoints:** GET/PUT `/api/admin/site-config` with schema validation and error handling

### 2. CI/CD Automated Validation
**Purpose:** Continuous integration workflows to validate configuration changes before deployment.
**Workflow:** `.github/workflows/validate-site-config.yml`
**Validation Jobs:**
- **validate-config:** YAML syntax, required fields (companyName, supportEmail, activeVariant)
- **validate-layouts:** All 15 layout CSS files exist and are non-empty, activeVariant file verification
- **validate-language-overrides:** Language codes match enabled languages in config
- **security-check:** Sensitive data patterns, email format validation
**Triggers:** Push to main/develop, changes to site-config.yml or layout CSS files, pull requests
**Benefits:** Prevents deployment of invalid configurations, automated quality gates, comprehensive validation reporting

### 3. Per-Language Branding Overrides
**Purpose:** Support multi-regional deployments with language-specific company names and support emails.
**Implementation:** `branding.languageOverrides` in `site-config.yml`, `getBranding(language)` context function
**Supported Languages:** 8 non-English languages (Chinese, Japanese, German, French, Spanish, Arabic, Russian, Portuguese)
**Use Cases:**
- Regional subsidiaries with different legal entity names
- Localized support emails per region (e.g., support-cn@, support-eu@)
- Regulatory compliance (correct legal entity display based on user's region)
- Brand variants for different markets
**Integration:** LandingLayout and other components automatically use `getBranding(currentLanguage)` to display localized branding
**CLI Support:** Update language overrides via `node tools/site-customizer/index.cjs update branding.languageOverrides.zh-CN.companyName "公司名"`

**Architecture Decision (November 2025):**
- Added `role` field to `clients` table (enum: 'client' | 'admin') with default 'client'
- Extended `AuthRequest` interface to include full user object with role
- Created `requireAdmin` middleware for admin-only endpoints
- SiteConfigContext provides `getBranding(language)` function that merges language-specific overrides with default branding
- Layout variants served from `client/public/layouts/variants/` for Vite production build compatibility (moved from `src/` to fix 404 errors in production builds)

### 4. Variant System Refactoring (November 7, 2025)
**Purpose:** Fix "Invalid hook call" warnings by converting navigation/footer components from hook-based to prop-based architecture.
**Implementation:**
- Extended NavigationProps and FooterProps interfaces to include branding data (companyName, supportEmail, language, t function)
- Updated LandingLayout to compute branding via `getBranding(language)` and pass as props to navigation/footer components
- Refactored all 30 variant components (15 navigation + 15 footer) to accept branding data as props instead of calling `useSiteConfig()` and `useLanguage()` hooks
- This architectural change prevents variant components from being instantiated outside React's render cycle (e.g., in preview utilities or metadata loaders)
**Benefits:**
- Variant components are now pure presentational components without context dependencies
- Safer for future tooling that might need to access component metadata
- Cleaner separation of concerns: LandingLayout handles context, variants handle presentation
**Known Issue:** Minor "Invalid hook call" warning may appear in browser console during HMR; app functionality is unaffected

### 5. WCAG AA Accessibility Compliance (November 7, 2025)
**Purpose:** Ensure all 15 theme variants meet WCAG 2.1 Level AA standards for accessibility, eliminating eye strain and improving readability.
**Scope:** Comprehensive audit and remediation of color saturation levels across all theme CSS files.
**Audit Findings:**
- All themes passed contrast ratio requirements (4.5:1 normal text, 3:1 large text)
- Primary issue identified: Excessive saturation levels (70-100%) causing eye strain
- 7 themes required fixes, 8 themes passed without modification
**Fixes Implemented:**
- **Priority 1 (Critical):** crypto-neon, sunset-trading, charcoal-pro - Reduced 95-100% saturation to 45-75%
- **Priority 2 (Important):** emerald-trader, modern-light, carbon-sleek, sapphire-finance - Reduced 80-95% saturation to 55-70%
**Standards Established:**
- Interactive elements: ≤75% saturation maximum
- Large text/foreground areas: ≤60% saturation maximum
- Chart colors: 60-70% saturation range for data visualization clarity
**Results:**
- All themes now WCAG AA compliant with reduced eye strain
- Visual theme identity preserved across all 15 variants
- Foreground/card/secondary tokens remain synchronized
- Chart palettes retain distinct hues for data differentiation
**Documentation:** Complete audit report available in `WCAG_AA_AUDIT_REPORT.md` with detailed methodology and saturation analysis