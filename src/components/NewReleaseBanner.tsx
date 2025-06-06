"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useReleaseBanner } from '@/context/ReleaseBannerContext';

const NewReleaseBanner = () => {
  const { showBanner, closeBanner } = useReleaseBanner();
  const [isReady, setIsReady] = useState(false);

  // Calendar event details
  const eventTitle = 'New Single Release';
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=20250620/20250620&details=${encodeURIComponent('Listen to the new single!')}`;

  function downloadICS() {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${eventTitle}\nDTSTART;VALUE=DATE:20250620\nDTEND;VALUE=DATE:20250621\nDESCRIPTION:Listen to the new single!\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'new-single-release.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Wait for client-side hydration to complete before showing
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Don't render until client-side hydration is complete AND banner should be shown
  if (!isReady || !showBanner) return null;

  return (
    <>
      <style jsx>{`
        @keyframes fadeInGently {
          from { 
            opacity: 0; 
            transform: translateY(8px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes subtleGlow {
          0%, 100% { 
            filter: drop-shadow(0 0 8px rgba(255, 179, 71, 0.3));
          }
          50% { 
            filter: drop-shadow(0 0 12px rgba(255, 179, 71, 0.5));
          }
        }
        
        @keyframes diagonalStreaks {
          0% { 
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% { 
            transform: translateX(100%) translateY(100%) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes filmGrain {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.06; }
        }
        
        .modal-container {
          animation: fadeInGently 0.6s ease-out;
          background: linear-gradient(135deg, 
            rgba(11, 5, 1, 0.95) 0%,
            rgba(26, 17, 8, 0.92) 50%,
            rgba(11, 5, 1, 0.95) 100%
          );
          backdrop-filter: blur(16px) saturate(120%);
          border: 1px solid rgba(255, 179, 71, 0.2);
          box-shadow: 
            0 20px 40px -12px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 179, 71, 0.1),
            inset 0 1px 0 rgba(255, 179, 71, 0.15);
        }
        
        .amber-overlay {
          background: 
            radial-gradient(circle at 30% 20%, rgba(255, 179, 71, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, 
              rgba(255, 179, 71, 0.08) 0%,
              rgba(255, 204, 102, 0.05) 30%,
              rgba(11, 5, 1, 0.3) 70%,
              rgba(0, 0, 0, 0.4) 100%
            );
          mix-blend-mode: overlay;
        }
        
        .diagonal-streaks {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .diagonal-streaks::before,
        .diagonal-streaks::after {
          content: '';
          position: absolute;
          width: 200%;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 179, 71, 0.4) 50%, 
            transparent 100%
          );
          animation: diagonalStreaks 8s ease-in-out infinite;
        }
        
        .diagonal-streaks::before {
          top: 20%;
          animation-delay: 0s;
        }
        
        .diagonal-streaks::after {
          top: 60%;
          animation-delay: 4s;
        }
        
        .film-grain {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255, 179, 71, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255, 179, 71, 0.08) 1px, transparent 1px);
          background-size: 4px 4px, 6px 6px;
          animation: filmGrain 3s ease-in-out infinite;
          pointer-events: none;
        }
        
        .cover-container {
          position: relative;
          overflow: hidden;
        }
        
        .cover-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, 
            transparent 0%, 
            rgba(255, 179, 71, 0.1) 30%,
            rgba(255, 179, 71, 0.2) 50%,
            rgba(255, 179, 71, 0.1) 70%,
            transparent 100%
          );
          mix-blend-mode: overlay;
          pointer-events: none;
        }
        
        .date-container {
          animation: fadeInGently 0.8s ease-out 0.2s both;
          background: linear-gradient(135deg, 
            rgba(11, 5, 1, 0.9) 0%,
            rgba(26, 17, 8, 0.95) 100%
          );
          border: 1px solid rgba(255, 179, 71, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .date-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(255, 179, 71, 0.1) 0%,
            transparent 50%,
            rgba(255, 179, 71, 0.05) 100%
          );
        }
        
        .date-text {
          background: linear-gradient(135deg, 
            #FFB347 0%, 
            #FFCC66 50%,
            #FFB347 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(255, 179, 71, 0.3));
          font-family: 'Times New Roman', serif;
          font-weight: 700;
          letter-spacing: 0.15em;
        }
        
        .calendar-button {
          background: linear-gradient(135deg, 
            rgba(11, 5, 1, 0.8) 0%,
            rgba(26, 17, 8, 0.6) 100%
          );
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 179, 71, 0.2);
          transition: all 0.3s ease;
          position: relative;
        }
        
        .calendar-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(255, 179, 71, 0.1) 0%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .calendar-button:hover::before {
          opacity: 1;
        }
        
        .calendar-button:hover {
          transform: translateY(-1px);
          border-color: rgba(255, 179, 71, 0.4);
          box-shadow: 0 4px 12px rgba(255, 179, 71, 0.2);
        }
        
        .calendar-button svg {
          filter: sepia(20%) saturate(150%) hue-rotate(25deg);
          transition: filter 0.3s ease;
        }
        
        .calendar-button:hover svg {
          filter: sepia(40%) saturate(200%) hue-rotate(25deg) brightness(1.1);
        }
        
        .close-button {
          background: linear-gradient(135deg, 
            rgba(11, 5, 1, 0.8) 0%,
            rgba(26, 17, 8, 0.6) 100%
          );
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 179, 71, 0.2);
          transition: all 0.3s ease;
          color: rgba(255, 179, 71, 0.8);
        }
        
        .close-button:hover {
          background: linear-gradient(135deg, 
            rgba(255, 179, 71, 0.2) 0%,
            rgba(255, 179, 71, 0.1) 100%
          );
          color: rgba(255, 179, 71, 1);
          transform: scale(1.05);
          border-color: rgba(255, 179, 71, 0.4);
        }
        
        .background-overlay {
          background: 
            radial-gradient(circle at 50% 30%, rgba(255, 179, 71, 0.08) 0%, transparent 60%),
            linear-gradient(135deg, 
              rgba(11, 5, 1, 0.85) 0%,
              rgba(26, 17, 8, 0.9) 50%,
              rgba(11, 5, 1, 0.85) 100%
            );
          backdrop-filter: blur(12px) saturate(110%);
        }
        
        .archaic-glow {
          animation: subtleGlow 4s ease-in-out infinite;
        }
      `}</style>
      
      <div 
        className="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto" 
        aria-labelledby="modal-title" 
        role="dialog" 
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeBanner();
        }}
      >
        {/* Minimalistic amber background overlay */}
        <div className="background-overlay fixed inset-0 z-55 pointer-events-none" aria-hidden="true">
          <div className="film-grain" />
        </div>

        {/* Refined modal container */}
        <div className="modal-container relative max-w-sm w-full mx-4 overflow-hidden rounded-2xl z-70">
          {/* Diagonal light streaks */}
          <div className="diagonal-streaks" />
          
          {/* Minimalistic close button */}
          <button
            type="button"
            onClick={closeBanner}
            className="close-button absolute top-3 right-3 z-10 p-2 rounded-lg"
            aria-label="Banner schließen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Cover art with amber overlay */}
          <div className="cover-container relative w-full aspect-square">
            <Image 
              src="https://res.cloudinary.com/daaynrl8l/image/upload/smallFFFO_ka.Falsche.Idole_eiykqc.png"
              alt="Falsche Idole - 20.06.2025"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority
              loading="eager"
            />
            <div className="amber-overlay absolute inset-0 pointer-events-none" />
          </div>

          {/* Minimalistic date display */}
          <div className="flex flex-col items-center w-full py-6">
            <div className="date-container px-8 py-3 rounded-lg flex items-center justify-center relative">
              <span className="date-text archaic-glow text-2xl md:text-3xl relative z-10">
                20.06.2025
              </span>
            </div>
          </div>

          {/* Refined calendar buttons */}
          <div className="flex justify-center pb-6">
            <div className="flex gap-4">
              {/* Google Calendar */}
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Add to Google Calendar"
                title="Add to Google Calendar"
                className="calendar-button rounded-lg p-3 flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="8" fill="#4285F4"/>
                  <path d="M33 17v-2a2 2 0 0 0-2-2h-2v2h-2v-2h-6v2h-2v-2h-2a2 2 0 0 0-2 2v2h20z" fill="#fff"/>
                  <rect x="14" y="20" width="20" height="12" rx="2" fill="#fff"/>
                  <rect x="18" y="24" width="12" height="4" rx="2" fill="#4285F4"/>
                </svg>
              </a>
              
              {/* Apple Calendar */}
              <a
                href="#"
                onClick={e => { e.preventDefault(); downloadICS(); }}
                aria-label="Add to Apple Calendar"
                title="Add to Apple Calendar"
                className="calendar-button rounded-lg p-3 flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="8" fill="#FF9500"/>
                  <path d="M31.1 20.13c-.06-3.34 2.72-4.94 2.84-5.02-1.55-2.26-3.97-2.58-4.82-2.61-2.06-.21-4.02 1.19-5.07 1.19-1.06 0-2.67-1.16-4.39-1.13-2.26.03-4.35 1.32-5.5 3.36-2.33 4.04-.59 10.01 1.66 13.28 1.1 1.61 2.41 3.41 4.13 3.34 1.67-.07 2.3-1.08 4.32-1.08 2.02 0 2.59 1.08 4.36 1.04 1.81-.03 2.95-1.64 4.04-3.27.65-.95.92-1.46 1.44-2.56-3.78-1.44-4.38-5.29-4.41-5.44zM26.6 13.12c.9-1.09 1.51-2.6 1.34-4.12-1.29.05-2.85.86-3.77 1.95-.83.97-1.56 2.53-1.29 4.02 1.52.12 3.09-.77 3.72-1.85z" fill="#fff"/>
                </svg>
              </a>
              
              {/* Outlook Calendar */}
              <a
                href="#"
                onClick={e => { e.preventDefault(); downloadICS(); }}
                aria-label="Add to Outlook Calendar"
                title="Add to Outlook Calendar"
                className="calendar-button rounded-lg p-3 flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="8" fill="#0072C6"/>
                  <path d="M34 16h-9a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V17a1 1 0 0 0-1-1zm-1 13h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4h-7v-2h7v2z" fill="#fff"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReleaseBanner;
