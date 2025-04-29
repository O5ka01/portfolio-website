/**
 * Utility functions for performance optimization
 */
import { type Metric } from 'web-vitals';

// Monitor Core Web Vitals in production
export const monitorWebVitals = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Function to log the metrics
    const reportWebVitals = (metric: Metric) => {
      // You can send these metrics to your analytics service
      console.log(metric);
    };
    
    // Import the newest web-vitals API
    import('web-vitals').then((webVitals) => {
      webVitals.onCLS(reportWebVitals);
      webVitals.onFID(reportWebVitals);
      webVitals.onFCP(reportWebVitals);
      webVitals.onLCP(reportWebVitals);
      webVitals.onTTFB(reportWebVitals);
    });
  }
};

// Prefetch visible links on hover
export const prefetchOnHover = (url: string) => {
  if (typeof window !== 'undefined') {
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.href = url;
    prefetchLink.as = 'document';
    document.head.appendChild(prefetchLink);
  }
};

// Lazy load third-party resources
export const lazyLoadThirdParty = (callback: () => void) => {
  if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
      (window as Window & typeof globalThis & { requestIdleCallback: (callback: () => void) => number }).requestIdleCallback(callback);
    } else {
      setTimeout(callback, 1000);
    }
  }
};

// Optimize session storage
export const cacheInSessionStorage = <T>(key: string, data: T, expirationMinutes = 30) => {
  if (typeof window !== 'undefined') {
    const now = new Date();
    const item = {
      value: data,
      expiry: now.getTime() + expirationMinutes * 60 * 1000,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  }
};

export const getFromSessionStorage = <T>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }
    return item.value as T;
  }
  return null;
};
