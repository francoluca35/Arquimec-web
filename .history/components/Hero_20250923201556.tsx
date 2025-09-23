import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  scrolled: boolean;
}

const Hero: React.FC<HeroProps> = ({ scrolled }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Imágenes para el carousel del hero
  const heroImages = [
    "https://images.unsplash.com/photo-1624226784657-1e30fccdd59b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBleHRlcmlvcnxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1706808849777-96e0d7be3bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZSUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1NDY3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1651510351672-620d8dc31b72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1ODU4NDYxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1667375186583-0e90493826c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcGhvdG9ncmFwaHklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg1ODQ2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  // Auto-cambio de imágenes en el hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <ImageWithFallback
            src={heroImages[currentImageIndex]}
            alt={`Hero image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            fallbackSrc="/Assets/fondoarq.png"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenido del hero */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            ARQUIMEC
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Arquitectura moderna y funcional para tu próximo proyecto
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Conoce nuestros proyectos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Indicadores de imagen */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
