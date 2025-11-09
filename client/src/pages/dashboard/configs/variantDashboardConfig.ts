/**
 * Dashboard Configuration Per Variant
 * Defines layout, widgets, and styling for each of the 16 variants
 */

export type LayoutType = 'grid' | 'stack' | 'sidebar' | 'masonry';
export type DensityType = 'dense' | 'comfortable' | 'spacious';
export type WidgetVariant = 'default' | 'minimal' | 'dense' | 'hero';

export interface DashboardSection {
  id: string;
  layout: LayoutType;
  columns?: number;
  gap?: 'sm' | 'md' | 'lg';
  widgets: string[];
  className?: string;
}

export interface DashboardConfig {
  layout: {
    type: LayoutType;
    columns?: number;
    gap?: 'sm' | 'md' | 'lg';
    maxWidth?: string;
    align?: 'left' | 'center' | 'right';
  };
  sections: DashboardSection[];
  hiddenWidgets?: string[];
  modifiers?: {
    density?: DensityType;
    cardVariant?: 'default' | 'minimal' | 'dense';
    greetingVariant?: WidgetVariant;
  };
}

export const dashboardVariants: Record<string, DashboardConfig> = {
  // Original - Full-featured default
  'original': {
    layout: {
      type: 'stack',
      gap: 'md',
      maxWidth: '1400px',
    },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'metrics', layout: 'grid', columns: 4, gap: 'md', widgets: ['balance', 'equity', 'margin', 'freeMargin'] },
      { id: 'actions', layout: 'grid', columns: 3, gap: 'md', widgets: ['startTrading', 'deposit', 'withdraw'] },
      { id: 'activity', layout: 'stack', widgets: ['recentActivity'] },
    ],
    modifiers: {
      density: 'comfortable',
      cardVariant: 'default',
      greetingVariant: 'default',
    },
  },

  // Bloomberg Dark - Dense, data-focused
  'bloomberg-dark': {
    layout: {
      type: 'grid',
      columns: 3,
      gap: 'sm',
      maxWidth: '1600px',
    },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'], className: 'col-span-3' },
      { id: 'metrics', layout: 'grid', columns: 4, gap: 'sm', widgets: ['balance', 'equity', 'margin', 'freeMargin'], className: 'col-span-3' },
      { id: 'actions', layout: 'grid', columns: 3, gap: 'sm', widgets: ['startTrading', 'deposit', 'withdraw'], className: 'col-span-3' },
      { id: 'activity', layout: 'stack', widgets: ['recentActivity'], className: 'col-span-2' },
    ],
    modifiers: {
      density: 'dense',
      cardVariant: 'dense',
      greetingVariant: 'minimal',
    },
  },

  // Arctic Minimal - Minimalistic variant
  'arctic-minimal': {
    layout: {
      type: 'stack',
      align: 'center',
      gap: 'lg',
      maxWidth: '1200px',
    },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'metrics', layout: 'stack', gap: 'md', widgets: ['balance', 'equity'] },
      { id: 'actions', layout: 'stack', widgets: ['startTrading'] },
    ],
    hiddenWidgets: ['margin', 'freeMargin', 'deposit', 'withdraw', 'recentActivity'],
    modifiers: {
      density: 'spacious',
      cardVariant: 'minimal',
      greetingVariant: 'hero',
    },
  },

  // Minimalist Corporate - Minimalistic variant
  'minimalist-corporate': {
    layout: {
      type: 'stack',
      align: 'center',
      gap: 'lg',
      maxWidth: '1200px',
    },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'metrics', layout: 'stack', gap: 'md', widgets: ['balance', 'equity'] },
      { id: 'actions', layout: 'stack', widgets: ['startTrading'] },
    ],
    hiddenWidgets: ['margin', 'freeMargin', 'deposit', 'withdraw', 'recentActivity'],
    modifiers: {
      density: 'spacious',
      cardVariant: 'minimal',
      greetingVariant: 'hero',
    },
  },

  // Nordic Clean - Minimalistic variant
  'nordic-clean': {
    layout: {
      type: 'stack',
      align: 'center',
      gap: 'lg',
      maxWidth: '1200px',
    },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'metrics', layout: 'stack', gap: 'md', widgets: ['balance', 'equity'] },
      { id: 'actions', layout: 'stack', widgets: ['startTrading'] },
    ],
    hiddenWidgets: ['margin', 'freeMargin', 'deposit', 'withdraw', 'recentActivity'],
    modifiers: {
      density: 'spacious',
      cardVariant: 'minimal',
      greetingVariant: 'hero',
    },
  },

  // Modern Light - Spacious, clean
  'modern-light': {
    layout: {
      type: 'stack',
      gap: 'lg',
      maxWidth: '1400px',
    },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'metrics', layout: 'grid', columns: 2, gap: 'lg', widgets: ['balance', 'equity', 'margin', 'freeMargin'] },
      { id: 'actions', layout: 'grid', columns: 3, gap: 'md', widgets: ['startTrading', 'deposit', 'withdraw'] },
      { id: 'activity', layout: 'stack', widgets: ['recentActivity'] },
    ],
    modifiers: {
      density: 'spacious',
      cardVariant: 'default',
      greetingVariant: 'default',
    },
  },

  // Crypto Neon - Action-focused with prominent CTAs
  'crypto-neon': {
    layout: { type: 'stack', gap: 'lg', maxWidth: '1400px' },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'actions', layout: 'grid', columns: 3, gap: 'lg', widgets: ['startTrading', 'deposit', 'withdraw'] },
      { id: 'metrics', layout: 'grid', columns: 2, gap: 'lg', widgets: ['equity', 'balance'] },
      { id: 'secondary', layout: 'grid', columns: 2, gap: 'md', widgets: ['margin', 'freeMargin'] },
      { id: 'activity', layout: 'stack', widgets: ['recentActivity'] },
    ],
    modifiers: { density: 'spacious', cardVariant: 'default', greetingVariant: 'default' },
  },

  // Financial Times - Traditional, list-style with emphasis on details
  'financial-times': {
    layout: { type: 'stack', gap: 'lg', maxWidth: '1200px' },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'metrics', layout: 'grid', columns: 2, gap: 'lg', widgets: ['balance', 'equity', 'margin', 'freeMargin'] },
      { id: 'activity', layout: 'stack', widgets: ['recentActivity'] },
      { id: 'actions', layout: 'grid', columns: 3, gap: 'md', widgets: ['startTrading', 'deposit', 'withdraw'] },
    ],
    modifiers: { density: 'spacious', cardVariant: 'default', greetingVariant: 'minimal' },
  },

  // Charcoal Pro - Professional, balanced 3-column layout
  'charcoal-pro': {
    layout: { type: 'stack', gap: 'md', maxWidth: '1400px' },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'metrics', layout: 'grid', columns: 3, gap: 'md', widgets: ['balance', 'equity', 'freeMargin'] },
      { id: 'secondary', layout: 'stack', widgets: ['margin'] },
      { id: 'actions', layout: 'grid', columns: 3, gap: 'md', widgets: ['startTrading', 'deposit', 'withdraw'] },
      { id: 'activity', layout: 'stack', widgets: ['recentActivity'] },
    ],
    modifiers: { density: 'comfortable', cardVariant: 'default', greetingVariant: 'default' },
  },

  // Emerald Trader - Focus on risk management metrics
  'emerald-trader': {
    layout: { type: 'stack', gap: 'md', maxWidth: '1400px' },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'risk', layout: 'grid', columns: 2, gap: 'md', widgets: ['margin', 'freeMargin'] },
      { id: 'metrics', layout: 'grid', columns: 2, gap: 'md', widgets: ['balance', 'equity'] },
      { id: 'actions', layout: 'grid', columns: 3, gap: 'md', widgets: ['startTrading', 'deposit', 'withdraw'] },
      { id: 'activity', layout: 'stack', widgets: ['recentActivity'] },
    ],
    modifiers: { density: 'comfortable', cardVariant: 'default', greetingVariant: 'default' },
  },

  // Navy Institutional - Conservative, detailed metrics
  'navy-institutional': {
    layout: { type: 'stack', gap: 'md', maxWidth: '1200px' },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'metrics', layout: 'grid', columns: 2, gap: 'md', widgets: ['balance', 'equity', 'margin', 'freeMargin'] },
      { id: 'activity', layout: 'stack', widgets: ['recentActivity'] },
      { id: 'actions', layout: 'grid', columns: 3, gap: 'md', widgets: ['startTrading', 'deposit', 'withdraw'] },
    ],
    modifiers: { density: 'comfortable', cardVariant: 'default', greetingVariant: 'minimal' },
  },

  // Sunset Trading - Visual, emphasis on P&L and equity
  'sunset-trading': {
    layout: { type: 'stack', gap: 'lg', maxWidth: '1400px' },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'hero', layout: 'grid', columns: 2, gap: 'lg', widgets: ['equity', 'balance'] },
      { id: 'actions', layout: 'grid', columns: 3, gap: 'md', widgets: ['startTrading', 'deposit', 'withdraw'] },
      { id: 'metrics', layout: 'grid', columns: 2, gap: 'md', widgets: ['margin', 'freeMargin'] },
      { id: 'activity', layout: 'stack', widgets: ['recentActivity'] },
    ],
    modifiers: { density: 'spacious', cardVariant: 'default', greetingVariant: 'default' },
  },

  // Midnight Premium - Elegant, card-focused design
  'midnight-premium': {
    layout: { type: 'stack', gap: 'lg', maxWidth: '1400px' },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'metrics', layout: 'grid', columns: 2, gap: 'lg', widgets: ['balance', 'equity'] },
      { id: 'secondary', layout: 'grid', columns: 2, gap: 'md', widgets: ['margin', 'freeMargin'] },
      { id: 'actions', layout: 'grid', columns: 3, gap: 'lg', widgets: ['startTrading', 'deposit', 'withdraw'] },
      { id: 'activity', layout: 'stack', widgets: ['recentActivity'] },
    ],
    modifiers: { density: 'spacious', cardVariant: 'default', greetingVariant: 'default' },
  },

  // Carbon Sleek - Streamlined, modern and efficient
  'carbon-sleek': {
    layout: { type: 'stack', gap: 'sm', maxWidth: '1600px' },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'metrics', layout: 'grid', columns: 4, gap: 'sm', widgets: ['balance', 'equity', 'margin', 'freeMargin'] },
      { id: 'actions', layout: 'grid', columns: 3, gap: 'sm', widgets: ['startTrading', 'deposit', 'withdraw'] },
      { id: 'activity', layout: 'stack', widgets: ['recentActivity'] },
    ],
    modifiers: { density: 'dense', cardVariant: 'default', greetingVariant: 'minimal' },
  },

  // Sapphire Finance - Premium, balanced layout
  'sapphire-finance': {
    layout: { type: 'stack', gap: 'md', maxWidth: '1400px' },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'metrics', layout: 'grid', columns: 3, gap: 'md', widgets: ['balance', 'equity', 'margin'] },
      { id: 'actions', layout: 'grid', columns: 3, gap: 'md', widgets: ['startTrading', 'deposit', 'withdraw'] },
      { id: 'secondary', layout: 'stack', widgets: ['freeMargin', 'recentActivity'] },
    ],
    modifiers: { density: 'comfortable', cardVariant: 'default', greetingVariant: 'default' },
  },

  // Terracotta Warm - Welcoming, user-friendly
  'terracotta-warm': {
    layout: { type: 'stack', gap: 'lg', maxWidth: '1400px' },
    sections: [
      { id: 'greeting', layout: 'stack', widgets: ['greeting'] },
      { id: 'primary', layout: 'grid', columns: 2, gap: 'lg', widgets: ['balance', 'equity'] },
      { id: 'actions', layout: 'grid', columns: 3, gap: 'md', widgets: ['startTrading', 'deposit', 'withdraw'] },
      { id: 'secondary', layout: 'grid', columns: 2, gap: 'md', widgets: ['margin', 'freeMargin'] },
      { id: 'activity', layout: 'stack', widgets: ['recentActivity'] },
    ],
    modifiers: { density: 'spacious', cardVariant: 'default', greetingVariant: 'default' },
  },
};

export function getDashboardConfig(variantId: string): DashboardConfig {
  return dashboardVariants[variantId] || dashboardVariants['original'];
}
