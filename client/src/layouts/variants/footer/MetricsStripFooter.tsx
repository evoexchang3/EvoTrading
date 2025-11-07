/**
 * Metrics Strip Footer
 * Company stats/metrics with minimal links - data-focused
 */

import { Link } from 'wouter';
import { FooterProps } from './index';
import { Users, Globe, TrendingUp, Award } from 'lucide-react';

export default function MetricsStripFooter({ variant, companyName, supportEmail, language, t }: FooterProps) {

  const metrics = [
    { icon: Users, label: t('footer.activeTraders'), value: '50,000+' },
    { icon: Globe, label: t('footer.countries'), value: '150+' },
    { icon: TrendingUp, label: t('footer.dailyVolume'), value: '$2B+' },
    { icon: Award, label: t('footer.yearsExperience'), value: '10+' },
  ];

  const links = [
    { label: t('footer.privacyPolicy'), href: '/legal/privacy' },
    { label: t('footer.termsOfService'), href: '/legal/terms' },
  ];

  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="text-center">
                <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Minimal Footer */}
        <div className="pt-6 border-t text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`footer-link-${link.href.split('/').pop()}`}>
                <span className="hover:text-foreground">{link.label}</span>
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} {companyName}</p>
        </div>
      </div>
    </footer>
  );
}
