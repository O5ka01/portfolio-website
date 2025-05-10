"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import BlogMobileMenu from './BlogMobileMenu';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faTimes } from '@fortawesome/free-solid-svg-icons';

interface BlogNavbarProps {
  onSearch?: (searchTerm: string) => void;
}

const BlogNavbar = ({ onSearch }: BlogNavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();
  
  // Close mobile menu on window resize (when switching to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint in Tailwind
        setMobileMenuOpen(false);
      }
      // Auto-close search on small screens when resizing down
      if (window.innerWidth < 640 && showSearch) { // sm breakpoint
        setShowSearch(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showSearch]);

  // Track if search is active/applied
  const [searchApplied, setSearchApplied] = useState(false);

  // Handle search submit
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onSearch) {
      if (searchTerm.trim()) {
        onSearch(searchTerm.trim());
        setSearchApplied(true);
      } else {
        onSearch('');
        setSearchApplied(false);
      }
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setSearchApplied(false);
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <>
      <nav 
        aria-label="Blog navigation" 
        className="sticky top-0 z-50 bg-warm-beige/80 backdrop-blur-sm border-b border-accent-primary/20 px-4 sm:px-6 py-3 transition-all duration-300 shadow-sm"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 overflow-hidden">
            <Link href="/" className="text-xl font-bold text-dark-text hover:text-accent-tertiary transition-colors flex-shrink-0">O$ka</Link>
            <span className="hidden sm:inline text-sm text-accent-tertiary/70 px-2 py-1 bg-accent-primary/10 rounded-full truncate">
              {t('blog.title')}
            </span>
            {/* Mobile title indicator */}
            <span className="sm:hidden text-xs text-accent-tertiary/70 px-2 py-0.5 bg-accent-primary/10 rounded-full truncate flex-shrink-0">
              Blog
            </span>
          </div>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex gap-6 items-center">
            {/* Search Icon/Button */}
            <button 
              onClick={() => {
                setShowSearch(!showSearch);
                // Keep indication when closing search but search is still applied
              }}
              className={`text-dark-text hover:text-accent-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded-full p-2 relative ${searchApplied ? 'text-accent-primary' : ''}`}
              aria-label={showSearch ? t('blog.closeSearch') : t('blog.search')}
            >
              <FontAwesomeIcon icon={showSearch ? faTimes : faSearch} />
              {searchApplied && !showSearch && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-primary rounded-full"></span>
              )}
            </button>

            <Link 
              href="/" 
              className="text-dark-text hover:text-accent-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded px-2 py-1 flex items-center gap-2"
              aria-label="Back to home"
            >
              <FontAwesomeIcon icon={faHome} className="text-sm" />
              <span>{t('navigation.home')}</span>
            </Link>
            
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Controls - Only visible on mobile */}
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={() => {
                setShowSearch(!showSearch);
                // If opening search on mobile, close mobile menu
                if (!showSearch && mobileMenuOpen) {
                  setMobileMenuOpen(false);
                }
              }}
              className={`text-dark-text hover:text-accent-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded-full p-1.5 relative ${searchApplied ? 'text-accent-primary' : ''}`}
              aria-label={showSearch ? t('blog.closeSearch') : t('blog.search')}
            >
              <FontAwesomeIcon icon={showSearch ? faTimes : faSearch} size="sm" />
              {searchApplied && !showSearch && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-primary rounded-full"></span>
              )}
            </button>
            
            <LanguageSwitcher />
            
            <button
              id="hamburger-button"
              className="flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded-md ml-1"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                // If opening menu on mobile, close search
                if (!mobileMenuOpen && showSearch) {
                  setShowSearch(false);
                }
              }}
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

        {/* Search Bar - shown when search is active */}
        {showSearch && (
          <motion.div 
            className="max-w-6xl mx-auto mt-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {searchApplied && (
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-xs sm:text-sm text-dark-text flex-shrink-0">{t('blog.searchingFor')}:</span>
                <span className="bg-accent-primary text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full flex items-center gap-2 max-w-full overflow-hidden">
                  <span className="truncate">{searchTerm}</span>
                  <button onClick={clearSearch} className="text-white/80 hover:text-white flex-shrink-0" aria-label="Clear search">
                    <FontAwesomeIcon icon={faTimes} className="text-xs" />
                  </button>
                </span>
              </div>
            )}
            <form onSubmit={(e) => handleSearch(e)} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (searchApplied && e.target.value === '') {
                    clearSearch();
                  }
                }}
                placeholder={t('blog.searchPlaceholder') || 'Search articles...'}
                className={`w-full py-2 px-3 sm:px-4 pr-11 bg-white/80 border ${searchApplied ? 'border-accent-primary text-accent-tertiary font-medium' : 'border-accent-primary/20 text-dark-text'} rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all text-sm sm:text-base`}
                aria-label={t('blog.searchPlaceholder') || 'Search articles'}
                autoFocus
              />
              {searchTerm && (
                <button 
                  type="button" 
                  onClick={clearSearch}
                  className="absolute right-9 top-1/2 -translate-y-1/2 text-dark-text/50 hover:text-dark-text transition-colors"
                  aria-label="Clear search"
                >
                  <FontAwesomeIcon icon={faTimes} size="xs" />
                </button>
              )}
              <button 
                type="submit" 
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-accent-primary/20 hover:bg-accent-primary/30 text-accent-tertiary rounded-full transition-colors"
                aria-label={t('blog.search') || 'Search'}
              >
                <FontAwesomeIcon icon={faSearch} size="xs" />
              </button>
            </form>
          </motion.div>
        )}
      </nav>

      {/* Blog Mobile Menu Component - specialized for blog page */}
      <BlogMobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default BlogNavbar;
