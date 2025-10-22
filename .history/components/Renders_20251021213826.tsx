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
          className="text-center mb-20 max-w-7xl mx-auto px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p
            className="text-gray-500 text-sm tracking-wider mb-4"
            style={{ letterSpacing: "0.15em" }}
          >
            RENDERS
          </p>
          <h2
            className="text-4xl lg:text-5xl text-gray-900 mb-8 leading-tight"
            style={{ fontWeight: 300 }}
          >
            Alguno de nuestros trabajos
          </h2>
        </motion.div>

        {/* Galería de renders */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-0"
        >
          {renderImages.map((render, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group cursor-pointer relative overflow-hidden"
              onClick={() => openImageModal(render)}
            >
              <div className="aspect-[4/3] relative w-full h-full">
                  <ImageWithFallback
                    src={render.src}
                    alt={render.alt}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                    fill={true}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
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
                </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal estilo Instagram */}
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <div className="relative max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row">
              {/* Botón cerrar */}
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-200"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Columna izquierda - Imagen */}
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <ImageWithFallback
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full max-h-[90vh] object-contain"
                  width={800}
                  height={600}
                  sizes="50vw"
                />
              </div>

              {/* Columna derecha - Interacciones y contenido */}
              <div className="w-full md:w-80 flex flex-col bg-white">
                {/* Header del post */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                    <span className="font-semibold text-gray-900">arquimec</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </div>
                
           

                {/* Contenido del post */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-semibold text-gray-900">arquimec</span>
                      <span className="text-gray-900 ml-2">{selectedImage.titulo}</span>
                    </p>
            
                    <p className="text-xs text-gray-500">
                      Hace 2 horas
                    </p>
                  </div>
                </div>
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
