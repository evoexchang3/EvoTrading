/**
 * Hero Overlay Navigation
 * Transparent nav that overlays hero image - dramatic and premium
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { Button } from '@/components/ui/button';

export default function HeroOverlayNav({ variant, companyName, supportEmail, language, t }: NavigationProps) {
  const [location] = useLocation();

  const navItems = [
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.markets'), href: '/markets' },
    { label: t('nav.company'), href: '/company' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <span className="text-2xl font-bold text-white drop-shadow-2xl">{companyName}</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>
                <span className="text-sm font-medium text-white/90 hover:text-white drop-shadow-lg transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/auth/login">
              <Button
                size="sm"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
                data-testid="button-login"
              >
                {t('nav.login')}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="sm"
                className="bg-white text-black hover:bg-white/90"
                data-testid="button-register"
              >
                {t('nav.register')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
