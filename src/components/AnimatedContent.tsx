import React, { ReactNode } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

type AnimationVariant = 
  | 'fade-in'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale-up'
  | 'none';

type AnimatedContentProps = {
  children: ReactNode;
  animation?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  className?: string;
};

export default function AnimatedContent({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 500,
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
  className = '',
}: AnimatedContentProps) {
  const [ref, isInView] = useIntersectionObserver({
    threshold,
    rootMargin,
    once,
  });

  // Define animation classes based on the selected animation variant
  const getAnimationClasses = (variant: AnimationVariant, isVisible: boolean): string => {
    if (variant === 'none') return '';
    
    const baseStyles = `transition-all duration-${duration} delay-${delay}`;
    
    const variantMap: Record<Exclude<AnimationVariant, 'none'>, string> = {
      'fade-in': `${baseStyles} ${isVisible ? 'opacity-100' : 'opacity-0'}`,
      'slide-up': `${baseStyles} transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`,
      'slide-down': `${baseStyles} transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`,
      'slide-left': `${baseStyles} transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`,
      'slide-right': `${baseStyles} transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`,
      'scale-up': `${baseStyles} transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`,
    };
    
    return variantMap[variant as Exclude<AnimationVariant, 'none'>];
  };

  const animationClasses = getAnimationClasses(animation, isInView);
  
  return (
    <div 
      ref={ref}
      className={`${className} ${animationClasses}`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms` 
      }}
    >
      {children}
    </div>
  );
}
