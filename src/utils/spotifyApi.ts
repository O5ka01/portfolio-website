/**
 * Spotify API Integration
 * "Simplicity is the ultimate sophistication" - Steve Jobs
 * 
 * Clean, focused Spotify integration for artist statistics
 */

import { apiConfig } from './config';
import { cache } from './cache';

/**
 * Essential artist data structure
 */
export interface ArtistStats {
  name: string;
  followers: number;
  popularity: number;
  genres: string[];
  imageUrl?: string;
  externalUrl: string;
}

/**
 * Spotify API configuration validation
 */
export function validateSpotifyConfig(): { isConfigured: boolean; missing: string[] } {
  const missing: string[] = [];
  
  if (!apiConfig.spotify.clientId) missing.push('SPOTIFY_CLIENT_ID');
  if (!apiConfig.spotify.clientSecret) missing.push('SPOTIFY_CLIENT_SECRET');
  
  return {
    isConfigured: missing.length === 0,
    missing,
  };
}

/**
 * Get Spotify access token using client credentials flow
 */
async function getAccessToken(): Promise<string> {
  const cacheKey = 'spotify_access_token';
  const cached = cache.get<string>(cacheKey);
  
  if (cached) {
    return cached;
  }

  const { clientId, clientSecret } = apiConfig.spotify;
  
  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`Spotify auth failed: ${response.status}`);
  }

  const data = await response.json();
  const token = data.access_token;
  
  // Cache token for 50 minutes (tokens expire in 1 hour)
  cache.set(cacheKey, token, 50 * 60 * 1000);
  
  return token;
}

/**
 * Fetch artist statistics from Spotify
 */
export async function getArtistStats(): Promise<ArtistStats> {
  const cacheKey = 'artist_stats';
  const cached = cache.get<ArtistStats>(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const token = await getAccessToken();
    const { artistId } = apiConfig.spotify;
    
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const artist = await response.json();
    
    const stats: ArtistStats = {
      name: artist.name,
      followers: artist.followers.total,
      popularity: artist.popularity,
      genres: artist.genres,
      imageUrl: artist.images?.[0]?.url,
      externalUrl: artist.external_urls.spotify,
    };

    // Cache for 30 minutes
    cache.set(cacheKey, stats, apiConfig.cache.spotifyTtl);
    
    return stats;
  } catch {
    // Return fallback data if API fails
    return getFallbackStats();
  }
}

/**
 * Fallback artist stats when API is unavailable
 */
function getFallbackStats(): ArtistStats {
  return {
    name: 'O$ka',
    followers: 1200, // Approximate fallback
    popularity: 45,
    genres: ['German Hip Hop', 'Rap'],
    externalUrl: 'https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY?si=FBpspC__S7-hAWI5Omf3gQ',
  };
}
