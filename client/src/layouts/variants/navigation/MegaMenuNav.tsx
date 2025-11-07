/**
 * Mega Menu Navigation
 * Hover categories with full-width panels - feature-rich
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function MegaMenuNav({ variant }: NavigationProps) {
  const { config } = useSiteConfig();
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { companyName } = config.branding.languageOverrides[language] || config.branding;

  const menuItems = [
    {
      label: t('nav.markets'),
      href: '/markets',
      subItems: [
        { label: 'Forex', href: '/markets#forex' },
        { label: 'Crypto', href: '/markets#crypto' },
        { label: 'Commodities', href: '/markets#commodities' },
      ],
    },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.company'), href: '/company' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <span className="text-xl font-bold">{companyName}</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <div
                key={item.href}
                onMouseEnter={() => item.subItems && setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
                className="relative"
              >
                <Link href={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>
                  <Button
                    variant={location === item.href ? 'secondary' : 'ghost'}
                    size="sm"
                    className="gap-1"
                  >
                    {item.label}
                    {item.subItems && <ChevronDown className="w-3 h-3" />}
                  </Button>
                </Link>

                {item.subItems && activeMenu === item.label && (
                  <div className="absolute top-full left-0 mt-1 bg-background border rounded-lg shadow-lg p-4 w-48">
                    {item.subItems.map((subItem) => (
                      <Link key={subItem.href} href={subItem.href} data-testid={`link-submenu-${subItem.label.toLowerCase()}`}>
                        <div className="px-3 py-2 text-sm hover-elevate rounded-md">{subItem.label}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/auth/login">
              <Button size="sm" variant="outline" data-testid="button-login">{t('nav.login')}</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" data-testid="button-register">{t('nav.register')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
