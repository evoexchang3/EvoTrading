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

16 unique layout variants with completely different content AND structure across ALL pages:

**Variant Categories:**
- **Full-Featured Variants** (13): Complete trading features, unique dashboard layouts
- **Minimalistic Variants** (3): Streamlined UX - `arctic-minimal`, `minimalist-corporate`, `nordic-clean`

**Global Layout Elements:**
- **Navigation Types**: 15 unique navigation patterns (compact-top, wide-split, ticker-bar, etc.)
- **Footer Types**: 15 unique footer layouts including FiveColumnOriginalFooter, quad-grid, tiered-two-row, legal-micro, etc.
- **Translation Coverage**: All sections support 35 languages with stable `data-testid` attributes

**Page-Specific Structural Variants:**

*HomePage (7 hero types, optional sections, configurable counts):*
- **Hero Types**: standard-centered, split-content, minimal-text, data-dashboard, ticker-overlay, carousel-features, video-background
- **Section Control**: Optional testimonials, partner logos, live ticker, compliance badges
- **Count Overrides**: 3/4/6 features, 3/4 benefits, 4 stats
- **Section Ordering**: Dynamic reordering (hero→features→benefits vs hero→stats→features, etc.)

*AboutPage (4 layout types, 3 team presentations, 3 values styles):*
- **Layout Types**: mission-first, values-first, team-first, timeline-led
- **Team Presentation**: grid (2-column), carousel (embla-carousel), spotlight-list (featured leader + team list)
- **Values Styles**: cards (icon cards), icons (compact icon list), minimal (text-only)
- **Conditional Elements**: Optional timeline, mission, values, team sections with configurable team member count (4/6/8)

*MarketsPage (4 layout types, 3 grouping strategies, locale-independent):*
- **Layout Types**: table (data table), cards (grid layout), accordion (expandable sections), tabs (category tabs)
- **Grouping**: by-type (forex/crypto/commodities), by-region (Americas/Europe/Asia), popularity-weighted (sorted by popularity score)
- **Conditional Display**: Optional charts, spread stats, leverage stats, compact view mode
- **Locale Independence**: Stats filtering uses explicit type metadata ('spread' | 'leverage' | 'other') instead of substring matching for cross-language reliability

*ContactPage (3 layout types, 2 form structures, 4 optional elements):*
- **Layout Types**: form-first (form left, info right), info-first (reversed), split (50/50 with visual differentiation)
- **Form Structure**: single-column (traditional stacked), two-column (name/email side-by-side)
- **Optional Elements**: showMap (location map), showOffices (office locations), showSocial (social media links), showHours (business hours)

*FAQPage (3 layouts, 3 organizations, 3 highlight modes):*
- **Layout Types**: accordion (classic expandable), tabs (category-based tabs), cards (grid of Q&A cards)
- **Organization**: categorised (grouped by category), flat (single list), searchable (search-first interface with live filtering)
- **Highlight Modes**: featured-top (dedicated featured section at top), inline (visual highlighting within layouts), none (no special treatment)
- **Optional Controls**: Search bar, category filter pills, configurable category count (4/6/8)
- **Data Flow**: Computed collections (visibleCategories, allQuestions, featuredQuestions, filteredQuestions, mainQuestions) with memoized filtering for performance

**Technical Architecture:**
- **Hierarchical Config**: `variant.pages.{pageName}` structure in variantConfig for type-safe page-specific settings
- **Layout Dispatchers**: Each page uses renderLayout() function to dispatch to appropriate renderer based on config
- **Component Extraction**: Reusable section components (e.g., ContactFormSection, ContactInfoSection) for clean architecture
- **Conditional Rendering**: Boolean flags and enum types control which sections/features appear
- **Dynamic Rendering**: DashboardRenderer maps configurations to UI widgets for authenticated dashboard

**Preview & Testing:**
- **Preview System**: URL parameter `?preview=variant-name` overrides active variant
- **Admin Preview**: Preview buttons open layout in new tab preserving unsaved form data
- **Preview Banner**: Dismissible "Back to Admin" banner on landing page in preview mode
- **Screenshot Automation**: Playwright script captures high-quality PNG thumbnails (1920x1440, 4:3) of all 16 variants
- **Layout Thumbnails**: Real screenshots (400KB-1.5MB PNG) displayed in Admin Configuration UI

**Result:**
Maximum structural diversity achieved - each of the 16 variants displays different text, component layouts, section ordering, optional sections, varied item counts, and unique modules while maintaining informational parity across all major pages (Home, About, Markets, Contact, FAQ).

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