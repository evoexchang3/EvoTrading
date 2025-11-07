/**
 * Centered Double Row Navigation
 * Logo top row centered, nav below - modern and clean
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { Button } from '@/components/ui/button';

export default function CenteredDoubleNav({ variant, companyName, supportEmail, language, t }: NavigationProps) {
  const [location] = useLocation();

  const navItems = [
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.markets'), href: '/markets' },
    { label: t('nav.company'), href: '/company' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center gap-4">
          <Link href="/" data-testid="link-home">
            <span className="text-2xl font-bold">{companyName}</span>
          </Link>
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>
                <span className={`text-sm font-medium hover:text-primary ${location === item.href ? 'text-primary' : ''}`}>
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/login">
              <Button size="sm" variant="outline" data-testid="button-login">{t('nav.login')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
