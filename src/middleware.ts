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
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // 1. Security headers for all routes
  // Most security headers are already set in next.config.js, but here we can add custom logic
  response.headers.set('X-Middleware-Cache', 'hit');

  // 2. Cache control for static assets
  if (PUBLIC_ASSETS.test(pathname) && !pathname.includes('/_next/data/')) {
    response.headers.set('Cache-Control', CACHE_CONTROL_VALUE);
  }

  // 3. Automatic language detection for first-time visitors without saved preference
  // Only check on root requests and when no saved preference exists
  if (pathname === '/' || pathname === '') {
    // Skip language detection if cookie is already set
    const cookie = request.cookies.get('preferred-language');
    if (!cookie) {
      // Detect language from browser
      const locale = getLocale(request);
      
      // Only redirect if it's not the default locale
      if (locale !== defaultLocale) {
        // Store detected language in cookie
        const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
        response.cookies.set('preferred-language', locale, {
          path: '/',
          maxAge: 60 * 60 * 24 * 365, // 1 year
        });
        return response;
      }
    }
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
