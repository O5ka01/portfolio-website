import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Define canonical domain
  const canonicalDomain = 'https://oleoskarheinrichs.com';
  
  return {
    rules: [
      {
        // Main rules for canonical domain
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/_vercel/',
        ],
      },
      {
        // Specific rules for non-canonical domains
        userAgent: '*',
        disallow: '/',
      },
    ],
    sitemap: `${canonicalDomain}/sitemap.xml`,
    host: canonicalDomain,
  };
}
