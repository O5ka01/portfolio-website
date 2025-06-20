"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import CookieSettings from './CookieSettings';

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-neutral-600 text-sm">
              &copy; {currentYear} Ole Oskar Heinrichs. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
            </p>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <Link 
              href="/impressum" 
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {language === 'de' ? 'Impressum' : 'Imprint'}
            </Link>

            <Link 
              href="/datenschutz" 
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {language === 'de' ? 'Datenschutz' : 'Privacy Policy'}
            </Link>

            <Link 
              href="/agb" 
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {language === 'de' ? 'AGB' : 'Terms & Conditions'}
            </Link>

            <CookieSettings />
          </div>
        </div>
      </div>
    </footer>
  );
}
