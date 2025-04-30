"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ConsentType = {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
};

type ConsentContextType = {
  consent: ConsentType;
  showBanner: boolean;
  setConsent: (consent: ConsentType) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  acceptSelected: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  showPreferences: boolean;
  logConsent: () => void;
};

const defaultConsent: ConsentType = {
  necessary: true, // Always required
  analytics: false,
  functional: false,
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentType>(defaultConsent);
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [showPreferences, setShowPreferences] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Initialize consent from localStorage
  useEffect(() => {
    // Only run once on client side and make sure we're in a browser environment
    if (typeof window === 'undefined' || initialized) return;

    try {
      const storedConsent = localStorage.getItem('user-consent');
      if (storedConsent) {
        const parsedConsent = JSON.parse(storedConsent);
        // Make sure the parsed consent has the expected structure
        if (typeof parsedConsent === 'object' && parsedConsent !== null) {
          // Ensure all required properties exist
          const validConsent = {
            necessary: true, // Always required
            analytics: Boolean(parsedConsent.analytics),
            functional: Boolean(parsedConsent.functional)
          };
          setConsentState(validConsent);
          setShowBanner(false);
        }
      }
    } catch (e) {
      console.error('Error parsing stored consent:', e);
      // If there's an error, reset the consent
      localStorage.removeItem('user-consent');
    } finally {
      setInitialized(true);
    }
  }, [initialized]);

  // Log consent to console and potentially to a server
  const logConsent = () => {
    // Skip if not in browser
    if (typeof window === 'undefined') return;
    
    const consentLog = {
      consent: consent,
      timestamp: new Date().toISOString(),
      userAgent: window.navigator.userAgent,
    };
    
    console.log('Consent logged:', consentLog);
    
    // Here you would typically send this to your backend
    // Example:
    // fetch('/api/log-consent', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(consentLog),
    // });
  };

  const setConsent = (newConsent: ConsentType) => {
    // Skip if not in browser
    if (typeof window === 'undefined') return;
    
    // Necessary cookies are always required
    const updatedConsent = { ...newConsent, necessary: true };
    setConsentState(updatedConsent);
    
    // Use try-catch to handle potential localStorage errors
    try {
      localStorage.setItem('user-consent', JSON.stringify(updatedConsent));
    } catch (e) {
      console.error('Error saving consent to localStorage:', e);
    }
  };

  const acceptAll = () => {
    const allAccepted: ConsentType = {
      necessary: true,
      analytics: true,
      functional: true,
    };
    setConsent(allAccepted);
    setShowBanner(false);
    setShowPreferences(false); // Also close preferences panel if open
    logConsent();
  };

  const rejectAll = () => {
    setConsent(defaultConsent);
    setShowBanner(false);
    setShowPreferences(false); // Also close preferences panel if open
    logConsent();
  };

  const acceptSelected = () => {
    setShowBanner(false);
    setShowPreferences(false); // Also close preferences panel if open
    logConsent();
  };

  const openPreferences = () => {
    setShowPreferences(true);
    setShowBanner(true); // Ensure the overlay is visible
  };

  const closePreferences = () => {
    setShowPreferences(false);
  };

  return (
    <ConsentContext.Provider
      value={{
        consent,
        showBanner,
        setConsent,
        acceptAll,
        rejectAll,
        acceptSelected,
        openPreferences,
        closePreferences,
        showPreferences,
        logConsent,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}
