// Supported languages for the trading platform
export type Language = 
  | 'en'      // English
  | 'zh-CN'   // Chinese Simplified
  | 'ja'      // Japanese
  | 'de'      // German
  | 'fr'      // French
  | 'es'      // Spanish
  | 'ar'      // Arabic
  | 'ru';     // Russian

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
    default:
      return (await import('./en')).en; // Fallback to English
  }
};

// Language metadata for UI display
export const languageNames: Record<Language, { native: string; flag: string; rtl?: boolean }> = {
  'en': { native: 'English', flag: '🇬🇧' },
  'zh-CN': { native: '简体中文', flag: '🇨🇳' },
  'ja': { native: '日本語', flag: '🇯🇵' },
  'de': { native: 'Deutsch', flag: '🇩🇪' },
  'fr': { native: 'Français', flag: '🇫🇷' },
  'es': { native: 'Español', flag: '🇪🇸' },
  'ar': { native: 'العربية', flag: '🇸🇦', rtl: true },
  'ru': { native: 'Русский', flag: '🇷🇺' },
};

export const validLanguages: Language[] = ['en', 'zh-CN', 'ja', 'de', 'fr', 'es', 'ar', 'ru'];

// Helper to detect browser language
export const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language || 'en';
  
  // Direct match
  if (validLanguages.includes(browserLang as Language)) {
    return browserLang as Language;
  }
  
  // Match language code without region (e.g., 'zh' -> 'zh-CN')
  const langCode = browserLang.split('-')[0];
  if (langCode === 'zh') return 'zh-CN';
  if (validLanguages.includes(langCode as Language)) {
    return langCode as Language;
  }
  
  return 'en'; // Default to English
};
