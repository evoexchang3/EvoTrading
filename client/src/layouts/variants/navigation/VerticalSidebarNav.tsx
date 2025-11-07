/**
 * Vertical Sidebar Navigation
 * Left-side navigation - Bloomberg Terminal / Financial app style
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Home, BarChart3, Building2, Mail, LogIn } from 'lucide-react';

export default function VerticalSidebarNav({ variant }: NavigationProps) {
  const { config } = useSiteConfig();
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const { companyName } = config.branding.languageOverrides[language] || config.branding;

  const navItems = [
    { label: t('nav.home'), href: '/', icon: Home },
    { label: t('nav.markets'), href: '/markets', icon: BarChart3 },
    { label: t('nav.company'), href: '/company', icon: Building2 },
    { label: t('nav.contact'), href: '/contact', icon: Mail },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-background/95 backdrop-blur flex flex-col">
      <div className="p-6 border-b">
        <Link href="/" data-testid="link-home">
          <span className="text-xl font-bold">{companyName}</span>
        </Link>
      </div>
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href === '/' ? 'home' : item.href.slice(1)}`}>
                <div className={`flex items-center gap-3 px-3 py-2 rounded-md hover-elevate ${location === item.href ? 'bg-secondary' : ''}`}>
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="p-4 border-t space-y-2">
        <Link href="/auth/login">
          <Button variant="outline" size="sm" className="w-full" data-testid="button-login">
            <LogIn className="w-4 h-4 mr-2" />
            {t('nav.login')}
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button size="sm" className="w-full" data-testid="button-register">{t('nav.register')}</Button>
        </Link>
      </div>
    </aside>
  );
}
