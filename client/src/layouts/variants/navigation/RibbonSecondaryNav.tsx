/**
 * Ribbon Secondary Navigation
 * Two-tier nav with category ribbons - organized and structured
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export default function RibbonSecondaryNav({ variant }: NavigationProps) {
  const { config } = useSiteConfig();
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const { companyName } = config.branding.languageOverrides[language] || config.branding;

  const primaryNav = [
    { label: t('nav.markets'), href: '/markets' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.company'), href: '/company' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const secondaryNav = [
    { label: 'Forex', href: '/markets#forex' },
    { label: 'Crypto', href: '/markets#crypto' },
    { label: 'Commodities', href: '/markets#commodities' },
  ];

  return (
    <div className="sticky top-0 z-50 bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <span className="text-xl font-bold">{companyName}</span>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>
                <Button variant={location === item.href ? 'secondary' : 'ghost'} size="sm">
                  {item.label}
                </Button>
              </Link>
            ))}
            <Link href="/auth/register">
              <Button size="sm" data-testid="button-register">{t('nav.register')}</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="bg-muted/40 border-b">
        <div className="container mx-auto px-4 flex h-10 items-center gap-4 overflow-x-auto">
          {secondaryNav.map((item) => (
            <Link key={item.href} href={item.href} data-testid={`link-secondary-${item.label.toLowerCase()}`}>
              <span className="text-xs font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
