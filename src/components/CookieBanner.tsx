"use client";

import { useState, useEffect } from 'react';
import { useConsent } from '@/context/ConsentContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CookieBanner() {
  const { t, isLoading } = useLanguage();
  const {
    consent,
    showBanner,
    setConsent,
    acceptAll,
    acceptSelected,
    openPreferences,
    closePreferences,
    showPreferences,
  } = useConsent();

  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Keep local consent in sync with context consent
  const [localConsent, setLocalConsent] = useState({
    ...consent
  });
  
  // Wait for client-side hydration to complete before showing
  useEffect(() => {
    setIsReady(true);
    // Delay visibility for smooth animation
    if (showBanner || showPreferences) {
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [showBanner, showPreferences]);
  
  // Update local consent when the global consent changes
  useEffect(() => {
    setLocalConsent({ ...consent });
  }, [consent]);

  const handleToggle = (key: keyof typeof localConsent) => {
    if (key === 'necessary') return; // Necessary cookies cannot be unselected
    setLocalConsent(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAcceptSelected = () => {
    setConsent(localConsent);
    acceptSelected();
  };

  const handleAcceptEssential = () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      functional: false
    };
    setConsent(essentialOnly);
    acceptSelected();
  };

  // Don't render until client-side hydration is complete AND translations are loaded
  if (!isReady || isLoading || (!showBanner && !showPreferences)) return null;

  // Simple banner for initial consent
  if (!showPreferences) {
    return (
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-neutral-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {t('cookies.description')}
                </p>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:ml-6">
                <button
                  type="button"
                  onClick={handleAcceptEssential}
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-300 hover:border-neutral-400 rounded-lg transition-all duration-200 hover:shadow-sm"
                >
                  {t('cookies.essential')}
                </button>
                
                <button
                  type="button"
                  onClick={openPreferences}
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 underline underline-offset-4 hover:no-underline transition-all duration-200"
                >
                  {t('cookies.customize')}
                </button>
                
                <button
                  type="button"
                  onClick={acceptAll}
                  className="px-6 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02]"
                >
                  {t('cookies.acceptAll')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Detailed preferences panel
  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto" 
      aria-labelledby="cookie-preferences-title" 
      role="dialog" 
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={closePreferences}
      />

      {/* Panel */}
      <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
        <div 
          className={`relative transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 w-full max-w-lg ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4">
            <h2 
              id="cookie-preferences-title" 
              className="text-lg font-medium text-neutral-900"
            >
              {t('cookies.preferences')}
            </h2>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              {t('cookies.description')}
            </p>
          </div>

          {/* Cookie Categories */}
          <div className="px-6 pb-6 space-y-6">
            {/* Essential Cookies */}
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-neutral-900">
                  {t('cookies.necessary')}
                </h3>
                <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                  {t('cookies.necessaryDescription')}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <div className="w-11 h-6 bg-neutral-900 rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-neutral-900">
                  {t('cookies.analytics')}
                </h3>
                <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                  {t('cookies.analyticsDescription')}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggle('analytics')}
                  className={`w-11 h-6 rounded-full transition-all duration-200 flex items-center ${
                    localConsent.analytics 
                      ? 'bg-neutral-900 justify-end' 
                      : 'bg-neutral-200 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full mx-1 transition-all duration-200" />
                </button>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-neutral-900">
                  {t('cookies.functional')}
                </h3>
                <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                  {t('cookies.functionalDescription')}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggle('functional')}
                  className={`w-11 h-6 rounded-full transition-all duration-200 flex items-center ${
                    localConsent.functional 
                      ? 'bg-neutral-900 justify-end' 
                      : 'bg-neutral-200 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full mx-1 transition-all duration-200" />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-neutral-50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={closePreferences}
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
            >
              {t('cookies.close')}
            </button>
            
            <button
              type="button"
              onClick={handleAcceptSelected}
              className="px-6 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02]"
            >
              {t('cookies.acceptSelected')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
