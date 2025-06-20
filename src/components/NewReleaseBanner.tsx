"use client";

import React, { useState, useEffect } from 'react';
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
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(10px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        .modal-backdrop {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          animation: fadeIn 0.3s ease-out;
        }
        
        .modal-container {
          animation: slideUp 0.4s ease-out;
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .cover-image {
          transition: transform 0.3s ease;
        }
        
        .cover-image:hover {
          transform: scale(1.02);
        }
        
        .close-button {
          background: #F5F5F5;
          border: 1px solid #E5E5E5;
          color: #737373;
          transition: all 0.2s ease;
        }
        
        .close-button:hover {
          background: #E5E5E5;
          color: #404040;
          transform: scale(1.05);
        }
        
        .stream-button {
          background: #1A1A1A;
          color: #FFFFFF;
          border: 2px solid #1A1A1A;
          transition: all 0.2s ease;
        }
        
        .stream-button:hover {
          background: #FFFFFF;
          color: #1A1A1A;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .release-date {
          color: #737373;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
          font-weight: 400;
          letter-spacing: 0.05em;
        }
        
        .release-title {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
          font-weight: 300;
          letter-spacing: -0.02em;
        }
        
        .content-fade-in {
          animation: slideUp 0.5s ease-out 0.1s both;
        }
      `}</style>
      
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4" 
        aria-labelledby="modal-title" 
        role="dialog" 
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeBanner();
        }}
      >
        {/* Clean backdrop */}
        <div className="modal-backdrop fixed inset-0" aria-hidden="true" />

        {/* Modal container */}
        <div className="modal-container relative max-w-sm w-full rounded-2xl overflow-hidden">
          {/* Close button */}
          <button
            type="button"
            onClick={closeBanner}
            className="close-button absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center"
            aria-label="Close banner"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Cover art */}
          <div className="relative w-full aspect-square overflow-hidden">
            <Image 
              src="https://res.cloudinary.com/daaynrl8l/image/upload/smallFFFO_ka.Falsche.Idole_eiykqc.png"
              alt="Falsche Idole - New Release"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="cover-image object-cover"
              priority
              loading="eager"
            />
          </div>

          {/* Content */}
          <div className="content-fade-in p-8 text-center">
            {/* Release info */}
            <div className="mb-6">
              <p className="release-date text-sm uppercase tracking-wider mb-2">
                New Release • June 20, 2025
              </p>
              <h2 className="release-title text-2xl md:text-3xl text-neutral-900 mb-1">
                Falsche Idole
              </h2>
              <p className="text-neutral-600 text-sm">
                O$ka
              </p>
            </div>

            {/* Stream button */}
            <a
              href="https://oska.lnk.to/Idole"
              target="_blank"
              rel="noopener noreferrer"
              className="stream-button inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-medium tracking-wide"
            >
              Stream Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReleaseBanner;
