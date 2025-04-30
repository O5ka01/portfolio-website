/**
 * Data fetching utilities for server components
 * Provides optimized data fetching with caching
 */

import { ServerCache } from './cache';
import { siteConfig } from './config';

// Initialize cache
const cache = ServerCache.getInstance();

interface FetchOptions extends RequestInit {
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  cacheTtl?: number; // Custom TTL for our server cache in seconds
}

/**
 * Fetch data with caching and error handling
 */
export async function fetchData<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  // Generate cache key
  const cacheKey = `fetch:${url}:${JSON.stringify(options)}`;
  const cacheTtl = options.cacheTtl || 60; // Default to 60 seconds

  // Check server-side cache first
  const cachedData = cache.get<T>(cacheKey);
  if (cachedData !== null) {
    return cachedData;
  }

  try {
    // Fetch data
    const response = await fetch(url, options);

    // Handle non-200 responses
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }

    // Parse response
    const data = await response.json() as T;

    // Cache the result
    cache.set(cacheKey, data, cacheTtl * 1000);

    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
}

/**
 * Fetch content from the API based on content type, language, and optional slug
 */
export async function fetchContent<T>(contentType: string, language = siteConfig.defaultLocale, slug?: string) {
  const params = new URLSearchParams({
    type: contentType,
    language
  });

  if (slug) {
    params.append('slug', slug);
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || ''}/api/content?${params.toString()}`;

  const response = await fetchData<{ success: boolean; data: T }>(apiUrl, {
    next: { revalidate: 600 }, // 10 minutes revalidation
    cacheTtl: 600 // 10 minutes server cache
  });

  return response.data;
}

/**
 * Prefetch content for both languages
 * Useful for static pages that need content in multiple languages
 */
export async function prefetchMultilingualContent<T>(contentType: string, slug?: string) {
  const promises = siteConfig.availableLocales.map(lang => {
    return fetchContent<T>(contentType, lang, slug);
  });

  const results = await Promise.allSettled(promises);

  // Create a map of language -> content
  const contentMap = siteConfig.availableLocales.reduce((acc, lang, index) => {
    const result = results[index];
    if (result.status === 'fulfilled') {
      acc[lang] = result.value;
    } else {
      console.error(`Error prefetching content for ${lang}:`, result.reason);
      acc[lang] = null;
    }
    return acc;
  }, {} as Record<string, T | null>);

  return contentMap;
}
