/**
 * Ticker Bar Navigation
 * Sticky top with live market data strip - Bloomberg Terminal style
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TickerBarNav({ variant }: NavigationProps) {
  const { getBranding } = useSiteConfig();
  const { t, language } = useLanguage();
  const [location] = useLocation();

  const { companyName, supportEmail } = getBranding(language);

  const navItems = [
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.markets'), href: '/markets' },
    { label: t('nav.company'), href: '/company' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  // Mock ticker data
  const tickerData = [
    { symbol: 'EUR/USD', price: '1.0892', change: '+0.12%', isPositive: true },
    { symbol: 'GBP/USD', price: '1.2634', change: '-0.08%', isPositive: false },
    { symbol: 'BTC/USD', price: '43,256', change: '+2.34%', isPositive: true },
    { symbol: 'GOLD', price: '2,048', change: '+0.45%', isPositive: true },
  ];

  return (
    <div className="sticky top-0 z-50">
      {/* Market Ticker Strip */}
      <div className="bg-muted/40 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-8 overflow-x-auto">
            {tickerData.map((item) => (
              <div key={item.symbol} className="flex items-center gap-2 text-xs whitespace-nowrap">
                <span className="font-semibold">{item.symbol}</span>
                <span>{item.price}</span>
                <span className={`flex items-center gap-1 ${item.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {item.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" data-testid="link-home">
              <span className="text-lg font-bold">{companyName}</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>
                  <Button
                    variant={location === item.href ? 'secondary' : 'ghost'}
                    size="sm"
                    className="text-xs font-medium"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button size="sm" variant="outline" data-testid="button-login">
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
      </nav>
    </div>
  );
}
