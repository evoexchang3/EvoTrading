import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariant, useVariantClasses } from "@/layouts/shared/useVariant";
import { CheckCircle2 } from "lucide-react";

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
  const classes = useVariantClasses();

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
    t('home.benefits.infrastructure'),
    t('home.benefits.multiLanguage'),
    t('home.benefits.support'),
    t('home.benefits.education'),
    t('home.benefits.platforms'),
    t('home.benefits.security'),
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

      {/* Why Choose Us Section */}
      <section className={classes.spacing('section')}>
        <div className={classes.container}>
          <div className={`grid gap-12 lg:grid-cols-2 items-center ${classes.animation('page')}`}>
            <div>
              <h2 className={`${classes.textSize('heading')} font-bold mb-6`} data-testid="text-benefits-title">
                {t('home.benefits.title')}
              </h2>
              <p className={`${classes.textSize('body')} text-muted-foreground mb-8`}>
                {t('home.benefits.subtitle')}
              </p>
              <ul className={classes.spacing('element')}>
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`benefit-${index}`}>
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className={`${classes.card} ${classes.hover('card')}`}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-4xl font-bold text-primary">50+</CardTitle>
                  <CardDescription>{t('home.stats.currencyPairs')}</CardDescription>
                </CardHeader>
              </Card>
              <Card className={`${classes.card} ${classes.hover('card')}`}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-4xl font-bold text-primary">100+</CardTitle>
                  <CardDescription>{t('home.stats.cryptoAssets')}</CardDescription>
                </CardHeader>
              </Card>
              <Card className={`${classes.card} ${classes.hover('card')}`}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-4xl font-bold text-primary">24/7</CardTitle>
                  <CardDescription>{t('home.stats.customerSupport')}</CardDescription>
                </CardHeader>
              </Card>
              <Card className={`${classes.card} ${classes.hover('card')}`}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-4xl font-bold text-primary">0.01s</CardTitle>
                  <CardDescription>{t('home.stats.avgExecutionTime')}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${classes.spacing('section')} bg-primary text-primary-foreground`}>
        <div className={`${classes.container} text-center`}>
          <h2 className={`${classes.textSize('heading')} font-bold mb-4`} data-testid="text-cta-title">
            {t('home.cta.title')}
          </h2>
          <p className={`${classes.textSize('body')} mb-8 opacity-90 max-w-2xl mx-auto`}>
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="secondary" data-testid="button-cta-register">
                {t('home.cta.button')}
              </Button>
            </Link>
            <Link href="/education">
              <Button size="lg" variant="outline" className="border-primary-foreground/20 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground" data-testid="button-cta-learn">
                {t('home.cta.learnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
