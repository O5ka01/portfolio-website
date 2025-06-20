"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ImprintHeader() {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-neutral-900 hover:text-neutral-600 transition-colors">
            &larr; {language === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
          </Link>
          
          <div className="flex space-x-6">
            <Link href="/impressum" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              {language === 'de' ? 'Impressum' : 'Imprint'}
            </Link>
            <Link href="/datenschutz" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              {language === 'de' ? 'Datenschutz' : 'Privacy Policy'}
            </Link>
            <Link href="/agb" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              {language === 'de' ? 'AGB' : 'Terms & Conditions'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
