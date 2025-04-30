/**
 * Image optimization utilities
 * Provides functions for optimizing image loading and processing
 */

import { siteConfig } from './config';

type ImageFormat = 'webp' | 'avif' | 'jpg' | 'png' | 'auto';
type ImageQuality = 'low' | 'medium' | 'high' | 'auto' | number;

interface ImageOptions {
  width?: number;
  height?: number;
  format?: ImageFormat;
  quality?: ImageQuality;
  blur?: boolean;
  responsive?: boolean;
}

/**
 * Generate an optimized Cloudinary URL
 */
export function getOptimizedImageUrl(path: string, options: ImageOptions = {}) {
  // If path is already a full URL (e.g., from an external source), return it as is
  if (path.startsWith('http') || path.startsWith('//')) {
    return path;
  }

  // Ensure path starts with a slash if it's a relative path
  const imagePath = path.startsWith('/') ? path.substring(1) : path;
  
  // Default options
  const {
    width,
    height,
    format = 'auto',
    quality = 'auto',
    blur = false,
    responsive = true
  } = options;

  // Build Cloudinary transformation string
  let transformations = 'c_fill,g_auto';
  
  // Add width and height if specified
  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;
  
  // Add format
  if (format !== 'auto') transformations += `,f_${format}`;
  
  // Add quality
  if (quality === 'low') {
    transformations += ',q_60';
  } else if (quality === 'medium') {
    transformations += ',q_75';
  } else if (quality === 'high') {
    transformations += ',q_90';
  } else if (typeof quality === 'number') {
    transformations += `,q_${quality}`;
  } else {
    transformations += ',q_auto';
  }
  
  // Add blur if specified
  if (blur) transformations += ',e_blur:1000';
  
  // Add responsive flag for automatic responsive images
  if (responsive) transformations += ',dpr_auto';
  
  // Construct the full URL
  return `${siteConfig.imageCdn}/image/upload/${transformations}/${imagePath}`;
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(path: string, options: ImageOptions = {}) {
  const breakpoints = [320, 480, 768, 1024, 1366, 1600, 1920];
  const baseOptions = { ...options, responsive: false };
  
  return breakpoints
    .map(width => {
      const url = getOptimizedImageUrl(path, { ...baseOptions, width });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Generate blurhash placeholder for images
 * This would be used with a blurhash library in a real implementation
 * For now, we'll use a simple blur effect from Cloudinary
 */
export function getImagePlaceholder(path: string, width = 20) {
  return getOptimizedImageUrl(path, {
    width,
    height: width,
    blur: true,
    quality: 'low',
    responsive: false
  });
}

/**
 * Get optimized image props for use with Next.js Image component
 */
export function getNextImageProps(path: string, options: ImageOptions = {}) {
  const src = getOptimizedImageUrl(path, options);
  const blurDataURL = getImagePlaceholder(path);
  
  return {
    src,
    blurDataURL,
    placeholder: 'blur' as const,
    sizes: options.responsive !== false ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : undefined,
  };
}
