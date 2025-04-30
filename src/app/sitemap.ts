import { MetadataRoute } from 'next';

// Constants
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oleoskarheinrichs.com';
const lastModified = new Date();

// Supported languages
const languages = ['de', 'en'];

// Available routes (add new routes here as your site grows)
const routes = [
  '',       // Home page
  '/blog',  // Blog page
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Create sitemap entries for all routes in all languages
  const routeEntries = routes.flatMap(route => {
    return languages.map(lang => ({
      url: `${baseUrl}${lang === 'de' ? '' : `/${lang}`}${route}`,
      lastModified,
      changeFrequency: route === '' ? 'weekly' : 'monthly' as 'weekly' | 'monthly',
      priority: route === '' ? 1.0 : 0.8,
    }));
  });

  return [...routeEntries];
}
