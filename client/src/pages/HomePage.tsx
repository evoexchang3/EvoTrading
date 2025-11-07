import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariant } from "@/layouts/shared/useVariant";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedCounter } from "@/components/home/AnimatedCounter";
import { CheckCircle2, TrendingUp, Users, Award, ArrowRight } from "lucide-react";
import {
  VariantSection,
  VariantContainer,
  VariantHeading,
  VariantText,
  VariantCard,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/variant";

// Hero components
import { HeroFullWidth } from "@/components/home/HeroFullWidth";
import { HeroCentered } from "@/components/home/HeroCentered";
import { HeroSplit } from "@/components/home/HeroSplit";
import { HeroMinimal } from "@/components/home/HeroMinimal";

// Features components
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { FeaturesList } from "@/components/home/FeaturesList";

export default function HomePage() {
  const { t } = useLanguage();
  const variant = useVariant();
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.3 });

  // Select appropriate components based on variant configuration
  const HeroComponent = () => {
    switch (variant.content.heroLayout) {
      case 'full-width':
        return <HeroFullWidth />;
      case 'centered':
        return <HeroCentered />;
      case 'split':
        return <HeroSplit />;
      case 'minimal':
        return <HeroMinimal />;
      default:
        return <HeroCentered />;
    }
  };

  const FeaturesComponent = () => {
    switch (variant.content.featureLayout) {
      case 'list':
        return <FeaturesList />;
      case 'grid':
      default:
        return <FeaturesGrid />;
    }
  };

  const benefits = [
    { text: t('home.benefits.infrastructure'), icon: CheckCircle2 },
    { text: t('home.benefits.multiLanguage'), icon: CheckCircle2 },
    { text: t('home.benefits.support'), icon: CheckCircle2 },
    { text: t('home.benefits.education'), icon: CheckCircle2 },
    { text: t('home.benefits.platforms'), icon: CheckCircle2 },
    { text: t('home.benefits.security'), icon: CheckCircle2 },
  ];

  const stats = [
    { value: 50, suffix: '+', label: t('home.stats.currencyPairs'), icon: TrendingUp, color: 'text-blue-500' },
    { value: 100, suffix: '+', label: t('home.stats.cryptoAssets'), icon: TrendingUp, color: 'text-purple-500' },
    { value: 24, suffix: '/7', label: t('home.stats.customerSupport'), icon: Users, color: 'text-green-500' },
    { value: 0.01, suffix: 's', label: t('home.stats.avgExecutionTime'), decimals: 2, icon: Award, color: 'text-yellow-500' },
  ];

  return (
    <LandingLayout>
      <SEO
        title={t('home.hero.title')}
        description={t('home.hero.subtitle')}
        keywords="forex trading, crypto trading, commodities trading, online trading platform, regulated broker"
        ogTitle="Trading Platform - Professional Forex, Crypto & Commodities Trading"
        ogDescription={t('home.hero.subtitle')}
      />
      
      {/* Variant-aware Hero Section */}
      <HeroComponent />

      {/* Variant-aware Features Section */}
      <FeaturesComponent />

      {/* Why Choose Us Section - Modernized */}
      <VariantSection animation="page">
        <VariantContainer>
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center" ref={benefitsRef}>
            <div className={benefitsVisible ? 'animate-fade-in-up' : 'opacity-0'}>
              <VariantHeading level="heading" className="mb-4 sm:mb-6" data-testid="text-benefits-title">
                {t('home.benefits.title')}
              </VariantHeading>
              <VariantText className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                {t('home.benefits.subtitle')}
              </VariantText>
              <ul className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <li 
                    key={index} 
                    className={`flex items-start gap-2 sm:gap-3 ${benefitsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${100 + index * 75}ms` }}
                    data-testid={`benefit-${index}`}
                  >
                    <div className="p-1 rounded-full bg-primary/10 mt-0.5">
                      <benefit.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                    </div>
                    <span className="text-sm sm:text-base text-muted-foreground">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-3 sm:gap-4 grid-cols-2" ref={statsRef}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={statsVisible ? 'animate-fade-in-up' : 'opacity-0'}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <VariantCard className="group hover:border-primary/50 transition-all duration-300 h-full">
                    <CardHeader className="space-y-1 p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color} opacity-80 group-hover:scale-110 transition-transform`} />
                      </div>
                      <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                        {statsVisible ? (
                          <AnimatedCounter 
                            end={stat.value} 
                            suffix={stat.suffix} 
                            decimals={stat.decimals || 0}
                            duration={2000}
                          />
                        ) : (
                          `${stat.value}${stat.suffix}`
                        )}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">{stat.label}</CardDescription>
                    </CardHeader>
                  </VariantCard>
                </div>
              ))}
            </div>
          </div>
        </VariantContainer>
      </VariantSection>

      {/* CTA Section - Modernized with gradient */}
      <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80"></div>
        
        {/* Animated orbs - responsive positioning */}
        <div className="absolute -top-20 -right-20 sm:top-0 sm:right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-foreground/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 sm:bottom-0 sm:left-0 w-48 h-48 sm:w-72 sm:h-72 bg-primary-foreground/5 rounded-full blur-3xl"></div>
        
        <VariantContainer className="text-center relative z-10">
          <VariantHeading level="heading" className="mb-3 sm:mb-4 text-primary-foreground animate-fade-in-up" data-testid="text-cta-title">
            {t('home.cta.title')}
          </VariantHeading>
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <VariantText className="mb-6 sm:mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              {t('home.cta.subtitle')}
            </VariantText>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="group shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto" data-testid="button-cta-register">
                {t('home.cta.button')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/education" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/30 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm w-full sm:w-auto" 
                data-testid="button-cta-learn"
              >
                {t('home.cta.learnMore')}
              </Button>
            </Link>
          </div>
        </VariantContainer>
      </section>
    </LandingLayout>
  );
}
