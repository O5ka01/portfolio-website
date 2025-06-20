"use client";

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faBandcamp, faApple, faSpotify, faYoutube, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faTimes, faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  // Function to handle section navigation
  const scrollToSection = (sectionId: string) => {
    onClose();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Backdrop Overlay - Enhanced blur effect with better browser support */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-300 ease-out md:hidden ${
          isOpen 
            ? 'opacity-100 backdrop-blur-md bg-black/20' 
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
        style={{
          WebkitBackdropFilter: isOpen ? 'blur(12px)' : 'none',
          backdropFilter: isOpen ? 'blur(12px)' : 'none',
        }}
      />

      {/* Mobile Menu Panel - Elegant slide-in with close button */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-80 bg-white/95 backdrop-blur-xl border-l border-neutral-100 z-50 flex flex-col shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Close Button - Elegant and accessible */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100/80 hover:bg-neutral-200/80 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          aria-label="Close menu"
        >
          <FontAwesomeIcon 
            icon={faTimes} 
            className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200" 
          />
        </button>

        {/* Menu Header - Refined spacing */}
        <div className="pt-24 pb-8 px-8">
          <div className="text-sm uppercase tracking-widest text-neutral-400 font-light mb-8">
            Navigation
          </div>
          
          {/* Navigation Links - Enhanced interaction design */}
          <div className="flex flex-col gap-1">
            <button 
              onClick={() => scrollToSection('music')} 
              className="group py-4 px-4 -mx-4 text-left text-lg font-light text-neutral-900 hover:text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              aria-label="View music section"
            >
              <span className="block transform group-hover:translate-x-1 transition-transform duration-200">
                {t('navigation.music')}
              </span>
            </button>
            
            <button 
              onClick={() => scrollToSection('videos')} 
              className="group py-4 px-4 -mx-4 text-left text-lg font-light text-neutral-900 hover:text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              aria-label="View videos section"
            >
              <span className="block transform group-hover:translate-x-1 transition-transform duration-200">
                {t('navigation.videos')}
              </span>
            </button>
            
            <button 
              onClick={() => scrollToSection('blog')} 
              className="group py-4 px-4 -mx-4 text-left text-lg font-light text-neutral-900 hover:text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              aria-label="View blog section"
            >
              <span className="block transform group-hover:translate-x-1 transition-transform duration-200">
                {t('blog.title')}
              </span>
            </button>
            
            <button 
              onClick={() => scrollToSection('connect')} 
              className="group py-4 px-4 -mx-4 text-left text-lg font-light text-neutral-900 hover:text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              aria-label="View connect section"
            >
              <span className="block transform group-hover:translate-x-1 transition-transform duration-200">
                {t('navigation.connect')}
              </span>
            </button>
          </div>
        </div>
        
        {/* Social Links - Elevated design matching Connect section */}
        <div className="mt-auto p-8 border-t border-neutral-100">
          <div className="text-xs uppercase tracking-widest text-neutral-400 font-light mb-6">
            Connect
          </div>
          
          {/* Email Contact - Primary */}
          <div className="mb-6">
            <a 
              href="mailto:info@about-us-records.com" 
              className="group flex items-center gap-3 p-3 -mx-3 rounded-lg hover:bg-neutral-50 transition-all duration-200"
              aria-label="Email info@about-us-records.com"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 group-hover:bg-neutral-200 transition-colors duration-200">
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="text-xs text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200" 
                />
              </div>
              <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200 font-light">
                info@about-us-records.com
              </span>
            </a>
          </div>
          
          {/* Social Platforms Grid - 3x2 layout for mobile */}
          <div className="grid grid-cols-3 gap-4">
            <a 
              href="https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY?si=FBpspC__S7-hAWI5Omf3gQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
              aria-label="Listen on Spotify"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200">
                <FontAwesomeIcon 
                  icon={faSpotify} 
                  className="text-sm text-neutral-500 group-hover:text-neutral-900 transition-colors duration-200" 
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-neutral-600 transition-colors duration-200">
                Spotify
              </span>
            </a>
            
            <a 
              href="https://oskamusic.bandcamp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
              aria-label="Listen on Bandcamp"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200">
                <FontAwesomeIcon 
                  icon={faBandcamp} 
                  className="text-sm text-neutral-500 group-hover:text-neutral-900 transition-colors duration-200" 
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-neutral-600 transition-colors duration-200">
                Bandcamp
              </span>
            </a>
            
            <a 
              href="https://www.instagram.com/oska.hayati/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
              aria-label="Follow on Instagram"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200">
                <FontAwesomeIcon 
                  icon={faInstagram} 
                  className="text-sm text-neutral-500 group-hover:text-neutral-900 transition-colors duration-200" 
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-neutral-600 transition-colors duration-200">
                Instagram
              </span>
            </a>
            
            <a 
              href="https://www.youtube.com/@oska.hayati" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
              aria-label="Watch on YouTube"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200">
                <FontAwesomeIcon 
                  icon={faYoutube} 
                  className="text-sm text-neutral-500 group-hover:text-neutral-900 transition-colors duration-200" 
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-neutral-600 transition-colors duration-200">
                YouTube
              </span>
            </a>
            
            <a 
              href="https://on.soundcloud.com/yc2BjCAlBb9tYhwGk5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
              aria-label="Listen on SoundCloud"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200">
                <FontAwesomeIcon 
                  icon={faSoundcloud} 
                  className="text-sm text-neutral-500 group-hover:text-neutral-900 transition-colors duration-200" 
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-neutral-600 transition-colors duration-200">
                SoundCloud
              </span>
            </a>
            
            <a 
              href="https://music.apple.com/us/artist/o%24ka/1640653279" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
              aria-label="Listen on Apple Music"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200">
                <FontAwesomeIcon 
                  icon={faApple} 
                  className="text-sm text-neutral-500 group-hover:text-neutral-900 transition-colors duration-200" 
                />
              </div>
              <span className="text-xs text-neutral-400 group-hover:text-neutral-600 transition-colors duration-200">
                Apple Music
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
