import type { Metadata } from "next";
// Import local fonts to use SF Pro or similar system fonts that mimic Apple's design language
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/context/LanguageContext";
import { ConsentProvider } from "@/context/ConsentContext";
import { ReleaseBannerProvider } from "@/context/ReleaseBannerContext";
import CookieBanner from "@/components/CookieBanner";
import ConditionalScripts from "@/components/ConditionalScripts";
import SlimReleaseBanner from "@/components/SlimReleaseBanner";
import NewReleaseBanner from "@/components/NewReleaseBanner";
import PageTransition from "@/components/PageTransition";

// Using system fonts that mimic SF Pro Display and SF Pro Text - defined in globals.css
// No need for a font variable since we're using system fonts for better performance

export const metadata: Metadata = {
  title: "O$ka (Ole Oskar Heinrichs) | Musician, Producer & Marketing Professional",
  description: "Official website of O$ka (Ole Oskar Heinrichs) - Musician, Producer, and Marketing Professional specializing in music production and AI integration",
  keywords: ["O$ka", "O$ka musician", "O$ka producer", "Ole Oskar Heinrichs", "musician", "producer", "marketing professional", "music", "AI", "portfolio", "murphywav"],
  authors: [{ name: "Ole Oskar Heinrichs" }],
  creator: "Ole Oskar Heinrichs",
  publisher: "Ole Oskar Heinrichs",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "O$ka (Ole Oskar Heinrichs) | Musician, Producer & Marketing Professional",
    description: "Official website of O$ka (Ole Oskar Heinrichs) - Musician, Producer, and Marketing Professional specializing in music production and AI integration",
    url: "https://oleoskarheinrichs.com",
    siteName: "O$ka - Official Website",
    images: [
      {
        url: "https://res.cloudinary.com/daaynrl8l/image/upload/WhatsApp_Image_2025-04-29_at_11.36.15_v0w2ab.jpg",
        width: 1200,
        height: 630,
        alt: "Ole Oskar Heinrichs (O$ka)",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "O$ka (Ole Oskar Heinrichs) | Musician, Producer & Marketing Professional",
    description: "Official website of O$ka (Ole Oskar Heinrichs) - Musician, Producer, and Marketing Professional specializing in music production and AI integration",
    images: ["https://res.cloudinary.com/daaynrl8l/image/upload/WhatsApp_Image_2025-04-29_at_11.36.15_v0w2ab.jpg"],
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
  verification: {
    // Add verification codes when you have them
    // google: 'your-google-verification-code',
  },
  alternates: {
    canonical: "https://oleoskarheinrichs.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ole Oskar Heinrichs",
    "alternateName": "O$ka",
    "url": "https://oleoskarheinrichs.com",
    "image": "https://res.cloudinary.com/daaynrl8l/image/upload/WhatsApp_Image_2025-04-29_at_11.36.15_v0w2ab.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/ole-oskar-heinrichs/",
      "https://www.instagram.com/oska.hayati/",
      "https://www.youtube.com/@oska.hayati",
      "https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY",
      "https://soundcloud.com/murphywav"
    ],
    "jobTitle": "Musician & Marketing Professional",
    "worksFor": [
      {
        "@type": "Organization",
        "name": "EuroArts",
        "url": "https://www.euroarts.com/"
      },
      {
        "@type": "Organization",
        "name": "KI-Academy",
        "url": "https://ki.academy/"
      }
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "BIMM Berlin",
      "url": "https://studium.bimm-institute.de/"
    }
  };

  const musicianStructuredData = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "O$ka",
    "alternateName": "murphywav",
    "url": "https://oleoskarheinrichs.com",
    "image": "https://res.cloudinary.com/daaynrl8l/image/upload/WhatsApp_Image_2025-04-29_at_11.36.15_v0w2ab.jpg",
    "description": "O$ka (Ole Oskar Heinrichs) is a music producer and artist specializing in electronic music and AI integration.",
    "sameAs": [
      "https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY",
      "https://soundcloud.com/murphywav",
      "https://www.instagram.com/oska.hayati/",
      "https://www.youtube.com/@oska.hayati"
    ],
    "genre": ["Electronic", "EDM", "Producer"],
    "member": {
      "@type": "Person",
      "name": "Ole Oskar Heinrichs",
      "alternateName": "O$ka"
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "O$ka - Official Website",
    "url": "https://oleoskarheinrichs.com",
    "description": "Official website of O$ka (Ole Oskar Heinrichs) - Musician, Producer, and Marketing Professional specializing in music production and AI integration",
    "keywords": "O$ka, O$ka musician, O$ka producer, Ole Oskar Heinrichs, music, AI"
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
        <JsonLd data={musicianStructuredData} />
        <JsonLd data={websiteStructuredData} />
        <ConsentProvider>
          <ReleaseBannerProvider>
            <LanguageProvider>
              <NewReleaseBanner />
              <SlimReleaseBanner />
              <PageTransition>
                {children}
              </PageTransition>
              <CookieBanner />
            </LanguageProvider>
          </ReleaseBannerProvider>
          <ConditionalScripts />
        </ConsentProvider>
      </body>
    </html>
  );
}
