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
      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        {/* Descripción */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl text-gray-900 mb-6" style={{ fontWeight: 300 }}>
                Descripción
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {proyecto.descripcionLarga}
              </p>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={proyecto.imagenPrincipal}
                alt={proyecto.titulo}
                className="w-full h-full object-cover"
                fill={true}
                sizes="50vw"
              />
            </div>
          </div>
        </motion.section>

        {/* Video Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl text-gray-900 mb-8" style={{ fontWeight: 300 }}>
            Video del Proyecto
          </h2>
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              src={proyecto.video}
              title={`Video de ${proyecto.titulo}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.section>

        {/* Galería de Imágenes */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl text-gray-900 mb-8" style={{ fontWeight: 300 }}>
            Galería de Imágenes ({proyecto.imagenes.length})
          </h2>
          
          <div className="relative">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={proyecto.imagenes[imagenActual]}
                alt={`${proyecto.titulo} - Imagen ${imagenActual + 1}`}
                className="w-full h-full object-cover"
                fill={true}
                sizes="100vw"
              />
            </div>

            {/* Navegación de imágenes */}
            {proyecto.imagenes.length > 1 && (
              <>
                <button
                  onClick={imagenAnterior}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={siguienteImagen}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {proyecto.imagenes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setImagenActual(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === imagenActual ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-8 gap-2 mt-6">
            {proyecto.imagenes.map((imagen, index) => (
              <button
                key={index}
                onClick={() => setImagenActual(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  index === imagenActual ? 'border-gray-900' : 'border-transparent'
                }`}
              >
                <ImageWithFallback
                  src={imagen}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  fill={true}
                  sizes="(max-width:768px) 12vw, 6vw"
                />
              </button>
            ))}
          </div>
        </motion.section>

        {/* Concepto */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl text-gray-900 mb-6" style={{ fontWeight: 300 }}>
                {proyecto.concepto.titulo}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {proyecto.concepto.descripcion}
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Sector Público
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {proyecto.concepto.sectores.publico.map((sector, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Sector Privado
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {proyecto.concepto.sectores.privado.map((sector, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Características Principales</h3>
              <div className="space-y-3">
                {proyecto.caracteristicas.map((caracteristica, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full flex-shrink-0" />
                    <span className="text-gray-600">{caracteristica}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Detalle */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl text-gray-900 mb-6" style={{ fontWeight: 300 }}>
                Detalle
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Proyecto y Dirección</h3>
                  <p className="text-gray-600">{proyecto.detalle.proyectoDireccion}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Equipo de Proyecto</h3>
                  <p className="text-gray-600">{proyecto.detalle.equipoProyecto}</p>
                </div>
                {proyecto.detalle.asesoriaPatrimonio && (
                  <div>
                    <h3 className="font-medium text-gray-900">Asesoría en Patrimonio</h3>
                    <p className="text-gray-600">{proyecto.detalle.asesoriaPatrimonio}</p>
                  </div>
                )}
                {proyecto.detalle.disenoIluminacion && (
                  <div>
                    <h3 className="font-medium text-gray-900">Diseño de Iluminación</h3>
                    <p className="text-gray-600">{proyecto.detalle.disenoIluminacion}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-900">Ubicación</h3>
                  <p className="text-gray-600">{proyecto.detalle.ubicacion}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Año</h3>
                  <p className="text-gray-600">{proyecto.detalle.año}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Superficie cubierta</h3>
                  <p className="text-gray-600">{proyecto.detalle.superficie}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">{proyecto.proceso.titulo}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {proyecto.proceso.descripcion}
              </p>
              <div className="space-y-2">
                {proyecto.proceso.etapas.map((etapa, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-gray-600">{etapa}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Navegación entre proyectos */}
        <motion.section
          className="border-t pt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver a Proyectos</span>
            </button>
            <div className="text-center">
              <p className="text-gray-500 text-sm">PROYECTOS</p>
            </div>
            <div className="text-gray-400">
              {/* Placeholder para futura navegación entre proyectos */}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default ProyectoIndividual;
