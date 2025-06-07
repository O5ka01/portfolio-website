import { NextResponse, NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// Supported locales
const locales = ['de', 'en'];
const defaultLocale = 'de';

// Language detection helper
function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get the best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = match(languages, locales, defaultLocale);
  return locale;
}

// Cache-related constants
const PUBLIC_ASSETS = /\.(.*)$/; // Files with extensions (public assets)
const CACHE_CONTROL_VALUE = 'public, max-age=31536000, immutable'; // 1 year cache for static assets

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // If the path already has a locale, just proceed
  if (pathnameHasLocale) {
    const response = NextResponse.next();
    response.headers.set('X-Middleware-Cache', 'hit');
    
    // Set cache control for public assets
    if (PUBLIC_ASSETS.test(pathname) && !pathname.includes('/_next/data/')) {
      response.headers.set('Cache-Control', CACHE_CONTROL_VALUE);
    }
    
    return response;
  }
  
  // Handle language preference for root path visits
  if (pathname === '' || pathname === '/') {
    const response = NextResponse.next();
    
    // Set language preference cookie if not already set
    const cookie = request.cookies.get('preferred-language');
    if (!cookie) {
      const locale = getLocale(request);
      response.cookies.set('preferred-language', locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }
    
    // Set cache headers
    response.headers.set('X-Middleware-Cache', 'hit');
    return response;
  }
  
  // Handle other routes
  const response = NextResponse.next();
  response.headers.set('X-Middleware-Cache', 'hit');
  
  // Set cache control for public assets
  if (PUBLIC_ASSETS.test(pathname) && !pathname.includes('/_next/data/')) {
    response.headers.set('Cache-Control', CACHE_CONTROL_VALUE);
  }
  
  return response;
}

// Define which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/* (API routes)
     * 2. /_next/* (Next.js internals)
     * 3. /_vercel/* (Vercel internals)
     * 4. /favicon.ico, /sitemap.xml, /robots.txt (common static files)
     */
    '/((?!_next|_vercel|api|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
