/**
 * Metadata utilities for SEO optimization
 * Helps generate dynamic, localized metadata for better SEO
 */

import { Metadata } from 'next';
import { siteConfig } from './config';

interface SEOParams {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  locale?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  canonical?: string;
}

/**
 * Generate metadata for any page with proper SEO attributes
 */
export function generateMetadata(params: SEOParams = {}): Metadata {
  const {
    title,
    description,
    keywords = [],
    image,
    url,
    type = 'website',
    locale = 'de_DE',
    publishedTime,
    modifiedTime,
    author = 'Ole Oskar Heinrichs',
    section,
    canonical
  } = params;

  // Default values aligned with your portfolio
  const defaultTitle = 'Ole Oskar Heinrichs | Musician & Marketing Professional';
  const defaultDescription = 'Personal portfolio of Ole Oskar Heinrichs (O$ka) - Musician, Producer, and Marketing Professional specializing in music and AI integration';
  const defaultImage = 'https://res.cloudinary.com/daaynrl8l/image/upload/WhatsApp_Image_2025-04-29_at_11.36.15_v0w2ab.jpg';
  const defaultKeywords = ['Ole Oskar Heinrichs', 'O$ka', 'musician', 'producer', 'marketing professional', 'music', 'AI', 'portfolio'];
  
  // Construct base URL
  const baseUrl = siteConfig.siteUrl;
  const pageUrl = url ? `${baseUrl}${url}` : baseUrl;
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : pageUrl;
  
  // Combine default and custom keywords
  const combinedKeywords = [...defaultKeywords, ...keywords];

  // Construct metadata object
  const metadata: Metadata = {
    title: title ? `${title} | Ole Oskar Heinrichs` : defaultTitle,
    description: description || defaultDescription,
    keywords: combinedKeywords,
    authors: [{ name: author }],
    creator: author,
    publisher: 'Ole Oskar Heinrichs',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    openGraph: {
      title: title ? `${title} | Ole Oskar Heinrichs` : defaultTitle,
      description: description || defaultDescription,
      url: pageUrl,
      siteName: 'Ole Oskar Heinrichs Portfolio',
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title || 'Ole Oskar Heinrichs (O$ka)',
        },
      ],
      locale,
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | Ole Oskar Heinrichs` : defaultTitle,
      description: description || defaultDescription,
      images: [image || defaultImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'de-DE': `${baseUrl}/`,
        'en-US': `${baseUrl}/en`,
      },
    },
  };

  return metadata;
}

/**
 * Generate language-specific metadata
 */
export function getLanguageMetadata(language: string, params: SEOParams = {}): Metadata {
  // Set locale based on language
  const locale = language === 'en' ? 'en_US' : 'de_DE';
  
  // Add language-specific path to URL if not default language
  let url = params.url || '';
  if (language !== siteConfig.defaultLocale && !url.startsWith(`/${language}`)) {
    url = `/${language}${url}`;
  }
  
  return generateMetadata({
    ...params,
    locale,
    url,
  });
}
