"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

const ResponsiveNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  
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
        className="sticky top-0 z-50 bg-warm-beige/80 backdrop-blur-sm border-b border-accent-primary/20 px-4 sm:px-6 py-4 transition-all duration-300"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-dark-text">O$ka</div>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex gap-6 items-center">
            <a href="#projects" className="text-dark-text hover:text-accent-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded px-2 py-1" aria-label="View projects section">{t('navigation.projects')}</a>
            <a href="#experience" className="text-dark-text hover:text-accent-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded px-2 py-1" aria-label="View experience section">{t('navigation.experience')}</a>
            <a href="#blog" className="text-dark-text hover:text-accent-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded px-2 py-1" aria-label="View blog section">{t('navigation.blog')}</a>
            <a href="#connect" className="text-dark-text hover:text-accent-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded px-2 py-1" aria-label="View connect section">{t('navigation.connect')}</a>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Controls - Only visible on mobile */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher />
            <button
              id="hamburger-button"
              className="flex flex-col justify-center items-center w-10 h-10 relative focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
              aria-controls="mobile-nav"
            >
              <span 
                className={`block w-6 h-0.5 bg-dark-text absolute transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}
                aria-hidden="true"
              ></span>
              <span 
                className={`block w-6 h-0.5 bg-dark-text absolute transition-opacity duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                aria-hidden="true"
              ></span>
              <span 
                className={`block w-6 h-0.5 bg-dark-text absolute transition-transform duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Component */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default ResponsiveNavbar;
