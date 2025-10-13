# Trading Platform Design Guidelines

## Design Approach: Financial Application Design System

**Selected Framework**: Material Design 3 + Bloomberg Terminal Principles  
**Justification**: This is a utility-focused, information-dense financial application where data clarity, rapid decision-making, and professional credibility are paramount. The design prioritizes functional hierarchy over aesthetic experimentation.

**Core Principles**:
- Data-first hierarchy: Critical trading information always visible
- Professional credibility through restrained, confident design
- Instant comprehension of P/L, positions, and market movements
- Zero visual noise that could distract from trading decisions

---

## Color Palette

### Dark Mode (Primary)
**Background System**:
- Base: `222 15% 8%` - Deep charcoal foundation
- Surface: `222 15% 11%` - Card/panel backgrounds
- Surface Elevated: `222 15% 14%` - Hover states, dropdowns
- Border: `222 15% 18%` - Subtle dividers

**Brand & Accent**:
- Primary: `210 85% 58%` - Professional blue for CTAs, active states
- Success (Profit): `142 76% 45%` - Green for positive P/L
- Danger (Loss): `0 84% 60%` - Red for negative P/L
- Warning: `38 92% 50%` - Amber for margin warnings

**Typography**:
- Primary Text: `222 15% 92%` - High contrast for data
- Secondary Text: `222 10% 65%` - Labels, metadata
- Tertiary Text: `222 8% 45%` - Timestamps, minor info

### Light Mode
**Background System**:
- Base: `0 0% 100%` - Pure white
- Surface: `210 15% 97%` - Slightly cool panels
- Border: `210 12% 88%` - Defined boundaries

**Brand & Accent**:
- Primary: `210 90% 48%` - Deeper blue for contrast
- Success: `142 70% 35%` - Readable green
- Danger: `0 80% 52%` - Clear red
- Warning: `38 88% 42%` - Balanced amber

---

## Typography

**Font Stack**:
- **Primary**: 'Inter Variable' via Google Fonts - Exceptional clarity for dense financial data
- **Monospace**: 'JetBrains Mono' - Price displays, account numbers, order IDs
- **Fallback**: system-ui, -apple-system, sans-serif

**Scale & Usage**:
- **Hero Numbers** (P/L, Balance): text-4xl/5xl, font-semibold, tabular-nums
- **Data Tables**: text-sm, font-medium for headers; text-sm for values
- **Form Labels**: text-xs, uppercase, tracking-wide, text-secondary
- **Chart Axis**: text-xs, font-mono, tabular-nums
- **Buttons/Actions**: text-sm, font-medium

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 3, 4, 6, 8, 12** for consistent rhythm
- Tight spacing (2-3): Table cells, form input padding
- Standard spacing (4-6): Card padding, button spacing
- Generous spacing (8-12): Section separation, modal padding

**Grid Structure**:
- **Dashboard Layout**: 12-column grid with 3-column sidebar (watchlist), 9-column main (charts + positions)
- **Data Tables**: Full-width with fixed headers, sticky columns for symbols
- **Order Entry**: 2-column split (chart left, order ticket right)
- **Max Widths**: Full viewport usage for dashboard; max-w-7xl for settings pages

---

## Component Library

### Navigation
- **Top Bar**: Fixed height (h-14), contains logo, account summary, user menu
- **Sidebar**: Collapsible (w-64/w-16), icon + label navigation, active state with primary color + background tint
- **Tabs**: Underlined active state, text-sm, font-medium

### Data Display
- **Price Cards**: Bordered, hover:shadow-md, bid/ask in monospace, change % with color coding
- **Position Cards**: Compact rows, P/L prominently displayed with background tint (green/red at 5% opacity)
- **Tables**: Striped rows, sticky headers, sortable columns, monospace for numerical data
- **Charts**: Full-bleed in containers, dark backgrounds in both modes, minimal chrome

### Forms & Inputs
- **Order Ticket**: Segmented control for Buy/Sell, large numerical inputs with +/- steppers
- **Text Inputs**: h-10, border-2, focus:ring-2 ring-primary/20, dark:bg-surface
- **Dropdowns**: Elevated surface, max-h-60 overflow-y-auto, search filtering for symbols
- **Toggles**: iOS-style switches for settings, checkboxes for batch operations

### Actions
- **Primary CTA** (Buy/Sell): Large (h-12), full-width on mobile, green/red backgrounds respectively
- **Secondary Actions**: variant="outline", h-9, text-sm
- **Icon Buttons**: h-8 w-8, ghost variant for density, tooltips on hover
- **Quick Actions**: Floating speed dial (bottom-right) for "Close All Positions" etc.

### Feedback
- **Alerts**: Toasts (top-right), 4-second auto-dismiss, icon + message
- **Loading States**: Skeleton loaders for tables, spinner for charts
- **Margin Warnings**: Persistent banner when margin level < 150%, amber background

---

## Trading-Specific Patterns

**Real-time Updates**:
- Pulse animation on price changes (0.3s green/red flash)
- Badge indicators for new orders/executions
- Live sparklines in watchlist (24h micro charts)

**Order Management**:
- Drag handles to modify SL/TP directly on charts
- Inline edit for order values (click to activate)
- Batch select with shift+click for multi-close

**Status Indicators**:
- Order status: Pills (pending=amber, filled=green, cancelled=gray)
- Position badges: Size in lots + entry price overlay
- Connection status: Dot indicator (green=live, amber=reconnecting, red=disconnected)

---

## Responsive Behavior

**Desktop (1280px+)**: Full 3-column layout, hover tooltips, keyboard shortcuts enabled  
**Tablet (768px-1279px)**: 2-column, collapsible sidebar, bottom sheet for order entry  
**Mobile (<768px)**: Stack all, bottom navigation, swipe gestures for table actions, simplified chart

---

## Animation Guidelines

**Minimal & Purposeful**:
- Page transitions: None (instant for trading speed)
- Price updates: 300ms flash only
- Modals: 200ms fade + scale(0.95)
- Dropdowns: 150ms slide-down
- **No** loading spinners over 2 seconds; show data tables immediately with skeleton

---

## Accessibility

- WCAG AA contrast ratios (4.5:1 minimum)
- Keyboard navigation for all trading actions (Enter to submit order, Esc to cancel)
- Screen reader labels for all data points
- Color-blind safe: Use icons + labels with P/L colors (not color alone)