/**
 * API Middleware for centralizing common API functionality
 */
import { NextRequest, NextResponse } from 'next/server';
import { createApiError, handleApiError } from './errorHandler';
import { z } from 'zod';

type ApiHandler = (req: NextRequest, context?: Record<string, unknown>) => Promise<NextResponse> | NextResponse;
type MiddlewareFunction = (handler: ApiHandler) => ApiHandler;

// Standard API response format
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    timestamp: string;
    requestId?: string;
    [key: string]: unknown;
  };
}

/**
 * Generate a unique request ID for tracing
 */
function generateRequestId(): string {
  return `req-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Rate limiting middleware
 */
export function withRateLimit(options: { windowMs: number; maxRequests: number }): MiddlewareFunction {
  // Simple in-memory rate limiting (in production, use Redis or similar)
  const ipRequestCount: Record<string, { count: number; resetTime: number }> = {};
  
  return (handler) => async (req, context) => {
    try {
      // Get client IP for rate limiting
      const ip = req.headers.get('x-forwarded-for') || 'unknown';
      
      // Check rate limit
      const now = Date.now();
      if (!ipRequestCount[ip]) {
        ipRequestCount[ip] = { count: 0, resetTime: now + options.windowMs };
      } else if (ipRequestCount[ip].resetTime < now) {
        // Reset if window has passed
        ipRequestCount[ip] = { count: 0, resetTime: now + options.windowMs };
      }
      
      // Increment count and check limit
      ipRequestCount[ip].count++;
      if (ipRequestCount[ip].count > options.maxRequests) {
        throw createApiError('Rate limit exceeded. Please try again later.', 429, 'warning', { ip });
      }
      
      return await handler(req, context);
    } catch (error) {
      return handleApiError(error, { path: req.nextUrl.pathname, method: req.method });
    }
  };
}

/**
 * Request validation middleware using Zod schemas
 */
export function withValidation<T>(schema: z.ZodType<T>, target: 'json' | 'searchParams' = 'json'): MiddlewareFunction {
  return (handler) => async (req, context) => {
    try {
      let data: unknown;
      
      if (target === 'json' && !['GET', 'HEAD'].includes(req.method)) {
        data = await req.json();
      } else if (target === 'searchParams') {
        const params: Record<string, string> = {};
        req.nextUrl.searchParams.forEach((value, key) => {
          params[key] = value;
        });
        data = params;
      }
      
      const validatedData = schema.parse(data);
      
      // Add validated data to context
      const extendedContext = { ...context, validatedData };
      
      return await handler(req, extendedContext);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return handleApiError(
          createApiError(
            'Invalid request data: ' + error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
            400,
            'info'
          ),
          { path: req.nextUrl.pathname, method: req.method }
        );
      }
      return handleApiError(error, { path: req.nextUrl.pathname, method: req.method });
    }
  };
}

/**
 * Caching middleware
 */
export function withCache(options: { ttl: number; scope?: 'private' | 'public' }): MiddlewareFunction {
  const { ttl, scope = 'public' } = options;
  
  return (handler) => async (req, context) => {
    try {
      // Only cache GET requests
      if (req.method !== 'GET') {
        return await handler(req, context);
      }
      
      const response = await handler(req, context);
      
      // Add cache headers to response
      response.headers.set(
        'Cache-Control',
        `${scope}, max-age=${ttl}, s-maxage=${ttl * 2}`
      );
      
      return response;
    } catch (error) {
      return handleApiError(error, { path: req.nextUrl.pathname, method: req.method });
    }
  };
}

/**
 * Response wrapper to ensure consistent API response format
 */
export function withResponseFormat(): MiddlewareFunction {
  return (handler) => async (req, context) => {
    try {
      const requestId = generateRequestId();
      const startTime = Date.now();
      
      // Call the handler
      const response = await handler(req, { ...context, requestId });
      
      // If the response is already formatted, return it
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        
        // If the response is already in our format, just add the timing info
        if ('success' in data) {
          const newResponseData = {
            ...data,
            meta: {
              ...data.meta,
              requestId,
              timestamp: new Date().toISOString(),
              responseTime: `${Date.now() - startTime}ms`,
            },
          };
          
          return NextResponse.json(newResponseData, {
            status: response.status,
            headers: response.headers,
          });
        }
      }
      
      // Format the response as our standard API response
      const formattedResponse: ApiResponse = {
        success: response.ok,
        data: await response.json(),
        meta: {
          timestamp: new Date().toISOString(),
          requestId,
          responseTime: `${Date.now() - startTime}ms`,
        },
      };
      
      return NextResponse.json(formattedResponse, {
        status: response.status,
        headers: response.headers,
      });
    } catch (error) {
      return handleApiError(error, { path: req.nextUrl.pathname, method: req.method });
    }
  };
}

/**
 * Combine multiple middleware functions
 */
export function composeMiddleware(...middlewares: MiddlewareFunction[]): MiddlewareFunction {
  return (handler) => {
    return middlewares.reduceRight((prev, middleware) => middleware(prev), handler);
  };
}

/**
 * Create a standard API route with common middleware
 */
export function createApiRoute(handler: ApiHandler, options: {
  validate?: z.ZodType<unknown>;
  validationTarget?: 'json' | 'searchParams';
  cache?: { ttl: number; scope?: 'private' | 'public' };
  rateLimit?: { windowMs: number; maxRequests: number };
} = {}) {
  const middleware: MiddlewareFunction[] = [withResponseFormat()];
  
  if (options.validate) {
    middleware.push(withValidation(options.validate, options.validationTarget));
  }
  
  if (options.cache) {
    middleware.push(withCache(options.cache));
  }
  
  if (options.rateLimit) {
    middleware.push(withRateLimit(options.rateLimit));
  }
  
  return composeMiddleware(...middleware)(handler);
}

/**
 * Basic middleware to add common headers and logging
 * This can be used as a simple way to enhance API routes without the full middleware stack
 */
export async function apiMiddleware(req: NextRequest): Promise<void> {
  // Log request information
  console.log(`API Request: ${req.method} ${req.nextUrl.pathname}`);
  
  // Add any global request processing here
  return Promise.resolve();
}
