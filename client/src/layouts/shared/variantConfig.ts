/**
 * Layout Variant Configuration System
 * Defines structural, visual, and behavioral properties for each of the 15 layout variants
 */

export type AnimationStyle = 'instant' | 'subtle' | 'smooth' | 'energetic' | 'dramatic';
export type TypographySize = 'compact' | 'standard' | 'spacious' | 'large';
export type LayoutDensity = 'dense' | 'comfortable' | 'spacious';
export type CardStyle = 'sharp' | 'rounded' | 'soft' | 'elevated' | 'flat';

export interface VariantConfig {
  // Identity
  id: string;
  name: string;
  category: 'professional' | 'modern' | 'crypto' | 'warm' | 'specialized';
  description: string;

  // Layout Structure
  layout: {
    density: LayoutDensity;
    maxWidth: '1200px' | '1400px' | '1600px' | 'full';
    sidebarStyle: 'compact' | 'standard' | 'wide' | 'none';
    gridColumns: 2 | 3 | 4;
  };

  // Typography
  typography: {
    size: TypographySize;
    headingScale: number;
    bodySpacing: 'tight' | 'normal' | 'relaxed';
    fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  };

  // Visual Style
  visual: {
    cardStyle: CardStyle;
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    shadows: 'none' | 'subtle' | 'medium' | 'strong';
    borders: 'none' | 'subtle' | 'visible' | 'prominent';
  };

  // Animations
  animations: {
    style: AnimationStyle;
    duration: number;
    pageTransition: string;
    heroEntry: string;
    cardHover: string;
    buttonHover: string;
  };

  // Content Presentation
  content: {
    heroLayout: 'full-width' | 'centered' | 'split' | 'minimal';
    featureLayout: 'grid' | 'list' | 'carousel' | 'masonry';
    ctaStyle: 'prominent' | 'subtle' | 'inline';
    imageStyle: 'full-bleed' | 'contained' | 'rounded' | 'overlapping';
  };

  // Assets
  assets: {
    heroImage: string;
    backgroundPattern?: string;
    iconSet: 'outlined' | 'filled' | 'duotone';
  };
}

