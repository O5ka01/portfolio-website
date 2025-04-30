"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

interface Translations {
  [key: string]: string | Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('de'); // Default to German
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        
        // Check if translations are in sessionStorage first
        const cachedTranslations = sessionStorage.getItem(`translations-${language}`);
        if (cachedTranslations) {
          setTranslations(JSON.parse(cachedTranslations));
          setIsLoading(false);
          return;
        }
        
        // If not cached, load from file
        const fetchedTranslations = await import(`@/translations/${language}.json`);
        setTranslations(fetchedTranslations);
        
        // Cache in sessionStorage
        sessionStorage.setItem(`translations-${language}`, JSON.stringify(fetchedTranslations));
      } catch (error) {
        console.error(`Failed to load translations for ${language}`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();

    // Store language preference in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', language);
      document.documentElement.lang = language; // Update html lang attribute
    }
  }, [language]);

  // Check for stored language preference on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('preferred-language') as Language;
      if (storedLanguage && (storedLanguage === 'de' || storedLanguage === 'en')) {
        setLanguage(storedLanguage);
      } else {
        // Detect browser language as fallback
        const browserLang = navigator.language.split('-')[0].toLowerCase();
        if (browserLang === 'en') {
          setLanguage('en');
        }
        // Default is already 'de'
      }
    }
  }, []);

  // Translation function that finds nested keys using dot notation - memoized for performance
  const t = useMemo(() => {
    return (key: string): string => {
      const keys = key.split('.');
      let value: Translations | string = translations;

      for (const k of keys) {
        if (value === undefined || typeof value === 'string') return key; // Return key if path doesn't exist
        value = value[k];
      }

      return (typeof value === 'string' ? value : key); // Return value or key if value is undefined or not a string
    };
  }, [translations]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
    isLoading
  }), [language, t, isLoading]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
