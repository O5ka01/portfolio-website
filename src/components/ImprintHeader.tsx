"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const ImprintHeader = () => {
  const { language } = useLanguage();
  
  return (
    <nav aria-label="Imprint navigation" className="sticky top-0 z-50 bg-warm-beige/80 backdrop-blur-sm border-b border-accent-primary/20 px-4 sm:px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-dark-text">
          <Link
            href="/"
            className="inline-flex items-center text-dark-text hover:text-accent-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded px-2 py-1"
          >
            {language === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
          </Link>
        </div>
        
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default ImprintHeader;
