/**
 * Utility functions for performance optimization
 */

// Enhanced Web Vitals monitoring with analytics integration
export const monitorWebVitals = () => {
  // We'll use the Vercel Speed Insights instead to avoid module resolution issues
  return;
};

// Advanced prefetching with priority
export const prefetchOnHover = (url: string, priority: 'high' | 'low' = 'low') => {
  if (typeof window !== 'undefined') {
    // Check if we've already prefetched this URL
    if (document.querySelector(`link[rel="prefetch"][href="${url}"]`)) {
      return; // Already prefetched
    }

    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.href = url;
    prefetchLink.as = 'document';
    
    if (priority === 'high') {
      prefetchLink.setAttribute('fetchpriority', 'high');
    }
    
    document.head.appendChild(prefetchLink);
  }
};

// Intelligent lazy loading with IntersectionObserver
export const lazyLoadWithObserver = (elementSelector: string, loadCallback: (element: Element) => void) => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadCallback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' }); // Load when element is within 200px of viewport
    
    document.querySelectorAll(elementSelector).forEach(element => {
      observer.observe(element);
    });
    
    return observer;
  }
  
  return null;
};

// Optimized lazy load for third-party resources
export const lazyLoadThirdParty = (callback: () => void) => {
  if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
      (window as Window & typeof globalThis & { requestIdleCallback: (callback: () => void) => number }).requestIdleCallback(callback);
    } else {
      setTimeout(callback, 1000);
    }
  }
};

// Enhanced browser storage with TTL for local storage
interface CacheItem<T> {
  value: T;
  expiry: number;
}

// Local storage with TTL
export const setInLocalStorage = <T>(key: string, data: T, expirationDays = 7) => {
  if (typeof window !== 'undefined') {
    try {
      const now = new Date();
      const item: CacheItem<T> = {
        value: data,
        expiry: now.getTime() + expirationDays * 24 * 60 * 60 * 1000,
      };
      localStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error('Error storing in localStorage:', error);
      return false;
    }
  }
  return false;
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    try {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) return null;

      const item: CacheItem<T> = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch (error) {
      console.error('Error retrieving from localStorage:', error);
      return null;
    }
  }
  return null;
};

// Session storage with TTL
export const cacheInSessionStorage = <T>(key: string, data: T, expirationMinutes = 30) => {
  if (typeof window !== 'undefined') {
    try {
      const now = new Date();
      const item: CacheItem<T> = {
        value: data,
        expiry: now.getTime() + expirationMinutes * 60 * 1000,
      };
      sessionStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error('Error storing in sessionStorage:', error);
      return false;
    }
  }
  return false;
};

export const getFromSessionStorage = <T>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    try {
      const itemStr = sessionStorage.getItem(key);
      if (!itemStr) return null;

      const item: CacheItem<T> = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        sessionStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch (error) {
      console.error('Error retrieving from sessionStorage:', error);
      return null;
    }
  }
  return null;
};
