import { CldImage } from 'next-cloudinary';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes,
  quality = 80,
  loading = 'lazy',
  placeholder = 'empty',
  blurDataURL,
  ...props
}) => {
  // Extraer el public_id de la URL de Cloudinary
  const getPublicId = (url: string) => {
    if (url.includes('cloudinary.com')) {
      const parts = url.split('/');
      const uploadIndex = parts.findIndex(part => part === 'upload');
      if (uploadIndex !== -1 && uploadIndex + 1 < parts.length) {
        return parts.slice(uploadIndex + 2).join('/').replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
      }
    }
    return url;
  };

  const publicId = getPublicId(src);

  if (fill) {
    return (
      <CldImage
        src={publicId}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
        quality={quality}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        {...props}
      />
    );
  }

  return (
    <CldImage
      src={publicId}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={quality}
      loading={loading}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      {...props}
    />
  );
};

export default CloudinaryImage;
