"use client";

import { useEffect } from 'react';

export default function SEOEnhancer() {
  
  useEffect(() => {
    // Add additional SEO enhancements after component mounts
    const addSEOEnhancements = () => {
      // Add breadcrumb structured data
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://oleoskarheinrichs.com"
          },
          {
            "@type": "ListItem", 
            "position": 2,
            "name": "O$ka - Ole Heinrichs",
            "item": "https://oleoskarheinrichs.com"
          }
        ]
      };

      // Add FAQ structured data for better search visibility
      const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who is O$ka?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O$ka is the stage name of Ole Oskar Heinrichs, a German musician, music producer, and marketing professional specializing in electronic music production and digital marketing."
            }
          },
          {
            "@type": "Question",
            "name": "What services does Ole Heinrichs offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ole Heinrichs (O$ka) offers music production services, marketing consultation, artist development, audio engineering, and digital marketing services for musicians and businesses."
            }
          },
          {
            "@type": "Question",
            "name": "Where is O$ka based?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O$ka (Ole Heinrichs) is based in Germany and works with clients internationally in music production and marketing."
            }
          },
          {
            "@type": "Question",
            "name": "What is murphywav?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "murphywav is the music production alias of O$ka (Ole Heinrichs), under which he releases electronic music and provides production services."
            }
          }
        ]
      };

      // Create script elements for structured data
      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
      
      const faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.textContent = JSON.stringify(faqData);

      // Add to document head if not already present
      if (!document.querySelector('[data-seo-breadcrumb]')) {
        breadcrumbScript.setAttribute('data-seo-breadcrumb', 'true');
        document.head.appendChild(breadcrumbScript);
      }
      
      if (!document.querySelector('[data-seo-faq]')) {
        faqScript.setAttribute('data-seo-faq', 'true');
        document.head.appendChild(faqScript);
      }

      // Add additional meta tags for better SEO
      const additionalMetas = [
        { name: 'author', content: 'Ole Oskar Heinrichs (O$ka)' },
        { name: 'copyright', content: ' 2025 Ole Oskar Heinrichs' },
        { name: 'language', content: 'EN,DE' },
        { name: 'revisit-after', content: '7 days' },
        { name: 'distribution', content: 'global' },
        { name: 'rating', content: 'general' },
        { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' },
        { property: 'og:locale:alternate', content: 'de_DE' },
        { name: 'geo.region', content: 'DE' },
        { name: 'geo.placename', content: 'Germany' },
        { name: 'ICBM', content: '51.1657,10.4515' }, // Germany coordinates
      ];

      additionalMetas.forEach(meta => {
        const existingMeta = document.querySelector(`meta[name="${meta.name}"], meta[property="${meta.property}"]`);
        if (!existingMeta) {
          const metaElement = document.createElement('meta');
          if (meta.name) metaElement.setAttribute('name', meta.name);
          if (meta.property) metaElement.setAttribute('property', meta.property);
          metaElement.setAttribute('content', meta.content);
          document.head.appendChild(metaElement);
        }
      });
    };

    // Run SEO enhancements after a short delay to ensure DOM is ready
    const timer = setTimeout(addSEOEnhancements, 100);
    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything visible
}
