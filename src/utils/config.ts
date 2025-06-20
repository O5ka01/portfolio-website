/**
 * Core Configuration
 * Following Steve Jobs' philosophy: "Simplicity is the ultimate sophistication"
 * Every setting here serves a specific, essential purpose.
 */

// Environment validation
const requiredEnvVars = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

// Core site configuration
export const siteConfig = {
  name: 'Ole Heinrichs (O$ka)',
  url: requiredEnvVars.NEXT_PUBLIC_SITE_URL,
  defaultLocale: 'de',
  locales: ['de', 'en'],
  isDevelopment: requiredEnvVars.NODE_ENV === 'development',
  isProduction: requiredEnvVars.NODE_ENV === 'production',
} as const;

// API configuration - only for essential endpoints
export const apiConfig = {
  // Rate limiting - simple and effective
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // per window
  },
  
  // Cache settings - minimal but effective
  cache: {
    defaultTtl: 5 * 60 * 1000, // 5 minutes
    spotifyTtl: 30 * 60 * 1000, // 30 minutes for Spotify data
  },
  
  // Spotify API configuration
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    artistId: '4BTWTI3mEAVmYQbe94r0MY', // O$ka's Spotify artist ID
  },
} as const;

// Health check configuration
export const healthConfig = {
  timeout: 5000, // 5 seconds
  criticalServices: ['spotify'] as const,
} as const;

/**
 * Validate environment configuration
 */
export function validateEnvironment(): { isValid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  if (!siteConfig.url) missing.push('NEXT_PUBLIC_SITE_URL');
  if (!apiConfig.spotify.clientId) missing.push('SPOTIFY_CLIENT_ID');
  if (!apiConfig.spotify.clientSecret) missing.push('SPOTIFY_CLIENT_SECRET');
  
  return {
    isValid: missing.length === 0,
    missing,
  };
}

/**
 * Simple language configuration (replaces edgeConfig)
 */
export async function getDefaultLanguage(): Promise<'de' | 'en'> {
  // Default to German for this portfolio
  return 'de';
}

/**
 * Featured content configuration (replaces edgeConfig)
 */
export async function getFeaturedContent(): Promise<null> {
  // No featured content needed for this simplified portfolio
  return null;
}
