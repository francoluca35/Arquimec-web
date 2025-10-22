import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X } from 'lucide-react';

const Renders: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{src: string, titulo: string, alt: string} | null>(null);

  // Array con las imágenes de renders (usando URLs de ejemplo por ahora)
  const renderImages = [
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760413291/estudio/oficina.jpg",
      alt: "render-1-oficina-moderna",
      titulo: "Render 1 - Oficina Moderna"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494843/constru/construccion-01.jpg",
      alt: "render-2-construccion-1",
      titulo: "Render 2 - Construcción 1"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494845/constru/construccion-02.jpg",
      alt: "render-3-construccion-2",
      titulo: "Render 3 - Construcción 2"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494846/constru/construccion-03.jpg",
      alt: "render-4-construccion-3",
      titulo: "Render 4 - Construcción 3"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494847/constru/construccion-04.jpg",
      alt: "render-5-construccion-4",
      titulo: "Render 5 - Construcción 4"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494848/constru/construccion-05.jpg",
      alt: "render-6-construccion-5",
      titulo: "Render 6 - Construcción 5"
    }
  ];

  const openImageModal = (image: {src: string, titulo: string, alt: string}) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Cerrar modal con ESC
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedImage) {
        closeImageModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            RENDERS
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Algunos de nuestros diseños
          </p>
        </motion.div>

        {/* Galería de renders */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {renderImages.map((render, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => openImageModal(render)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <div className="aspect-[4/3] relative">
                  <ImageWithFallback
                    src={render.src}
                    alt={render.alt}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Overlay con título */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg">
                        {render.titulo}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal para ver imagen en grande */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="relative max-w-6xl max-h-full">
              {/* Botón cerrar */}
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Imagen */}
              <div className="relative">
                <ImageWithFallback
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                  width={1200}
                  height={800}
                  sizes="100vw"
                />
              </div>

              {/* Título */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-semibold text-xl">
                  {selectedImage.titulo}
                </h3>
              </div>
            </div>

            {/* Cerrar al hacer click fuera */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={closeImageModal}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Renders;
