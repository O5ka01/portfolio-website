"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ReleaseBannerContextType = {
  showBanner: boolean;
  closeBanner: () => void;
};

const ReleaseBannerContext = createContext<ReleaseBannerContextType | undefined>(undefined);

export function ReleaseBannerProvider({ children }: { children: ReactNode }) {
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Always show banner on page load/reload
  useEffect(() => {
    // Only run once on client side
    if (typeof window === 'undefined' || initialized) return;
    
    // Always show the banner on each page visit
    setShowBanner(true);
    setInitialized(true);
  }, [initialized]);

  const closeBanner = () => {
    setShowBanner(false);
    // No longer saving to localStorage
  };

  return (
    <ReleaseBannerContext.Provider
      value={{
        showBanner,
        closeBanner,
      }}
    >
      {children}
    </ReleaseBannerContext.Provider>
  );
}

export function useReleaseBanner() {
  const context = useContext(ReleaseBannerContext);
  if (context === undefined) {
    throw new Error('useReleaseBanner must be used within a ReleaseBannerProvider');
  }
  return context;
}
