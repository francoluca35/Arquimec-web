import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Header from "./Header";
import Hero from "./Hero";
import Estudio from "./Estudio";
import Fundador from "./Fundador";
import InterludioVisual from "./InterludioVisual";
import ProcesosTrabajo from "./ProcesosTrabajo";
import NuestroLugar from "./NuestroLugar";
import Proyectos from "./Proyectos";
import Contacto from "./Contacto";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import ArrowUp from "./ArrowUp";
import { useLoading } from "../contexts/LoadingContext";
import { useOptimizedScroll } from "../hooks/useOptimizedScroll";

export default function MainApp() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isLoading, setIsLoading } = useLoading();
  
  // Usar hook optimizado para scroll
  const { scrolled, headerVisible } = useOptimizedScroll({
    threshold: 50,
    headerThreshold: 100
  });

  // Imágenes para el carousel del hero
  const heroImages = [
    "https://images.unsplash.com/photo-1624226784657-1e30fccdd59b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBleHRlcmlvcnxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1706808849777-96e0d7be3bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZSUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1NDY3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1651510351672-620d8dc31b72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1ODU4NDYxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1667375186583-0e90493826c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcGhvdG9ncmFwaHklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg1ODQ2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Mostrar/ocultar header basado en dirección de scroll
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - hide header
            setHeaderVisible(false);
          } else {
            // Scrolling up - show header
            setHeaderVisible(true);
          }
          
          setScrolled(currentScrollY > 50);
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Usar passive listener para mejor rendimiento
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Auto-cambio de imágenes en el hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Función para manejar cuando termine el loading
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Contenido principal - solo se muestra cuando no está cargando */}
      {!isLoading && (
        <main id="main-content">
          {/* Header */}
          <Header scrolled={scrolled} headerVisible={headerVisible}/>

          {/* Hero Section - Solo imágenes cambiando */}
          <Hero scrolled={scrolled}/>

          {/* Sección Estudio - Inspirada en la segunda imagen */}
          <Estudio/>

          {/* Sección Fundador - Inspirada en la tercera imagen */}
          <Fundador/>

          {/* Interludio Visual - Casa Moderna */}
          <InterludioVisual/>

          {/* Sección Proceso de Trabajo */}
          <ProcesosTrabajo/>

          {/* Sección Nuestro Lugar - Inspirada en la primera imagen */}
          {/* <NuestroLugar/> */}

          {/* Sección de Proyectos */}
          <Proyectos/>

          {/* Sección de Contacto */}
          <Contacto/>

          {/* Footer */}
          <Footer />

          {/* Arrow Up Button */}
          <ArrowUp />
        </main>
      )}
    </div>
  );
}
