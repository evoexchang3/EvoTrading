# Trading Platform

## Overview

This project is a professional, client-facing trading platform designed for real-time trading of forex, cryptocurrencies, and commodities. It offers a comprehensive trading ecosystem featuring live market data, order execution, position and account management, and integrates with an external CRM. The platform boasts a modern, dark interface inspired by Material Design 3, optimized for financial data visualization, and supports multi-regional deployments with per-language branding and 35 languages. Its core purpose is to deliver a robust, intuitive, and globally accessible trading experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

The frontend uses React 18 (TypeScript), Vite, Wouter, TanStack Query, and Tailwind CSS, built with shadcn/ui and custom trading components. It's structured into Public and Authenticated pages. State management leverages TanStack Query for server state, React Context for global state, and local hooks for UI state, including a WebSocket hook for real-time data. The design system is dark mode, Bloomberg Terminal-inspired, using HSL-based semantic trading colors. Internationalization supports 35 languages, powered by DeepL, with RTL support. Runtime customization is managed via `site-config.yml` for branding, 16 layout variants (including "original" default), and feature toggles, with an Admin Configuration UI for web-based management. Navigation and footer components are refactored to be prop-based for better architectural purity. The platform is WCAG AA compliant, with all variants audited and adjusted for optimal saturation levels to reduce eye strain.

#### Educational Content System

The platform includes comprehensive trading courses with English content (multi-language support planned as future enhancement):

- **Beginner Course**: 30 lessons across 6 modules (Trading Basics, Technical Analysis, Risk Management, Trading Psychology, Strategy Development, Practical Trading)
- **Advanced Course**: 30 lessons across 6 modules (Advanced Price Action, Multi-Timeframe Analysis, Advanced Risk Management, Market Psychology, Advanced Strategies, Professional Trading)
- **Content Structure**: Each lesson includes 2-4 sections, key points, examples, risk warnings, summaries, and quizzes with explanations
- **File Organization**: Content organized across 4 files - `beginner-lessons.ts`, `beginner-modules-3-6.ts`, `advanced-lessons.ts`, `advanced-modules-3-6.ts` for maintainability
- **LessonViewer Component**: Reusable component that dynamically renders lesson content from course files, handles quiz state management, submission, and reset functionality
- **Integration**: Both BeginnerCoursePage and AdvancedCoursePage use LessonViewer with consistent quiz state management (Record<number, number>), progress tracking via TanStack Query mutations, and lesson navigation
- **Future Enhancement**: Multi-language translation system to be integrated with existing i18n infrastructure

#### Layout Variant System

16 unique layout variants with distinct dashboard compositions:
- **Full-Featured Variants** (13): Complete trading features, unique dashboard layouts
- **Minimalistic Variants** (3): Streamlined UX - `arctic-minimal`, `minimalist-corporate`, `nordic-clean`
- **Dashboard Uniqueness**: Each variant has completely different widget arrangements, densities, and visual compositions
- **Navigation Types**: 15 unique navigation patterns (compact-top, wide-split, ticker-bar, etc.)
- **Footer Types**: 15 unique footer layouts including:
  - `FiveColumnOriginalFooter`: 5-column design (Information, Customer, Company, Trust & Security, Support) for "original" variant
  - Other patterns: quad-grid, tiered-two-row, legal-micro, etc.
- **Dynamic Rendering**: `DashboardRenderer` component maps configurations to UI widgets
- **Preview System**: URL parameter `?preview=variant-name` overrides active variant for testing and screenshot capture without modifying configuration files
- **Screenshot Automation**: Playwright script (`scripts/capture-layout-thumbnails.ts`) captures high-quality thumbnails (1920x1440, 4:3 ratio) of all 16 variants using preview parameter system
- **Translation Coverage**: All footer sections support 35 languages with stable `data-testid` attributes for reliable cross-language testing

### Backend

The backend is built with Node.js (TypeScript), Express.js, WebSocket (ws library), and Drizzle ORM. It features JWT-based authentication with access/refresh tokens, bcrypt hashing, session management, and optional TOTP 2FA. The API is RESTful, uses Zod for validation, and includes standardized error handling, authentication middleware, and audit logging. A role-based Admin API manages runtime configurations. The trading engine supports in-memory simulated order execution for various order types, real-time P/L, TP/SL, margin/leverage calculations, and a full audit trail. Market data integrates with Twelve Data API for quotes and historical data, utilizing WebSocket for real-time streaming. Comprehensive webhooks provide notifications for trading and funding events.

### Data Storage

PostgreSQL (Neon/Supabase) is used with Drizzle ORM for type-safe schema and migration management. The schema includes tables for Users, Trading Accounts, Symbols, Orders, Positions, Trades, Transactions, KYC Documents, Sessions, SSO Tokens, Audit Logs, and Candles. Caching involves historical candle data in PostgreSQL with TTL, in-memory caching for market data, and TanStack Query for frontend query caching. The system supports Real, Demo, and Bonus balance types.

## External Dependencies

*   **Market Data Provider:** Twelve Data API (real-time quotes, historical OHLCV data).
*   **CRM Integration:** External CRM system (SSO impersonation, webhooks, service API).
*   **Database Service:** Neon or Supabase PostgreSQL.
*   **News Service:** Marketaux Pro (enhanced news coverage, sentiment analysis).
*   **Economic Calendar Data:** EODHD.