import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { useVariantContent } from "@/hooks/useVariantContent";
import { useVariant } from "@/layouts/shared/useVariant";

// Hero components - Original
import { HeroFullWidth } from "@/components/home/HeroFullWidth";
import { HeroCentered } from "@/components/home/HeroCentered";
import { HeroSplit } from "@/components/home/HeroSplit";
import { HeroMinimal } from "@/components/home/HeroMinimal";

// Hero components - New heroType variants
import { HeroDataDashboard } from "@/components/home/HeroDataDashboard";
import { HeroTickerOverlay } from "@/components/home/HeroTickerOverlay";
import { HeroCarouselFeatures } from "@/components/home/HeroCarouselFeatures";

// Features components
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { FeaturesList } from "@/components/home/FeaturesList";
import { FeaturesCarousel } from "@/components/home/FeaturesCarousel";
import { FeaturesMasonry } from "@/components/home/FeaturesMasonry";

// Benefits components
import { BenefitsList } from "@/components/home/BenefitsList";
import { BenefitsGrid } from "@/components/home/BenefitsGrid";
import { BenefitsCards } from "@/components/home/BenefitsCards";

// Stats components
import { StatsGrid } from "@/components/home/StatsGrid";
import { StatsRow } from "@/components/home/StatsRow";
import { StatsCarousel } from "@/components/home/StatsCarousel";

// CTA components
import { CTAProminent } from "@/components/home/CTAProminent";
import { CTASubtle } from "@/components/home/CTASubtle";
import { CTAInline } from "@/components/home/CTAInline";

// New section components
import { Testimonials } from "@/components/home/Testimonials";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { ComplianceBadges } from "@/components/home/ComplianceBadges";

export default function HomePage() {
  const variant = useVariant();
  const { getPageContent } = useVariantContent();
  const homeContent = getPageContent('home');

  if (!homeContent) {
    return null;
  }

  // Prepare hero props from variant content
  const heroProps = homeContent.hero ? {
    headline: homeContent.hero.headline,
    subheadline: homeContent.hero.subheadline,
    cta: homeContent.hero.cta,
  } : null;

  // Select appropriate hero component based on heroType (NEW)
  const renderHero = () => {
    if (!heroProps) return null;
    
    // Use new heroType field for more dramatic variety
    switch (variant.content.heroType) {
      case 'standard-centered':
        return <HeroCentered {...heroProps} />;
      case 'fullscreen-video':
        return <HeroFullWidth {...heroProps} />;
      case 'split-content':
        return <HeroSplit {...heroProps} />;
      case 'minimal-text':
        return <HeroMinimal {...heroProps} />;
      case 'data-dashboard':
        return <HeroDataDashboard {...heroProps} />;
      case 'ticker-overlay':
        return <HeroTickerOverlay {...heroProps} />;
      case 'carousel-features':
        return <HeroCarouselFeatures {...heroProps} />;
      default:
        return <HeroCentered {...heroProps} />;
    }
  };

  const renderFeatures = () => {
    // Conditional rendering based on showFeatures flag (NEW)
    if (!homeContent.features || !variant.content.showFeatures) return null;
    
    // Apply featureCount override (NEW)
    const featuresData = {
      ...homeContent.features,
      items: homeContent.features.items.slice(0, variant.content.featureCount),
    };
    
    switch (variant.content.featureLayout) {
      case 'list':
        return <FeaturesList {...featuresData} />;
      case 'carousel':
        return <FeaturesCarousel {...featuresData} />;
      case 'masonry':
        return <FeaturesMasonry {...featuresData} />;
      case 'grid':
      default:
        return <FeaturesGrid {...featuresData} />;
    }
  };

  const renderBenefits = () => {
    // Conditional rendering based on showBenefits flag (NEW)
    if (!homeContent.benefits || !variant.content.showBenefits) return null;
    
    // Apply benefitsCount override (NEW)
    const benefitsData = {
      ...homeContent.benefits,
      items: homeContent.benefits.items.slice(0, variant.content.benefitsCount),
    };
    
    switch (variant.content.benefitsLayout) {
      case 'list':
        return <BenefitsList {...benefitsData} />;
      case 'cards':
        return <BenefitsCards {...benefitsData} />;
      case 'grid':
      default:
        return <BenefitsGrid {...benefitsData} />;
    }
  };

  const renderStats = () => {
    // Conditional rendering based on showStats flag (NEW)
    if (!homeContent.stats || !variant.content.showStats) return null;
    
    // Stats use statsCount for limiting display, but stats object structure is different
    // so we just pass it through - each stats component handles count internally
    switch (variant.content.statsLayout) {
      case 'row':
        return <StatsRow {...homeContent.stats} />;
      case 'carousel':
        return <StatsCarousel {...homeContent.stats} />;
      case 'grid':
      default:
        return <StatsGrid {...homeContent.stats} />;
    }
  };

  const renderCTA = () => {
    // Conditional rendering based on showCta flag (NEW)
    if (!homeContent.cta || !variant.content.showCta) return null;
    
    switch (variant.content.ctaStyle) {
      case 'subtle':
        return <CTASubtle {...homeContent.cta} />;
      case 'inline':
        return <CTAInline {...homeContent.cta} />;
      case 'prominent':
      default:
        return <CTAProminent {...homeContent.cta} />;
    }
  };

  // New section renderers for unique modules (NEW)
  const renderTestimonials = () => {
    if (!variant.content.includeTestimonials) return null;
    return <Testimonials />;
  };

  const renderPartnerLogos = () => {
    if (!variant.content.includePartnerLogos) return null;
    return <PartnerLogos />;
  };

  const renderComplianceBadges = () => {
    if (!variant.content.includeComplianceBadges) return null;
    return <ComplianceBadges />;
  };

  // Section mapping for dynamic ordering (EXPANDED)
  const sectionMap: Record<string, () => JSX.Element | null> = {
    hero: renderHero,
    features: renderFeatures,
    benefits: renderBenefits,
    stats: renderStats,
    cta: renderCTA,
    // New unique module sections
    testimonials: renderTestimonials,
    partners: renderPartnerLogos,
    compliance: renderComplianceBadges,
  };

  return (
    <LandingLayout>
      <SEO
        title={homeContent.seo?.title || 'Trading Platform'}
        description={homeContent.seo?.description || 'Professional trading platform'}
        keywords="forex trading, crypto trading, commodities trading, online trading platform, regulated broker"
        ogTitle={homeContent.seo?.title || 'Trading Platform'}
        ogDescription={homeContent.seo?.description || 'Professional trading platform'}
      />
      
      {/* Dynamic section rendering based on variant config */}
      {variant.content.sectionOrder.map((sectionName, index) => {
        const renderSection = sectionMap[sectionName];
        if (!renderSection) return null;
        return <div key={`${sectionName}-${index}`}>{renderSection()}</div>;
      })}
    </LandingLayout>
  );
}
