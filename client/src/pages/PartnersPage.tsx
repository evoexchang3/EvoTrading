import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, DollarSign, TrendingUp, Award, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";

export default function PartnersPage() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: DollarSign,
      title: t('partners.benefits.competitiveCommissions.title'),
      description: t('partners.benefits.competitiveCommissions.description'),
    },
    {
      icon: TrendingUp,
      title: t('partners.benefits.recurringIncome.title'),
      description: t('partners.benefits.recurringIncome.description'),
    },
    {
      icon: Award,
      title: t('partners.benefits.marketingSupport.title'),
      description: t('partners.benefits.marketingSupport.description'),
    },
    {
      icon: Users,
      title: t('partners.benefits.dedicatedManager.title'),
      description: t('partners.benefits.dedicatedManager.description'),
    },
  ];

  const programFeatures = [
    t('partners.features.realTimeTracking'),
    t('partners.features.multiplePayments'),
    t('partners.features.noMinimum'),
    t('partners.features.subAffiliate'),
    t('partners.features.customPages'),
    t('partners.features.regularPromotions'),
  ];

  return (
    <LandingLayout>
      <SEO
        title={t('partners.seo.title')}
        description={t('partners.seo.description')}
        keywords={t('partners.seo.keywords')}
      />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-partners-title">
              {t('partners.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('partners.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-benefits-title">
              {t('partners.benefits.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('partners.benefits.subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover-elevate transition-all" data-testid={`card-benefit-${index}`}>
                <CardHeader>
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-lg bg-primary/10">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-commission-title">
                {t('partners.commission.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('partners.commission.subtitle')}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover-elevate transition-all">
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-lg">{t('partners.commission.starter.title')}</CardTitle>
                  <div>
                    <p className="text-4xl font-bold text-primary">{t('partners.commission.starter.percentage')}</p>
                    <p className="text-sm text-muted-foreground mt-2">{t('partners.commission.starter.label')}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {t('partners.commission.starter.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all border-primary">
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-lg">{t('partners.commission.professional.title')}</CardTitle>
                  <div>
                    <p className="text-4xl font-bold text-primary">{t('partners.commission.professional.percentage')}</p>
                    <p className="text-sm text-muted-foreground mt-2">{t('partners.commission.professional.label')}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {t('partners.commission.professional.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all">
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-lg">{t('partners.commission.elite.title')}</CardTitle>
                  <div>
                    <p className="text-4xl font-bold text-primary">{t('partners.commission.elite.percentage')}</p>
                    <p className="text-sm text-muted-foreground mt-2">{t('partners.commission.elite.label')}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {t('partners.commission.elite.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-features-title">
                {t('partners.features.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('partners.features.subtitle')}
              </p>
              <ul className="space-y-4">
                {programFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`feature-${index}`}>
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="hover-elevate transition-all bg-primary text-primary-foreground">
              <CardHeader className="space-y-4">
                <CardTitle className="text-2xl">{t('partners.howItWorks.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 flex-shrink-0">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('partners.howItWorks.signUp.title')}</h3>
                      <p className="text-sm opacity-90">{t('partners.howItWorks.signUp.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 flex-shrink-0">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('partners.howItWorks.promote.title')}</h3>
                      <p className="text-sm opacity-90">{t('partners.howItWorks.promote.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 flex-shrink-0">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('partners.howItWorks.earn.title')}</h3>
                      <p className="text-sm opacity-90">{t('partners.howItWorks.earn.description')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold" data-testid="text-cta-title">
              {t('partners.cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('partners.cta.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" data-testid="button-apply-now">
                  {t('partners.cta.applyButton')}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" data-testid="button-learn-more">
                  {t('partners.cta.learnMoreButton')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
