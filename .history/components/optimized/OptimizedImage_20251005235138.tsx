import { useState } from 'react';
import { motion } from 'motion/react';
import LazyImage from './LazyImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  // Props para diferentes tamaños
  mobileSrc?: string;
  tabletSrc?: string;
  desktopSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  fill = false,
  sizes,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  mobileSrc,
  tabletSrc,
  desktopSrc
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  // Generar blurDataURL automáticamente si no se proporciona
  const generateBlurDataURL = (src: string) => {
    // Base64 de una imagen 1x1 transparente
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=';
  };

  // Optimizar la URL de la imagen
  const optimizeImageUrl = (originalSrc: string) => {
    // Si ya es una URL optimizada, devolverla tal como está
    if (originalSrc.startsWith('http') || originalSrc.startsWith('/')) {
      return originalSrc;
    }

    // Si es una imagen local, asegurar que use WebP
    if (originalSrc.includes('.webp')) {
      return originalSrc;
    }

    // Convertir a WebP si es posible
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return webpSrc;
  };

  const optimizedSrc = optimizeImageUrl(currentSrc);
  const finalBlurDataURL = blurDataURL || generateBlurDataURL(optimizedSrc);

  return (
    <LazyImage
      src={optimizedSrc}
      alt={alt}
      className={className}
      fill={fill}
      sizes={sizes}
      priority={priority}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={finalBlurDataURL}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default OptimizedImage;
