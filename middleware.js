import { NextResponse } from 'next/server';
import { edgeConfig } from './src/utils/edgeConfig';

export const config = { 
  matcher: [
    '/api/config/:path*',
    // Add other path patterns here that should use Edge Config
  ] 
};

export async function middleware(request) {
  // Example: returning language configuration from Edge Config
  if (request.nextUrl.pathname === '/api/config/language') {
    const defaultLanguage = await edgeConfig.get('defaultLanguage');
    const availableLanguages = await edgeConfig.get('availableLanguages');
    const featuredContent = await edgeConfig.get('featuredContent');
    
    return NextResponse.json({
      defaultLanguage: defaultLanguage || 'de',
      availableLanguages: availableLanguages || ['de', 'en'],
      featuredContent
    });
  }

  // Example: Get featured content for homepage
  if (request.nextUrl.pathname === '/api/config/featured') {
    const language = request.nextUrl.searchParams.get('lang') || 'de';
    const featuredContent = await edgeConfig.get(`featuredContent.${language}`);
    
    return NextResponse.json({
      featuredContent: featuredContent || null
    });
  }

  // Proceed normally if no special handling
  return NextResponse.next();
}
