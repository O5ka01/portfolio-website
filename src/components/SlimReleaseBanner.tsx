"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useReleaseBanner } from '@/context/ReleaseBannerContext';

const SlimReleaseBanner = () => {
  const { showBanner } = useReleaseBanner();
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Wait for client-side hydration to complete before showing
  useEffect(() => {
    setIsReady(true);

    // Handle scroll events to show/hide the banner
    const handleScroll = () => {
      // Show after scrolling down 200px
      const shouldShow = window.scrollY > 200;
      setIsScrolled(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dismissBanner = () => {
    setIsVisible(false);
  };

  // Don't render until client-side hydration is complete and conditions are met
  if (!isReady || !isVisible || showBanner || !isScrolled) return null;

  return (
    <div className="fixed right-5 bottom-5 z-40 max-w-xs w-full bg-warm-beige rounded-lg shadow-lg animate-fadeIn overflow-hidden" data-slim-banner="true">
      <div className="relative">
        {/* Close button */}
        <button 
          onClick={dismissBanner}
          className="absolute top-2 right-2 text-dark-text/70 hover:text-dark-text z-10 p-1 rounded-full bg-warm-beige/80"
          aria-label="Banner schließen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Banner content */}
        <div className="p-4 flex flex-col items-center">
          <div className="relative w-12 h-12 mb-2 overflow-hidden rounded-md shadow-sm">
            <Image 
              src="https://res.cloudinary.com/daaynrl8l/image/upload/cover_x5vbcm.jpg"
              alt="Wegen Mir - New Release by O$ka"
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          
          <p className="text-sm font-medium text-dark-text text-center mb-3">
            <span className="font-bold">&quot;Wegen Mir&quot;</span> jetzt draußen!
          </p>
          
          <Link 
            href="https://oska.lnk.to/WegenMir"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-accent-secondary hover:bg-accent-tertiary text-dark-text px-3 py-2 rounded-md transition-colors font-medium text-sm"
          >
            Jetzt streamen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SlimReleaseBanner;
