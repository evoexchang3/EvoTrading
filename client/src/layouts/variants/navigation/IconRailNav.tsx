/**
 * Icon Rail Navigation
 * Minimal icon-only left rail with tooltips - modern and compact
 */

import { Link, useLocation } from 'wouter';
import { NavigationProps } from './index';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, BarChart3, Building2, Mail, LogIn, UserPlus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function IconRailNav({ variant }: NavigationProps) {
  const { t } = useLanguage();
  const [location] = useLocation();

  const navItems = [
    { label: t('nav.home'), href: '/', icon: Home },
    { label: t('nav.markets'), href: '/markets', icon: BarChart3 },
    { label: t('nav.company'), href: '/company', icon: Building2 },
    { label: t('nav.contact'), href: '/contact', icon: Mail },
  ];

  return (
    <TooltipProvider>
      <aside className="fixed left-0 top-0 h-screen w-16 border-r bg-background/95 backdrop-blur flex flex-col items-center py-4 gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link href={item.href} data-testid={`link-nav-${item.href === '/' ? 'home' : item.href.slice(1)}`}>
                  <div className={`p-3 rounded-lg hover-elevate ${location === item.href ? 'bg-secondary' : ''}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          );
        })}

        <div className="flex-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/auth/login" data-testid="button-login">
              <div className="p-3 rounded-lg hover-elevate">
                <LogIn className="w-5 h-5" />
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{t('nav.login')}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/auth/register" data-testid="button-register">
              <div className="p-3 rounded-lg hover-elevate bg-primary text-primary-foreground">
                <UserPlus className="w-5 h-5" />
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{t('nav.register')}</TooltipContent>
        </Tooltip>
      </aside>
    </TooltipProvider>
  );
}
