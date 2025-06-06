import { NextResponse } from 'next/server';
import { validateSpotifyConfig } from '@/utils/spotifyApi';

// System health check endpoint
export async function GET() {
  const startTime = Date.now();
  
  try {
    // Check environment configuration
    const envChecks = {
      nodeEnv: process.env.NODE_ENV || 'development',
      hasEmailConfig: !!(process.env.SENDGRID_API_KEY || process.env.RESEND_API_KEY),
      hasSpotifyConfig: validateSpotifyConfig().isConfigured,
      hasSiteUrl: !!process.env.NEXT_PUBLIC_SITE_URL,
    };

    // Check system resources
    const systemChecks = {
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      platform: process.platform,
      nodeVersion: process.version,
    };

    // Check external services
    const serviceChecks = {
      spotify: validateSpotifyConfig(),
      email: {
        sendgrid: !!process.env.SENDGRID_API_KEY,
        resend: !!process.env.RESEND_API_KEY,
      },
    };

    // Calculate response time
    const responseTime = Date.now() - startTime;

    // Determine overall health status
    const isHealthy = envChecks.hasEmailConfig && 
                     responseTime < 1000 && 
                     systemChecks.memory.heapUsed < 500 * 1024 * 1024; // 500MB

    const status = isHealthy ? 'healthy' : 'degraded';

    return NextResponse.json({
      status,
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      version: process.env.npm_package_version || '1.0.0',
      environment: envChecks,
      system: {
        ...systemChecks,
        memory: {
          used: `${Math.round(systemChecks.memory.heapUsed / 1024 / 1024)}MB`,
          total: `${Math.round(systemChecks.memory.heapTotal / 1024 / 1024)}MB`,
          external: `${Math.round(systemChecks.memory.external / 1024 / 1024)}MB`,
        },
        uptime: `${Math.round(systemChecks.uptime / 60)}min`,
      },
      services: serviceChecks,
      endpoints: {
        contact: '/api/contact',
        artistStats: '/api/artist-stats',
        analytics: '/api/analytics',
        health: '/api/health',
      },
    }, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      responseTime: `${Date.now() - startTime}ms`,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  }
}
