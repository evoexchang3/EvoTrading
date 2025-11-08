// Supported languages for the trading platform (35 total)
export type Language = 
  | 'en'      // English (US)
  | 'en-GB'   // English (British)
  | 'zh-CN'   // Chinese Simplified
  | 'zh-TW'   // Chinese Traditional
  | 'ja'      // Japanese
  | 'de'      // German
  | 'fr'      // French
  | 'es'      // Spanish
  | 'ar'      // Arabic
  | 'ru'      // Russian
  | 'it'      // Italian
  | 'nl'      // Dutch
  | 'pl'      // Polish
  | 'pt-BR'   // Portuguese (Brazilian)
  | 'pt-PT'   // Portuguese (European)
  | 'ko'      // Korean
  // | 'tr'   // Turkish - DISABLED (escaping issues - follow-up task)
  | 'he'      // Hebrew
  | 'vi'      // Vietnamese
  | 'sv'      // Swedish
  | 'da'      // Danish
  | 'fi'      // Finnish
  | 'nb'      // Norwegian
  | 'cs'      // Czech
  | 'ro'      // Romanian
  | 'hu'      // Hungarian
  | 'el'      // Greek
  | 'bg'      // Bulgarian
  | 'uk'      // Ukrainian
  | 'id'      // Indonesian
  | 'et'      // Estonian
  | 'lt'      // Lithuanian
  | 'lv'      // Latvian
  | 'sk'      // Slovak
  | 'sl';     // Slovenian

export type TranslationKeys = Record<string, string>;

// Lazy loading for code splitting - only loads the selected language
export const loadTranslations = async (language: Language): Promise<TranslationKeys> => {
  try {
    switch (language) {
      // Tier 0 - Existing
      case 'en': return (await import('./en')).en;
      case 'zh-CN': return (await import('./zh-CN')).zhCN;
      case 'ja': return (await import('./ja')).ja;
      case 'de': return (await import('./de')).de;
      case 'fr': return (await import('./fr')).fr;
      case 'es': return (await import('./es')).es;
      case 'ar': return (await import('./ar')).ar;
      case 'ru': return (await import('./ru')).ru;
      
      // Tier 1 - High Priority
      case 'it': return (await import('./it')).it;
      case 'nl': return (await import('./nl')).nl;
      case 'pl': return (await import('./pl')).pl;
      case 'pt-BR': return (await import('./pt-BR')).ptBR;
      case 'pt-PT': return (await import('./pt-PT')).ptPT;
      case 'ko': return (await import('./ko')).ko;
      // case 'tr': return (await import('./tr')).tr; // DISABLED
      case 'he': return (await import('./he')).he;
      case 'vi': return (await import('./vi')).vi;
      case 'zh-TW': return (await import('./zh-TW')).zhTW;
      case 'en-GB': return (await import('./en-GB')).enGB;
      
      // Tier 2 - European
      case 'sv': return (await import('./sv')).sv;
      case 'da': return (await import('./da')).da;
      case 'fi': return (await import('./fi')).fi;
      case 'nb': return (await import('./nb')).nb;
      case 'cs': return (await import('./cs')).cs;
      case 'ro': return (await import('./ro')).ro;
      case 'hu': return (await import('./hu')).hu;
      case 'el': return (await import('./el')).el;
      case 'bg': return (await import('./bg')).bg;
      
      // Tier 3 - Emerging
      case 'uk': return (await import('./uk')).uk;
      case 'id': return (await import('./id')).id;
      case 'et': return (await import('./et')).et;
      case 'lt': return (await import('./lt')).lt;
      case 'lv': return (await import('./lv')).lv;
      case 'sk': return (await import('./sk')).sk;
      case 'sl': return (await import('./sl')).sl;
      
      default:
        return (await import('./en')).en; // Fallback to English
    }
  } catch (error) {
    console.warn(`Failed to load translations for ${language}, falling back to English`, error);
    return (await import('./en')).en;
  }
};

// Language metadata for UI display (35 languages with native names)
export const languageNames: Record<Language, { native: string; rtl?: boolean }> = {
  // Tier 0 - Existing
  'en': { native: 'English (US)' },
  'zh-CN': { native: '简体中文' },
  'ja': { native: '日本語' },
  'de': { native: 'Deutsch' },
  'fr': { native: 'Français' },
  'es': { native: 'Español' },
  'ar': { native: 'العربية', rtl: true },
  'ru': { native: 'Русский' },
  
  // Tier 1 - High Priority
  'it': { native: 'Italiano' },
  'nl': { native: 'Nederlands' },
  'pl': { native: 'Polski' },
  'pt-BR': { native: 'Português (Brasil)' },
  'pt-PT': { native: 'Português (Portugal)' },
  'ko': { native: '한국어' },
  // 'tr': { native: 'Türkçe' }, // DISABLED
  'he': { native: 'עברית', rtl: true },
  'vi': { native: 'Tiếng Việt' },
  'zh-TW': { native: '繁體中文' },
  'en-GB': { native: 'English (UK)' },
  
  // Tier 2 - European
  'sv': { native: 'Svenska' },
  'da': { native: 'Dansk' },
  'fi': { native: 'Suomi' },
  'nb': { native: 'Norsk' },
  'cs': { native: 'Čeština' },
  'ro': { native: 'Română' },
  'hu': { native: 'Magyar' },
  'el': { native: 'Ελληνικά' },
  'bg': { native: 'Български' },
  
  // Tier 3 - Emerging
  'uk': { native: 'Українська' },
  'id': { native: 'Bahasa Indonesia' },
  'et': { native: 'Eesti' },
  'lt': { native: 'Lietuvių' },
  'lv': { native: 'Latviešu' },
  'sk': { native: 'Slovenčina' },
  'sl': { native: 'Slovenščina' },
};

export const validLanguages: Language[] = [
  'en', 'en-GB', 'zh-CN', 'zh-TW', 'ja', 'de', 'fr', 'es', 'ar', 'ru',
  'it', 'nl', 'pl', 'pt-BR', 'pt-PT', 'ko', 'he', 'vi',
  'sv', 'da', 'fi', 'nb', 'cs', 'ro', 'hu', 'el', 'bg',
  'uk', 'id', 'et', 'lt', 'lv', 'sk', 'sl'
];

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
