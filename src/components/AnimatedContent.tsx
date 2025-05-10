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
  threshold = 0.05,
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
    
    const baseStyles = `transition-all duration-${duration} delay-${delay} ease-out`;
    
    const variantMap: Record<Exclude<AnimationVariant, 'none'>, string> = {
      'fade-in': `${baseStyles} ${isVisible ? 'opacity-100' : 'opacity-5'}`,
      'slide-up': `${baseStyles} transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-5'}`,
      'slide-down': `${baseStyles} transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-5'}`,
      'slide-left': `${baseStyles} transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-5'}`,
      'slide-right': `${baseStyles} transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-5'}`,
      'scale-up': `${baseStyles} transform ${isVisible ? 'scale-100 opacity-100' : 'scale-98 opacity-5'}`,
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
