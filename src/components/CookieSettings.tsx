"use client";

import { useConsent } from '@/context/ConsentContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CookieSettings({ className = '' }: { className?: string }) {
  const { t } = useLanguage();
  const { openPreferences } = useConsent();

  return (
    <button
      onClick={openPreferences}
      className={`text-neutral-500 hover:text-neutral-900 transition-all duration-200 hover:underline underline-offset-4 ${className}`}
      aria-label={t('footer.cookieSettings')}
    >
      {t('footer.cookieSettings')}
    </button>
  );
}
