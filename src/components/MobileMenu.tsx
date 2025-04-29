"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SocialIcons from './SocialIcons';

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
    <div 
      className={`fixed inset-0 bg-warm-beige z-40 flex flex-col py-20 px-6 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <div className="flex flex-col gap-6 text-center text-xl">
        <button 
          onClick={() => scrollToSection('projects')} 
          className="py-3 text-dark-text hover:text-accent-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded"
          aria-label="View projects section"
        >
          {t('navigation.projects')}
        </button>
        <button 
          onClick={() => scrollToSection('experience')} 
          className="py-3 text-dark-text hover:text-accent-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded"
          aria-label="View experience section"
        >
          {t('navigation.experience')}
        </button>
        <button 
          onClick={() => scrollToSection('blog')} 
          className="py-3 text-dark-text hover:text-accent-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded"
          aria-label="View blog section"
        >
          {t('navigation.blog')}
        </button>
        <button 
          onClick={() => scrollToSection('connect')} 
          className="py-3 text-dark-text hover:text-accent-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded"
          aria-label="View connect section"
        >
          {t('navigation.connect')}
        </button>
      </div>
      <div className="mt-auto pt-6 border-t border-accent-primary/30">
        <SocialIcons />
      </div>
    </div>
  );
};

export default MobileMenu;
