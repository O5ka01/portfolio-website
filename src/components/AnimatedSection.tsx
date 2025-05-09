"use client";

import { useRef, useEffect, useState, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number; // delay in ms
  id?: string;
}

export default function AnimatedSection({ children, className = '', delay = 0, id }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Add a small timeout to create a staggered effect if delay is provided
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        // When 20% of the element is visible, trigger the animation
        threshold: 0.2,
        // Add a slight offset so elements start animating before they're fully visible
        rootMargin: '0px 0px -10% 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${className} transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </section>
  );
}
