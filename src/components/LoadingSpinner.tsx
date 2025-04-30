import React from 'react';

type LoadingSpinnerProps = {
  size?: 'small' | 'medium' | 'large';
  color?: string;
};

export default function LoadingSpinner({ 
  size = 'medium', 
  color = 'var(--accent-primary)' 
}: LoadingSpinnerProps) {
  // Determine dimensions based on size prop
  const dimensions = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  }[size];

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${dimensions} rounded-full animate-spin`}
        style={{
          borderColor: `${color} transparent transparent transparent`,
          borderTopColor: color,
        }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
