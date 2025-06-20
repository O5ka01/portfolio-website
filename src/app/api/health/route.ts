/**
 * Health Check API
 * "Simplicity is the ultimate sophistication" - Steve Jobs
 * 
 * Essential system monitoring for production deployment
 */

import { NextResponse } from 'next/server';
import { validateSpotifyConfig } from '@/utils/spotifyApi';
import { cache } from '@/utils/cache';
import { siteConfig, healthConfig } from '@/utils/config';

export async function GET() {
  const startTime = Date.now();
  
  try {
    // Core system checks
    const systemHealth = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: siteConfig.isDevelopment ? 'development' : 'production',
      uptime: Math.floor(process.uptime()),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024), // MB
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024), // MB
      },
    };

    // Service checks
    const services = {
      spotify: validateSpotifyConfig(),
      cache: {
        isHealthy: true,
        stats: cache.getStats(),
      },
    };

    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Determine overall health
    const isHealthy = 
      services.spotify.isConfigured && 
      responseTime < healthConfig.timeout &&
      systemHealth.memory.used < 500; // Under 500MB

    return NextResponse.json({
      status: isHealthy ? 'healthy' : 'degraded',
      responseTime: `${responseTime}ms`,
      system: systemHealth,
      services,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
