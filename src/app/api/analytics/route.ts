/**
 * Analytics API
 * "Simplicity is the ultimate sophistication" - Steve Jobs
 * 
 * Essential analytics tracking for portfolio insights
 */

import { NextRequest } from 'next/server';
import { withApiMiddleware } from '@/utils/apiMiddleware';
import { createApiError } from '@/utils/errorHandler';

/**
 * Simple analytics event structure
 */
interface AnalyticsEvent {
  event: string;
  page?: string;
  timestamp: string;
  ip: string;
}

/**
 * In-memory analytics storage (simple and effective)
 */
const events: AnalyticsEvent[] = [];
const MAX_EVENTS = 1000; // Keep only recent events

/**
 * Track analytics events
 */
export const POST = withApiMiddleware(
  async (req: NextRequest) => {
    const body = await req.json();
    
    if (!body.event || typeof body.event !== 'string') {
      throw createApiError('Event name is required', 400, 'VALIDATION_ERROR');
    }

    const event: AnalyticsEvent = {
      event: body.event,
      page: body.page,
      timestamp: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') || 'unknown',
    };

    // Add event and maintain size limit
    events.push(event);
    if (events.length > MAX_EVENTS) {
      events.shift(); // Remove oldest event
    }

    return { success: true, eventId: events.length };
  },
  { skipRateLimit: false }
);

/**
 * Get analytics summary
 */
export const GET = withApiMiddleware(
  async () => {
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

    // Filter recent events
    const recentEvents = events.filter(e => 
      new Date(e.timestamp).getTime() > oneWeekAgo
    );

    const todayEvents = events.filter(e => 
      new Date(e.timestamp).getTime() > oneDayAgo
    );

    // Calculate simple metrics
    const pageViews = recentEvents.filter(e => e.event === 'page_view');
    const uniquePages = [...new Set(pageViews.map(e => e.page))];
    const topPages = uniquePages
      .map(page => ({
        page,
        views: pageViews.filter(e => e.page === page).length,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    return {
      summary: {
        totalEvents: events.length,
        todayEvents: todayEvents.length,
        weekEvents: recentEvents.length,
        uniquePages: uniquePages.length,
      },
      topPages,
      lastUpdated: new Date().toISOString(),
    };
  },
  {
    cache: {
      key: 'analytics_summary',
      ttl: 5 * 60 * 1000, // 5 minutes
    },
  }
);
