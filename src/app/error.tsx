'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 text-amber-900">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-3xl font-bold">Something went wrong</h1>
        <p className="mb-8 text-lg">
          We apologize for the inconvenience. Please try again later or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 text-white bg-amber-700 rounded-md hover:bg-amber-800 transition-colors"
          >
            Try again
          </button>
          <Link 
            href="/"
            className="px-6 py-3 text-amber-900 bg-amber-100 rounded-md hover:bg-amber-200 transition-colors"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
