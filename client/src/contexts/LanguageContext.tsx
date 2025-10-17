import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Language, 
  TranslationKeys, 
  loadTranslations, 
  detectBrowserLanguage,
  languageNames 
} from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Load from localStorage, fallback to browser detection
    const saved = localStorage.getItem('language') as Language;
    if (saved && saved in languageNames) {
      return saved;
    }
    return detectBrowserLanguage();
  });

  const [translations, setTranslations] = useState<TranslationKeys>({});
  const [fallbackTranslations, setFallbackTranslations] = useState<TranslationKeys>({});

  // Load translations when language changes
  useEffect(() => {
    const loadLanguageTranslations = async () => {
      try {
        const langTranslations = await loadTranslations(language);
        setTranslations(langTranslations);

        // Load English as fallback if not already English
        if (language !== 'en') {
          const englishTranslations = await loadTranslations('en');
          setFallbackTranslations(englishTranslations);
        } else {
          setFallbackTranslations({});
        }
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        // Load English as fallback
        const englishTranslations = await loadTranslations('en');
        setTranslations(englishTranslations);
      }
    };

    loadLanguageTranslations();
  }, [language]);

  // Apply RTL direction to document
  useEffect(() => {
    const isRTL = languageNames[language]?.rtl || false;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Persist language to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function with parameter substitution
  const t = (key: string, params?: Record<string, string | number>): string => {
    // Get translation from current language or fallback to English
    let translation = translations[key] || fallbackTranslations[key] || key;

    // Show warning in development if key is missing
    if (translation === key && process.env.NODE_ENV === 'development') {
      console.warn(`Missing translation key: "${key}" for language: ${language}`);
    }

    // Replace {{param}} placeholders
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(
          new RegExp(`{{${paramKey}}}`, 'g'),
          String(paramValue)
        );
      });
    }

    return translation;
  };

  const isRTL = languageNames[language]?.rtl || false;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
