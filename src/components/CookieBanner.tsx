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
    rejectAll,
    acceptSelected,
    openPreferences,
    closePreferences,
    showPreferences,
  } = useConsent();

  const [isReady, setIsReady] = useState(false);

  // Keep local consent in sync with context consent
  const [localConsent, setLocalConsent] = useState({
    ...consent
  });
  
  // Wait for client-side hydration to complete before showing
  useEffect(() => {
    setIsReady(true);
  }, []);
  
  // Update local consent when the global consent changes
  useEffect(() => {
    setLocalConsent({ ...consent });
  }, [consent]);

  const handleCheckboxChange = (key: keyof typeof localConsent) => {
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

  // Don't render until client-side hydration is complete AND translations are loaded
  // Also don't render if both banners are hidden
  if (!isReady || isLoading || (!showBanner && !showPreferences)) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto" 
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
      onClick={(e) => {
        // Only close if clicking the background overlay, not the modal content
        if (e.target === e.currentTarget) {
          closePreferences();
        }
      }}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-dark-text bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        {/* Cookie banner content */}
        <div className="inline-block align-bottom bg-warm-beige rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full max-w-[95vw] mx-auto">
          <div className="bg-warm-beige px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-dark-text" id="modal-title">
                  {t('cookies.title')}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-dark-text/80">
                    {t('cookies.description')}
                  </p>
                </div>

                {showPreferences && (
                  <div className="mt-4 space-y-4">
                    {/* Necessary cookies - always checked and disabled */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="necessary"
                          name="necessary"
                          type="checkbox"
                          checked={localConsent.necessary}
                          disabled
                          className="focus:ring-accent-secondary h-4 w-4 text-accent-secondary border-dark-text/30 rounded cursor-not-allowed"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="necessary" className="font-medium text-dark-text">
                          {t('cookies.necessary')}
                        </label>
                        <p className="text-dark-text/70">
                          {t('cookies.necessaryDescription')}
                        </p>
                      </div>
                    </div>

                    {/* Analytics cookies */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="analytics"
                          name="analytics"
                          type="checkbox"
                          checked={localConsent.analytics}
                          onChange={() => handleCheckboxChange('analytics')}
                          className="focus:ring-accent-secondary h-4 w-4 text-accent-secondary border-dark-text/30 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="analytics" className="font-medium text-dark-text">
                          {t('cookies.analytics')}
                        </label>
                        <p className="text-dark-text/70">
                          {t('cookies.analyticsDescription')}
                        </p>
                      </div>
                    </div>

                    {/* Functional cookies */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="functional"
                          name="functional"
                          type="checkbox"
                          checked={localConsent.functional}
                          onChange={() => handleCheckboxChange('functional')}
                          className="focus:ring-accent-secondary h-4 w-4 text-accent-secondary border-dark-text/30 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="functional" className="font-medium text-dark-text">
                          {t('cookies.functional')}
                        </label>
                        <p className="text-dark-text/70">
                          {t('cookies.functionalDescription')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-accent-primary/10 px-4 py-3 sm:px-6 flex flex-wrap justify-center sm:justify-between gap-2">
            {!showPreferences && (
              <>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="w-full sm:w-auto inline-flex justify-center rounded-md border border-dark-text/30 shadow-sm px-4 py-2 bg-warm-beige text-base font-medium text-dark-text hover:bg-accent-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-secondary sm:text-sm transition-colors"
                  aria-label={t('cookies.rejectAll')}
                >
                  {t('cookies.rejectAll')}
                </button>
                <button
                  type="button"
                  onClick={openPreferences}
                  className="w-full sm:w-auto inline-flex justify-center rounded-md border border-dark-text/30 shadow-sm px-4 py-2 bg-warm-beige text-base font-medium text-dark-text hover:bg-accent-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-secondary sm:text-sm transition-colors"
                  aria-label={t('cookies.preferences')}
                >
                  {t('cookies.preferences')}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-accent-secondary text-base font-medium text-dark-text hover:bg-accent-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-secondary sm:text-sm transition-colors"
                  aria-label={t('cookies.acceptAll')}
                >
                  {t('cookies.acceptAll')}
                </button>
              </>
            )}

            {showPreferences && (
              <>
                <button
                  type="button"
                  onClick={closePreferences}
                  className="w-full sm:w-auto inline-flex justify-center rounded-md border border-dark-text/30 shadow-sm px-4 py-2 bg-warm-beige text-base font-medium text-dark-text hover:bg-accent-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-secondary sm:text-sm transition-colors"
                  aria-label={t('cookies.close')}
                >
                  {t('cookies.close')}
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="w-full sm:w-auto inline-flex justify-center rounded-md border border-dark-text/30 shadow-sm px-4 py-2 bg-warm-beige text-base font-medium text-dark-text hover:bg-accent-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-secondary sm:text-sm transition-colors"
                  aria-label={t('cookies.rejectAll')}
                >
                  {t('cookies.rejectAll')}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptSelected}
                  className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-accent-secondary text-base font-medium text-dark-text hover:bg-accent-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-secondary sm:text-sm transition-colors"
                  aria-label={t('cookies.acceptSelected')}
                >
                  {t('cookies.acceptSelected')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
