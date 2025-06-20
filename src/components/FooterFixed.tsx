"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import CookieSettings from './CookieSettings';

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent-primary/30 py-4 sm:py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-dark-text/70">&copy; {currentYear} Ole Oskar Heinrichs. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</p>
          </div>

          <div className="flex items-center space-x-6">

            <Link 
              href="/datenschutz" 
              className="text-dark-text/70 hover:text-dark-text transition-colors"
            >
              {language === 'de' ? 'Datenschutz' : 'Privacy Policy'}
            </Link>

            <CookieSettings />
          </div>
        </div>
      </div>
    </footer>
  );
}
