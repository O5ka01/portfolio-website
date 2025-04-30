import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

type OptimizedImageProps = Omit<ImageProps, 'placeholder'> & {
  altText: string;
  lowQualityUrl?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  lazyBoundary?: string;
};

export const OptimizedImage = ({ 
  altText, 
  lowQualityUrl,
  fetchPriority = 'auto',
  lazyBoundary = '200px',
  ...props 
}: OptimizedImageProps) => {
  // State to track if the image has loaded
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Generate a unique ID for this image to help with tracking in analytics
  const imageId = `img-${props.src.toString().replace(/[^a-zA-Z0-9]/g, '-')}`;
  
  // Reset loading state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [props.src]);

  // Fallback component in case of load error
  if (hasError) {
    return (
      <div 
        className={`relative flex items-center justify-center bg-gray-100 ${props.className || ''}`}
        style={{width: props.width, height: props.height}}
      >
        <span className="text-xs text-gray-500">Image failed to load</span>
      </div>
    );
  }
  
  return (
    <div className="relative overflow-hidden">
      {!isLoaded && lowQualityUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center animate-pulse"
          style={{ backgroundImage: `url(${lowQualityUrl})`, filter: 'blur(10px)' }}
          aria-hidden="true"
        />
      )}
      <Image
        {...props}
        alt={altText} // Always provide descriptive alt text for images
        id={imageId}
        loading={props.priority ? 'eager' : 'lazy'} // Lazy load non-priority images
        quality={props.quality || 85} // Higher quality for important images
        sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"} // Responsive sizing
        placeholder={lowQualityUrl ? 'blur' : undefined}
        blurDataURL={lowQualityUrl}
        lazyBoundary={lazyBoundary} // Start loading when image is within this boundary
        fetchPriority={fetchPriority} // Control browser fetch priority
        onLoadingComplete={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${props.className || ''} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default OptimizedImage;
