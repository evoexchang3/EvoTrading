import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, TrendingUp, AlertCircle, CheckCircle, FileText, ArrowRight } from "lucide-react";

export function ResourceLinksSection() {
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

  return (
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
  );
}
