import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ExtendedSiteConfig } from '@/../../shared/site-config';
import { DEFAULT_SITE_CONFIG } from '@/../../shared/site-config';

// Re-export for backwards compatibility
export type SiteConfig = ExtendedSiteConfig;

// Legacy type definition (deprecated - kept for reference only)
interface LegacySiteConfig {
  version: string;
  branding: {
    companyName: string;
    supportEmail: string;
    logo: {
      enabled: boolean;
      path: string;
      altText: string;
    };
    copyright: {
      year: number;
      text: string;
    };
    social: {
      twitter: string;
      linkedin: string;
      facebook: string;
      instagram: string;
    };
    languageOverrides?: {
      [langCode: string]: {
        companyName?: string;
        supportEmail?: string;
      };
    };
  };
  layout: {
    activeVariant: string;
    stickyHeader: boolean;
    showFooter: boolean;
    compactMode: boolean;
  };
  features: {
    accountTypes: {
      standard: { enabled: boolean; visible: boolean };
      professional: { enabled: boolean; visible: boolean };
      vip: { enabled: boolean; visible: boolean };
    };
    paymentMethods: {
      bankTransfer: { enabled: boolean; international: boolean; local: boolean };
      cards: { enabled: boolean; visa: boolean; mastercard: boolean; debit: boolean };
      ewallets: { enabled: boolean; skrill: boolean; neteller: boolean; paypal: boolean };
      crypto: { enabled: boolean; bitcoin: boolean; ethereum: boolean; usdt: boolean };
    };
    publicPages: {
      partners: boolean;
      education: boolean;
      marketInfo: boolean;
      companyInfo: boolean;
    };
  };
  localization: {
    defaultLanguage: string;
    enabledLanguages: string[];
  };
  trading: {
    leverage: {
      standard: string;
      professional: string;
      vip: string;
    };
    minDeposit: {
      standard: number;
      professional: number;
      vip: number;
    };
    assetClasses: {
      forex: boolean;
      crypto: boolean;
      commodities: boolean;
      indices: boolean;
      stocks: boolean;
    };
  };
  metadata: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string;
    ogImage: string;
    ogType: string;
  };
  advanced: {
    customCSS: string;
    experimental: {
      customThemeEditor: boolean;
      advancedLayoutBuilder: boolean;
    };
  };
}

// Default configuration (fallback if API fails)
const defaultConfig: SiteConfig = DEFAULT_SITE_CONFIG as SiteConfig;

// Legacy default (deprecated - reference only)
const legacyDefault = {
  version: '1.0.0',
  branding: {
    companyName: 'Trading Platform',
    supportEmail: 'support@tradingplatform.com',
    logo: {
      enabled: true,
      path: '',
      altText: 'Trading Platform Logo'
    },
    copyright: {
      year: 2025,
      text: '© {{year}} {{companyName}}. All rights reserved.'
    },
    social: {
      twitter: '',
      linkedin: '',
      facebook: '',
      instagram: ''
    }
  },
  layout: {
    activeVariant: 'bloomberg-dark',
    stickyHeader: true,
    showFooter: true,
    compactMode: false
  },
  features: {
    accountTypes: {
      standard: { enabled: true, visible: true },
      professional: { enabled: true, visible: true },
      vip: { enabled: true, visible: true }
    },
    paymentMethods: {
      bankTransfer: { enabled: true, international: true, local: true },
      cards: { enabled: true, visa: true, mastercard: true, debit: true },
      ewallets: { enabled: true, skrill: true, neteller: true, paypal: true },
      crypto: { enabled: true, bitcoin: true, ethereum: true, usdt: true }
    },
    publicPages: {
      partners: true,
      education: true,
      marketInfo: true,
      companyInfo: true
    }
  },
  localization: {
    defaultLanguage: 'en',
    enabledLanguages: ['en', 'zh-CN', 'ja', 'de', 'fr', 'es', 'ar', 'ru', 'pt']
  },
  trading: {
    leverage: {
      standard: '1:100',
      professional: '1:200',
      vip: '1:400'
    },
    minDeposit: {
      standard: 100,
      professional: 5000,
      vip: 25000
    },
    assetClasses: {
      forex: true,
      crypto: true,
      commodities: true,
      indices: false,
      stocks: false
    }
  },
  metadata: {
    defaultTitle: 'Trading Platform - Forex, Crypto & Commodities Trading',
    defaultDescription: 'Professional trading platform for forex, cryptocurrencies, and commodities. Advanced charting, real-time data, and institutional-grade execution.',
    defaultKeywords: 'forex trading, crypto trading, commodities, CFD trading, online broker',
    ogImage: '/assets/og-image.png',
    ogType: 'website'
  },
  advanced: {
    customCSS: '',
    experimental: {
      customThemeEditor: false,
      advancedLayoutBuilder: false
    }
  }
};

