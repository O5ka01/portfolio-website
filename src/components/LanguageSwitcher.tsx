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
      className="btn-apple-secondary"
      aria-label={language === 'de' ? 'Switch to English' : 'Auf Deutsch umschalten'}
    >
      {t('languageSwitch')}
    </button>
  );
}
