"use client";

import { useConsent } from '@/context/ConsentContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CookieSettings({ className = '' }: { className?: string }) {
  const { t } = useLanguage();
  const { openPreferences } = useConsent();

  return (
    <button
      onClick={openPreferences}
      className={`text-dark-text/70 hover:text-dark-text transition-colors ${className}`}
    >
      {t('footer.cookieSettings')}
    </button>
  );
}
