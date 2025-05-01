import { createClient } from '@vercel/edge-config';

// Create Edge Config client
// The token and edge config URL will be automatically provided by Vercel
export const edgeConfig = createClient(process.env.EDGE_CONFIG);

// Helper functions for language-related Edge Config operations
export async function getAvailableLanguages() {
  try {
    // Default fallback if Edge Config is unavailable
    return await edgeConfig.get('availableLanguages') || ['de', 'en'];
  } catch (error) {
    console.error('Failed to fetch available languages from Edge Config', error);
    return ['de', 'en']; // Fallback to your current supported languages
  }
}

export async function getDefaultLanguage() {
  try {
    return await edgeConfig.get('defaultLanguage') || 'de';
  } catch (error) {
    console.error('Failed to fetch default language from Edge Config', error);
    return 'de'; // Fallback to German as default
  }
}

export async function getFeaturedContent(language = 'de') {
  try {
    return await edgeConfig.get(`featuredContent.${language}`) || null;
  } catch (error) {
    console.error(`Failed to fetch featured content for ${language}`, error);
    return null;
  }
}
