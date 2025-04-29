"use client";

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-full bg-accent-primary/20 px-3 py-1 font-medium text-dark-text hover:bg-accent-tertiary/30 transition-colors"
      aria-label={language === 'de' ? 'Switch to English' : 'Auf Deutsch umschalten'}
    >
      {t('languageSwitch')}
    </button>
  );
}
