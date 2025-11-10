import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { useVariantContent } from "@/hooks/useVariantContent";
import { useVariant } from "@/layouts/shared/useVariant";

// Hero components
import { HeroFullWidth } from "@/components/home/HeroFullWidth";
import { HeroCentered } from "@/components/home/HeroCentered";
import { HeroSplit } from "@/components/home/HeroSplit";
import { HeroMinimal } from "@/components/home/HeroMinimal";

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

  // Select appropriate components based on variant configuration
  const renderHero = () => {
    if (!heroProps) return null;
    
    switch (variant.content.heroLayout) {
      case 'full-width':
        return <HeroFullWidth {...heroProps} />;
      case 'centered':
        return <HeroCentered {...heroProps} />;
      case 'split':
        return <HeroSplit {...heroProps} />;
      case 'minimal':
        return <HeroMinimal {...heroProps} />;
      default:
        return <HeroCentered {...heroProps} />;
    }
  };

  const renderFeatures = () => {
    if (!homeContent.features) return null;
    
    switch (variant.content.featureLayout) {
      case 'list':
        return <FeaturesList {...homeContent.features} />;
      case 'carousel':
        return <FeaturesCarousel {...homeContent.features} />;
      case 'masonry':
        return <FeaturesMasonry {...homeContent.features} />;
      case 'grid':
      default:
        return <FeaturesGrid {...homeContent.features} />;
    }
  };

  const renderBenefits = () => {
    if (!homeContent.benefits) return null;
    
    switch (variant.content.benefitsLayout) {
      case 'list':
        return <BenefitsList {...homeContent.benefits} />;
      case 'cards':
        return <BenefitsCards {...homeContent.benefits} />;
      case 'grid':
      default:
        return <BenefitsGrid {...homeContent.benefits} />;
    }
  };

  const renderStats = () => {
    if (!homeContent.stats) return null;
    
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
    if (!homeContent.cta) return null;
    
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

  // Section mapping for dynamic ordering
  const sectionMap: Record<string, () => JSX.Element | null> = {
    hero: renderHero,
    features: renderFeatures,
    benefits: renderBenefits,
    stats: renderStats,
    cta: renderCTA,
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
