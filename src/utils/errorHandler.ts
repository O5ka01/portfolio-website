/**
 * Elegant Error Handling
 * "Simplicity is the ultimate sophistication" - Steve Jobs
 * 
 * Clean, focused error handling for our three essential APIs
 */

import { NextResponse } from 'next/server';

/**
 * Standard API error structure
 */
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  timestamp: string;
}

/**
 * Create a standardized API error
 */
export function createApiError(
  message: string,
  status: number = 500,
  code?: string
): ApiError {
  return {
    message,
    status,
    code,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Handle API errors with consistent response format
 */
export function handleApiError(error: unknown): NextResponse {
  // Handle our custom API errors
  if (isApiError(error)) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        timestamp: error.timestamp,
      },
      { status: error.status }
    );
  }

  // Handle standard JavaScript errors
  if (error instanceof Error) {
    const apiError = createApiError(error.message, 500, 'INTERNAL_ERROR');
    return NextResponse.json(
      {
        success: false,
        error: apiError.message,
        code: apiError.code,
        timestamp: apiError.timestamp,
      },
      { status: 500 }
    );
  }

  // Handle unknown errors
  const apiError = createApiError('An unexpected error occurred', 500, 'UNKNOWN_ERROR');
  return NextResponse.json(
    {
      success: false,
      error: apiError.message,
      code: apiError.code,
      timestamp: apiError.timestamp,
    },
    { status: 500 }
  );
}

/**
 * Type guard to check if an error is our ApiError
 */
function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'status' in error &&
    'timestamp' in error
  );
}

/**
 * Throw an API error (for use in try/catch blocks)
 */
export function throwApiError(message: string, status: number = 500, code?: string): never {
  throw createApiError(message, status, code);
}
