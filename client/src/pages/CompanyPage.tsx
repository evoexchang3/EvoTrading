import { Link } from "wouter";
import { LandingLayout } from "@/components/LandingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Building2,
  Shield,
  Award,
  Users,
  Globe,
  FileText,
  Lock,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function CompanyPage() {
  const { t } = useLanguage();

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

  const stats = [
    { label: t('company.stats.years'), value: '15+', icon: Award },
    { label: t('company.stats.clients'), value: '50K+', icon: Users },
    { label: t('company.stats.countries'), value: '120+', icon: Globe },
    { label: t('company.stats.volume'), value: '$2B+', icon: TrendingUp },
  ];

  const values = [
    {
      title: t('company.values.transparency.title'),
      description: t('company.values.transparency.description'),
      icon: FileText,
    },
    {
      title: t('company.values.security.title'),
      description: t('company.values.security.description'),
      icon: Shield,
    },
    {
      title: t('company.values.innovation.title'),
      description: t('company.values.innovation.description'),
      icon: Award,
    },
  ];

  return (
    <LandingLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4" variant="secondary" data-testid="badge-company">
                {t('company.hero.badge')}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="heading-hero">
                {t('company.hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-description">
                {t('company.hero.subtitle')}
              </p>
              <Link href="/about">
                <Button size="lg" data-testid="button-learn-more">
                  {t('company.hero.cta')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y bg-muted/10" aria-label="Company statistics">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
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

        {/* Company Information Links */}
        <section className="py-16" aria-label="Company information">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-info">
                {t('company.info.title')}
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-info-description">
                {t('company.info.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyLinks.map((item) => {
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

        {/* Our Values */}
        <section className="py-16 bg-muted/20" aria-label="Company values">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-values">
                {t('company.values.title')}
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-values-description">
                {t('company.values.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => {
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

        {/* CTA Section */}
        <section className="py-16" aria-label="Contact us call to action">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Building2 className="w-16 h-16 mx-auto mb-6 text-primary" aria-hidden="true" />
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-cta">
                {t('company.cta.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-description">
                {t('company.cta.subtitle')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" data-testid="button-contact">
                    {t('company.cta.button')}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" data-testid="button-about">
                    {t('company.cta.about')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
