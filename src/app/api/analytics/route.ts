import { NextRequest, NextResponse } from 'next/server';
import { createApiError, handleApiError } from '@/utils/errorHandler';
import { ServerCache } from '@/utils/cache';
import { z } from 'zod';

// Cache for analytics data (shorter TTL for real-time insights)
const cache = ServerCache.getInstance({ ttl: 5 * 60 * 1000 }); // 5 minutes

// Validation schema for analytics events
const analyticsEventSchema = z.object({
  event: z.string().min(1).max(50),
  page: z.string().optional(),
  section: z.string().optional(),
  value: z.number().optional(),
  metadata: z.record(z.any()).optional(),
  timestamp: z.string().optional(),
});

const pageViewSchema = z.object({
  page: z.string().min(1),
  referrer: z.string().optional(),
  userAgent: z.string().optional(),
  language: z.string().optional(),
  timestamp: z.string().optional(),
});

// In-memory storage for demo (in production, use a proper database)
interface AnalyticsEvent {
  id: string;
  event: string;
  page?: string;
  section?: string;
  value?: number;
  metadata?: Record<string, any>;
  timestamp: string;
  ip: string;
  userAgent?: string;
}

interface PageView {
  id: string;
  page: string;
  referrer?: string;
  userAgent?: string;
  language?: string;
  timestamp: string;
  ip: string;
}

// Simple in-memory storage (replace with database in production)
const events: AnalyticsEvent[] = [];
const pageViews: PageView[] = [];

// Rate limiting for analytics (more lenient than contact form)
const rateLimits: Record<string, { count: number; resetTime: number }> = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // 100 events per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  
  if (!rateLimits[ip]) {
    rateLimits[ip] = { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
  } else if (rateLimits[ip].resetTime < now) {
    rateLimits[ip] = { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
  }
  
  rateLimits[ip].count++;
  return rateLimits[ip].count <= RATE_LIMIT_MAX;
}

// Track custom events
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      throw createApiError('Rate limit exceeded', 429, 'warning', { ip });
    }

    const body = await request.json();
    const { type } = body;

    if (type === 'pageview') {
      // Handle page view tracking
      const validationResult = pageViewSchema.safeParse(body);
      if (!validationResult.success) {
        throw createApiError('Invalid page view data', 400, 'info');
      }

      const pageView: PageView = {
        id: crypto.randomUUID(),
        ...validationResult.data,
        timestamp: validationResult.data.timestamp || new Date().toISOString(),
        ip,
        userAgent: request.headers.get('user-agent') || undefined,
      };

      pageViews.push(pageView);
      
      // Keep only last 1000 page views in memory
      if (pageViews.length > 1000) {
        pageViews.splice(0, pageViews.length - 1000);
      }

    } else {
      // Handle custom events
      const validationResult = analyticsEventSchema.safeParse(body);
      if (!validationResult.success) {
        throw createApiError('Invalid event data', 400, 'info');
      }

      const event: AnalyticsEvent = {
        id: crypto.randomUUID(),
        ...validationResult.data,
        timestamp: validationResult.data.timestamp || new Date().toISOString(),
        ip,
        userAgent: request.headers.get('user-agent') || undefined,
      };

      events.push(event);
      
      // Keep only last 1000 events in memory
      if (events.length > 1000) {
        events.splice(0, events.length - 1000);
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    return handleApiError(error, { path: '/api/analytics', method: 'POST' });
  }
}

// Get analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '24h';
    const type = searchParams.get('type') || 'summary';

    // Calculate time filter
    const now = new Date();
    let since: Date;
    
    switch (timeframe) {
      case '1h':
        since = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case '24h':
        since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    const cacheKey = `analytics-${type}-${timeframe}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Filter data by timeframe
    const filteredPageViews = pageViews.filter(pv => new Date(pv.timestamp) >= since);
    const filteredEvents = events.filter(e => new Date(e.timestamp) >= since);

    let responseData;

    switch (type) {
      case 'pageviews':
        responseData = {
          pageViews: filteredPageViews,
          total: filteredPageViews.length,
          timeframe,
        };
        break;

      case 'events':
        responseData = {
          events: filteredEvents,
          total: filteredEvents.length,
          timeframe,
        };
        break;

      case 'summary':
      default:
        // Generate summary statistics
        const topPages = filteredPageViews.reduce((acc, pv) => {
          acc[pv.page] = (acc[pv.page] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const topEvents = filteredEvents.reduce((acc, e) => {
          acc[e.event] = (acc[e.event] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const referrers = filteredPageViews.reduce((acc, pv) => {
          if (pv.referrer) {
            const domain = new URL(pv.referrer).hostname;
            acc[domain] = (acc[domain] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>);

        responseData = {
          summary: {
            totalPageViews: filteredPageViews.length,
            totalEvents: filteredEvents.length,
            uniquePages: Object.keys(topPages).length,
            timeframe,
          },
          topPages: Object.entries(topPages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([page, views]) => ({ page, views })),
          topEvents: Object.entries(topEvents)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([event, count]) => ({ event, count })),
          topReferrers: Object.entries(referrers)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([referrer, count]) => ({ referrer, count })),
          lastUpdated: new Date().toISOString(),
        };
        break;
    }

    // Cache the result
    cache.set(cacheKey, responseData);

    return NextResponse.json(responseData);

  } catch (error) {
    return handleApiError(error, { path: '/api/analytics', method: 'GET' });
  }
}
