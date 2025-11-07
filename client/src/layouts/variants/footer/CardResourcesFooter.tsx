/**
 * Card Resources Footer
 * Footer as resource cards grid - modern and engaging
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { VariantCard, CardHeader, CardTitle, CardContent } from '@/components/variant';
import { BookOpen, TrendingUp, HelpCircle, FileText } from 'lucide-react';

export default function CardResourcesFooter({ variant }: FooterProps) {
  const { config } = useSiteConfig();
  const { t, language } = useLanguage();
  const { companyName } = config.branding.languageOverrides[language] || config.branding;

  const resources = [
    {
      icon: BookOpen,
      title: 'Education',
      description: 'Learn trading strategies',
      href: '/customer/education',
      testId: 'footer-card-education',
    },
    {
      icon: TrendingUp,
      title: 'Markets',
      description: 'Explore trading instruments',
      href: '/markets',
      testId: 'footer-card-markets',
    },
    {
      icon: HelpCircle,
      title: 'Support',
      description: 'Get help 24/7',
      href: '/contact',
      testId: 'footer-card-support',
    },
    {
      icon: FileText,
      title: 'Legal',
      description: 'Terms & policies',
      href: '/legal/terms',
      testId: 'footer-card-legal',
    },
  ];

  return (
    <footer className="border-t bg-muted/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Link key={resource.href} href={resource.href}>
                <VariantCard className="h-full hover-elevate cursor-pointer" data-testid={resource.testId}>
                  <CardHeader>
                    <Icon className="w-8 h-8 mb-2 text-primary" />
                    <CardTitle className="text-base">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </CardContent>
                </VariantCard>
              </Link>
            );
          })}
        </div>

        <div className="pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
