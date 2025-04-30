import React from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-warm-beige bg-opacity-80 z-50 backdrop-blur-sm transition-all duration-300 animate-fade-in">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-dark-text font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
