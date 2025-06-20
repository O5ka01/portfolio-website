"use client";

import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

const ResponsiveNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close mobile menu on window resize (when switching to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint in Tailwind
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav 
        aria-label="Main navigation" 
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl brand-logo text-black">O$ka</div>
            
            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex gap-8 items-center">
              <a 
                href="#music" 
                className="text-neutral-600 hover:text-black text-sm font-light transition-colors duration-300" 
                aria-label="View music section"
              >
                Music
              </a>
              <a 
                href="#videos" 
                className="text-neutral-600 hover:text-black text-sm font-light transition-colors duration-300" 
                aria-label="View music videos section"
              >
                Videos
              </a>
              <a 
                href="#blog" 
                className="text-neutral-600 hover:text-black text-sm font-light transition-colors duration-300" 
                aria-label="View blog section"
              >
                Blog
              </a>
              <a 
                href="#connect" 
                className="text-neutral-600 hover:text-black text-sm font-light transition-colors duration-300" 
                aria-label="View connect section"
              >
                Connect
              </a>
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Controls - Only visible on mobile */}
            <div className="flex items-center gap-4 md:hidden">
              <LanguageSwitcher />
              <button
                id="hamburger-button"
                className="flex flex-col justify-center items-center w-10 h-10 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-md"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
                aria-controls="mobile-nav"
              >
                <span 
                  className={`block w-5 h-0.5 bg-black absolute transition-transform duration-200 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}
                  aria-hidden="true"
                ></span>
                <span 
                  className={`block w-5 h-0.5 bg-black absolute transition-opacity duration-200 ease-in-out ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                  aria-hidden="true"
                ></span>
                <span 
                  className={`block w-5 h-0.5 bg-black absolute transition-transform duration-200 ease-in-out ${mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}
                  aria-hidden="true"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Component */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default ResponsiveNavbar;
