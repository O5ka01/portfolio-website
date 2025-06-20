"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function LegalPageHeader() {
  const { t, language, isLoading } = useLanguage();
  
  // Provide immediate fallback text based on language
  const getBackToHomeText = () => {
    if (!isLoading) {
      const translated = t('navigation.backToHome');
      if (translated !== 'navigation.backToHome') {
        return translated;
      }
    }
    // Fallback based on current language
    return language === 'de' ? 'Zurück zur Startseite' : 'Back to Home';
  };
  
  return (
    <nav 
      aria-label="Legal page navigation" 
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Back to Home Button */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-neutral-900 hover:text-neutral-600 transition-colors duration-200"
            aria-label="Back to homepage"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">
              {getBackToHomeText()}
            </span>
          </Link>
          
          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
