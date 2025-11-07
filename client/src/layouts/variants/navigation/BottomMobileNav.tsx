/**
 * Bottom Mobile Navigation
 * Mobile-app style bottom navigation - modern and accessible
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, BarChart3, Building2, Mail } from 'lucide-react';

export default function BottomMobileNav({ variant }: NavigationProps) {
  const { config } = useSiteConfig();
  const { language } = useLanguage();
  const [location] = useLocation();
  const { companyName } = config.branding.languageOverrides[language] || config.branding;

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Markets', href: '/markets', icon: BarChart3 },
    { label: 'Company', href: '/company', icon: Building2 },
    { label: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <>
      <div className="h-16 border-b bg-background">
        <div className="container mx-auto px-4 flex h-full items-center justify-center">
          <Link href="/" data-testid="link-home">
            <span className="text-lg font-bold">{companyName}</span>
          </Link>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href === '/' ? 'home' : item.href.slice(1)}`}>
                <div className={`flex flex-col items-center justify-center h-full gap-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="h-16" />
    </>
  );
}
