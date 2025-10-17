import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { 
  TrendingUp, 
  Shield, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Lock,
  Zap,
  Globe2,
  CheckCircle2
} from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t('home.features.fastExecution.title'),
      description: t('home.features.fastExecution.description'),
    },
    {
      icon: Shield,
      title: t('home.features.secure.title'),
      description: t('home.features.secure.description'),
    },
    {
      icon: Clock,
      title: t('home.features.24/7Trading.title'),
      description: t('home.features.24/7Trading.description'),
    },
    {
      icon: DollarSign,
      title: t('home.features.transparentFees.title'),
      description: t('home.features.transparentFees.description'),
    },
    {
      icon: BarChart3,
      title: t('home.features.advancedTools.title'),
      description: t('home.features.advancedTools.description'),
    },
    {
      icon: Globe2,
      title: t('home.features.globalMarkets.title'),
      description: t('home.features.globalMarkets.description'),
    },
  ];

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
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
        
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight" data-testid="text-hero-title">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="text-base" data-testid="button-hero-register">
                  {t('home.hero.registerButton')}
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-base" data-testid="button-hero-login">
                  {t('home.hero.loginButton')}
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-500" />
                <span>{t('home.hero.sslSecured')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>{t('home.hero.regulated')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{t('home.hero.compliant')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-features-title">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="hover-elevate transition-all" data-testid={`card-feature-${index}`}>
                <CardHeader>
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-benefits-title">
                {t('home.benefits.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('home.benefits.subtitle')}
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`benefit-${index}`}>
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="hover-elevate transition-all">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-4xl font-bold text-primary">50+</CardTitle>
                  <CardDescription>{t('home.stats.currencyPairs')}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-elevate transition-all">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-4xl font-bold text-primary">100+</CardTitle>
                  <CardDescription>{t('home.stats.cryptoAssets')}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-elevate transition-all">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-4xl font-bold text-primary">24/7</CardTitle>
                  <CardDescription>{t('home.stats.customerSupport')}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-elevate transition-all">
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
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-base" data-testid="button-cta-register">
                {t('home.cta.button')}
              </Button>
            </Link>
            <Link href="/education">
              <Button size="lg" variant="outline" className="text-base border-primary-foreground/20 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground" data-testid="button-cta-learn">
                {t('home.cta.learnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
