"use client";

import { useEffect } from 'react';

/**
 * This component manually clears translation cache on mount
 * without toggling the language or causing UI twitching
 */
export default function ForceTranslationRefresh() {
  useEffect(() => {
    // Only run once on mount and only in the browser
    if (typeof window !== 'undefined') {
      console.log('Cleaning translation caches');
      
      // Find and remove all translation caches from sessionStorage
      const keysToRemove = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith('translations-')) {
          keysToRemove.push(key);
        }
      }
      
      // Remove each cached translation
      keysToRemove.forEach(key => {
        sessionStorage.removeItem(key);
      });
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  // This component doesn't render anything
  return null;
}
