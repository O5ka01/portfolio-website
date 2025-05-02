"use client";

import React from 'react';

interface MainContentWrapperProps {
  children: React.ReactNode;
}

const MainContentWrapper = ({ children }: MainContentWrapperProps) => {
  // With the floating banner, we don't need special padding adjustments
  
  return (
    <div>
      {children}
    </div>
  );
};

export default MainContentWrapper;
