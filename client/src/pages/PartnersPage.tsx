import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariant } from "@/layouts/shared/useVariant";
import { HeroRenderer } from "@/components/variant-rendering";
import { VariantPageHeader } from "@/components/variant";

import { BenefitsSection } from "@/components/partners/BenefitsSection";
import { CommissionSection } from "@/components/partners/CommissionSection";
import { FeaturesSection } from "@/components/partners/FeaturesSection";
import { CTASection } from "@/components/partners/CTASection";

import { LogoGridLayout } from "@/components/partners/layouts/LogoGridLayout";
import { SpotlightCarouselLayout } from "@/components/partners/layouts/SpotlightCarouselLayout";
import { CaseStudyLayout } from "@/components/partners/layouts/CaseStudyLayout";
import { MetricsStripLayout } from "@/components/partners/layouts/MetricsStripLayout";

export default function PartnersPage() {
  const { t } = useLanguage();
  const variant = useVariant();
  const partnersConfig = variant.pages.partners;

  // Hero props
  const heroProps = {
    headline: t('partners.hero.title'),
    subheadline: t('partners.hero.subtitle'),
    cta: t('partners.hero.cta') || t('common.getStarted'),
  };

  // Render hero based on variant config
  const renderHero = () => {
    return (
      <HeroRenderer
        style={partnersConfig.heroStyle}
        {...heroProps}
      />
    );
  };

  // Render sections based on layout type
  const renderContent = () => {
    switch (partnersConfig.layout) {
      case 'logo-grid':
        // Logo grid layout with partner network showcase
        return (
          <>
            <LogoGridLayout />
            <BenefitsSection />
            <CommissionSection />
            <FeaturesSection />
            <CTASection />
          </>
        );
      
      case 'spotlight-carousel':
        // Carousel layout highlighting successful partners
        return (
          <>
            <SpotlightCarouselLayout />
            <BenefitsSection />
            <CommissionSection />
            <FeaturesSection />
            <CTASection />
          </>
        );
      
      case 'case-studies':
      case 'case-study':
        // Detailed case study showing partner success
        return (
          <>
            <CaseStudyLayout />
            <CommissionSection />
            <FeaturesSection />
            <CTASection />
          </>
        );
      
      case 'metrics-strip':
        // Metrics-focused layout with program statistics
        return (
          <>
            <MetricsStripLayout />
            <CommissionSection />
            <BenefitsSection />
            <FeaturesSection />
            <CTASection />
          </>
        );
      
      case 'benefits-led':
        // Benefits-focused approach: Benefits emphasized twice, no separate features
        return (
          <>
            <BenefitsSection />
            <CommissionSection />
            <CTASection />
          </>
        );
      
      default:
        // Standard full layout: All sections in traditional order
        return (
          <>
            <BenefitsSection />
            <CommissionSection />
            <FeaturesSection />
            <CTASection />
          </>
        );
    }
  };

  return (
    <LandingLayout>
      <SEO
        title={t('partners.seo.title')}
        description={t('partners.seo.description')}
        keywords={t('partners.seo.keywords')}
      />
      
      {renderHero()}
      {renderContent()}
    </LandingLayout>
  );
}
