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
  
  // Ensure visitors land on the main page when accessing the root domain
  if (pathname === '' || pathname === '/') {
    // Create a new URL object based on the request URL
    const url = request.nextUrl.clone();
    
    // Explicitly set the pathname to '/' to ensure we land on the main page
    url.pathname = '/';
    
    // Create a response that redirects to the main page
    const response = NextResponse.redirect(url);
    
    // Set language preference cookie
    const cookie = request.cookies.get('preferred-language');
    if (!cookie) {
      const locale = getLocale(request);
      response.cookies.set('preferred-language', locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }
    
    // Add security headers
    response.headers.set('X-Middleware-Cache', 'hit');
    
    return response;
  }
  
  // For all other routes
  const response = NextResponse.next();
  
  // 1. Security headers for all routes
  response.headers.set('X-Middleware-Cache', 'hit');

  // 2. Cache control for static assets
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
