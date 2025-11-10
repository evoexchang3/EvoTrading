import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { getNavigationComponent } from "@/layouts/variants/navigation";
import { getFooterComponent } from "@/layouts/variants/footer";
import { getVariantConfig } from "@/layouts/shared/variantConfig";
import { Button } from "@/components/ui/button";
import { Eye, X, ArrowLeft } from "lucide-react";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  const { config, loading, activeVariant: contextActiveVariant, getBranding } = useSiteConfig();
  const { t, language } = useLanguage();
  const [showPreviewBanner, setShowPreviewBanner] = useState(false);
  const [previewVariantName, setPreviewVariantName] = useState('');

  // Get variant-specific components using centralized activeVariant (honors ?preview parameter)
  const activeVariant = loading ? 'bloomberg-dark' : (contextActiveVariant || 'bloomberg-dark');
  const variantConfig = getVariantConfig(activeVariant);

  // Check if preview mode is active (reactively update when URL changes)
  useEffect(() => {
    const checkPreviewMode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const preview = urlParams.get('preview');
      setShowPreviewBanner(!!preview);
      setPreviewVariantName(preview || '');
    };

    checkPreviewMode();

    // Listen for URL changes to re-show banner if dismissed but still in preview
    window.addEventListener('popstate', checkPreviewMode);
    return () => window.removeEventListener('popstate', checkPreviewMode);
  }, []);
  
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
      {/* Preview Mode Banner */}
      {showPreviewBanner && (
        <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between gap-4 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="text-sm font-medium">
              Preview Mode: <strong>{previewVariantName}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => window.location.href = '/admin/config'}
              data-testid="button-return-admin"
            >
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back to Admin
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                // Temporarily hide banner (will reappear on page change if still in preview)
                setShowPreviewBanner(false);
              }}
              data-testid="button-dismiss-preview-banner"
              title="Temporarily hide banner"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
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
