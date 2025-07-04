import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  quality?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  placeholder,
  quality = 80
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager' || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before the image enters viewport
        threshold: 0.1
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [loading]);

  // Generate optimized image URL for external images (like Unsplash)
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const url = new URL(originalSrc);
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('q', quality.toString());
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      return url.toString();
    }
    return originalSrc;
  };

  // Generate WebP version for supported browsers
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const url = new URL(originalSrc);
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fm', 'webp');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('q', quality.toString());
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      return url.toString();
    }
    return null;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const optimizedSrc = getOptimizedSrc(src);
  const webpSrc = getWebPSrc(src);

  if (hasError) {
    return (
      <div 
        className={`bg-gray-800 flex items-center justify-center text-gray-500 ${className}`}
        style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}
      >
        <span>Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-card-bg to-card-bg-light animate-pulse flex items-center justify-center"
          style={{ 
            backgroundColor: placeholder || '#334155',
            width: width ? `${width}px` : '100%', 
            height: height ? `${height}px` : '200px' 
          }}
        >
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Image with WebP support */}
      {isInView && (
        <picture>
          {webpSrc && (
            <source 
              srcSet={webpSrc} 
              type="image/webp" 
            />
          )}
          <img
            src={optimizedSrc}
            alt={alt}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} w-full h-full object-cover`}
            style={{
              width: width ? `${width}px` : '100%',
              height: height ? `${height}px` : 'auto'
            }}
            decoding="async"
          />
        </picture>
      )}
    </div>
  );
};

export default OptimizedImage;