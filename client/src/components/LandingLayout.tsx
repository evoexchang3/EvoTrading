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
  const { config, loading, getBranding } = useSiteConfig();
  const { t, language } = useLanguage();

  // Get variant-specific components
  const activeVariant = loading ? 'bloomberg-dark' : (config.layout?.activeVariant || 'bloomberg-dark');
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

  useEffect(() => {
    if (loading) return;
    
    const variantName = config.layout?.activeVariant || 'bloomberg-dark';
    
    const existingLinks = document.querySelectorAll('link[data-layout-variant]');
    existingLinks.forEach(link => link.remove());
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/layouts/variants/${variantName}.css`;
    link.setAttribute('data-layout-variant', variantName);
    document.head.appendChild(link);
    
    document.documentElement.setAttribute('data-layout', variantName);
    
    return () => {
      link.remove();
      document.documentElement.removeAttribute('data-layout');
    };
  }, [config.layout?.activeVariant, loading]);

  return (
    <div className="flex min-h-screen flex-col bg-background" data-layout={loading ? undefined : config.layout?.activeVariant}>
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
