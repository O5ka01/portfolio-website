"use client";

import { useRef, useEffect, ReactNode } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface ScrollAnimationSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number; // delay in ms
  id?: string;
  animation?: 'fade' | 'slide-up' | 'slide-right' | 'slide-left' | 'scale' | 'none';
  duration?: number; // duration in seconds
  once?: boolean; // animate only once or every time element comes into view
  threshold?: number; // threshold for intersection observer (0-1)
}

export default function ScrollAnimationSection({ 
  children, 
  className = '', 
  delay = 0, 
  id,
  animation = 'fade',
  duration = 0.7,
  once = true,
  threshold = 0.2
}: ScrollAnimationSectionProps) {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { 
    once, 
    amount: threshold, // Using 'amount' instead of 'threshold'
    margin: "0px 0px -10% 0px" // Start animation slightly before element is in view
  });
  
  // Define animation variants
  const getVariants = (): Variants => {
    switch(animation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration, delay: delay / 1000 } }
        };
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
              duration, 
              delay: delay / 1000,
              ease: [0.33, 1, 0.68, 1] // Apple-style cubic-bezier
            } 
          }
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { 
            opacity: 1, 
            x: 0, 
            transition: { 
              duration, 
              delay: delay / 1000,
              ease: [0.33, 1, 0.68, 1]
            } 
          }
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: 30 },
          visible: { 
            opacity: 1, 
            x: 0, 
            transition: { 
              duration, 
              delay: delay / 1000,
              ease: [0.33, 1, 0.68, 1]
            } 
          }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { 
              duration, 
              delay: delay / 1000,
              ease: [0.33, 1, 0.68, 1]
            } 
          }
        };
      default:
        return {};
    }
  };

  // Trigger animation when in view
  useEffect(() => {
    if (inView) {
      // Add a small timeout to avoid layout thrashing
      const timer = setTimeout(() => {
        controls.start('visible');
      }, 10);
      return () => clearTimeout(timer);
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className={className}
      initial="hidden"
      animate={controls}
      variants={animation !== 'none' ? getVariants() : undefined}
    >
      {children}
    </motion.section>
  );
}
