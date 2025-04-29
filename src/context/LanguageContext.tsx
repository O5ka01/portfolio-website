"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

interface Translations {
  [key: string]: string | Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('de'); // Default to German
  const [translations, setTranslations] = useState<Translations>({}); 

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translations = await import(`@/translations/${language}.json`);
        setTranslations(translations);
      } catch (error) {
        console.error(`Failed to load translations for ${language}`, error);
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
      }
    }
  }, []);

  // Translation function that finds nested keys using dot notation
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: Translations | string = translations;

    for (const k of keys) {
      if (value === undefined || typeof value === 'string') return key; // Return key if path doesn't exist
      value = value[k];
    }

    return (typeof value === 'string' ? value : key); // Return value or key if value is undefined or not a string
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
