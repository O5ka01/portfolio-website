import { Metadata } from 'next';

type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  locale?: string;
  type?: string;
  noIndex?: boolean;
};

/**
 * Generates metadata for pages to improve SEO and social sharing
 * @param metadata Custom metadata options
 * @returns Next.js Metadata object
 */
export function generateMetadata({
  title = 'Ole Oskar Heinrichs | Musician & Marketing Professional',
  description = 'Personal portfolio of Ole Oskar Heinrichs (O$ka) - Musician, Producer, and Marketing Professional specializing in music and AI integration',
  keywords = [],
  image = 'https://res.cloudinary.com/daaynrl8l/image/upload/WhatsApp_Image_2025-04-29_at_11.36.15_v0w2ab.jpg',
  canonical = 'https://oleoskarheinrichs.com',
  locale = 'de_DE',
  type = 'website',
  noIndex = false,
}: SeoProps = {}): Metadata {
  const defaultKeywords = [
    'Ole Oskar Heinrichs', 
    'O$ka', 
    'musician', 
    'producer', 
    'marketing professional',
    'music', 
    'AI',
    'portfolio'
  ];
  
  const allKeywords = [...defaultKeywords, ...keywords];
  
  return {
    title,
    description,
    keywords: allKeywords,
    authors: [{ name: 'Ole Oskar Heinrichs' }],
    creator: 'Ole Oskar Heinrichs',
    publisher: 'Ole Oskar Heinrichs',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Ole Oskar Heinrichs Portfolio',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: 'Ole Oskar Heinrichs (O$ka)',
        },
      ],
      locale,
      type: type as 'website' | 'article' | 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
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
      canonical,
      languages: {
        'de-DE': 'https://oleoskarheinrichs.com',
        'en-US': 'https://oleoskarheinrichs.com/en'
      },
    },
  };
}
