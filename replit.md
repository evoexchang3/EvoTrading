# Trading Platform

## Overview

This is a professional trading platform that enables users to trade forex, cryptocurrencies, and commodities in real-time. The application provides a complete trading ecosystem with live market data, order execution, position management, and comprehensive account management features.

The platform is designed as a client-facing trading application that integrates with an external CRM system for administrative functions. It features a modern, Material Design 3-inspired dark interface optimized for financial data visualization and rapid decision-making.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### October 16, 2025 - Comprehensive Informational Pages & Trading Tools
- **Added 20 New Pages**: Comprehensive informational pages for customer information, market education, trading tools, and education hub
- **Customer Information Pages (4)**: Account types, payment methods, verification process, and trading advice - all informational content with no CRM exposure
- **Market Information Pages (4)**: Technical analysis, fundamental analysis, trading signals, and market heatmap educational content
- **Trading Tools (5 - Authenticated)**: Economic calendar, position size calculator, pip calculator, trading sessions indicator, and market news feed
- **Education Hub (3 - Authenticated)**: Beginner course, advanced course, and comprehensive trading glossary
- **Company Pages (1)**: Spreads and commission rate table
- **Updated Navigation**: LandingLayout footer reorganized with Information, Customer, Company, and Support sections
- **Dashboard Navigation**: Added Tools and Learn dropdown menus for authenticated users
- **All pages include proper data-testid attributes** for automated testing compliance

### October 14, 2025 - Critical Fixes
- **Fixed WebSocket Symbol Format**: Backend now converts Twelve Data format (EUR/USD) to database format (EURUSD) for proper price broadcast
- **Added /api/account Endpoint**: Created endpoint alias for frontend to fetch account balance, equity, margin, and leverage
- **Fixed Margin Calculation**: OrderTicket now receives live prices and calculates margin required in real-time
- **Fixed Chart Data Loading**: Resolved duplicate key constraint error by deleting existing candle data before caching new data
- **Live Price Updates**: All WebSocket price updates now flow correctly to OrderTicket and TradingChart components
- **Cleaned Console Logging**: Removed excessive debug logs for production-ready experience

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management
- Tailwind CSS with custom financial design system

**UI Component System:**
- shadcn/ui components based on Radix UI primitives
- Custom financial components (PriceDisplay, ProfitLossDisplay, StatusBadge)
- Professional trading interface components (TradingChart, OrderTicket, Watchlist)
- Responsive layouts supporting desktop-first financial workflows

**Page Structure:**
- **Public Pages** (LandingLayout):
  - Home, About, Contact, FAQ, Partners
  - Customer Info: Account Types, Payment Methods, Verification, Trading Advice
  - Market Info: Technical Analysis, Fundamental Analysis, Trading Signals, Market Heatmap
  - Company: Rates, Legal (Terms, Privacy, AML, Risk, Cookies)
- **Authenticated Pages** (DashboardLayout/ProtectedRoute):
  - Dashboard, Trading, Deposits, Withdrawals, Profile, Settings, KYC
  - Tools: Economic Calendar, Position Calculator, Pip Calculator, Trading Sessions, News
  - Education: Beginner Course, Advanced Course, Glossary

**State Management Strategy:**
- TanStack Query handles all server state and caching
- React Context for theme (light/dark mode) and authentication state
- Local state with hooks for component-specific UI state
- WebSocket hook for real-time market data subscriptions

**Design System:**
- Dark mode primary theme optimized for extended trading sessions
- Bloomberg Terminal-inspired information density
- Clear visual hierarchy for P/L, positions, and critical trading data
- HSL-based color system with semantic trading colors (profit green, loss red, warning amber)

### Backend Architecture

**Technology Stack:**
- Node.js with TypeScript
- Express.js for REST API endpoints
- WebSocket (ws library) for real-time market data streaming
- Drizzle ORM for type-safe database operations

**Authentication & Security:**
- JWT-based authentication with access and refresh tokens
- Access tokens expire in 15 minutes, refresh tokens in 7 days
- Environment-based JWT secrets (required in production, auto-generated in development)
- bcrypt password hashing with salt rounds of 10
- Session management with audit logging for all authentication events
- Optional TOTP 2FA support with secret storage

**API Architecture:**
- RESTful endpoints organized by domain (auth, trading, market, funding)
- Request validation using Zod schemas from shared types
- Standardized error handling and response formats
- Authentication middleware for protected routes
- Audit logging service for compliance and security tracking

**Trading Engine:**
- In-memory simulated order execution on real market quotes
- Support for Market, Limit, Stop, and Stop-Limit orders
- Real-time P/L calculation for open positions
- Take Profit and Stop Loss management
- Margin and leverage calculations
- Position partial close capability
- Full trade audit trail

**Market Data Integration:**
- Twelve Data API for forex, crypto, and commodities quotes
- WebSocket relay pattern: single backend connection per symbol, broadcast to unlimited clients
- REST API for historical candle data with intelligent caching
- Automatic fallback to REST polling if WebSocket disconnects
- In-memory and database caching with configurable TTL

### Data Storage

**Database Solution:**
- PostgreSQL (Neon/Supabase serverless)
- Drizzle ORM with type-safe schema definitions
- Migration management via drizzle-kit

**Schema Design:**
- Users table with email verification and 2FA support
- Trading accounts with balance, equity, margin tracking
- Symbols table for tradeable instruments configuration
- Orders table for pending orders (market, limit, stop, stop-limit)
- Positions table for open trades with real-time P/L
- Trades table for closed position history
- Transactions table for deposits/withdrawals with approval workflow
- KYC documents table with status tracking
- Sessions table for refresh token management
- SSO tokens table for CRM impersonation
- Audit logs table for comprehensive activity tracking
- Candles table for market data caching

**Caching Strategy:**
- Historical candle data cached in PostgreSQL with TTL
- In-memory caching for frequently accessed market data
- Query-level caching via TanStack Query on frontend

### External Dependencies

**Market Data Provider:**
- Twelve Data API (twelvedata.com)
- WebSocket endpoint: wss://ws.twelvedata.com/v1/quotes/price
- REST endpoint: https://api.twelvedata.com
- Provides real-time quotes and historical OHLCV data
- Configurable via TWELVEDATA_API_KEY environment variable

**CRM Integration:**
- External CRM system for administrative functions (not part of this codebase)
- SSO impersonation endpoint allows CRM to generate session tokens
- Webhook endpoints send user/trade/funding events to CRM
- Service API enables CRM to sync user data and trading limits
- Authentication via CRM_SERVICE_TOKEN bearer token

**Database Service:**
- Neon or Supabase PostgreSQL (serverless)
- Connection via DATABASE_URL environment variable
- Required for persistent data storage

**File Storage:**
- S3-compatible storage intended for KYC document uploads
- Configuration not yet implemented in current codebase

**Email Service:**
- Email verification and password reset flows defined
- Actual email sending not yet implemented (logged to console in development)

**Environment Configuration:**
- JWT_ACCESS_SECRET: Required in production for access token signing
- JWT_REFRESH_SECRET: Required in production for refresh token signing
- DATABASE_URL: PostgreSQL connection string
- TWELVEDATA_API_KEY: Market data API key
- CRM_BASE_URL: External CRM system endpoint
- CRM_SERVICE_TOKEN: Authentication for CRM integration
- SITE_WEBHOOK_SECRET: Webhook signature verification