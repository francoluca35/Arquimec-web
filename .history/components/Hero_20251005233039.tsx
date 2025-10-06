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
    "/Assets/hero/arqmoder.webp",
    "/Assets/hero/innovacion.webp",
    "/Assets/hero/interior.webp",
    "https://images.unsplash.com/photo-1667375186583-0e90493826c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcGhvdG9ncmFwaHklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg1ODQ2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  // Títulos para cada imagen
  const heroTitles = [
    "Arquitectura Moderna",
    "Diseño Contemporáneo", 
    "Innovación Arquitectónica",
    "Espacios e Interiores Únicos"
  ];

  // Auto-cambio de imágenes en el hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000); // Cambia cada 4 segundos (configuración original)

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-screen overflow-hidden">
    <AnimatePresence>
      <motion.div
        key={currentImageIndex}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ImageWithFallback
          src={heroImages[currentImageIndex]}
          alt={`Arquitectura moderna ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          fill={true}
          sizes="(max-width: 768px) 100vw, 100vw"
          priority={currentImageIndex === 0}
          quality={currentImageIndex === 0 ? 75 : 60}
          fetchPriority={currentImageIndex === 0 ? "high" : "low"}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          loading={currentImageIndex === 0 ? "eager" : "lazy"}
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Título de la imagen */}
        <div className="absolute bottom-20 right-4 md:right-8 z-10 max-w-[80%] md:max-w-none">
          <motion.h1 
            key={`title-${currentImageIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-white text-2xl sm:text-3xl md:text-5xl font-light tracking-wide font-['Inter'] text-right"
          >
            {heroTitles[currentImageIndex]}
          </motion.h1>
        </div>
      </motion.div>
    </AnimatePresence>


  </section>
  );
};

export default Hero;
