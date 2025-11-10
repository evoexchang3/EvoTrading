import { HeroCentered } from "@/components/home/HeroCentered";
import { HeroSplit } from "@/components/home/HeroSplit";
import { HeroMinimal } from "@/components/home/HeroMinimal";
import { HeroDataDashboard } from "@/components/home/HeroDataDashboard";
import { HeroTickerOverlay } from "@/components/home/HeroTickerOverlay";
import { HeroCarouselFeatures } from "@/components/home/HeroCarouselFeatures";
import { HeroFullWidth } from "@/components/home/HeroFullWidth";

/**
 * Hero type values from HomePage (heroType field)
 */
export type HeroType =
  | 'standard-centered'
  | 'fullscreen-video'
  | 'split-content'
  | 'minimal-text'
  | 'data-dashboard'
  | 'ticker-overlay'
  | 'carousel-features';

/**
 * Hero style values from other pages (heroStyle field)
 */
export type HeroStyle =
  | 'standard'
  | 'split-visual'
  | 'minimal'
  | 'gradient'
  | 'tech-forward'
  | 'modern'
  | 'sleek'
  | 'neon'
  | 'vibrant'
  | 'cyber'
  | 'electric'
  | 'corporate'
  | 'clean'
  | 'professional'
  | 'data-focused';

export interface HeroProps {
  headline: string;
  subheadline: string;
  cta: string;
}

interface HeroRendererProps extends HeroProps {
  type?: HeroType;
  style?: HeroStyle;
}

/**
 * Unified Hero Renderer
 * Maps all hero type/style values to appropriate hero components
 * Handles both heroType (HomePage) and heroStyle (other pages) fields
 */
export function HeroRenderer({ type, style, headline, subheadline, cta }: HeroRendererProps) {
  const heroProps = { headline, subheadline, cta };
  
  // Combine type and style into a single value for mapping
  const heroVariant = type || style;

  switch (heroVariant) {
    // HeroType mappings (from HomePage)
    case 'standard-centered':
    case 'standard':
    case 'clean':
    case 'professional':
    case 'corporate':
      return <HeroCentered {...heroProps} />;
    
    case 'split-content':
    case 'split-visual':
    case 'modern':
    case 'sleek':
      return <HeroSplit {...heroProps} />;
    
    case 'minimal-text':
    case 'minimal':
      return <HeroMinimal {...heroProps} />;
    
    case 'fullscreen-video':
      return <HeroFullWidth {...heroProps} />;
    
    case 'data-dashboard':
    case 'data-focused':
    case 'gradient':
    case 'neon':
    case 'vibrant':
    case 'cyber':
    case 'electric':
    case 'tech-forward':
      return <HeroDataDashboard {...heroProps} />;
    
    case 'ticker-overlay':
      return <HeroTickerOverlay {...heroProps} />;
    
    case 'carousel-features':
      return <HeroCarouselFeatures {...heroProps} />;
    
    default:
      return <HeroCentered {...heroProps} />;
  }
}
