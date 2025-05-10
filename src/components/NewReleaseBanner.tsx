"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useReleaseBanner } from '@/context/ReleaseBannerContext';

const NewReleaseBanner = () => {
  const { showBanner, closeBanner } = useReleaseBanner();
  const [isReady, setIsReady] = useState(false);

  // Wait for client-side hydration to complete before showing
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Don't render until client-side hydration is complete AND banner should be shown
  if (!isReady || !showBanner) return null;

  return (
    <div 
      className="fixed inset-0 z-60 overflow-y-auto flex items-center justify-center" 
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
      onClick={(e) => {
        // Only close if clicking the background overlay, not the modal content
        if (e.target === e.currentTarget) {
          closeBanner();
        }
      }}
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Background overlay - increased z-index to be higher than the header but lower than modal content */}
        <div className="fixed inset-0 bg-dark-text bg-opacity-75 transition-opacity z-55" aria-hidden="true"></div>

        {/* Release banner content */}
        <div className="relative bg-warm-beige rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full mx-auto animate-fadeIn z-70">
          {/* Close button positioned at top right */}
          <button
            type="button"
            onClick={closeBanner}
            className="absolute top-2 right-2 text-dark-text/70 hover:text-dark-text z-10 p-1 rounded-full bg-warm-beige/80"
            aria-label="Banner schließen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Large cover image at top */}
          <div className="relative w-full aspect-square overflow-hidden">
            <Image 
              src="https://res.cloudinary.com/daaynrl8l/image/upload/cover_x5vbcm.jpg"
              alt="Wegen Mir - New Release by O$ka"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority
              loading="eager"
            />
            <div className="absolute top-4 left-4 bg-white text-dark-text px-3 py-1 rounded-full font-bold text-sm shadow-md animate-pulse">
              NEU
            </div>
          </div>
          
          <div className="px-6 py-5">
            <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-tight text-dark-text">
              &quot;Wegen Mir&quot; JETZT DRAUSSEN!
            </h3>
            
            <Link 
              href="https://oska.lnk.to/WegenMir"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-md px-4 py-3 bg-accent-secondary text-lg font-semibold text-dark-text hover:bg-accent-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-secondary transition-all hover:scale-[1.03] hover:shadow-lg relative overflow-hidden"
            >
              <span className="mr-2 relative z-10">Jetzt streamen</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <span className="absolute inset-0 bg-accent-tertiary transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReleaseBanner;
