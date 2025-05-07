// Local configuration replacement for Vercel Edge Config
// This eliminates the dependency on @vercel/edge-config

// Define types for our config client
interface EdgeConfigClient {
  get: (key: string) => Promise<unknown>;
}

// Local configuration values
const localConfig = {
  defaultLanguage: 'de',
  availableLanguages: ['de', 'en'],
  featuredContent: {
    de: null,
    en: null
  }
};

// Create a local implementation of the Edge Config client
const edgeConfig: EdgeConfigClient = {
  get: async (key: string) => {
    console.log(`Local config: accessing key "${key}"`);
    
    // Handle nested keys like 'featuredContent.de'
    if (key.includes('.')) {
      const parts = key.split('.');
      let value: Record<string, unknown> = localConfig as Record<string, unknown>;
      
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (value === undefined || typeof value !== 'object' || value === null) return null;
        value = value[part] as Record<string, unknown>;
      }
      
      // Access the final property
      const lastPart = parts[parts.length - 1];
      if (value === undefined || typeof value !== 'object' || value === null) return null;
      return value[lastPart];
    }
    
    // Handle direct keys
    return (localConfig as Record<string, unknown>)[key] || null;
  }
};

export { edgeConfig };

// Helper functions for language-related Edge Config operations
export async function getAvailableLanguages(): Promise<string[]> {
  try {
    // Default fallback if Edge Config is unavailable
    const languages = await edgeConfig.get('availableLanguages');
    return (languages as string[]) || ['de', 'en'];
  } catch (error) {
    console.error('Failed to fetch available languages from Edge Config', error);
    return ['de', 'en']; // Fallback to your current supported languages
  }
}

export async function getDefaultLanguage(): Promise<string> {
  try {
    const defaultLang = await edgeConfig.get('defaultLanguage');
    return (defaultLang as string) || 'de';
  } catch (error) {
    console.error('Failed to fetch default language from Edge Config', error);
    return 'de'; // Fallback to German as default
  }
}

export interface FeaturedContent {
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
  [key: string]: unknown;
}

export async function getFeaturedContent(language = 'de'): Promise<FeaturedContent | null> {
  try {
    const content = await edgeConfig.get(`featuredContent.${language}`);
    return (content as FeaturedContent) || null;
  } catch (error) {
    console.error(`Failed to fetch featured content for ${language}`, error);
    return null;
  }
}
