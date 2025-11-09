/**
 * Variant Layout Manager
 * Dynamically loads navigation and footer components based on active variant
 */

import { ReactNode } from 'react';
import { useVariant } from '@/layouts/shared/useVariant';
import { useLanguage } from '@/hooks/useLanguage';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { getNavigationComponent } from '@/layouts/variants/navigation';
import { getFooterComponent } from '@/layouts/variants/footer';

interface VariantLayoutManagerProps {
  children: ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
}

export function VariantLayoutManager({ 
  children, 
  showNavigation = true, 
  showFooter = true 
}: VariantLayoutManagerProps) {
  const variant = useVariant();
  const { t, language } = useLanguage();
  const { config } = useSiteConfig();

  const companyName = config.branding.companyName;
  const supportEmail = config.branding.supportEmail;

  const NavigationComponent = getNavigationComponent(variant.structure.navigationLayout);
  const FooterComponent = getFooterComponent(variant.structure.footerLayout);

  const navProps = {
    variant: variant.id,
    companyName,
    supportEmail,
    language,
    t: (key: string, params?: Record<string, any>) => t(key, params),
  };

  return (
    <div className="flex min-h-screen flex-col">
      {showNavigation && <NavigationComponent {...navProps} />}

      <main className="flex-1">{children}</main>

      {showFooter && config.layout.showFooter && <FooterComponent {...navProps} />}
    </div>
  );
}