interface SiteConfigContextType {
  config: SiteConfig;
  loading: boolean;
  error: string | null;
  activeVariant: string; // Centralized variant selection (honors ?preview parameter)
  reloadConfig: () => Promise<void>;
  updateConfig: (newConfig: SiteConfig) => void; // Direct update (after save)
  getBranding: (language?: string) => {
    companyName: string;
    supportEmail: string;
  };
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVariant, setActiveVariant] = useState<string>('bloomberg-dark');

  const loadConfig = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/site-config');
      
      if (!response.ok) {
        throw new Error(`Failed to load site configuration: ${response.statusText}`);
      }

      const data = await response.json();
      setConfig(data);
      
      // Cache config in localStorage for instant access on next load
      try {
        localStorage.setItem('site-config', JSON.stringify(data));
      } catch (e) {
        console.warn('Failed to cache site config in localStorage:', e);
      }
    } catch (err) {
      console.error('Failed to load site config, using defaults:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Keep using defaultConfig on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to load cached config synchronously first for instant rendering
    try {
      const cachedConfig = localStorage.getItem('site-config');
      if (cachedConfig) {
        const parsed = JSON.parse(cachedConfig);
        setConfig(parsed);
      }
    } catch (e) {
      console.warn('Failed to load cached config:', e);
    }
    
    // Then fetch fresh config from server
    loadConfig();
  }, []);

  // Compute active variant (honors ?preview parameter and reacts to URL changes)
  useEffect(() => {
    if (loading) return;

    const computeVariant = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const previewVariant = urlParams.get('preview');
      return previewVariant || config.layout.activeVariant;
    };

    // Set initial variant
    setActiveVariant(computeVariant());

    // Listen for URL changes (navigation, preview changes)
    const handleUrlChange = () => {
      setActiveVariant(computeVariant());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    
    // Also listen for custom preview events (when admin changes preview without navigation)
    const handlePreviewChange = () => {
      setActiveVariant(computeVariant());
    };
    window.addEventListener('previewchange', handlePreviewChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('previewchange', handlePreviewChange);
    };
  }, [config.layout.activeVariant, loading]);

  // Apply active layout variant CSS
  useEffect(() => {
    if (loading || !activeVariant) return;
    
    // Remove any existing layout variant CSS
    const existingLinks = document.querySelectorAll('link[data-layout-variant]');
    existingLinks.forEach(link => link.remove());
    
    // Load new variant CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/layouts/variants/${activeVariant}.css`;
    link.setAttribute('data-layout-variant', activeVariant);
    document.head.appendChild(link);
    
    // Set data-layout attribute on root element
    document.documentElement.setAttribute('data-layout', activeVariant);
    
    return () => {
      // Cleanup on unmount
      link.remove();
    };
  }, [activeVariant, loading]);

  const updateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    // Update localStorage cache
    try {
      localStorage.setItem('site-config', JSON.stringify(newConfig));
    } catch (e) {
      console.warn('Failed to update cached config in localStorage:', e);
    }
    
    // Recompute activeVariant based on new config and current URL
    const urlParams = new URLSearchParams(window.location.search);
    const previewVariant = urlParams.get('preview');
    setActiveVariant(previewVariant || newConfig.layout.activeVariant);
  };

  const getBranding = (language?: string) => {
    const defaultBranding = {
      companyName: config.branding.companyName,
      supportEmail: config.branding.supportEmail
    };

    if (!language || !config.branding.languageOverrides) {
      return defaultBranding;
    }

    const override = config.branding.languageOverrides[language];
    if (!override) {
      return defaultBranding;
    }

    return {
      companyName: override.companyName || defaultBranding.companyName,
      supportEmail: override.supportEmail || defaultBranding.supportEmail
    };
  };

  return (
    <SiteConfigContext.Provider value={{ config, loading, error, activeVariant, reloadConfig: loadConfig, updateConfig, getBranding }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
}
