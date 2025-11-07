/**
 * Glassmorphic Navigation
 * Transparent floating header over hero - modern and elegant
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { Button } from '@/components/ui/button';

export default function GlassmorphicNav({ variant, companyName, supportEmail, language, t }: NavigationProps) {
  const [location] = useLocation();

  const navItems = [
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.markets'), href: '/markets' },
    { label: t('nav.company'), href: '/company' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/30 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <span className="text-xl font-bold text-white drop-shadow-lg">{companyName}</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>
                <span className={`text-sm font-medium hover:text-white transition-colors ${location === item.href ? 'text-white' : 'text-white/80'}`}>
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/auth/login">
              <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" data-testid="button-login">
                {t('nav.login')}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="bg-primary text-primary-foreground" data-testid="button-register">
                {t('nav.register')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
