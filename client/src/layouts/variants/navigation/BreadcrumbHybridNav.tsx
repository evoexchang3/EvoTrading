/**
 * Breadcrumb Hybrid Navigation
 * Top nav + breadcrumb secondary nav - informative and hierarchical
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function BreadcrumbHybridNav({ variant, companyName, supportEmail, language, t }: NavigationProps) {
  const [location] = useLocation();

  const navItems = [
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.markets'), href: '/markets' },
    { label: t('nav.company'), href: '/company' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const breadcrumbs = location.split('/').filter(Boolean);

  return (
    <div className="sticky top-0 z-50 bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <span className="text-lg font-bold">{companyName}</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>
                <Button variant={location === item.href ? 'secondary' : 'ghost'} size="sm">
                  {item.label}
                </Button>
              </Link>
            ))}
            <Link href="/auth/login">
              <Button size="sm" variant="outline" data-testid="button-login">
                {t('nav.login')}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" data-testid="button-register">{t('nav.register')}</Button>
            </Link>
          </div>
        </div>
      </nav>

      {breadcrumbs.length > 0 && (
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-2 flex items-center gap-2 text-sm">
            <Link href="/" data-testid="link-breadcrumb-home">
              <span className="text-muted-foreground hover:text-foreground">{t('nav.home')}</span>
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                <span className="capitalize">{crumb}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
