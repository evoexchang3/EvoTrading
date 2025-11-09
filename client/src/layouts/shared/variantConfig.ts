/**
 * Layout Variant Configuration System
 * Defines structural, visual, and behavioral properties for each of the 15 layout variants
 */

export type AnimationStyle = 'instant' | 'subtle' | 'smooth' | 'energetic' | 'dramatic';
export type TypographySize = 'compact' | 'standard' | 'spacious' | 'large';
export type LayoutDensity = 'dense' | 'comfortable' | 'spacious';
export type CardStyle = 'sharp' | 'rounded' | 'soft' | 'elevated' | 'flat';

export type NavigationLayout = 
  | 'compact-top'       // Logo left, minimal nav right, single row
  | 'wide-split'        // Logo centered, nav split left/right with CTA
  | 'centered-double'   // Logo top row centered, nav below
  | 'ticker-bar'        // Sticky top with live market data strip
  | 'vertical-sidebar'  // Left-side navigation (Bloomberg-style)
  | 'hamburger-mobile'  // Hidden menu, slide-out panel
  | 'mega-menu'         // Hover categories with full-width panels
  | 'icon-rail'         // Minimal icon-only left rail with tooltips
  | 'glassmorphic'      // Transparent floating header over hero
  | 'minimal-text'      // Clean text links, no borders/backgrounds
  | 'breadcrumb-hybrid' // Top nav + breadcrumb secondary nav
  | 'ribbon-secondary'  // Two-tier nav with category ribbons
  | 'bottom-mobile'     // Mobile-app style bottom navigation
  | 'pillar-layout'     // Vertical pillars with grouped nav sections
  | 'hero-overlay';     // Transparent nav that overlays hero image

export type FooterLayout = 
  | 'quad-grid'         // 4 columns, legal/compliance focused
  | 'tiered-two-row'    // Important links top row, legal bottom
  | 'social-first'      // Large social icons, minimal text
  | 'newsletter-hero'   // Email signup prominent, minimal links
  | 'legal-micro'       // Single row, essential legal links only
  | 'multi-cta-card'    // 3 columns + featured CTA card
  | 'accordion-stack'   // Mobile-first accordion sections
  | 'sticky-support'    // Fixed bottom support/contact bar
  | 'minimalist-line'   // Copyright + 3-4 essential links
  | 'metrics-strip'     // Company stats/metrics with minimal links
  | 'partner-carousel'  // Partner logos with rotating carousel
  | 'card-resources'    // Footer as resource cards grid
  | 'contact-panel'     // Large contact info, small nav
  | 'global-offices'    // Office locations with map visual
  | 'faq-teaser';       // Common questions + link to full FAQ

export type ContentTone = 
  | 'professional'      // Formal, institutional language
  | 'friendly'          // Approachable, welcoming tone
  | 'premium'           // Luxury, exclusive messaging
  | 'technical'         // Data-driven, analytical
  | 'minimalist'        // Concise, zen-like
  | 'energetic'         // Dynamic, action-oriented
  | 'trustworthy'       // Security-focused, reliable
  | 'innovative'        // Forward-thinking, modern
  | 'educational'       // Teaching, informative
  | 'corporate'         // B2B, enterprise-focused
  | 'crypto-native'     // Web3, decentralized language
  | 'warm'              // Comfortable, inviting
  | 'authoritative'     // Expert, knowledgeable
  | 'casual'            // Relaxed, conversational
  | 'elite';            // High-end, VIP treatment

export interface VariantConfig {
  // Identity
  id: string;
  name: string;
  category: 'professional' | 'modern' | 'crypto' | 'warm' | 'specialized';
  description: string;

  // Structural Components (NEW)
  structure: {
    navigationLayout: NavigationLayout;
    footerLayout: FooterLayout;
    contentTone: ContentTone;
  };

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
  // ORIGINAL: Default Platform Design
  'original': {
    id: 'original',
    name: 'Original',
    category: 'professional',
    description: 'The original platform design with clean, professional aesthetics and full functionality',
    structure: {
      navigationLayout: 'compact-top',
      footerLayout: 'quad-grid',
      contentTone: 'professional',
    },
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
      style: 'smooth',
      duration: 200,
      pageTransition: 'fadeSlide',
      heroEntry: 'slideUp',
      cardHover: 'lift',
      buttonHover: 'grow',
    },
    content: {
      heroLayout: 'centered',
      featureLayout: 'grid',
      ctaStyle: 'prominent',
      imageStyle: 'contained',
    },
    assets: {
      heroImage: '/assets/layouts/original/hero.jpg',
      iconSet: 'outlined',
    },
  },

  // GROUP A: Professional/Institutional
  'bloomberg-dark': {
    id: 'bloomberg-dark',
    name: 'Bloomberg Terminal',
    category: 'professional',
    description: 'Dense, data-focused layout inspired by Bloomberg Terminal with multi-column grids',
    structure: {
      navigationLayout: 'ticker-bar',
      footerLayout: 'quad-grid',
      contentTone: 'technical',
    },
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
    structure: {
      navigationLayout: 'compact-top',
      footerLayout: 'tiered-two-row',
      contentTone: 'professional',
    },
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
    structure: {
      navigationLayout: 'wide-split',
      footerLayout: 'legal-micro',
      contentTone: 'authoritative',
    },
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
    structure: {
      navigationLayout: 'minimal-text',
      footerLayout: 'minimalist-line',
      contentTone: 'minimalist',
    },
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
    structure: {
      navigationLayout: 'centered-double',
      footerLayout: 'social-first',
      contentTone: 'friendly',
    },
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
    structure: {
      navigationLayout: 'glassmorphic',
      footerLayout: 'newsletter-hero',
      contentTone: 'energetic',
    },
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
    structure: {
      navigationLayout: 'mega-menu',
      footerLayout: 'card-resources',
      contentTone: 'crypto-native',
    },
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
    structure: {
      navigationLayout: 'icon-rail',
      footerLayout: 'metrics-strip',
      contentTone: 'innovative',
    },
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
    structure: {
      navigationLayout: 'hamburger-mobile',
      footerLayout: 'sticky-support',
      contentTone: 'technical',
    },
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
    structure: {
      navigationLayout: 'breadcrumb-hybrid',
      footerLayout: 'multi-cta-card',
      contentTone: 'warm',
    },
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
    structure: {
      navigationLayout: 'ribbon-secondary',
      footerLayout: 'partner-carousel',
      contentTone: 'energetic',
    },
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
    structure: {
      navigationLayout: 'pillar-layout',
      footerLayout: 'contact-panel',
      contentTone: 'premium',
    },
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
    structure: {
      navigationLayout: 'vertical-sidebar',
      footerLayout: 'faq-teaser',
      contentTone: 'authoritative',
    },
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
    structure: {
      navigationLayout: 'hero-overlay',
      footerLayout: 'global-offices',
      contentTone: 'elite',
    },
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
    structure: {
      navigationLayout: 'bottom-mobile',
      footerLayout: 'accordion-stack',
      contentTone: 'corporate',
    },
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
