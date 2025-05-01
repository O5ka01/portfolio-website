"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const FeaturedContent = () => {
  const { language, featuredContent, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // You could also fetch directly from API endpoint if needed
    // This is just for demonstration - content is already loaded via LanguageContext
    setIsLoading(true);
    // Simulating a brief loading state
    setTimeout(() => setIsLoading(false), 300);
  }, [language]);

  if (isLoading) {
    return (
      <div className="p-4 my-4 bg-tertiary-100 dark:bg-tertiary-900 rounded-lg animate-pulse">
        <div className="h-6 bg-tertiary-200 dark:bg-tertiary-800 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-tertiary-200 dark:bg-tertiary-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-tertiary-200 dark:bg-tertiary-800 rounded w-5/6"></div>
      </div>
    );
  }

  if (!featuredContent) {
    return null; // Don't render anything if no featured content
  }

  return (
    <div className="p-6 my-6 bg-primary-50 dark:bg-primary-900 border border-primary-200 dark:border-primary-800 rounded-xl shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-accent-400 text-white">
            {/* You can use a different icon based on content type */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          </span>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-medium text-primary-900 dark:text-primary-100">
            {featuredContent.title}
          </h3>
          <p className="mt-2 text-base text-primary-700 dark:text-primary-300">
            {featuredContent.description}
          </p>
          {featuredContent.link && (
            <a
              href={featuredContent.link}
              className="mt-3 inline-flex items-center text-sm font-medium text-accent-tertiary hover:text-accent-tertiary-dark"
            >
              {featuredContent.linkText || t('common.learnMore')}
              <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
