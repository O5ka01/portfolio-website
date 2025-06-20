"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { getDefaultLanguage, getFeaturedContent } from '@/utils/config';
import { translations } from '@/translations';

type Language = 'de' | 'en';

// Define the structure for featured content from Edge Config
interface FeaturedContent {
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
  // Add any other properties your featured content might have
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
  featuredContent: FeaturedContent | null;
}

interface Translations {
  [key: string]: string | Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('de'); // Default to German
  const [currentTranslations, setCurrentTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);
  const [featuredContent, setFeaturedContent] = useState<FeaturedContent | null>(null);

  // Load translations when language changes
  useEffect(() => {
    const loadLanguageResources = async () => {
      try {
        setIsLoading(true);
        
        // Get translations directly from imported object
        const translationData = translations[language];
        setCurrentTranslations(translationData);
        
        // Fetch featured content from Edge Config
        const content = await getFeaturedContent();
        // Safely handle the result with proper typing
        setFeaturedContent(content as FeaturedContent | null);
      } catch (error) {
        console.error(`Failed to load resources for ${language}`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguageResources();

    // Store language preference in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', language);
      document.documentElement.lang = language; // Update html lang attribute
    }
  }, [language]);

  // Check for Edge Config settings and stored language preference on initial load
  useEffect(() => {
    const initializeLanguage = async () => {
      if (typeof window !== 'undefined') {
        try {
          // First try to get default language from Edge Config
          const configDefaultLanguage = await getDefaultLanguage();
          
          // Then check local storage
          const storedLanguage = localStorage.getItem('preferred-language') as Language;
          
          if (storedLanguage && (storedLanguage === 'de' || storedLanguage === 'en')) {
            setLanguage(storedLanguage);
          } else {
            // Detect browser language as fallback
            const browserLang = navigator.language.split('-')[0].toLowerCase();
            if (browserLang === 'en') {
              setLanguage('en');
            } else {
              // Use default from Edge Config, ensuring it's a valid Language type
              const safeDefaultLang = configDefaultLanguage === 'en' ? 'en' : 'de';
              setLanguage(safeDefaultLang as Language);
            }
          }
        } catch (error) {
          console.error('Error initializing language settings', error);
          // Fallback to defaults if Edge Config fails
          const storedLanguage = localStorage.getItem('preferred-language') as Language;
          if (storedLanguage && (storedLanguage === 'de' || storedLanguage === 'en')) {
            setLanguage(storedLanguage);
          }
        }
      }
    };
    
    initializeLanguage();
  }, []);

  // Translation function that finds nested keys using dot notation - memoized for performance
  const t = useMemo(() => {
    return (key: string): string => {
      const keys = key.split('.');
      let value: Translations | string = currentTranslations;

      for (const k of keys) {
        if (value === undefined || typeof value === 'string') {
          return key; // Return key if path doesn't exist
        }
        value = value[k];
      }

      const result = (typeof value === 'string' ? value : key);
      return result; // Return value or key if value is undefined or not a string
    };
  }, [currentTranslations]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
    isLoading,
    featuredContent
  }), [language, t, isLoading, featuredContent]);

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
