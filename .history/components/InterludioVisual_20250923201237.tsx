import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const InterludioVisual: React.FC = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Interludio Visual
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Una pausa para contemplar la belleza arquitectónica y la inspiración 
            que guía nuestro trabajo diario.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU4NTM5MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              alt: "Arquitectura moderna 1"
            },
            {
              src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU4NTg0NjExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              alt: "Arquitectura moderna 2"
            },
            {
              src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg1ODQ2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              alt: "Arquitectura moderna 3"
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
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                fallbackSrc="/Assets/fondoarq.png"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold">Ver detalles</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-300 italic">
            "La arquitectura es el arte de organizar el espacio para crear experiencias únicas"
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InterludioVisual;
