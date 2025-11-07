/**
 * Animation Definitions for Layout Variants
 * These animations are referenced in variant configurations
 * and applied via Tailwind CSS classes
 */

export const animations = {
  // Entry Animations
  fadeIn: {
    name: 'fade-in',
    keyframes: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    duration: '0.5s',
    easing: 'ease-out',
  },

  slideUp: {
    name: 'slide-up',
    keyframes: {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    duration: '0.4s',
    easing: 'ease-out',
  },

  fadeInUp: {
    name: 'fade-in-up',
    keyframes: {
      '0%': { opacity: '0', transform: 'translateY(30px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    duration: '0.6s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  fadeInScale: {
    name: 'fade-in-scale',
    keyframes: {
      '0%': { opacity: '0', transform: 'scale(0.95)' },
      '100%': { opacity: '1', transform: 'scale(1)' },
    },
    duration: '0.5s',
    easing: 'ease-out',
  },

  zoomIn: {
    name: 'zoom-in',
    keyframes: {
      '0%': { opacity: '0', transform: 'scale(0.8)' },
      '100%': { opacity: '1', transform: 'scale(1)' },
    },
    duration: '0.3s',
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  slideInRight: {
    name: 'slide-in-right',
    keyframes: {
      '0%': { opacity: '0', transform: 'translateX(50px)' },
      '100%': { opacity: '1', transform: 'translateX(0)' },
    },
    duration: '0.4s',
    easing: 'ease-out',
  },

  glowIn: {
    name: 'glow-in',
    keyframes: {
      '0%': { opacity: '0', filter: 'blur(10px)' },
      '100%': { opacity: '1', filter: 'blur(0)' },
    },
    duration: '0.6s',
    easing: 'ease-out',
  },

  typewriter: {
    name: 'typewriter',
    keyframes: {
      '0%': { width: '0', opacity: '0' },
      '1%': { opacity: '1' },
      '100%': { width: '100%', opacity: '1' },
    },
    duration: '1.5s',
    easing: 'steps(40)',
  },

  // Hover/Interaction Animations
  subtleLift: {
    name: 'subtle-lift',
    transform: 'translateY(-2px)',
    transition: 'transform 200ms ease-out',
  },

  glowPulse: {
    name: 'glow-pulse',
    keyframes: {
      '0%, 100%': { boxShadow: '0 0 5px currentColor' },
      '50%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
    },
    duration: '2s',
    easing: 'ease-in-out',
    iteration: 'infinite',
  },

  // Page Transitions
  pageSlide: {
    name: 'page-slide',
    keyframes: {
      '0%': { opacity: '0', transform: 'translateX(-20px)' },
      '100%': { opacity: '1', transform: 'translateX(0)' },
    },
    duration: '0.3s',
    easing: 'ease-in-out',
  },

  matrixFall: {
    name: 'matrix-fall',
    keyframes: {
      '0%': { opacity: '0', transform: 'translateY(-100%)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    duration: '0.8s',
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },

  luxuryFade: {
    name: 'luxury-fade',
    keyframes: {
      '0%': { opacity: '0', filter: 'brightness(1.2) blur(5px)' },
      '100%': { opacity: '1', filter: 'brightness(1) blur(0)' },
    },
    duration: '0.8s',
    easing: 'ease-out',
  },
};

/**
 * Generates Tailwind CSS animation utilities
 * Add these to your tailwind.config.ts
 */
export function generateTailwindAnimations() {
  const tailwindKeyframes: Record<string, any> = {};
  const tailwindAnimations: Record<string, string> = {};

  Object.entries(animations).forEach(([name, config]) => {
    if ('keyframes' in config) {
      tailwindKeyframes[config.name] = config.keyframes;
      tailwindAnimations[config.name] = `${config.name} ${config.duration} ${config.easing}`;
    }
  });

  return {
    keyframes: tailwindKeyframes,
    animation: tailwindAnimations,
  };
}

/**
 * Animation utility classes for direct use
 */
export const animationClasses = {
  // Entry animations
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  fadeInUp: 'animate-fade-in-up',
  fadeInScale: 'animate-fade-in-scale',
  zoomIn: 'animate-zoom-in',
  slideInRight: 'animate-slide-in-right',
  glowIn: 'animate-glow-in',
  typewriter: 'animate-typewriter',

  // Hover effects
  subtleLift: 'hover:-translate-y-0.5 transition-transform duration-200',
  lift: 'hover:-translate-y-1 transition-transform duration-200',
  scale: 'hover:scale-105 transition-transform duration-200',
  glow: 'hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-200',

  // Transitions
  smooth: 'transition-all duration-300 ease-in-out',
  fast: 'transition-all duration-150 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
};
