import { LandingLayout } from "@/components/LandingLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, DollarSign, TrendingUp, Award, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { 
  VariantSection, 
  VariantContainer, 
  VariantHeading, 
  VariantText, 
  VariantCard, 
  VariantGrid,
  VariantPageHeader,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/variant";
import { useVariantClasses } from "@/layouts/shared/useVariant";

export default function PartnersPage() {
  const { t } = useLanguage();
  const classes = useVariantClasses();

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
      <VariantPageHeader
        title={t('partners.hero.title')}
        subtitle={t('partners.hero.subtitle')}
        titleTestId="text-partners-title"
      />

      {/* Benefits Section */}
      <VariantSection animation="page">
        <VariantContainer>
          <div className={`text-center ${classes.spacing('element')}`}>
            <VariantHeading level="heading" data-testid="text-benefits-title">
              {t('partners.benefits.title')}
            </VariantHeading>
            <VariantText className="text-muted-foreground max-w-2xl mx-auto">
              {t('partners.benefits.subtitle')}
            </VariantText>
          </div>

          <VariantGrid>
            {benefits.map((benefit, index) => (
              <VariantCard key={index} data-testid={`card-benefit-${index}`}>
                <CardHeader>
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-lg bg-primary/10">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className={classes.textSize('heading')}>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={classes.textSize('body')}>{benefit.description}</CardDescription>
                </CardContent>
              </VariantCard>
            ))}
          </VariantGrid>
        </VariantContainer>
      </VariantSection>

      {/* Commission Structure */}
      <VariantSection background="muted">
        <VariantContainer>
          <div className="max-w-4xl mx-auto">
            <div className={`text-center ${classes.spacing('element')}`}>
              <VariantHeading level="heading" data-testid="text-commission-title">
                {t('partners.commission.title')}
              </VariantHeading>
              <VariantText className="text-muted-foreground">
                {t('partners.commission.subtitle')}
              </VariantText>
            </div>

            <VariantGrid>
              <VariantCard>
                <CardHeader className="text-center space-y-4">
                  <CardTitle className={classes.textSize('heading')}>{t('partners.commission.starter.title')}</CardTitle>
                  <div>
                    <p className="text-4xl font-bold text-primary">{t('partners.commission.starter.percentage')}</p>
                    <p className={`${classes.textSize('body')} text-muted-foreground mt-2`}>{t('partners.commission.starter.label')}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className={`${classes.textSize('body')} text-muted-foreground`}>
                    {t('partners.commission.starter.description')}
                  </p>
                </CardContent>
              </VariantCard>

              <VariantCard className="border-primary">
                <CardHeader className="text-center space-y-4">
                  <CardTitle className={classes.textSize('heading')}>{t('partners.commission.professional.title')}</CardTitle>
                  <div>
                    <p className="text-4xl font-bold text-primary">{t('partners.commission.professional.percentage')}</p>
                    <p className={`${classes.textSize('body')} text-muted-foreground mt-2`}>{t('partners.commission.professional.label')}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className={`${classes.textSize('body')} text-muted-foreground`}>
                    {t('partners.commission.professional.description')}
                  </p>
                </CardContent>
              </VariantCard>

              <VariantCard>
                <CardHeader className="text-center space-y-4">
                  <CardTitle className={classes.textSize('heading')}>{t('partners.commission.elite.title')}</CardTitle>
                  <div>
                    <p className="text-4xl font-bold text-primary">{t('partners.commission.elite.percentage')}</p>
                    <p className={`${classes.textSize('body')} text-muted-foreground mt-2`}>{t('partners.commission.elite.label')}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className={`${classes.textSize('body')} text-muted-foreground`}>
                    {t('partners.commission.elite.description')}
                  </p>
                </CardContent>
              </VariantCard>
            </VariantGrid>
          </div>
        </VariantContainer>
      </VariantSection>

      {/* Program Features */}
      <VariantSection>
        <VariantContainer>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <VariantHeading level="heading" className="mb-6" data-testid="text-features-title">
                {t('partners.features.title')}
              </VariantHeading>
              <VariantText className="text-muted-foreground mb-8">
                {t('partners.features.subtitle')}
              </VariantText>
              <ul className="space-y-4">
                {programFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`feature-${index}`}>
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className={`${classes.textSize('body')} text-muted-foreground`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <VariantCard className="bg-primary text-primary-foreground">
              <CardHeader className="space-y-4">
                <CardTitle className={classes.textSize('heading')}>{t('partners.howItWorks.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 flex-shrink-0">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('partners.howItWorks.signUp.title')}</h3>
                      <p className={`${classes.textSize('body')} opacity-90`}>{t('partners.howItWorks.signUp.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 flex-shrink-0">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('partners.howItWorks.promote.title')}</h3>
                      <p className={`${classes.textSize('body')} opacity-90`}>{t('partners.howItWorks.promote.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 flex-shrink-0">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('partners.howItWorks.earn.title')}</h3>
                      <p className={`${classes.textSize('body')} opacity-90`}>{t('partners.howItWorks.earn.description')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </VariantCard>
          </div>
        </VariantContainer>
      </VariantSection>

      {/* CTA Section */}
      <VariantSection background="muted">
        <VariantContainer>
          <div className={`max-w-3xl mx-auto text-center ${classes.spacing('element')}`}>
            <VariantHeading level="heading" data-testid="text-cta-title">
              {t('partners.cta.title')}
            </VariantHeading>
            <VariantText className="text-muted-foreground">
              {t('partners.cta.subtitle')}
            </VariantText>
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
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
