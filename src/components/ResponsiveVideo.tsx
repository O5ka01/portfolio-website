import React, { useState, useEffect } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import LoadingSpinner from './LoadingSpinner';
import OptimizedImage from './OptimizedImage';

type VideoProvider = 'youtube' | 'vimeo' | 'soundcloud';

type ResponsiveVideoProps = {
  url: string;
  title: string;
  provider?: VideoProvider;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  lazyLoad?: boolean;
  className?: string;
};

// Extract video ID from various video service URLs
const getVideoId = (url: string, provider: VideoProvider): string => {
  switch (provider) {
    case 'youtube': {
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : '';
    }
    case 'vimeo': {
      const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
      const match = url.match(regExp);
      return match ? match[5] : '';
    }
    case 'soundcloud': {
      // For SoundCloud, we'll just use the entire URL
      return url;
    }
    default:
      return '';
  }
};

// Get embed URL based on provider and video ID
const getEmbedUrl = (videoId: string, provider: VideoProvider): string => {
  switch (provider) {
    case 'youtube':
      return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1&mute=1`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${videoId}?byline=0&portrait=0&autoplay=1&muted=1`;
    case 'soundcloud':
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(videoId)}&color=%23e6c9ab&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
    default:
      return '';
  }
};

// Detect video provider from URL if not specified
const detectProvider = (url: string): VideoProvider => {
  if (url.includes('youtube') || url.includes('youtu.be')) {
    return 'youtube';
  } else if (url.includes('vimeo')) {
    return 'vimeo';
  } else if (url.includes('soundcloud')) {
    return 'soundcloud';
  }
  // Default to YouTube
  return 'youtube';
};

export default function ResponsiveVideo({
  url,
  title,
  provider: propProvider,
  aspectRatio = '16:9',
  lazyLoad = true,
  className = '',
}: ResponsiveVideoProps) {
  const [isLoaded, setIsLoaded] = useState(!lazyLoad);
  
  // Detect provider if not specified
  const provider = propProvider || detectProvider(url);
  const videoId = getVideoId(url, provider);
  const embedUrl = getEmbedUrl(videoId, provider);
  
  // Set aspect ratio padding
  const aspectRatioPadding = {
    '16:9': 'pb-[56.25%]', // 9/16 = 0.5625 = 56.25%
    '4:3': 'pb-[75%]',     // 3/4 = 0.75 = 75%
    '1:1': 'pb-[100%]',    // Square
  }[aspectRatio];
  
  // Use intersection observer to detect when video is visible
  const [ref, isInView] = useIntersectionObserver({
    rootMargin: '200px',
    once: true,
  });
  
  // Load video when it comes into view
  useEffect(() => {
    if (isInView && lazyLoad && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isInView, lazyLoad, isLoaded]);
  
  // Thumbnail/placeholder for YouTube before loading
  const youtubeThumbnail = provider === 'youtube' && videoId 
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` 
    : null;
    
  // Handle click on placeholder
  const handlePlaceholderClick = () => {
    setIsLoaded(true);
  };
  
  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden rounded-lg shadow-md ${aspectRatioPadding} ${className}`}
      id={`video-container-${videoId}`}
    >
      {isLoaded ? (
        <iframe
          src={embedUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center cursor-pointer group" onClick={handlePlaceholderClick}>
          {youtubeThumbnail ? (
            <>
              <OptimizedImage 
                src={youtubeThumbnail}
                alt={`Thumbnail for ${title}`}
                className="absolute inset-0 w-full h-full object-cover"
                width={1280}
                height={720}
                altText={`Thumbnail for ${title}`}
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="relative z-10 w-16 h-16 rounded-full bg-accent-primary bg-opacity-90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white ml-1">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <LoadingSpinner size="medium" />
              <span className="mt-2 text-accent-tertiary">Click to load video</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
