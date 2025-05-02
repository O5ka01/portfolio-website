import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/context/LanguageContext";
import { ConsentProvider } from "@/context/ConsentContext";
import { ReleaseBannerProvider } from "@/context/ReleaseBannerContext";
import CookieBanner from "@/components/CookieBanner";
import ConditionalScripts from "@/components/ConditionalScripts";
import NewReleaseBanner from "@/components/NewReleaseBanner";

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap', // Ensures text remains visible during font loading
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  // Note: preconnect is handled with link tags in the head
});

export const metadata: Metadata = {
  title: "Ole Oskar Heinrichs | Musician & Marketing Professional",
  description: "Personal portfolio of Ole Oskar Heinrichs (O$ka) - Musician, Producer, and Marketing Professional specializing in music and AI integration",
  keywords: ["Ole Oskar Heinrichs", "O$ka", "musician", "producer", "marketing professional", "music", "AI", "portfolio"],
  authors: [{ name: "Ole Oskar Heinrichs" }],
  creator: "Ole Oskar Heinrichs",
  publisher: "Ole Oskar Heinrichs",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Ole Oskar Heinrichs | Musician & Marketing Professional",
    description: "Personal portfolio of Ole Oskar Heinrichs (O$ka) - Musician, Producer, and Marketing Professional",
    url: "https://oleoskarheinrichs.com",
    siteName: "Ole Oskar Heinrichs Portfolio",
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
    title: "Ole Oskar Heinrichs | Musician & Marketing Professional",
    description: "Personal portfolio of Ole Oskar Heinrichs (O$ka) - Musician, Producer, and Marketing Professional",
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
      "https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY"
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

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ole Oskar Heinrichs Portfolio",
    "url": "https://oleoskarheinrichs.com",
    "description": "Personal portfolio of Ole Oskar Heinrichs (O$ka) - Musician, Producer, and Marketing Professional"
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
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        {/* Add JSON-LD structured data */}
        <JsonLd data={personStructuredData} />
        <JsonLd data={websiteStructuredData} />
        <ConsentProvider>
          <ReleaseBannerProvider>
            <LanguageProvider>
              <NewReleaseBanner />
              {children}
              <CookieBanner />
            </LanguageProvider>
          </ReleaseBannerProvider>
          <ConditionalScripts />
        </ConsentProvider>
      </body>
    </html>
  );
}
