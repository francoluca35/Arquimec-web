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

        {/* Video Section */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4 font-light">
              Video del Proyecto
            </h2>
            <div className="w-24 h-1 bg-gray-300 mx-auto"></div>
          </div>
          <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
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
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4 font-light">
              Galería de Imágenes
            </h2>
            <p className="text-gray-500 text-lg">{proyecto.imagenes.length} imágenes</p>
            <div className="w-24 h-1 bg-gray-300 mx-auto mt-4"></div>
          </div>
          
          <div className="relative group">
            <div className="aspect-[16/10] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={proyecto.imagenes[imagenActual]}
                alt={`${proyecto.titulo} - Imagen ${imagenActual + 1}`}
                className="w-full h-full object-cover transition-transform duration-500"
                fill={true}
                sizes="100vw"
              />
            </div>

            {/* Navegación de imágenes */}
            {proyecto.imagenes.length > 1 && (
              <>
                <button
                  onClick={imagenAnterior}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 shadow-xl transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={siguienteImagen}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 shadow-xl transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </>
            )}

            {/* Indicadores */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
              {proyecto.imagenes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setImagenActual(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === imagenActual ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-6 lg:grid-cols-8 gap-3 mt-8">
            {proyecto.imagenes.map((imagen, index) => (
              <button
                key={index}
                onClick={() => setImagenActual(index)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                  index === imagenActual ? 'border-gray-900 shadow-lg' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <ImageWithFallback
                  src={imagen}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  fill={true}
                  sizes="(max-width:768px) 16vw, 8vw"
                />
              </button>
            ))}
          </div>
        </motion.section>

        {/* Concepto y Características */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl text-gray-900 mb-6 font-light">
                  {proyecto.concepto.titulo}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg lg:text-xl mb-8">
                  {proyecto.concepto.descripcion}
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Sector Público
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {proyecto.concepto.sectores.publico.map((sector, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Sector Privado
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {proyecto.concepto.sectores.privado.map((sector, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-light text-gray-900 mb-6">Características Principales</h3>
              <div className="space-y-4">
                {proyecto.caracteristicas.map((caracteristica, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-gray-900 rounded-full flex-shrink-0 mt-2" />
                    <span className="text-gray-600 text-lg">{caracteristica}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Detalle y Proceso */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl lg:text-4xl text-gray-900 mb-8 font-light">
                Detalle
              </h2>
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Proyecto y Dirección</h3>
                  <p className="text-gray-600">{proyecto.detalle.proyectoDireccion}</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Equipo de Proyecto</h3>
                  <p className="text-gray-600">{proyecto.detalle.equipoProyecto}</p>
                </div>
                {proyecto.detalle.asesoriaPatrimonio && (
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Asesoría en Patrimonio</h3>
                    <p className="text-gray-600">{proyecto.detalle.asesoriaPatrimonio}</p>
                  </div>
                )}
                {proyecto.detalle.disenoIluminacion && (
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Diseño de Iluminación</h3>
                    <p className="text-gray-600">{proyecto.detalle.disenoIluminacion}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Ubicación</h3>
                    <p className="text-gray-600">{proyecto.detalle.ubicacion}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Año</h3>
                    <p className="text-gray-600">{proyecto.detalle.año}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Superficie cubierta</h3>
                  <p className="text-gray-600 text-lg">{proyecto.detalle.superficie}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-light text-gray-900 mb-6">{proyecto.proceso.titulo}</h3>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {proyecto.proceso.descripcion}
              </p>
              <div className="space-y-4">
                {proyecto.proceso.etapas.map((etapa, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-600 text-lg">{etapa}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Navegación entre proyectos */}
        <motion.section
          className="border-t border-gray-200 pt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Volver a Proyectos</span>
            </button>
            <div className="text-center">
              <p className="text-gray-500 text-sm font-medium tracking-wider">PROYECTOS</p>
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
