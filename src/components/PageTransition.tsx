"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  // Variants for page transitions with Apple-style animations
  const variants = {
    hidden: { opacity: 0, y: 8 },
    enter: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],  // Enhanced Apple-style cubic-bezier
        staggerChildren: 0.06,
        when: "beforeChildren",
        delayChildren: 0.1
      } 
    },
    exit: { 
      opacity: 0, 
      y: -8,
      transition: { 
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      className="min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
}
