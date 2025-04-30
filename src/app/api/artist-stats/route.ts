import { NextResponse } from 'next/server';
import { ServerCache } from '@/utils/cache';
import { handleApiError } from '@/utils/errorHandler';

// Initialize cache with 1-day TTL for stats (they don't change frequently)
const cache = ServerCache.getInstance({ ttl: 24 * 60 * 60 * 1000 });

// Mock artist statistics - in a real app, these would come from Spotify/SoundCloud APIs
interface ArtistStats {
  plays: number;
  followers: number;
  monthlyListeners: number;
  topTracks: Array<{
    title: string;
    plays: number;
    link: string;
  }>;
  platforms: Record<string, number>;
  growth: {
    monthly: number; // Percentage growth
    yearly: number;
  };
  countries: Array<{
    name: string;
    listeners: number;
  }>;
  lastUpdated: string;
}

// Demo stats for Ole Oskar Heinrichs (O$ka)
const mockStats: ArtistStats = {
  plays: 158742,
  followers: 1243,
  monthlyListeners: 842,
  topTracks: [
    {
      title: 'Midnight Dreams',
      plays: 42587,
      link: 'https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY'
    },
    {
      title: 'Urban Echo',
      plays: 35219,
      link: 'https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY'
    },
    {
      title: 'Neon Lights',
      plays: 27891,
      link: 'https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY'
    }
  ],
  platforms: {
    'Spotify': 124568,
    'SoundCloud': 28945,
    'YouTube': 5229
  },
  growth: {
    monthly: 4.8,
    yearly: 67.2
  },
  countries: [
    { name: 'Germany', listeners: 423 },
    { name: 'United States', listeners: 156 },
    { name: 'United Kingdom', listeners: 87 },
    { name: 'France', listeners: 64 },
    { name: 'Netherlands', listeners: 56 }
  ],
  lastUpdated: new Date().toISOString()
};

/**
 * In a real implementation, this would fetch data from Spotify/SoundCloud APIs
 * For now, we'll return mock data that simulates artist statistics
 */
async function getArtistStats(): Promise<ArtistStats> {
  // In a real implementation, you would fetch from music platform APIs
  // Example with Spotify:
  // const spotifyToken = await getSpotifyToken();
  // const response = await fetch('https://api.spotify.com/v1/artists/{id}', {
  //   headers: { 'Authorization': `Bearer ${spotifyToken}` }
  // });
  // const data = await response.json();
  
  // Instead, we'll return mock data with slight randomization for demo purposes
  const variance = Math.random() * 0.1 - 0.05; // +/- 5% variance
  
  return {
    ...mockStats,
    plays: Math.round(mockStats.plays * (1 + variance)),
    followers: Math.round(mockStats.followers * (1 + variance)),
    monthlyListeners: Math.round(mockStats.monthlyListeners * (1 + variance)),
    lastUpdated: new Date().toISOString()
  };
}

/**
 * API route to get artist statistics
 */
export async function GET() {
  try {
    // Check cache first
    const cacheKey = 'artist-stats';
    const cachedStats = cache.get<ArtistStats>(cacheKey);
    
    if (cachedStats !== null) {
      return NextResponse.json(
        { success: true, data: cachedStats },
        { 
          status: 200,
          headers: {
            'Cache-Control': 'public, max-age=3600', // 1 hour
            'X-Cache': 'HIT'
          } 
        }
      );
    }
    
    // Fetch fresh stats
    const stats = await getArtistStats();
    
    // Cache the result
    cache.set(cacheKey, stats);
    
    // Return response
    return NextResponse.json(
      { success: true, data: stats },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=3600', // 1 hour
          'X-Cache': 'MISS'
        } 
      }
    );
  } catch (error) {
    return handleApiError(error, { path: '/api/artist-stats', method: 'GET' });
  }
}
