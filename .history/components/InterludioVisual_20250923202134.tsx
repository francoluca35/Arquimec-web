import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const InterludioVisual: React.FC = () => {
  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      {/* Fondo con patrón */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Interludio
            <br />
            <span className="text-amber-400">Visual</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Una pausa para contemplar la belleza arquitectónica y la inspiración 
            que guía nuestro trabajo diario.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU4NTM5MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              alt: "Arquitectura moderna 1",
              title: "Diseño Contemporáneo"
            },
            {
              src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU4NTg0NjExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              alt: "Arquitectura moderna 2",
              title: "Espacios Únicos"
            },
            {
              src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg1ODQ2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              alt: "Arquitectura moderna 3",
              title: "Inspiración Pura"
            }
          ].map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative h-80 overflow-hidden">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  fallbackSrc="/Assets/fondoarq.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/20 transition-all duration-500"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {image.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  Descubre la inspiración detrás de nuestros diseños
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl text-gray-300 italic leading-relaxed mb-6">
              "La arquitectura es el arte de organizar el espacio para crear experiencias únicas"
            </blockquote>
            <p className="text-amber-400 font-semibold">
              — Filosofía de Diseño ARQUIMEC
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InterludioVisual;
