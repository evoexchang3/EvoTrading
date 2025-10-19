// Supported languages for the trading platform
export type Language = 
  | 'en'      // English
  | 'zh-CN'   // Chinese Simplified
  | 'ja'      // Japanese
  | 'de'      // German
  | 'fr'      // French
  | 'es'      // Spanish
  | 'ar'      // Arabic
  | 'ru'      // Russian
  | 'pt-BR'   // Portuguese (Brazil)
  | 'pt-PT'   // Portuguese (Portugal)
  | 'it';     // Italian

export type TranslationKeys = Record<string, string>;

// Lazy loading for code splitting - only loads the selected language
export const loadTranslations = async (language: Language): Promise<TranslationKeys> => {
  switch (language) {
    case 'en':
      return (await import('./en')).en;
    case 'zh-CN':
      return (await import('./zh-CN')).zhCN;
    case 'ja':
      return (await import('./ja')).ja;
    case 'de':
      return (await import('./de')).de;
    case 'fr':
      return (await import('./fr')).fr;
    case 'es':
      return (await import('./es')).es;
    case 'ar':
      return (await import('./ar')).ar;
    case 'ru':
      return (await import('./ru')).ru;
    case 'pt-BR':
      return (await import('./pt-BR')).ptBR;
    case 'pt-PT':
      return (await import('./pt-PT')).ptPT;
    case 'it':
      return (await import('./it')).it;
    default:
      return (await import('./en')).en; // Fallback to English
  }
};

// Language metadata for UI display
export const languageNames: Record<Language, { native: string; rtl?: boolean }> = {
  'en': { native: 'English' },
  'zh-CN': { native: '简体中文' },
  'ja': { native: '日本語' },
  'de': { native: 'Deutsch' },
  'fr': { native: 'Français' },
  'es': { native: 'Español' },
  'ar': { native: 'العربية', rtl: true },
  'ru': { native: 'Русский' },
  'pt-BR': { native: 'Português (Brasil)' },
  'pt-PT': { native: 'Português (Portugal)' },
  'it': { native: 'Italiano' },
};

export const validLanguages: Language[] = ['en', 'zh-CN', 'ja', 'de', 'fr', 'es', 'ar', 'ru', 'pt-BR', 'pt-PT', 'it'];

// Helper to detect browser language
export const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language || 'en';
  
  // Direct match
  if (validLanguages.includes(browserLang as Language)) {
    return browserLang as Language;
  }
  
  // Match language code without region (e.g., 'zh' -> 'zh-CN', 'pt' -> 'pt-BR')
  const langCode = browserLang.split('-')[0];
  if (langCode === 'zh') return 'zh-CN';
  if (langCode === 'pt') {
    // Prefer pt-BR for Portuguese unless explicitly pt-PT
    return browserLang.toLowerCase() === 'pt-pt' ? 'pt-PT' : 'pt-BR';
  }
  if (validLanguages.includes(langCode as Language)) {
    return langCode as Language;
  }
  
  return 'en'; // Default to English
};
