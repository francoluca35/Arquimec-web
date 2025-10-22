import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X } from 'lucide-react';

const Renders: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{src: string, titulo: string, alt: string} | null>(null);

  // Array con las imágenes de renders (usando imágenes de construcción como ejemplo por ahora)
  const renderImages = [
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1761092725/485701230_1011926220849151_7489827653971523552_n.heic_nxcyna.jpg",
      alt: "render-1-diseno-moderno",
      titulo: "Render 1 - Diseño Moderno"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1761092725/486260868_1330804344889816_5880758302393138657_n.heic_fe3tsn.jpg",
      alt: "render-2-arquitectura-contemporanea",
      titulo: "Render 2 - Arquitectura Contemporánea"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1761092727/491266266_1135862721557461_8401636241708182057_n.heic_ji7fcj.jpg",
      alt: "render-4-diseno-innovador",
      titulo: "Render 3 - Diseño Innovador"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1761092727/490128029_1202122007951092_7352819099940301997_n.heic_zxafa6.jpg",
      alt: "render-5-arquitectura-sostenible",
      titulo: "Render 4 - Arquitectura Sostenible"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1761092726/485580309_1368137657672665_2016091385507588819_n.heic_s5ljvi.jpg",
      alt: "render-6-proyecto-comercial",
      titulo: "Render 5 - Proyecto Comercial"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1761092726/486619201_1805261400266850_4243516427995714114_n.heic_emgzld.jpg",
      alt: "render-7-diseno-minimalista",
      titulo: "Render 6 - Diseño Minimalista"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1761092725/486294643_1052942293327852_1872584868807058422_n.heic_yvzjuh.jpg",
      alt: "render-8-arquitectura-futurista",
      titulo: "Render 7 - Arquitectura Futurista"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1761092725/485111296_1166176621815973_8970348978162980739_n.heic_pc6wkh.jpg",
      alt: "render-8-arquitectura-futurista",
      titulo: "Render 8 - Arquitectura Futurista"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {renderImages.map((render, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => openImageModal(render)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-500 bg-white">
                <div className="aspect-[4/3] relative">
                  <ImageWithFallback
                    src={render.src}
                    alt={render.alt}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {/* Overlay elegante */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-sm mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {render.titulo}
                      </h3>
                      <div className="w-0 group-hover:w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"></div>
                    </div>
                  </div>

                  {/* Borde dorado sutil */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-yellow-400/30 transition-all duration-300"></div>
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
