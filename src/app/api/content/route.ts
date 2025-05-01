import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/utils/config';
import { createApiError, handleApiError } from '@/utils/errorHandler';
import { DatabaseConnector } from '@/utils/database';
import { createApiRoute } from '@/utils/apiMiddleware';
import { z } from 'zod';

// Get database instance
const db = DatabaseConnector.getInstance();

// Define content request validation schema
const contentRequestSchema = z.object({
  type: z.string().min(1),
  language: z.string().optional().default(siteConfig.defaultLocale),
  slug: z.string().optional(),
});

/**
 * API route to get content
 */
async function contentHandler(request: NextRequest) {
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const params = {
    type: searchParams.get('type') || '',
    language: searchParams.get('language') || siteConfig.defaultLocale,
    slug: searchParams.get('slug') || undefined,
  };
  
  // Validate parameters
  const { type, slug } = contentRequestSchema.parse(params);
  
  // Handle different content types
  try {
    let data;
    
    // Map content type to appropriate collection
    const collectionMap: Record<string, string> = {
      'project-highlights': 'projects',
      'blog-posts': 'blogPosts',
      'experiences': 'experiences'
    };
    
    const collection = collectionMap[type] || type;
    
    // Get data based on whether we need a single item or a collection
    if (slug) {
      data = await db.collection(collection).find({ slug }).first();
      if (!data) {
        throw createApiError(`Content with slug '${slug}' not found`, 404, 'info');
      }
    } else {
      data = await db.collection(collection).find().toArray();
    }
    
    // Return formatted response
    return NextResponse.json(
      { success: true, data },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=600', // 10 minutes
        } 
      }
    );
  } catch (error) {
    return handleApiError(error, { path: '/api/content', method: 'GET' });
  }
}

// Export the GET handler with API middleware
export const GET = createApiRoute(contentHandler, {
  validationTarget: 'searchParams',
  cache: { ttl: 600 },
});
