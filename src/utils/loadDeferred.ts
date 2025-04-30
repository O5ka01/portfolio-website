/**
 * Utility to defer loading of non-critical JavaScript until after the page has loaded
 * @param callback Function to execute when the page is idle
 */
export const loadWhenIdle = (callback: () => void): void => {
  if (typeof window === 'undefined') return;
  
  // Use requestIdleCallback if available, otherwise setTimeout as fallback
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => callback());
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(callback, 1000);
  }
};

/**
 * Utility to load scripts only when they're about to enter the viewport
 * @param elementId ID of the element that triggers the load when it's near viewport
 * @param callback Function to execute when the element is near viewport
 */
export const loadWhenNearViewport = (elementId: string, callback: () => void): void => {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    // Fallback for SSR or browsers without IntersectionObserver
    loadWhenIdle(callback);
    return;
  }
  
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID ${elementId} not found for deferred loading`);
    return;
  }
  
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        callback();
        observer.disconnect();
      }
    },
    { rootMargin: '200px' } // Start loading when element is within 200px of viewport
  );
  
  observer.observe(element);
};

/**
 * Loads a script dynamically with custom attributes
 * @param src Script URL
 * @param attributes Optional additional attributes for the script tag
 * @returns Promise that resolves when the script is loaded
 */
export const loadScript = (src: string, attributes: Record<string, string> = {}): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    
    // Add any custom attributes
    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });
    
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    
    document.body.appendChild(script);
  });
};
