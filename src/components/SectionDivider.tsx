import React from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

type SectionDividerProps = {
  variant?: 'wave' | 'diagonal' | 'curved' | 'triangle';
  fillColor?: string;
  className?: string;
  invert?: boolean;
  height?: number;
};

export default function SectionDivider({
  variant = 'wave',
  fillColor = 'var(--background)',
  className = '',
  invert = false,
  height = 50,
}: SectionDividerProps) {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    once: true,
  });
  
  // Different SVG paths for different divider styles
  const paths = {
    wave: invert
      ? 'M0,32 C320,0 420,110 800,32 L800,0 L0,0 Z'
      : 'M0,0 C320,32 420,0 800,32 L800,0 L0,0 Z',
    diagonal: invert
      ? 'M0,0 L800,50 L800,0 L0,0 Z'
      : 'M0,50 L800,0 L800,0 L0,0 Z',
    curved: invert
      ? 'M0,0 C200,0 600,50 800,0 L800,0 L0,0 Z'
      : 'M0,0 C200,50 600,0 800,0 L800,0 L0,0 Z',
    triangle: invert
      ? 'M0,0 L400,50 L800,0 L800,0 L0,0 Z'
      : 'M0,0 L400,50 L800,0 L800,0 L0,0 Z',
  };
  
  return (
    <div 
      ref={ref}
      className={`w-full overflow-hidden ${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        height: `${height}px`,
        transition: 'opacity 0.6s ease-in-out',
      }}
      aria-hidden="true"
    >
      <svg 
        viewBox="0 0 800 50" 
        preserveAspectRatio="none" 
        className="w-full h-full"
        style={{ 
          display: 'block',
          transform: invert ? 'rotate(180deg)' : 'none',
        }}
      >
        <path 
          d={paths[variant]}
          fill={fillColor}
          style={{
            transition: 'all 0.6s ease-in-out',
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        />
      </svg>
    </div>
  );
}
