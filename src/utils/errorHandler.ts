/**
 * Server-side error handling utilities
 */
import { NextResponse } from 'next/server';
import { getEnvironmentConfig } from './config';

type ErrorLevel = 'info' | 'warning' | 'error' | 'critical';

interface ApiError extends Error {
  statusCode: number;
  level: ErrorLevel;
  context?: Record<string, unknown>;
}

/**
 * Create a formatted API error
 */
export function createApiError(message: string, statusCode = 500, level: ErrorLevel = 'error', context?: Record<string, unknown>): ApiError {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  error.level = level;
  error.context = context;
  return error;
}

/**
 * Log an error with additional context
 */
export function logError(error: Error | ApiError, additionalContext?: Record<string, unknown>): void {
  const { debug } = getEnvironmentConfig();
  const level = (error as ApiError).level || 'error';
  const statusCode = (error as ApiError).statusCode;
  const context = (error as ApiError).context || {};
  
  // Combine all context
  const fullContext = { ...context, ...additionalContext };
  
  // Format the error message
  const formattedError = {
    message: error.message,
    ...(statusCode && { statusCode }),
    level,
    stack: debug ? error.stack : undefined,
    context: Object.keys(fullContext).length > 0 ? fullContext : undefined,
    timestamp: new Date().toISOString(),
  };
  
  // Log to appropriate console method based on level
  switch (level) {
    case 'info':
      console.info(JSON.stringify(formattedError));
      break;
    case 'warning':
      console.warn(JSON.stringify(formattedError));
      break;
    case 'critical':
      console.error('CRITICAL ERROR:', JSON.stringify(formattedError));
      break;
    case 'error':
    default:
      console.error(JSON.stringify(formattedError));
  }
  
  // In a production environment, you could send critical errors to an external service
  // like Sentry, LogRocket, etc.
}

/**
 * Handle API errors and return appropriate response
 */
export function handleApiError(error: unknown, requestContext?: Record<string, unknown>): NextResponse {
  // Ensure error is an Error object
  const normalizedError = error instanceof Error ? error : new Error(String(error));
  
  // Treat as ApiError if possible
  const apiError = normalizedError as Partial<ApiError>;
  const statusCode = apiError.statusCode || 500;
  
  // Log the error
  logError(normalizedError, requestContext);
  
  // Prepare user-facing error message
  const { isDev } = getEnvironmentConfig();
  let userMessage: string;
  
  if (isDev) {
    // In development, show more details
    userMessage = normalizedError.message;
  } else {
    // In production, show generic messages for 5xx errors
    if (statusCode >= 500) {
      userMessage = 'An unexpected error occurred. Please try again later.';
    } else {
      userMessage = normalizedError.message;
    }
  }
  
  // Return formatted error response
  return NextResponse.json(
    { 
      error: userMessage,
      ...(isDev && { detail: normalizedError.message }),
      success: false 
    },
    { status: statusCode }
  );
}
