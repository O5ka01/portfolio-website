"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRss, faTimes } from '@fortawesome/free-solid-svg-icons';

interface BlogHeaderProps {
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  allTags: string[];
  onSearch?: (searchTerm: string) => void;
}

export default function BlogHeader({ selectedTag, setSelectedTag, allTags, onSearch }: BlogHeaderProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="mb-12">
      {/* Hero section */}
      <div className="bg-accent-primary/10 rounded-xl p-6 md:p-10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="currentColor" d="M40,-52.7C54.4,-45.2,70.2,-38.3,75.8,-26.2C81.4,-14.1,76.7,3.1,72.2,21.1C67.8,39.1,63.5,57.9,51,67.2C38.5,76.5,17.7,76.5,0.7,75.5C-16.2,74.5,-32.5,72.4,-46.7,64.1C-60.9,55.8,-72.9,41.3,-74.4,26C-75.9,10.7,-66.8,-5.4,-59.6,-20.7C-52.4,-36,-47,-50.5,-37,-59.1C-27,-67.6,-12.4,-70.4,0.5,-71.1C13.5,-71.9,27,-60.3,40,-52.7Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text mb-4">
          {t('blog.title')}
        </h1>
        
        <p className="text-dark-text/80 text-lg md:text-xl md:w-3/4 mb-6">
          {t('blog.headerDescription') || t('blog.description')}
        </p>
        
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search toggle button */}
          <motion.button
            onClick={() => setShowSearch(!showSearch)}
            className="flex items-center gap-2 py-2 px-4 bg-accent-primary/20 hover:bg-accent-primary/30 text-accent-tertiary rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            aria-label={t('blog.search') || 'Search'}
          >
            <FontAwesomeIcon icon={faSearch} />
            {!showSearch && <span>{t('blog.search') || 'Search'}</span>}
          </motion.button>
          
          {/* RSS Feed link - optional */}
          <motion.a
            href="/api/rss"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 px-4 bg-accent-primary/20 hover:bg-accent-primary/30 text-accent-tertiary rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            aria-label={t('blog.rssFeed') || 'RSS Feed'}
          >
            <FontAwesomeIcon icon={faRss} />
            <span>{t('blog.rssFeed') || 'RSS'}</span>
          </motion.a>
          
          {/* Back to home */}
          <Link href="/" passHref>
            <motion.span
              className="flex items-center gap-2 py-2 px-4 bg-accent-primary text-white rounded-lg cursor-pointer transition-colors ml-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('blog.backToHome')}
            </motion.span>
          </Link>
        </div>
      </div>

      {/* Search bar - conditionally shown */}
      {showSearch && (
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('blog.searchPlaceholder') || 'Search articles...'}
              className="w-full py-3 px-5 pr-12 bg-white/50 border border-accent-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all"
              aria-label={t('blog.searchPlaceholder') || 'Search articles'}
            />
            {searchTerm && (
              <button 
                type="button" 
                onClick={clearSearch}
                className="absolute right-14 top-1/2 -translate-y-1/2 text-dark-text/50 hover:text-dark-text transition-colors"
                aria-label="Clear search"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-accent-primary/20 hover:bg-accent-primary/30 text-accent-tertiary rounded-full transition-colors"
              aria-label={t('blog.search') || 'Search'}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </motion.div>
      )}

      {/* Tags filter */}
      {allTags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-dark-text mb-3">{t('blog.categories')}</h2>
          <div className="flex flex-wrap gap-2">
            <motion.button 
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-lg text-sm ${!selectedTag ? 'bg-accent-primary text-white' : 'bg-accent-primary/20 text-accent-tertiary'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('blog.allTags')}
            </motion.button>
            {allTags.map(tag => (
              <motion.button 
                key={tag} 
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg text-sm ${selectedTag === tag ? 'bg-accent-primary text-white' : 'bg-accent-primary/20 text-accent-tertiary'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
