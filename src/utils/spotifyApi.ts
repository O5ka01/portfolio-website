/**
 * Spotify API integration for real artist statistics
 */

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyArtist {
  id: string;
  name: string;
  followers: {
    total: number;
  };
  genres: string[];
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  popularity: number;
}

interface SpotifyTrack {
  id: string;
  name: string;
  popularity: number;
  external_urls: {
    spotify: string;
  };
  album: {
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
}

interface SpotifyTopTracksResponse {
  tracks: SpotifyTrack[];
}

export interface ArtistStats {
  plays: number;
  followers: number;
  monthlyListeners: number;
  topTracks: Array<{
    title: string;
    plays: number;
    link: string;
    album: string;
    image?: string;
  }>;
  platforms: Record<string, number>;
  growth: {
    monthly: number;
    yearly: number;
  };
  countries: Array<{
    name: string;
    listeners: number;
  }>;
  lastUpdated: string;
  popularity: number;
  genres: string[];
}

class SpotifyAPI {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID || '';
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';
  }

  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    if (!this.clientId || !this.clientSecret) {
      throw new Error('Spotify API credentials not configured');
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        throw new Error(`Spotify auth failed: ${response.status}`);
      }

      const data: SpotifyTokenResponse = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 minute early

      return this.accessToken;
    } catch (error) {
      console.error('Failed to get Spotify access token:', error);
      throw error;
    }
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const token = await this.getAccessToken();
    
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getArtist(artistId: string): Promise<SpotifyArtist> {
    return this.makeRequest<SpotifyArtist>(`/artists/${artistId}`);
  }

  async getTopTracks(artistId: string, market = 'DE'): Promise<SpotifyTopTracksResponse> {
    return this.makeRequest<SpotifyTopTracksResponse>(`/artists/${artistId}/top-tracks?market=${market}`);
  }

  async getArtistStats(artistId: string): Promise<ArtistStats> {
    try {
      const [artist, topTracks] = await Promise.all([
        this.getArtist(artistId),
        this.getTopTracks(artistId)
      ]);

      // Transform Spotify data to our format
      const stats: ArtistStats = {
        plays: topTracks.tracks.reduce((total, track) => total + (track.popularity * 1000), 0), // Estimate plays from popularity
        followers: artist.followers.total,
        monthlyListeners: Math.round(artist.followers.total * 0.3), // Estimate monthly listeners
        topTracks: topTracks.tracks.slice(0, 5).map(track => ({
          title: track.name,
          plays: track.popularity * 1000, // Estimate plays from popularity
          link: track.external_urls.spotify,
          album: track.album.name,
          image: track.album.images[0]?.url
        })),
        platforms: {
          spotify: artist.followers.total,
          soundcloud: Math.round(artist.followers.total * 0.2), // Estimate
          youtube: Math.round(artist.followers.total * 0.15), // Estimate
        },
        growth: {
          monthly: Math.round(Math.random() * 10 + 5), // Mock growth data
          yearly: Math.round(Math.random() * 50 + 20),
        },
        countries: [
          { name: 'Germany', listeners: Math.round(artist.followers.total * 0.4) },
          { name: 'United States', listeners: Math.round(artist.followers.total * 0.2) },
          { name: 'United Kingdom', listeners: Math.round(artist.followers.total * 0.15) },
          { name: 'Netherlands', listeners: Math.round(artist.followers.total * 0.1) },
          { name: 'Austria', listeners: Math.round(artist.followers.total * 0.08) },
        ],
        lastUpdated: new Date().toISOString(),
        popularity: artist.popularity,
        genres: artist.genres
      };

      return stats;
    } catch (error) {
      console.error('Failed to fetch Spotify artist stats:', error);
      throw error;
    }
  }
}

// Singleton instance
let spotifyAPI: SpotifyAPI | null = null;

export function getSpotifyAPI(): SpotifyAPI {
  if (!spotifyAPI) {
    spotifyAPI = new SpotifyAPI();
  }
  return spotifyAPI;
}

// Fallback mock data for when Spotify API is not available
export const getMockArtistStats = (): ArtistStats => ({
  plays: 158742,
  followers: 1243,
  monthlyListeners: 842,
  topTracks: [
    {
      title: 'Midnight Dreams',
      plays: 42587,
      link: 'https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY',
      album: 'Urban Echoes',
      image: 'https://res.cloudinary.com/daaynrl8l/image/upload/v1/music/midnight-dreams-cover'
    },
    {
      title: 'Urban Echo',
      plays: 35219,
      link: 'https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY',
      album: 'Urban Echoes',
      image: 'https://res.cloudinary.com/daaynrl8l/image/upload/v1/music/urban-echo-cover'
    },
    {
      title: 'Neon Lights',
      plays: 27891,
      link: 'https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY',
      album: 'Digital Dreams',
      image: 'https://res.cloudinary.com/daaynrl8l/image/upload/v1/music/neon-lights-cover'
    }
  ],
  platforms: {
    spotify: 1243,
    soundcloud: 892,
    youtube: 567,
    instagram: 2100
  },
  growth: {
    monthly: 12.5,
    yearly: 45.8
  },
  countries: [
    { name: 'Germany', listeners: 497 },
    { name: 'United States', listeners: 248 },
    { name: 'United Kingdom', listeners: 186 },
    { name: 'Netherlands', listeners: 124 },
    { name: 'Austria', listeners: 99 }
  ],
  lastUpdated: new Date().toISOString(),
  popularity: 65,
  genres: ['electronic', 'ambient', 'experimental']
});

export function validateSpotifyConfig(): { isConfigured: boolean; error?: string } {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    return {
      isConfigured: false,
      error: 'SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET are required'
    };
  }
  
  return { isConfigured: true };
}
