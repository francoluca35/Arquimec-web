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
      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="inline-block">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6">
              RENDERS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full mb-6"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Algunos de nuestros diseños
          </p>
        </motion.div>

        {/* Galería de renders */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2"
        >
          {renderImages.map((render, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group cursor-pointer relative overflow-hidden bg-white"
              onClick={() => openImageModal(render)}
            >
              {/* Imagen principal */}
              <div className="aspect-[4/3] relative w-full h-full">
                <ImageWithFallback
                  src={render.src}
                  alt={render.alt}
                  className="object-cover w-full h-full"
                  fill={true}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                />
              </div>
              
              {/* Información debajo de la imagen (estilo Instagram) */}
              <div className="p-4 bg-white">
                <h3 className="text-gray-900 font-semibold text-sm mb-2">
                  {render.titulo}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                  <span className="text-gray-500 text-xs">Arquimec</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal para ver imagen en grande */}
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          >
            <div className="relative max-w-7xl max-h-full">
              {/* Botón cerrar elegante */}
              <button
                onClick={closeImageModal}
                className="absolute top-6 right-6 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
              >
                <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
              </button>

              {/* Imagen con sombra elegante */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[90vh] object-contain"
                  width={1400}
                  height={900}
                  sizes="100vw"
                />
              </div>

              {/* Título elegante */}
              <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-bold text-2xl mb-2">
                  {selectedImage.titulo}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
              </div>
            </div>

            {/* Cerrar al hacer click fuera */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={closeImageModal}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Renders;
