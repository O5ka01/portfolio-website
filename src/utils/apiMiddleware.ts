/**
 * Essential API Middleware
 * "Simplicity is the ultimate sophistication" - Steve Jobs
 * 
 * Clean, focused middleware for our three core APIs:
 * - Health monitoring
 * - Analytics tracking  
 * - Artist stats (Spotify)
 */

import { NextRequest, NextResponse } from 'next/server';
import { handleApiError, createApiError } from './errorHandler';
import { cache } from './cache';
import { apiConfig } from './config';

/**
 * Standard API response format
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

/**
 * Rate limiting - simple and effective
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);
  
  if (!limit || now > limit.resetTime) {
    // Reset or create new limit
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + apiConfig.rateLimit.windowMs,
    });
    return true;
  }
  
  if (limit.count >= apiConfig.rateLimit.maxRequests) {
    return false;
  }
  
  limit.count++;
  return true;
}

/**
 * Create a clean API response
 */
export function createApiResponse<T>(
  data?: T,
  error?: string
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: !error,
    data,
    error,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Wrap API handlers with essential middleware
 */
export function withApiMiddleware<T>(
  handler: (req: NextRequest) => Promise<T>,
  options: {
    cache?: { key: string; ttl: number };
    skipRateLimit?: boolean;
  } = {}
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      // Rate limiting (unless skipped)
      if (!options.skipRateLimit) {
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        if (!checkRateLimit(ip)) {
          throw createApiError('Rate limit exceeded', 429, 'RATE_LIMIT');
        }
      }

      // Check cache first (if configured)
      if (options.cache) {
        const cached = cache.get<T>(options.cache.key);
        if (cached !== null) {
          return createApiResponse(cached);
        }
      }

      // Execute handler
      const result = await handler(req);

      // Cache result (if configured)
      if (options.cache && result) {
        cache.set(options.cache.key, result, options.cache.ttl);
      }

      return createApiResponse(result);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
