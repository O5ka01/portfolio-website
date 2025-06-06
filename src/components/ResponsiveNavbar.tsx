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
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-accent-secondary/5 px-4 sm:px-6 py-3 transition-all duration-300 supports-[backdrop-filter]:bg-background/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-lg font-semibold tracking-tight text-dark-text hover:opacity-80 transition-opacity duration-200">O$ka</div>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex gap-7 items-center">
            <a 
              href="#projects" 
              className="text-dark-text/80 hover:text-dark-text text-sm font-medium transition-all duration-200 relative group" 
              aria-label="View projects section"
            >
              <span>{t('navigation.projects')}</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent-tertiary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#skills" 
              className="text-dark-text/80 hover:text-dark-text text-sm font-medium transition-all duration-200 relative group" 
              aria-label="View skills section"
            >
              <span>{t('navigation.skills')}</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent-tertiary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#experience" 
              className="text-dark-text/80 hover:text-dark-text text-sm font-medium transition-all duration-200 relative group" 
              aria-label="View experience section"
            >
              <span>{t('navigation.experience')}</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent-tertiary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#blog" 
              className="text-dark-text/80 hover:text-dark-text text-sm font-medium transition-all duration-200 relative group" 
              aria-label="View blog section"
            >
              <span>{t('navigation.blog')}</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent-tertiary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#connect" 
              className="text-dark-text/80 hover:text-dark-text text-sm font-medium transition-all duration-200 relative group" 
              aria-label="View connect section"
            >
              <span>{t('navigation.connect')}</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent-tertiary transition-all duration-300 group-hover:w-full"></span>
            </a>
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
