import { useState, useEffect, useRef } from 'react';

type IntersectionObserverOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

/**
 * Hook to observe when an element enters the viewport
 * @param options Intersection observer options
 * @returns [ref, isIntersecting] - Ref to attach to element and boolean indicating if element is visible
 */
export function useIntersectionObserver({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  once = false,
}: IntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create the observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);
        
        // If once is true and element has intersected, disconnect the observer
        if (once && isElementIntersecting && observerRef.current && targetRef.current) {
          observerRef.current.unobserve(targetRef.current);
        }
      },
      { root, rootMargin, threshold }
    );

    // Observe the target element
    const currentTarget = targetRef.current;
    if (currentTarget) {
      observerRef.current.observe(currentTarget);
    }

    // Clean up on unmount
    return () => {
      if (observerRef.current && currentTarget) {
        observerRef.current.unobserve(currentTarget);
        observerRef.current.disconnect();
      }
    };
  }, [root, rootMargin, threshold, once]);

  return [targetRef, isIntersecting] as const;
}

export default useIntersectionObserver;
