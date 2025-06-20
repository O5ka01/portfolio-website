import { MetadataRoute } from 'next';

// Constants
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oleoskarheinrichs.com';
const lastModified = new Date();

// Supported languages
const languages = ['de', 'en'];

// Available routes with priorities and change frequencies
const routes = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },       // Home page - highest priority
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },  // Blog page

  { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' as const },

];

// Additional important pages for SEO
const additionalPages = [
  // Music-related pages
  { path: '/music', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/releases', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/collaborations', priority: 0.7, changeFrequency: 'monthly' as const },
  
  // Professional pages  
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' as const },

  
  // About pages
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/bio', priority: 0.6, changeFrequency: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Create sitemap entries for main routes in all languages
  const mainRouteEntries = routes.flatMap(route => {
    return languages.map(lang => ({
      url: `${baseUrl}${lang === 'de' ? '' : `/${lang}`}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));
  });

  // Create entries for additional pages (these might not exist yet but are good for SEO planning)
  const additionalEntries = additionalPages.flatMap(page => {
    return languages.map(lang => ({
      url: `${baseUrl}${lang === 'de' ? '' : `/${lang}`}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }));
  });

  // Add specific artist/musician related URLs for better SEO
  const musicianSpecificEntries = [
    {
      url: `${baseUrl}/oska`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ole-heinrichs`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/murphywav`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ];

  return [...mainRouteEntries, ...additionalEntries, ...musicianSpecificEntries];
}
