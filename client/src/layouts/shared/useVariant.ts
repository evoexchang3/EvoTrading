import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { getVariantConfig, type VariantConfig } from './variantConfig';

/**
 * Hook to access the current layout variant configuration
 * Pages can use this to adapt their rendering based on the active variant
 */
export function useVariant(): VariantConfig {
  const { activeVariant } = useSiteConfig();
  return getVariantConfig(activeVariant);
}

/**
 * Hook to get variant-specific CSS classes
 */
export function useVariantClasses() {
  const variant = useVariant();

  const getContainerClass = () => {
    const maxWidths = {
      '1200px': 'max-w-7xl',
      '1400px': 'max-w-[1400px]',
      '1600px': 'max-w-[1600px]',
      'full': 'max-w-full',
    };
    return `container mx-auto px-4 ${maxWidths[variant.layout.maxWidth]}`;
  };

  const getGridClass = () => {
    const gridCols = {
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };
    return `grid gap-6 ${gridCols[variant.layout.gridColumns]}`;
  };

  const getSpacingClass = (type: 'section' | 'card' | 'element') => {
    const spacing = {
      dense: { section: 'py-8 md:py-12', card: 'p-4', element: 'space-y-2' },
      comfortable: { section: 'py-12 md:py-20', card: 'p-6', element: 'space-y-4' },
      spacious: { section: 'py-16 md:py-28', card: 'p-8', element: 'space-y-6' },
    };
    return spacing[variant.layout.density][type];
  };

  const getCardClass = () => {
    const radius = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    };

    const shadows = {
      none: '',
      subtle: 'shadow-sm',
      medium: 'shadow-md',
      strong: 'shadow-lg shadow-primary/10',
    };

    const borders = {
      none: '',
      subtle: 'border border-border/50',
      visible: 'border border-border',
      prominent: 'border-2 border-border',
    };

    return `bg-card ${radius[variant.visual.borderRadius]} ${shadows[variant.visual.shadows]} ${borders[variant.visual.borders]}`;
  };

  const getTextSizeClass = (level: 'hero' | 'heading' | 'body' | 'caption') => {
    const sizes = {
      compact: {
        hero: 'text-3xl md:text-4xl lg:text-5xl',
        heading: 'text-xl md:text-2xl',
        body: 'text-sm',
        caption: 'text-xs',
      },
      standard: {
        hero: 'text-4xl md:text-5xl lg:text-6xl',
        heading: 'text-2xl md:text-3xl',
        body: 'text-base',
        caption: 'text-sm',
      },
      spacious: {
        hero: 'text-5xl md:text-6xl lg:text-7xl',
        heading: 'text-3xl md:text-4xl',
        body: 'text-lg',
        caption: 'text-base',
      },
      large: {
        hero: 'text-6xl md:text-7xl lg:text-8xl',
        heading: 'text-4xl md:text-5xl',
        body: 'text-xl',
        caption: 'text-lg',
      },
    };
    return sizes[variant.typography.size][level];
  };

  const getAnimationClass = (type: 'hero' | 'card' | 'button' | 'page') => {
    if (variant.animations.style === 'instant') return '';
    
    const animations: Record<string, string> = {
      // Hero/Entry animations
      fadeIn: 'animate-fade-in',
      slideUp: 'animate-slide-up',
      slideInRight: 'animate-slide-in-right',
      fadeInUp: 'animate-fade-in-up',
      fadeInScale: 'animate-fade-in-scale',
      zoomIn: 'animate-zoom-in',
      glowIn: 'animate-glow-in',
      typewriter: 'animate-typewriter',
      
      // Page transitions
      none: '',
      fade: 'animate-fade-in',
      fadeSlide: 'animate-fade-in-up',
      fadeUp: 'animate-fade-in-up',
      glowFade: 'animate-glow-in',
      gradientFade: 'animate-fade-in-scale',
      luxuryFade: 'animate-fade-in-scale opacity-80',
      matrixFall: 'animate-matrix-fall',
      slideLeft: 'animate-slide-left',
    };

    const entryAnimation = type === 'hero' ? variant.animations.heroEntry : 
                          type === 'page' ? variant.animations.pageTransition : '';
    
    return animations[entryAnimation] || '';
  };

  const getHoverClass = (type: 'card' | 'button') => {
    if (variant.animations.style === 'instant') return '';

    const hoverEffects: Record<string, string> = {
      // Common hover effects
      none: '',
      subtle: 'hover-elevate transition-all',
      
      // Card hover effects
      lift: 'hover:-translate-y-1 transition-transform duration-200',
      float: 'hover:-translate-y-2 hover:shadow-xl transition-all duration-300',
      glow: 'hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-300',
      bounce: 'hover:scale-105 transition-transform duration-200',
      scan: 'hover:bg-accent/10 transition-colors duration-300',
      skew: 'hover:skew-y-1 transition-transform duration-200',
      
      // Button hover effects
      grow: 'hover:scale-110 transition-transform duration-200',
      scale: 'hover:scale-105 transition-transform duration-200',
      pulse: 'hover:animate-pulse',
      shine: 'relative overflow-hidden hover:after:animate-shine',
      shimmer: 'hover:animate-shimmer bg-gradient-to-r',
      glitch: 'hover:translate-x-0.5 hover:text-primary transition-all duration-100',
      underline: 'hover:underline hover:underline-offset-4 transition-all duration-200',
    };

    const effect = type === 'card' ? variant.animations.cardHover : variant.animations.buttonHover;
    return hoverEffects[effect] || '';
  };

  return {
    container: getContainerClass(),
    grid: getGridClass(),
    spacing: getSpacingClass,
    card: getCardClass(),
    textSize: getTextSizeClass,
    animation: getAnimationClass,
    hover: getHoverClass,
  };
}
