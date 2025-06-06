import { NextResponse } from 'next/server';
import { ServerCache } from '@/utils/cache';
import { handleApiError } from '@/utils/errorHandler';
import { getSpotifyAPI, getMockArtistStats, validateSpotifyConfig, type ArtistStats } from '@/utils/spotifyApi';

// Initialize cache with 6-hour TTL for stats (Spotify data doesn't change frequently)
const cache = ServerCache.getInstance({ ttl: 6 * 60 * 60 * 1000 });

// Ole Oskar Heinrichs (O$ka) Spotify Artist ID
const ARTIST_ID = '4BTWTI3mEAVmYQbe94r0MY';

export async function GET() {
  try {
    const cacheKey = `artist-stats-${ARTIST_ID}`;
    
    // Try to get from cache first
    const cachedStats = cache.get<ArtistStats>(cacheKey);
    if (cachedStats) {
      return NextResponse.json({
        ...cachedStats,
        cached: true,
        cacheAge: Math.round((Date.now() - new Date(cachedStats.lastUpdated).getTime()) / 1000 / 60) // minutes
      });
    }

    // Check if Spotify API is configured
    const spotifyConfig = validateSpotifyConfig();
    let stats: ArtistStats;

    if (spotifyConfig.isConfigured) {
      try {
        // Fetch real data from Spotify
        const spotifyAPI = getSpotifyAPI();
        stats = await spotifyAPI.getArtistStats(ARTIST_ID);
        
        console.log('Successfully fetched Spotify artist stats:', {
          followers: stats.followers,
          topTracks: stats.topTracks.length,
          popularity: stats.popularity
        });
      } catch (spotifyError) {
        console.warn('Failed to fetch from Spotify API, using mock data:', spotifyError);
        stats = getMockArtistStats();
        stats.lastUpdated = new Date().toISOString();
      }
    } else {
      console.warn('Spotify API not configured, using mock data:', spotifyConfig.error);
      stats = getMockArtistStats();
      stats.lastUpdated = new Date().toISOString();
    }

    // Cache the results
    cache.set(cacheKey, stats);

    return NextResponse.json({
      ...stats,
      cached: false,
      dataSource: spotifyConfig.isConfigured ? 'spotify' : 'mock'
    });

  } catch (error) {
    console.error('Artist stats API error:', error);
    
    // Return mock data as fallback
    const fallbackStats = getMockArtistStats();
    return NextResponse.json({
      ...fallbackStats,
      cached: false,
      dataSource: 'fallback',
      error: 'Failed to fetch live data'
    });
  }
}

// Health check for the artist stats API
export async function POST() {
  try {
    const spotifyConfig = validateSpotifyConfig();
    
    if (spotifyConfig.isConfigured) {
      // Test Spotify API connection
      const spotifyAPI = getSpotifyAPI();
      await spotifyAPI.getArtist(ARTIST_ID);
      
      return NextResponse.json({
        status: 'healthy',
        spotify: {
          configured: true,
          connection: 'ok'
        },
        cache: {
          enabled: true,
          ttl: '6 hours'
        },
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({
        status: 'degraded',
        spotify: {
          configured: false,
          error: spotifyConfig.error
        },
        cache: {
          enabled: true,
          ttl: '6 hours'
        },
        fallback: 'mock data',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    return handleApiError(error, { path: '/api/artist-stats', method: 'POST' });
  }
}
