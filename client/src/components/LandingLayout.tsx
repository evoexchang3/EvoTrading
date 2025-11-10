import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import { getNavigationComponent } from "@/layouts/variants/navigation";
import { getFooterComponent } from "@/layouts/variants/footer";
import { getVariantConfig } from "@/layouts/shared/variantConfig";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  const { config, loading, activeVariant: contextActiveVariant, getBranding } = useSiteConfig();
  const { t, language } = useLanguage();

  // Get variant-specific components using centralized activeVariant (honors ?preview parameter)
  const activeVariant = loading ? 'bloomberg-dark' : (contextActiveVariant || 'bloomberg-dark');
  const variantConfig = getVariantConfig(activeVariant);
  
  const NavigationComponent = getNavigationComponent(variantConfig.structure.navigationLayout);
  const FooterComponent = getFooterComponent(variantConfig.structure.footerLayout);
  
  const showFooter = loading ? true : (config.layout?.showFooter ?? true);
  
  // Compute branding data to pass to navigation/footer components
  const { companyName, supportEmail } = getBranding(language);
  
  // Determine if navigation requires layout adjustment (fixed/sidebar variants)
  const navLayout = variantConfig.structure.navigationLayout;
  const hasSidebarNav = navLayout === 'vertical-sidebar' || navLayout === 'icon-rail';
  const hasBottomNav = navLayout === 'bottom-mobile';
  const sidebarWidth = navLayout === 'vertical-sidebar' ? '16rem' : navLayout === 'icon-rail' ? '4rem' : '0';

  // CSS loading is handled by SiteConfigContext - no duplicate logic here

  return (
    <div className="flex min-h-screen flex-col bg-background" data-layout={loading ? undefined : activeVariant}>
      {/* Dynamic Navigation */}
      <NavigationComponent 
        variant={activeVariant} 
        companyName={companyName}
        supportEmail={supportEmail}
        language={language}
        t={t}
      />

      {/* Main Content with sidebar adjustment */}
      <main 
        className="flex-1" 
        style={{ 
          marginLeft: hasSidebarNav ? sidebarWidth : '0',
          marginBottom: hasBottomNav ? '4rem' : '0'
        }}
      >
        {children}
      </main>

      {/* Dynamic Footer */}
      {showFooter && (
        <div style={{ marginLeft: hasSidebarNav ? sidebarWidth : '0' }}>
          <FooterComponent 
            variant={activeVariant}
            companyName={companyName}
            supportEmail={supportEmail}
            language={language}
            t={t}
          />
        </div>
      )}
    </div>
  );
}
