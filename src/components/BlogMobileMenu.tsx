"use client";

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SocialIcons from './SocialIcons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface BlogMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const BlogMobileMenu: React.FC<BlogMobileMenuProps> = ({ isOpen, onClose }) => {
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

  return (
    <div 
      className={`fixed inset-0 bg-warm-beige z-40 flex flex-col py-20 px-6 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <div className="flex flex-col gap-6 text-center text-xl">
        {/* Home link */}
        <Link 
          href="/" 
          onClick={onClose}
          className="py-3 px-4 flex items-center justify-center gap-2 text-dark-text hover:text-accent-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-tertiary focus:ring-opacity-50 rounded"
          aria-label="Back to home page"
        >
          <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
          <span>{t('navigation.home')}</span>
        </Link>
      </div>
      
      <div className="mt-auto pt-6 border-t border-accent-primary/30">
        <SocialIcons />
      </div>
    </div>
  );
};

export default BlogMobileMenu;
