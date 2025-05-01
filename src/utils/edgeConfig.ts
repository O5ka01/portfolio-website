import { createClient } from '@vercel/edge-config';

// Define types for Edge Config
interface EdgeConfigClient {
  get: (key: string) => Promise<any>;
}

// Create Edge Config client with fallback if not configured
let edgeConfig: EdgeConfigClient;
try {
  edgeConfig = createClient(process.env.EDGE_CONFIG);
} catch (err) {
  console.warn('Edge Config not initialized. Using fallback mode.');
  // Mock implementation for local development or when Edge Config is not available
  edgeConfig = {
    get: async (key: string) => {
      console.log(`Edge Config fallback: attempted to access key "${key}"`);
      // Return default values based on key
      if (key === 'defaultLanguage') return 'de';
      if (key === 'availableLanguages') return ['de', 'en'];
      if (key.startsWith('featuredContent')) return null;
      return null;
    }
  };
}

export { edgeConfig };

// Helper functions for language-related Edge Config operations
export async function getAvailableLanguages(): Promise<string[]> {
  try {
    // Default fallback if Edge Config is unavailable
    return await edgeConfig.get('availableLanguages') || ['de', 'en'];
  } catch (error) {
    console.error('Failed to fetch available languages from Edge Config', error);
    return ['de', 'en']; // Fallback to your current supported languages
  }
}

export async function getDefaultLanguage(): Promise<string> {
  try {
    return await edgeConfig.get('defaultLanguage') || 'de';
  } catch (error) {
    console.error('Failed to fetch default language from Edge Config', error);
    return 'de'; // Fallback to German as default
  }
}

export async function getFeaturedContent(language = 'de'): Promise<any> {
  try {
    return await edgeConfig.get(`featuredContent.${language}`) || null;
  } catch (error) {
    console.error(`Failed to fetch featured content for ${language}`, error);
    return null;
  }
}
