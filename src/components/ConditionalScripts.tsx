"use client";

import Script from 'next/script';
import { useConsent } from '@/context/ConsentContext';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from 'react';

export default function ConditionalScripts() {
  const { consent } = useConsent();
  // State to track client-side mounting to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render on client-side to prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <>
      {/* Vercel Analytics - only loaded when analytics consent is given */}
      {consent.analytics && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}

      {/* Microsoft Clarity - only loaded when analytics consent is given */}
      {consent.analytics && (
        <Script 
          strategy="afterInteractive"
          id="clarity-script"
        >
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "INSERT_YOUR_CLARITY_ID");
          `}
        </Script>
      )}
    </>
  );
}