export const variantConfigs: Record<string, VariantConfig> = {
  // GROUP A: Professional/Institutional
  'bloomberg-dark': {
    id: 'bloomberg-dark',
    name: 'Bloomberg Terminal',
    category: 'professional',
    description: 'Dense, data-focused layout inspired by Bloomberg Terminal with multi-column grids',
    layout: {
      density: 'dense',
      maxWidth: '1600px',
      sidebarStyle: 'compact',
      gridColumns: 3,
    },
    typography: {
      size: 'compact',
      headingScale: 1.2,
      bodySpacing: 'tight',
      fontWeight: 'semibold',
    },
    visual: {
      cardStyle: 'sharp',
      borderRadius: 'none',
      shadows: 'none',
      borders: 'visible',
    },
    animations: {
      style: 'instant',
      duration: 100,
      pageTransition: 'none',
      heroEntry: 'fadeIn',
      cardHover: 'none',
      buttonHover: 'subtle',
    },
    content: {
      heroLayout: 'full-width',
      featureLayout: 'grid',
      ctaStyle: 'inline',
      imageStyle: 'full-bleed',
    },
    assets: {
      heroImage: '/assets/layouts/bloomberg-dark/hero.jpg',
      backgroundPattern: '/assets/layouts/bloomberg-dark/grid-pattern.svg',
      iconSet: 'filled',
    },
  },

  'charcoal-pro': {
    id: 'charcoal-pro',
    name: 'Charcoal Professional',
    category: 'professional',
    description: 'Sleek, modern corporate design with card-based layouts and subtle animations',
    layout: {
      density: 'comfortable',
      maxWidth: '1400px',
      sidebarStyle: 'standard',
      gridColumns: 3,
    },
    typography: {
      size: 'standard',
      headingScale: 1.4,
      bodySpacing: 'normal',
      fontWeight: 'medium',
    },
    visual: {
      cardStyle: 'elevated',
      borderRadius: 'md',
      shadows: 'medium',
      borders: 'subtle',
    },
    animations: {
      style: 'subtle',
      duration: 200,
      pageTransition: 'fadeSlide',
      heroEntry: 'slideUp',
      cardHover: 'lift',
      buttonHover: 'grow',
    },
    content: {
      heroLayout: 'split',
      featureLayout: 'grid',
      ctaStyle: 'prominent',
      imageStyle: 'contained',
    },
    assets: {
      heroImage: '/assets/layouts/charcoal-pro/hero.jpg',
      iconSet: 'outlined',
    },
  },

  'navy-institutional': {
    id: 'navy-institutional',
    name: 'Navy Institutional',
    category: 'professional',
    description: 'Traditional financial institution aesthetic with serif fonts and conservative layout',
    layout: {
      density: 'comfortable',
      maxWidth: '1200px',
      sidebarStyle: 'wide',
      gridColumns: 2,
    },
    typography: {
      size: 'standard',
      headingScale: 1.5,
      bodySpacing: 'relaxed',
      fontWeight: 'normal',
    },
    visual: {
      cardStyle: 'flat',
      borderRadius: 'sm',
      shadows: 'subtle',
      borders: 'prominent',
    },
    animations: {
      style: 'subtle',
      duration: 300,
      pageTransition: 'fade',
      heroEntry: 'fadeIn',
      cardHover: 'none',
      buttonHover: 'subtle',
    },
    content: {
      heroLayout: 'centered',
      featureLayout: 'list',
      ctaStyle: 'subtle',
      imageStyle: 'contained',
    },
    assets: {
      heroImage: '/assets/layouts/navy-institutional/hero.jpg',
      iconSet: 'outlined',
    },
  },

  // GROUP B: Modern/Tech
  'arctic-minimal': {
    id: 'arctic-minimal',
    name: 'Arctic Minimal',
    category: 'modern',
    description: 'Scandinavian-inspired minimalist design with generous whitespace and zen aesthetics',
    layout: {
      density: 'spacious',
      maxWidth: '1200px',
      sidebarStyle: 'none',
      gridColumns: 2,
    },
    typography: {
      size: 'large',
      headingScale: 1.8,
      bodySpacing: 'relaxed',
      fontWeight: 'normal',
    },
    visual: {
      cardStyle: 'soft',
      borderRadius: 'lg',
      shadows: 'subtle',
      borders: 'none',
    },
    animations: {
      style: 'smooth',
      duration: 500,
      pageTransition: 'fadeSlide',
      heroEntry: 'fadeInUp',
      cardHover: 'lift',
      buttonHover: 'scale',
    },
    content: {
      heroLayout: 'minimal',
      featureLayout: 'grid',
      ctaStyle: 'prominent',
      imageStyle: 'rounded',
    },
    assets: {
      heroImage: '/assets/layouts/arctic-minimal/hero.jpg',
      iconSet: 'outlined',
    },
  },

  'nordic-clean': {
    id: 'nordic-clean',
    name: 'Nordic Clean',
    category: 'modern',
    description: 'Light, airy design with simple navigation and plenty of breathing room',
    layout: {
      density: 'spacious',
      maxWidth: '1400px',
      sidebarStyle: 'none',
      gridColumns: 3,
    },
    typography: {
      size: 'spacious',
      headingScale: 1.6,
      bodySpacing: 'relaxed',
      fontWeight: 'normal',
    },
    visual: {
      cardStyle: 'soft',
      borderRadius: 'md',
      shadows: 'subtle',
      borders: 'subtle',
    },
    animations: {
      style: 'smooth',
      duration: 400,
      pageTransition: 'fade',
      heroEntry: 'fadeIn',
      cardHover: 'lift',
      buttonHover: 'subtle',
    },
    content: {
      heroLayout: 'centered',
      featureLayout: 'grid',
      ctaStyle: 'subtle',
      imageStyle: 'rounded',
    },
    assets: {
      heroImage: '/assets/layouts/nordic-clean/hero.jpg',
      iconSet: 'outlined',
    },
  },

  'modern-light': {
    id: 'modern-light',
    name: 'Modern Light',
    category: 'modern',
    description: 'Bright, optimistic design with rounded corners and cheerful aesthetics',
    layout: {
      density: 'comfortable',
      maxWidth: '1400px',
      sidebarStyle: 'standard',
      gridColumns: 3,
    },
    typography: {
      size: 'standard',
      headingScale: 1.5,
      bodySpacing: 'normal',
      fontWeight: 'medium',
    },
    visual: {
      cardStyle: 'rounded',
      borderRadius: 'xl',
      shadows: 'medium',
      borders: 'none',
    },
    animations: {
      style: 'energetic',
      duration: 300,
      pageTransition: 'slideUp',
      heroEntry: 'zoomIn',
      cardHover: 'bounce',
      buttonHover: 'grow',
    },
    content: {
      heroLayout: 'split',
      featureLayout: 'grid',
      ctaStyle: 'prominent',
      imageStyle: 'rounded',
    },
    assets: {
      heroImage: '/assets/layouts/modern-light/hero.jpg',
      iconSet: 'filled',
    },
  },

  // GROUP C: Crypto/Web3
  'crypto-neon': {
    id: 'crypto-neon',
    name: 'Crypto Neon',
    category: 'crypto',
    description: 'Dark background with vibrant neon accents and glowing effects for crypto focus',
    layout: {
      density: 'comfortable',
      maxWidth: '1600px',
      sidebarStyle: 'compact',
      gridColumns: 4,
    },
    typography: {
      size: 'standard',
      headingScale: 1.6,
      bodySpacing: 'normal',
      fontWeight: 'bold',
    },
    visual: {
      cardStyle: 'elevated',
      borderRadius: 'md',
      shadows: 'strong',
      borders: 'prominent',
    },
    animations: {
      style: 'dramatic',
      duration: 400,
      pageTransition: 'glowFade',
      heroEntry: 'glowIn',
      cardHover: 'glow',
      buttonHover: 'pulse',
    },
    content: {
      heroLayout: 'full-width',
      featureLayout: 'grid',
      ctaStyle: 'prominent',
      imageStyle: 'full-bleed',
    },
    assets: {
      heroImage: '/assets/layouts/crypto-neon/hero.jpg',
      backgroundPattern: '/assets/layouts/crypto-neon/hex-pattern.svg',
      iconSet: 'filled',
    },
  },

  'carbon-sleek': {
    id: 'carbon-sleek',
    name: 'Carbon Sleek',
    category: 'crypto',
    description: 'Cyberpunk-inspired with angular design, tech-forward aesthetic',
    layout: {
      density: 'dense',
      maxWidth: '1600px',
      sidebarStyle: 'compact',
      gridColumns: 4,
    },
    typography: {
      size: 'compact',
      headingScale: 1.3,
      bodySpacing: 'tight',
      fontWeight: 'bold',
    },
    visual: {
      cardStyle: 'sharp',
      borderRadius: 'none',
      shadows: 'strong',
      borders: 'prominent',
    },
    animations: {
      style: 'energetic',
      duration: 250,
      pageTransition: 'slideLeft',
      heroEntry: 'slideInRight',
      cardHover: 'skew',
      buttonHover: 'pulse',
    },
    content: {
      heroLayout: 'split',
      featureLayout: 'masonry',
      ctaStyle: 'prominent',
      imageStyle: 'overlapping',
    },
    assets: {
      heroImage: '/assets/layouts/carbon-sleek/hero.jpg',
      backgroundPattern: '/assets/layouts/carbon-sleek/circuit-pattern.svg',
      iconSet: 'filled',
    },
  },

  'emerald-trader': {
    id: 'emerald-trader',
    name: 'Emerald Trader',
    category: 'crypto',
    description: 'Matrix-inspired green theme with code aesthetics and hacker vibe',
    layout: {
      density: 'dense',
      maxWidth: '1400px',
      sidebarStyle: 'standard',
      gridColumns: 3,
    },
    typography: {
      size: 'compact',
      headingScale: 1.4,
      bodySpacing: 'tight',
      fontWeight: 'semibold',
    },
    visual: {
      cardStyle: 'sharp',
      borderRadius: 'sm',
      shadows: 'medium',
      borders: 'visible',
    },
    animations: {
      style: 'energetic',
      duration: 300,
      pageTransition: 'matrixFall',
      heroEntry: 'typewriter',
      cardHover: 'scan',
      buttonHover: 'glitch',
    },
    content: {
      heroLayout: 'full-width',
      featureLayout: 'grid',
      ctaStyle: 'inline',
      imageStyle: 'full-bleed',
    },
    assets: {
      heroImage: '/assets/layouts/emerald-trader/hero.jpg',
      backgroundPattern: '/assets/layouts/emerald-trader/matrix-pattern.svg',
      iconSet: 'filled',
    },
  },

  // GROUP D: Warm/Approachable
  'terracotta-warm': {
    id: 'terracotta-warm',
    name: 'Terracotta Warm',
    category: 'warm',
    description: 'Earth tones with organic shapes, friendly and inviting atmosphere',
    layout: {
      density: 'comfortable',
      maxWidth: '1200px',
      sidebarStyle: 'wide',
      gridColumns: 2,
    },
    typography: {
      size: 'spacious',
      headingScale: 1.6,
      bodySpacing: 'relaxed',
      fontWeight: 'normal',
    },
    visual: {
      cardStyle: 'soft',
      borderRadius: 'xl',
      shadows: 'subtle',
      borders: 'subtle',
    },
    animations: {
      style: 'smooth',
      duration: 500,
      pageTransition: 'fadeUp',
      heroEntry: 'fadeInScale',
      cardHover: 'lift',
      buttonHover: 'grow',
    },
    content: {
      heroLayout: 'centered',
      featureLayout: 'grid',
      ctaStyle: 'prominent',
      imageStyle: 'rounded',
    },
    assets: {
      heroImage: '/assets/layouts/terracotta-warm/hero.jpg',
      iconSet: 'duotone',
    },
  },

  'sunset-trading': {
    id: 'sunset-trading',
    name: 'Sunset Trading',
    category: 'warm',
    description: 'Orange and purple gradients creating welcoming, energetic feel',
    layout: {
      density: 'comfortable',
      maxWidth: '1400px',
      sidebarStyle: 'standard',
      gridColumns: 3,
    },
    typography: {
      size: 'standard',
      headingScale: 1.5,
      bodySpacing: 'normal',
      fontWeight: 'medium',
    },
    visual: {
      cardStyle: 'rounded',
      borderRadius: 'lg',
      shadows: 'medium',
      borders: 'none',
    },
    animations: {
      style: 'smooth',
      duration: 400,
      pageTransition: 'gradientFade',
      heroEntry: 'fadeInUp',
      cardHover: 'lift',
      buttonHover: 'shine',
    },
    content: {
      heroLayout: 'split',
      featureLayout: 'carousel',
      ctaStyle: 'prominent',
      imageStyle: 'rounded',
    },
    assets: {
      heroImage: '/assets/layouts/sunset-trading/hero.jpg',
      iconSet: 'duotone',
    },
  },

  'sapphire-finance': {
    id: 'sapphire-finance',
    name: 'Sapphire Finance',
    category: 'warm',
    description: 'Blue and gold premium design with elegant, sophisticated feel',
    layout: {
      density: 'comfortable',
      maxWidth: '1200px',
      sidebarStyle: 'wide',
      gridColumns: 2,
    },
    typography: {
      size: 'standard',
      headingScale: 1.7,
      bodySpacing: 'relaxed',
      fontWeight: 'semibold',
    },
    visual: {
      cardStyle: 'elevated',
      borderRadius: 'md',
      shadows: 'medium',
      borders: 'subtle',
    },
    animations: {
      style: 'subtle',
      duration: 350,
      pageTransition: 'fade',
      heroEntry: 'fadeInScale',
      cardHover: 'lift',
      buttonHover: 'shimmer',
    },
    content: {
      heroLayout: 'centered',
      featureLayout: 'grid',
      ctaStyle: 'prominent',
      imageStyle: 'contained',
    },
    assets: {
      heroImage: '/assets/layouts/sapphire-finance/hero.jpg',
      iconSet: 'duotone',
    },
  },

  // GROUP E: Specialized
  'financial-times': {
    id: 'financial-times',
    name: 'Financial Times',
    category: 'specialized',
    description: 'Newspaper-inspired editorial layout with classic typography',
    layout: {
      density: 'comfortable',
      maxWidth: '1200px',
      sidebarStyle: 'wide',
      gridColumns: 3,
    },
    typography: {
      size: 'standard',
      headingScale: 1.8,
      bodySpacing: 'normal',
      fontWeight: 'normal',
    },
    visual: {
      cardStyle: 'flat',
      borderRadius: 'none',
      shadows: 'none',
      borders: 'visible',
    },
    animations: {
      style: 'instant',
      duration: 150,
      pageTransition: 'none',
      heroEntry: 'fadeIn',
      cardHover: 'none',
      buttonHover: 'underline',
    },
    content: {
      heroLayout: 'centered',
      featureLayout: 'list',
      ctaStyle: 'inline',
      imageStyle: 'contained',
    },
    assets: {
      heroImage: '/assets/layouts/financial-times/hero.jpg',
      iconSet: 'outlined',
    },
  },

  'midnight-premium': {
    id: 'midnight-premium',
    name: 'Midnight Premium',
    category: 'specialized',
    description: 'Luxury dark purple theme with exclusive, high-end feel',
    layout: {
      density: 'spacious',
      maxWidth: '1200px',
      sidebarStyle: 'standard',
      gridColumns: 2,
    },
    typography: {
      size: 'large',
      headingScale: 1.9,
      bodySpacing: 'relaxed',
      fontWeight: 'medium',
    },
    visual: {
      cardStyle: 'elevated',
      borderRadius: 'lg',
      shadows: 'strong',
      borders: 'subtle',
    },
    animations: {
      style: 'dramatic',
      duration: 600,
      pageTransition: 'luxuryFade',
      heroEntry: 'fadeInScale',
      cardHover: 'float',
      buttonHover: 'glow',
    },
    content: {
      heroLayout: 'minimal',
      featureLayout: 'grid',
      ctaStyle: 'prominent',
      imageStyle: 'overlapping',
    },
    assets: {
      heroImage: '/assets/layouts/midnight-premium/hero.jpg',
      iconSet: 'filled',
    },
  },

  'minimalist-corporate': {
    id: 'minimalist-corporate',
    name: 'Minimalist Corporate',
    category: 'specialized',
    description: 'Ultra-clean B2B design with maximum clarity and professionalism',
    layout: {
      density: 'spacious',
      maxWidth: '1200px',
      sidebarStyle: 'none',
      gridColumns: 2,
    },
    typography: {
      size: 'spacious',
      headingScale: 1.5,
      bodySpacing: 'relaxed',
      fontWeight: 'normal',
    },
    visual: {
      cardStyle: 'flat',
      borderRadius: 'sm',
      shadows: 'none',
      borders: 'subtle',
    },
    animations: {
      style: 'subtle',
      duration: 250,
      pageTransition: 'fade',
      heroEntry: 'fadeIn',
      cardHover: 'subtle',
      buttonHover: 'subtle',
    },
    content: {
      heroLayout: 'centered',
      featureLayout: 'grid',
      ctaStyle: 'subtle',
      imageStyle: 'contained',
    },
    assets: {
      heroImage: '/assets/layouts/minimalist-corporate/hero.jpg',
      iconSet: 'outlined',
    },
  },
};

/**
 * Get configuration for a specific variant
 */
export function getVariantConfig(variantId: string): VariantConfig {
  return variantConfigs[variantId] || variantConfigs['bloomberg-dark'];
}

/**
 * Get all available variants grouped by category
 */
export function getVariantsByCategory() {
  const categories = {
    professional: [] as VariantConfig[],
    modern: [] as VariantConfig[],
    crypto: [] as VariantConfig[],
    warm: [] as VariantConfig[],
    specialized: [] as VariantConfig[],
  };

  Object.values(variantConfigs).forEach(config => {
    categories[config.category].push(config);
  });

  return categories;
}
