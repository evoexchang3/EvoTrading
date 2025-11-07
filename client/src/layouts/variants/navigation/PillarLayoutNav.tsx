/**
 * Pillar Layout Navigation
 * Vertical pillars with grouped nav sections - structured and premium
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { Button } from '@/components/ui/button';
import { Building2, TrendingUp, Mail } from 'lucide-react';

export default function PillarLayoutNav({ variant, companyName, supportEmail, language, t }: NavigationProps) {
  const [location] = useLocation();

  const navPillars = [
    {
      icon: TrendingUp,
      title: 'Trading',
      items: [
        { label: t('nav.markets'), href: '/markets' },
        { label: 'Platform', href: '/markets#platform' },
      ],
    },
    {
      icon: Building2,
      title: 'Company',
      items: [
        { label: t('nav.about'), href: '/about' },
        { label: t('nav.company'), href: '/company' },
      ],
    },
    {
      icon: Mail,
      title: 'Support',
      items: [{ label: t('nav.contact'), href: '/contact' }],
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-start justify-between gap-8">
          <Link href="/" data-testid="link-home">
            <span className="text-xl font-bold">{companyName}</span>
          </Link>

          <div className="hidden lg:flex gap-12 flex-1 justify-center">
            {navPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <Icon className="w-4 h-4" />
                    {pillar.title}
                  </div>
                  <div className="space-y-1">
                    {pillar.items.map((item) => (
                      <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.split('/')[1] || 'home'}`}>
                        <div className={`text-sm ${location === item.href ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>
                          {item.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
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
