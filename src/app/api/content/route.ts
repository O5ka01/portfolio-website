import { NextRequest, NextResponse } from 'next/server';
import { ServerCache } from '@/utils/cache';
import { siteConfig } from '@/utils/config';
import { createApiError, handleApiError } from '@/utils/errorHandler';

// Initialize the cache with a 10-minute TTL
const cache = ServerCache.getInstance({ ttl: 10 * 60 * 1000 });

// Define content item interfaces
interface BaseContentItem {
  id: string;
  slug?: string;
}

interface ProjectItem extends BaseContentItem {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface BlogPostItem extends BaseContentItem {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

type ContentItemType = ProjectItem | BlogPostItem;

// Content store type definition
type ContentStore = {
  [key: string]: {
    [language: string]: ContentItemType[];
  };
};

// Mock data store - in a real app, this would come from a database or CMS
const contentStore: ContentStore = {
  'project-highlights': {
    de: [
      {
        id: '1',
        title: 'Neueste Musik-Veröffentlichungen',
        description: 'Aktuelle Singles und EPs mit einer Mischung aus elektronischen und akustischen Elementen.',
        imageUrl: `${siteConfig.imageCdn}/image/upload/v1619541234/projects/music.jpg`,
        link: siteConfig.socials.spotify
      },
      {
        id: '2', 
        title: 'Musikproduktion Workshops',
        description: 'Eine Reihe von Online-Workshops über moderne Produktionstechniken.',
        imageUrl: `${siteConfig.imageCdn}/image/upload/v1619541235/projects/workshops.jpg`,
        link: siteConfig.socials.youtube
      }
    ],
    en: [
      {
        id: '1',
        title: 'Latest Music Releases',
        description: 'Recent singles and EPs featuring a blend of electronic and acoustic elements.',
        imageUrl: `${siteConfig.imageCdn}/image/upload/v1619541234/projects/music.jpg`,
        link: siteConfig.socials.spotify
      },
      {
        id: '2',
        title: 'Music Production Workshops',
        description: 'A series of online workshops on modern production techniques.',
        imageUrl: `${siteConfig.imageCdn}/image/upload/v1619541235/projects/workshops.jpg`,
        link: siteConfig.socials.youtube
      }
    ]
  },
  'blog-posts': {
    de: [
      {
        id: 'blog-1',
        title: 'Die Zukunft der KI in der Musikproduktion',
        excerpt: 'Ein Blick auf neue KI-Tools, die den Musikproduktionsprozess verändern.',
        date: '2025-04-15',
        slug: 'ki-musikproduktion'
      },
      {
        id: 'blog-2',
        title: 'Meine Erfahrungen mit dem neuesten FL Studio Update',
        excerpt: 'Eine tiefe Analyse der neuesten Features und wie sie meinen Workflow verbessert haben.',
        date: '2025-03-28',
        slug: 'fl-studio-update'
      }
    ],
    en: [
      {
        id: 'blog-1',
        title: 'The Future of AI in Music Production',
        excerpt: 'A look at emerging AI tools that are transforming the music production process.',
        date: '2025-04-15',
        slug: 'ai-music-production'
      },
      {
        id: 'blog-2',
        title: 'My Experience with the Latest FL Studio Update',
        excerpt: 'An in-depth analysis of the newest features and how they\'ve improved my workflow.',
        date: '2025-03-28',
        slug: 'fl-studio-update'
      }
    ]
  }
};

/**
 * Get content by type and language
 */
function getContent(type: string, language: string = 'de', slug?: string): ContentItemType | ContentItemType[] {
  const defaultLanguage = siteConfig.defaultLocale;
  const contentType = contentStore[type];
  
  if (!contentType) {
    throw createApiError(`Content type '${type}' not found`, 404, 'info');
  }
  
  // Get content in requested language or fall back to default language
  const content = contentType[language] || contentType[defaultLanguage];
  
  if (!content) {
    throw createApiError(`No content available for type '${type}'`, 404, 'info');
  }
  
  // If slug is provided, find the specific content item
  if (slug) {
    const item = content.find((item: ContentItemType) => 'slug' in item && item.slug === slug);
    if (!item) {
      throw createApiError(`Content with slug '${slug}' not found`, 404, 'info');
    }
    return item;
  }
  
  return content;
}

/**
 * API route to get content
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const language = searchParams.get('language') || siteConfig.defaultLocale;
    const slug = searchParams.get('slug') || undefined;
    
    // Validate type parameter
    if (!type) {
      throw createApiError('Content type is required', 400, 'info');
    }
    
    // Generate cache key
    const cacheKey = `content:${type}:${language}${slug ? `:${slug}` : ''}`;
    
    // Check cache first
    const cachedContent = cache.get(cacheKey);
    if (cachedContent !== null) {
      return NextResponse.json(
        { success: true, data: cachedContent },
        { 
          status: 200,
          headers: {
            'Cache-Control': 'public, max-age=600', // 10 minutes
            'X-Cache': 'HIT'
          } 
        }
      );
    }
    
    // Get content
    const content = getContent(type, language, slug || undefined);
    
    // Cache the result
    cache.set(cacheKey, content);
    
    // Return response
    return NextResponse.json(
      { success: true, data: content },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=600', // 10 minutes
          'X-Cache': 'MISS'
        } 
      }
    );
  } catch (error) {
    return handleApiError(error, { path: '/api/content', method: 'GET' });
  }
}
