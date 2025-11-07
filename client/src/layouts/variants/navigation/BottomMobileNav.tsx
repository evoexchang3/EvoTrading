/**
 * Bottom Mobile Navigation
 * Mobile-app style bottom navigation - modern and accessible
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { Home, BarChart3, Building2, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BottomMobileNav({ variant, companyName, supportEmail, language, t }: NavigationProps) {
  const [location] = useLocation();

  const navItems = [
    { label: t('nav.home'), href: '/', icon: Home },
    { label: t('nav.markets'), href: '/markets', icon: BarChart3 },
    { label: t('nav.company'), href: '/company', icon: Building2 },
    { label: t('nav.contact'), href: '/contact', icon: Mail },
    { label: t('nav.account'), href: '/auth/login', icon: User },
  ];

  return (
    <>
      <div className="h-16 border-b bg-background">
        <div className="container mx-auto px-4 flex h-full items-center justify-between">
          <Link href="/" data-testid="link-home">
            <span className="text-lg font-bold">{companyName}</span>
          </Link>
          <div className="flex gap-2">
            <Link href="/auth/login">
              <Button size="sm" variant="ghost" data-testid="button-login">
                {t('nav.login')}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" data-testid="button-register">
                {t('nav.register')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur">
        <div className="grid grid-cols-5 h-16">
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
