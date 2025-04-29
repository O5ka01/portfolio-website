import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type OptimizedImageProps = Omit<ImageProps, 'placeholder'> & {
  altText: string;
  lowQualityUrl?: string;
};

export const OptimizedImage = ({ 
  altText, 
  lowQualityUrl,
  ...props 
}: OptimizedImageProps) => {
  // State to track if the image has loaded
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Generate a unique ID for this image to help with tracking in analytics
  const imageId = `img-${props.src.toString().replace(/[^a-zA-Z0-9]/g, '-')}`;
  
  return (
    <div className="relative">
      <Image
        {...props}
        alt={altText} // Always provide descriptive alt text for images
        id={imageId}
        loading={props.priority ? 'eager' : 'lazy'} // Lazy load non-priority images
        quality={props.quality || 85} // Higher quality for important images
        sizes={props.sizes || "(max-width: 768px) 100vw, 50vw"} // Responsive sizing
        placeholder={lowQualityUrl ? 'blur' : undefined}
        blurDataURL={lowQualityUrl}
        onLoadingComplete={() => setIsLoaded(true)}
        className={`${props.className || ''} ${isLoaded ? 'opacity-100' : 'opacity-70'}`}
      />
    </div>
  );
};

export default OptimizedImage;
