import { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLoading } from "../contexts/LoadingContext";
import { useOptimizedScroll } from "../hooks/useOptimizedScroll";

// LAZY LOADING EXTREMO - SOLO CARGAR LO CRÍTICO INICIALMENTE
import Header from "./Header";
import Hero from "./Hero";
import LoadingScreen from "./LoadingScreen";

// LAZY LOADING DE COMPONENTES NO CRÍTICOS
const Estudio = lazy(() => import("./Estudio"));
const Constructora = lazy(() => import("./Constructora"));
const Fundador = lazy(() => import("./Fundador"));
const MisionVision = lazy(() => import("./MisionVision"));
const InterludioVisual = lazy(() => import("./InterludioVisual"));
const ProcesosTrabajo = lazy(() => import("./ProcesosTrabajo"));
const Proyectos = lazy(() => import("./Proyectos"));
const Resenas = lazy(() => import("./Resenas"));
const Contacto = lazy(() => import("./Contacto"));
const Footer = lazy(() => import("./Footer"));
const ArrowUp = lazy(() => import("./ArrowUp"));

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
        <main id="main-content" className="header-offset">
          {/* Header */}
          <Header scrolled={scrolled} headerVisible={headerVisible}/>

          {/* Hero Section - Solo imágenes cambiando */}
          <Hero scrolled={scrolled}/>

          {/* LAZY LOADING EXTREMO - COMPONENTES NO CRÍTICOS */}
          <Suspense fallback={<div className="h-screen bg-white" />}>
            <Estudio/>
          </Suspense>

          <Suspense fallback={<div className="h-screen bg-white" />}>
            <Constructora/>
          </Suspense>

          <Suspense fallback={<div className="h-screen bg-white" />}>
            <Fundador/>
          </Suspense>

          <Suspense fallback={<div className="h-screen bg-white" />}>
            <MisionVision/>
          </Suspense>

          <Suspense fallback={<div className="h-screen bg-white" />}>
            <InterludioVisual/>
          </Suspense>

          <Suspense fallback={<div className="h-screen bg-white" />}>
            <ProcesosTrabajo/>
          </Suspense>

          <Suspense fallback={<div className="h-screen bg-white" />}>
            <Proyectos/>
          </Suspense>

          <Suspense fallback={<div className="h-screen bg-white" />}>
            <Resenas/>
          </Suspense>

          <Suspense fallback={<div className="h-screen bg-white" />}>
            <Contacto/>
          </Suspense>

          <Suspense fallback={<div className="h-screen bg-white" />}>
            <Footer />
          </Suspense>

          <Suspense fallback={null}>
            <ArrowUp />
          </Suspense>
        </main>
      )}
    </div>
  );
}
