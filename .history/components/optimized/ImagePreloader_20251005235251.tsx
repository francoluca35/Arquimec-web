import { useEffect } from 'react';
import Head from 'next/head';

interface ImagePreloaderProps {
  images: string[];
  priority?: boolean;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ images, priority = false }) => {
  useEffect(() => {
    if (!priority) return;

    // Preload imágenes críticas
    images.forEach((src, index) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.crossOrigin = 'anonymous';
      
      // Agregar con delay para no sobrecargar
      setTimeout(() => {
        document.head.appendChild(link);
      }, index * 100);
    });
  }, [images, priority]);

  if (!priority) return null;

  return (
    <Head>
      {images.map((src, index) => (
        <link
          key={src}
          rel="preload"
          as="image"
          href={src}
          crossOrigin="anonymous"
        />
      ))}
    </Head>
  );
};

export default ImagePreloader;
