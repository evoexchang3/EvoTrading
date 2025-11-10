import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVariant } from "@/layouts/shared/useVariant";
import { HeroRenderer } from "@/components/variant-rendering";
import { VariantPageHeader } from "@/components/variant";

import { MissionSection } from "@/components/company/sections/MissionSection";
import { TimelineSection } from "@/components/company/sections/TimelineSection";
import { TeamSection } from "@/components/company/sections/TeamSection";
import { ValuesShowcaseSection } from "@/components/company/sections/ValuesShowcaseSection";
import { ResourceLinksSection } from "@/components/company/sections/ResourceLinksSection";
import { StatsSection } from "@/components/company/sections/StatsSection";
import { CompanyCTASection } from "@/components/company/sections/CompanyCTASection";

export default function CompanyPage() {
  const { t } = useLanguage();
  const { getPageContent } = useVariantContent();
  const companyContent = getPageContent('company');

  if (!companyContent) {
    return null;
  }

  const companyLinks = [
    {
      title: t('company.links.regulatory.title'),
      description: t('company.links.regulatory.description'),
      href: '/company/regulatory',
      icon: Shield,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-950',
    },
    {
      title: t('company.links.safety.title'),
      description: t('company.links.safety.description'),
      href: '/company/safety-of-funds',
      icon: Lock,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-950',
    },
    {
      title: t('company.links.rates.title'),
      description: t('company.links.rates.description'),
      href: '/company/rates',
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-950',
    },
    {
      title: t('company.links.security.title'),
      description: t('company.links.security.description'),
      href: '/company/security',
      icon: AlertCircle,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-950',
    },
    {
      title: t('company.links.status.title'),
      description: t('company.links.status.description'),
      href: '/company/platform-status',
      icon: CheckCircle,
      color: 'text-teal-600 dark:text-teal-400',
      bgColor: 'bg-teal-100 dark:bg-teal-950',
    },
    {
      title: t('company.links.complaints.title'),
      description: t('company.links.complaints.description'),
      href: '/company/complaints',
      icon: FileText,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-950',
    },
  ];

  const stats = companyContent.stats ? [
    { label: t('company.stats.years'), value: companyContent.stats.years, icon: Award },
    { label: t('company.stats.clients'), value: companyContent.stats.clients, icon: Users },
    { label: t('company.stats.countries'), value: companyContent.stats.countries, icon: Globe },
    { label: t('company.stats.volume'), value: companyContent.stats.volume, icon: TrendingUp },
  ] : [];

  const valueIcons = [FileText, Shield, Award];
  const values = companyContent.values?.items?.map((item: {title: string; description: string}, index: number) => ({
    ...item,
    icon: valueIcons[index % valueIcons.length],
  })) || [];

  return (
    <LandingLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        {companyContent.hero && (
          <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                {companyContent.hero.badge && (
                  <Badge className="mb-4" variant="secondary" data-testid="badge-company">
                    {companyContent.hero.badge}
                  </Badge>
                )}
                <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="heading-hero">
                  {companyContent.hero.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-description">
                  {companyContent.hero.subtitle}
                </p>
                <Link href="/about">
                  <Button size="lg" data-testid="button-learn-more">
                    {companyContent.hero.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        {companyContent.stats && stats.length > 0 && (
          <section className="py-12 border-y bg-muted/10" aria-label="Company statistics">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat: {label: string; value: string; icon: any}, index: number) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center" data-testid={`stat-${index}`}>
                      <Icon className="w-8 h-8 mx-auto mb-2 text-primary" aria-hidden="true" />
                      <div className="text-3xl font-bold mb-1" data-testid={`stat-value-${index}`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid={`stat-label-${index}`}>
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Company Information Links */}
        {companyContent.info && (
          <section className="py-16" aria-label="Company information">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4" data-testid="heading-info">
                  {companyContent.info.title}
                </h2>
                <p className="text-lg text-muted-foreground" data-testid="text-info-description">
                  {companyContent.info.subtitle}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companyLinks.map((item: {title: string; description: string; href: string; icon: any; color: string; bgColor: string}) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href}>
                      <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-${item.href.split('/').pop()}`}>
                        <CardHeader>
                          <div className={`p-3 rounded-lg ${item.bgColor} w-fit mb-3`}>
                            <Icon className={`w-6 h-6 ${item.color}`} aria-hidden="true" />
                          </div>
                          <CardTitle data-testid={`heading-${item.href.split('/').pop()}`}>
                            {item.title}
                          </CardTitle>
                          <CardDescription data-testid={`text-${item.href.split('/').pop()}-description`}>
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center text-sm text-primary">
                            {t('company.learnMore')}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Our Values */}
        {companyContent.values && (
          <section className="py-16 bg-muted/20" aria-label="Company values">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4" data-testid="heading-values">
                  {companyContent.values.title}
                </h2>
                <p className="text-lg text-muted-foreground" data-testid="text-values-description">
                  {companyContent.values.subtitle}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {values.map((value: {title: string; description: string; icon: any}, index: number) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="text-center" data-testid={`value-${index}`}>
                      <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2" data-testid={`heading-value-${index}`}>
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`text-value-${index}-description`}>
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        {companyContent.cta && (
          <section className="py-16" aria-label="Contact us">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Building2 className="w-16 h-16 mx-auto mb-6 text-primary" aria-hidden="true" />
                <h2 className="text-3xl font-bold mb-4" data-testid="heading-cta">
                  {companyContent.cta.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-description">
                  {companyContent.cta.subtitle}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/contact">
                    <Button size="lg" data-testid="button-contact">
                      {companyContent.cta.button}
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" data-testid="button-about">
                      {companyContent.cta.about}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </LandingLayout>
  );
}
