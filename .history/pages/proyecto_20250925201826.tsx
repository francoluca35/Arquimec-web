import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { proyectosData, Proyecto } from "../data/proyectosData";

const ProyectoIndividual: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [imagenActual, setImagenActual] = useState(0);
  const [videoReproduciendo, setVideoReproduciendo] = useState(false);

  // Buscar el proyecto por ID
  const proyecto = proyectosData.find(p => p.id === parseInt(id as string));

  if (!proyecto) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 mb-4">Proyecto no encontrado</h1>
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-800"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const siguienteImagen = () => {
    setImagenActual((prev) => 
      prev === proyecto.imagenes.length - 1 ? 0 : prev + 1
    );
  };

  const imagenAnterior = () => {
    setImagenActual((prev) => 
      prev === 0 ? proyecto.imagenes.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
          <h1 className="text-2xl font-light text-gray-900">ARQUIMEC</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback
          src={proyecto.imagenHero}
          alt={proyecto.titulo}
          className="w-full h-full object-cover"
          fill={true}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl mb-4" style={{ fontWeight: 300 }}>
              {proyecto.titulo}
            </h1>
            <div className="flex gap-6 text-lg">
              <span>📍 {proyecto.ubicacion}</span>
              <span>📅 {proyecto.año}</span>
              <span>📐 {proyecto.area}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contenido principal */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        {/* Descripción */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-8" style={{ fontWeight: 300 }}>
            Descripción
          </h2>
          
          <div className="aspect-video bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
            <p className="text-gray-500 text-lg">Imagen del proyecto aquí</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              {proyecto.descripcionLarga}
            </p>
            
            <h3 className="text-2xl text-gray-900 mb-4" style={{ fontWeight: 300 }}>
              Detalles del Proyecto
            </h3>
            
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Área construida: {proyecto.area}</li>
              <li>Año de construcción: {proyecto.año}</li>
              <li>Ubicación: {proyecto.ubicacion}</li>
              <li>Tipo de proyecto: {proyecto.categoria}</li>
            </ul>
          </div>
        </motion.section>

      </main>
    </div>
  );
};

export default ProyectoIndividual;
