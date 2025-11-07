/**
 * Minimal Text Navigation
 * Clean text links, no borders/backgrounds - zen aesthetic
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MinimalTextNav({ variant }: NavigationProps) {
  const { config } = useSiteConfig();
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const { companyName } = config.branding.languageOverrides[language] || config.branding;

  const navItems = [
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.markets'), href: '/markets' },
    { label: t('nav.company'), href: '/company' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" data-testid="link-home">
            <span className="text-2xl font-light tracking-wide">{companyName}</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>
                <span className={`text-sm tracking-wide transition-opacity ${location === item.href ? 'opacity-100 underline decoration-2 underline-offset-4' : 'opacity-60 hover:opacity-100'}`}>
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/auth/login" data-testid="button-login">
              <span className="text-sm tracking-wide opacity-60 hover:opacity-100 transition-opacity">{t('nav.login')}</span>
            </Link>
            <Link href="/auth/register" data-testid="button-register">
              <span className="text-sm tracking-wide underline decoration-2 underline-offset-4">{t('nav.register')}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
