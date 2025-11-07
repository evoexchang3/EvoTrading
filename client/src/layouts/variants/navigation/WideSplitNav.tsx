/**
 * Wide Split Navigation
 * Logo centered, nav split left/right with CTA - institutional feel
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export default function WideSplitNav({ variant }: NavigationProps) {
  const { getBranding } = useSiteConfig();
  const { t, language } = useLanguage();
  const [location] = useLocation();

  const { companyName, supportEmail } = getBranding(language);

  const leftNavItems = [
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.markets'), href: '/markets' },
  ];

  const rightNavItems = [
    { label: t('nav.company'), href: '/company' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-8">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {leftNavItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>
                <span className={`text-sm font-medium transition-colors hover:text-primary ${location === item.href ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Centered Logo */}
          <Link href="/" data-testid="link-home">
            <span className="text-2xl font-bold">{companyName}</span>
          </Link>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {rightNavItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>
                <span className={`text-sm font-medium transition-colors hover:text-primary ${location === item.href ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/auth/register">
              <Button size="sm" data-testid="button-register">
                {t('nav.getStarted')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
