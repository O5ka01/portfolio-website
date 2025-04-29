"use client";

import React, { useEffect, useState } from 'react';

type JsonLdProps = {
  data: Record<string, unknown>;
};

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  // This ensures the component only renders on the client
  // avoiding hydration mismatch errors
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render the script tag on the client
  if (!mounted) {
    return null;
  }
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLd;
