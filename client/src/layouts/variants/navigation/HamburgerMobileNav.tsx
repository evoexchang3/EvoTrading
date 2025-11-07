/**
 * Hamburger Mobile Navigation
 * Hidden menu, slide-out panel - mobile-first approach
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function HamburgerMobileNav({ variant }: NavigationProps) {
  const { config } = useSiteConfig();
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { companyName } = config.branding.languageOverrides[language] || config.branding;

  const navItems = [
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.markets'), href: '/markets' },
    { label: t('nav.company'), href: '/company' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-menu-toggle"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
          <Link href="/" data-testid="link-home">
            <span className="text-lg font-bold">{companyName}</span>
          </Link>
          <Link href="/auth/register">
            <Button size="sm" data-testid="button-register">{t('nav.register')}</Button>
          </Link>
        </div>
      </nav>

      {/* Slide-out Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        data-testid="sidebar-menu"
      >
        <div className="p-6 space-y-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>
              <div
                className={`block py-2 text-lg font-medium hover:text-primary ${location === item.href ? 'text-primary' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </div>
            </Link>
          ))}
          <Link href="/auth/login">
            <Button variant="outline" className="w-full" data-testid="button-login">{t('nav.login')}</Button>
          </Link>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
          data-testid="overlay"
        />
      )}
    </>
  );
}
