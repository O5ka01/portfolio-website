import { NextResponse } from 'next/server';
import { edgeConfig } from './src/utils/edgeConfig';

export const config = { 
  matcher: [
    '/api/config/:path*',
    // Add other path patterns here that should use Edge Config
  ] 
};

export async function middleware(request) {
  try {
    // Example: returning language configuration from Edge Config
    if (request.nextUrl.pathname === '/api/config/language') {
      const defaultLanguage = await edgeConfig.get('defaultLanguage').catch(() => 'de');
      const availableLanguages = await edgeConfig.get('availableLanguages').catch(() => ['de', 'en']);
      const featuredContent = await edgeConfig.get('featuredContent').catch(() => null);
      
      return NextResponse.json({
        defaultLanguage: defaultLanguage || 'de',
        availableLanguages: availableLanguages || ['de', 'en'],
        featuredContent
      });
    }

    // Example: Get featured content for homepage
    if (request.nextUrl.pathname === '/api/config/featured') {
      const language = request.nextUrl.searchParams.get('lang') || 'de';
      const featuredContent = await edgeConfig.get(`featuredContent.${language}`).catch(() => null);
      
      return NextResponse.json({
        featuredContent: featuredContent || null
      });
    }
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of any errors, return a generic response with defaults
    return NextResponse.json({
      defaultLanguage: 'de',
      availableLanguages: ['de', 'en'],
      featuredContent: null,
      error: 'Failed to retrieve configuration'
    }, { status: 500 });
  }

  // Proceed normally if no special handling
  return NextResponse.next();
}
