/**
 * Configuration settings for the application
 * This centralizes environment variables and other config settings
 */

interface SiteConfig {
  siteName: string;
  siteUrl: string;
  defaultLocale: string;
  availableLocales: string[];
  contactEmail: string;
  apiEndpoints: Record<string, string>;
  analytics: {
    enabled: boolean;
    endpoint?: string;
  };
  imageCdn: string;
  socials: {
    instagram: string;
    linkedin: string;
    youtube: string;
    spotify: string;
    soundcloud: string;
  };
}

export const siteConfig: SiteConfig = {
  siteName: 'Ole Oskar Heinrichs',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://oleoskarheinrichs.com',
  defaultLocale: 'de',
  availableLocales: ['de', 'en'],
  contactEmail: 'info@about-us-records.com', // Replace with your actual contact email
  apiEndpoints: {
    contact: '/api/contact',
    subscribe: '/api/subscribe', // For future newsletter subscription feature
  },
  analytics: {
    enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
    endpoint: process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT,
  },
  imageCdn: 'https://res.cloudinary.com/daaynrl8l',
  socials: {
    instagram: 'https://www.instagram.com/oska.hayati/',
    linkedin: 'https://www.linkedin.com/in/ole-oskar-heinrichs/',
    youtube: 'https://www.youtube.com/@oska.hayati',
    spotify: 'https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY',
    soundcloud: 'https://soundcloud.com/murphywav',
  },
};

/**
 * Cache configuration
 */
export const cacheConfig = {
  staticAssetMaxAge: 31536000, // 1 year in seconds
  pageDataMaxAge: 3600, // 1 hour in seconds
  apiResponseMaxAge: 300, // 5 minutes in seconds
};

/**
 * Server runtime configuration
 */
export const serverConfig = {
  rateLimits: {
    contact: {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 5,
    },
  },
};

/**
 * Get environment-specific configuration
 */
export function getEnvironmentConfig() {
  const environment = process.env.NODE_ENV || 'development';
  const isDev = environment === 'development';
  const isProd = environment === 'production';
  const isTest = environment === 'test';
  
  return {
    environment,
    isDev,
    isProd,
    isTest,
    debug: isDev || process.env.DEBUG === 'true',
  };
}
