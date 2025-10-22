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
const Renders = lazy(() => import("./Renders"));
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
    "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760413134/hero/arqmoder.jpg",
    "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760413134/hero/heroconst.jpg",
    "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760413134/hero/innovacion.jpg",
    "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760413134/hero/interior.jpg",
    "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760413134/hero/disenoarquitectonico.jpg"
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
        <main id="main-content">
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
