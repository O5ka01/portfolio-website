import type { Metadata } from "next";
// Import local fonts to use SF Pro or similar system fonts that mimic Apple's design language
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/context/LanguageContext";
import { ConsentProvider } from "@/context/ConsentContext";
import CookieBanner from "@/components/CookieBanner";
import ConditionalScripts from "@/components/ConditionalScripts";
import PageTransition from "@/components/PageTransition";

// Using system fonts that mimic SF Pro Display and SF Pro Text - defined in globals.css
// No need for a font variable since we're using system fonts for better performance

export const metadata: Metadata = {
  title: {
    default: "O$ka (Ole Heinrichs) | Official Website - Musician, Producer & Marketing Professional",
    template: "%s | O$ka - Ole Heinrichs"
  },
  description: "Official website of O$ka (Ole Heinrichs) - German musician, music producer, and marketing professional. Listen to latest releases, book collaborations, and connect with Ole Oskar Heinrichs.",
  keywords: [
    // Primary brand names
    "O$ka", "Oska", "O$ka musician", "O$ka producer", "O$ka artist",
    "Ole Heinrichs", "Ole Oskar Heinrichs", "Ole Heinrichs musician", "Ole Heinrichs producer",
    
    // Professional terms
    "German musician", "music producer Germany", "marketing professional music",
    "musician producer", "music production", "audio production",
    
    // Music related
    "murphywav", "German music", "electronic music producer", "music collaboration",
    "music marketing", "artist management", "music business",
    
    // Location based
    "musician Germany", "producer Germany", "German artist",
    
    // Services
    "music production services", "marketing consultation music", "artist collaboration",
    "music producer for hire", "professional musician Germany"
  ],
  authors: [{ name: "Ole Oskar Heinrichs", url: "https://oleoskarheinrichs.com" }],
  creator: "Ole Oskar Heinrichs (O$ka)",
  publisher: "O$ka - Ole Heinrichs",
  category: "Music & Entertainment",
  classification: "Professional Portfolio",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "O$ka (Ole Heinrichs) | Official Website - Musician & Producer",
    description: "Official website of O$ka (Ole Heinrichs) - German musician, music producer, and marketing professional. Listen to latest releases and book collaborations.",
    url: "https://oleoskarheinrichs.com",
    siteName: "O$ka - Ole Heinrichs Official Website",
    images: [
      {
        url: "https://res.cloudinary.com/daaynrl8l/image/upload/c_fill,w_1200,h_630,g_face,f_auto,q_auto/WhatsApp_Image_2025-04-29_at_11.36.15_v0w2ab.jpg",
        width: 1200,
        height: 630,
        alt: "O$ka (Ole Oskar Heinrichs) - German Musician and Producer",
        type: "image/jpeg"
      },
      {
        url: "https://res.cloudinary.com/daaynrl8l/image/upload/c_fill,w_1080,h_1080,g_face,f_auto,q_auto/WhatsApp_Image_2025-04-29_at_11.36.15_v0w2ab.jpg",
        width: 1080,
        height: 1080,
        alt: "O$ka (Ole Heinrichs) - Professional Musician Photo",
        type: "image/jpeg"
      }
    ],
    locale: "en_US",
    alternateLocale: ["de_DE"],
    type: "profile",
    countryName: "Germany"
  },
  twitter: {
    card: "summary_large_image",
    site: "@oska_hayati",
    creator: "@oska_hayati",
    title: "O$ka (Ole Heinrichs) | German Musician & Producer",
    description: "Official website of O$ka (Ole Heinrichs) - German musician, music producer, and marketing professional. Listen to latest releases and book collaborations.",
    images: {
      url: "https://res.cloudinary.com/daaynrl8l/image/upload/c_fill,w_1200,h_630,g_face,f_auto,q_auto/WhatsApp_Image_2025-04-29_at_11.36.15_v0w2ab.jpg",
      alt: "O$ka (Ole Heinrichs) - German Musician and Producer"
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you set up Google Search Console
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
    // other: {
    //   'msvalidate.01': 'your-bing-verification-code'
    // }
  },
  alternates: {
    canonical: "https://oleoskarheinrichs.com",
    languages: {
      'en': 'https://oleoskarheinrichs.com/en',
      'de': 'https://oleoskarheinrichs.com',
      'x-default': 'https://oleoskarheinrichs.com'
    }
  },
  other: {
    'google-site-verification': 'pending-setup',
    'theme-color': '#1a1a1a',
    'msapplication-TileColor': '#1a1a1a',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": ["Person", "MusicGroup"],
    "name": "Ole Oskar Heinrichs",
    "alternateName": ["O$ka", "Oska", "Ole Heinrichs"],
    "url": "https://oleoskarheinrichs.com",
    "mainEntityOfPage": "https://oleoskarheinrichs.com",
    "image": {
      "@type": "ImageObject",
      "url": "https://res.cloudinary.com/daaynrl8l/image/upload/c_fill,w_1200,h_630,g_face,f_auto,q_auto/WhatsApp_Image_2025-04-29_at_11.36.15_v0w2ab.jpg",
      "width": 1200,
      "height": 630,
      "caption": "O$ka (Ole Heinrichs) - German Musician and Producer"
    },
    "sameAs": [
      "https://www.linkedin.com/in/ole-oskar-heinrichs/",
      "https://www.instagram.com/oska.hayati/",
      "https://www.youtube.com/@oska.hayati",
      "https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY?si=FBpspC__S7-hAWI5Omf3gQ",
      "https://on.soundcloud.com/yc2BjCAlBb9tYhwGk5",
      "https://music.apple.com/us/artist/o%24ka/1640653279",
      "https://www.tiktok.com/@oska.hayati"
    ],
    "jobTitle": ["Musician", "Music Producer", "Marketing Professional"],
    "description": "German musician, music producer, and marketing professional specializing in music production and artist development.",
    "nationality": "German",
    "birthPlace": "Germany",
    "genre": ["Electronic", "Pop", "Hip-Hop"],
    "instrument": ["Vocals", "Digital Audio Workstation", "Synthesizer"],
    "knowsAbout": [
      "Music Production",
      "Audio Engineering", 
      "Music Marketing",
      "Artist Development",
      "Digital Marketing",
      "Social Media Marketing"
    ],
    "worksFor": [
      {
        "@type": "Organization",
        "name": "EuroArts",
        "url": "https://www.euroarts.com/",
        "description": "Music distribution and marketing company"
      },
      {
        "@type": "Organization", 
        "name": "KI-Academy",
        "url": "https://ki.academy/",
        "description": "AI education and consulting"
      }
    ],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Musician",
        "occupationLocation": "Germany",
        "skills": ["Music Production", "Songwriting", "Performance"]
      },
      {
        "@type": "Occupation", 
        "name": "Music Producer",
        "occupationLocation": "Germany",
        "skills": ["Audio Production", "Mixing", "Mastering"]
      },
      {
        "@type": "Occupation",
        "name": "Marketing Professional", 
        "occupationLocation": "Germany",
        "skills": ["Digital Marketing", "Social Media", "Brand Development"]
      }
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Music Production Institution",
      "description": "Bachelor's degree in Music Production"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "ooh.oska@outlook.de",
      "contactType": "Professional Inquiries",
      "availableLanguage": ["German", "English"]
    }
  };

  // Website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "O$ka - Ole Heinrichs Official Website",
    "alternateName": "Ole Oskar Heinrichs Portfolio",
    "url": "https://oleoskarheinrichs.com",
    "description": "Official website of O$ka (Ole Heinrichs) - German musician, music producer, and marketing professional.",
    "inLanguage": ["en", "de"],
    "author": {
      "@type": "Person",
      "name": "Ole Oskar Heinrichs",
      "alternateName": "O$ka"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://oleoskarheinrichs.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Professional service structured data
  const professionalServiceData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "O$ka Music Production & Marketing Services",
    "description": "Professional music production, marketing consultation, and artist development services by O$ka (Ole Heinrichs).",
    "provider": {
      "@type": "Person",
      "name": "Ole Oskar Heinrichs",
      "alternateName": "O$ka"
    },
    "areaServed": "Germany",
    "serviceType": ["Music Production", "Music Marketing", "Artist Development"],
    "url": "https://oleoskarheinrichs.com"
  };

  return (
    <html lang="de" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0" />
        <meta name="theme-color" content="#f5f0e8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical assets */}
        <link 
          rel="preload" 
          href="https://res.cloudinary.com/daaynrl8l/image/upload/WhatsApp_Image_2025-04-29_at_11.36.15_v0w2ab.jpg" 
          as="image" 
          fetchPriority="high"
        />
        
        {/* Add favicon links */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Add JSON-LD structured data */}
        <JsonLd data={personStructuredData} />
        <JsonLd data={websiteStructuredData} />
        <JsonLd data={professionalServiceData} />
        <ConsentProvider>
          <LanguageProvider>
            <PageTransition>
              {children}
            </PageTransition>
            <CookieBanner />
          </LanguageProvider>
          <ConditionalScripts />
        </ConsentProvider>
      </body>
    </html>
  );
}
