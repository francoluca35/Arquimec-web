import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Calendar, Clock, CheckCircle, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { proyectosData, Proyecto } from "../data/proyectosData";

const ProyectoIndividual: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [imagenActual, setImagenActual] = useState(0);
  const [categoriaActual, setCategoriaActual] = useState<number | null>(null);

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
    if (categoriaActual === null) return;
    const imagenesActuales = proyecto.galeriaVistas[categoriaActual].imagenes;
    setImagenActual((prev) => 
      prev === imagenesActuales.length - 1 ? 0 : prev + 1
    );
  };

  const imagenAnterior = () => {
    if (categoriaActual === null) return;
    const imagenesActuales = proyecto.galeriaVistas[categoriaActual].imagenes;
    setImagenActual((prev) => 
      prev === 0 ? imagenesActuales.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Fijo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm py-4 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver a Proyectos</span>
          </button>
          <h1 className="text-2xl font-light text-gray-900">ARQUIMEC</h1>
        </div>
      </header>

      {/* 1. Sección de Presentación - Hero */}
      <section className="relative h-screen overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${proyecto.imagenHero})`
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center pt-20">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 inline-block">
              <span className="text-sm font-medium tracking-wider">{proyecto.categoria}</span>
            </div>
            <h1 className="text-6xl lg:text-8xl mb-6 font-light">
              {proyecto.titulo}
            </h1>
            <p className="text-xl lg:text-2xl">
              {proyecto.ubicacion} • {proyecto.año}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Sección de Descripción y Concepto */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl text-gray-900 mb-8 font-light">
                Descripción del Proyecto
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {proyecto.descripcion}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl text-gray-900 mb-8 font-light">
                Concepto Arquitectónico
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {proyecto.conceptoArquitectonico}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Sección de Galería de Vistas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4 font-light">
              Galería del Proyecto
            </h2>
            <p className="text-gray-600 text-lg">
              Explora cada detalle de este proyecto a través de nuestra galería de imágenes
            </p>
          </motion.div>

          {/* Grid de Galería */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proyecto.galeriaVistas.map((vista, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => {
                  setCategoriaActual(index);
                  setImagenActual(0);
                }}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${vista.imagenes[0]})`
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-lg font-semibold mb-1">
                      {vista.titulo}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {vista.imagenes.length} {vista.imagenes.length === 1 ? 'imagen' : 'imágenes'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal de Galería */}
          {categoriaActual !== null && (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-8">
              <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center">
                <button
                  onClick={() => setCategoriaActual(null)}
                  className="absolute top-4 right-4 z-10 bg-white/30 hover:bg-white/40 rounded-full p-3 text-white transition-all duration-200 hover:scale-110"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="relative w-full max-w-4xl">
                  <div 
                    className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${proyecto.galeriaVistas[categoriaActual].imagenes[imagenActual]})`
                    }}
                  />
                  
                  {/* Navegación de imágenes */}
                  {proyecto.galeriaVistas[categoriaActual].imagenes.length > 1 && (
                    <>
                      <button
                        onClick={imagenAnterior}
                        className="absolute -left-16 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/90 rounded-full p-4 shadow-xl transition-all duration-200 hover:scale-110 opacity-60 hover:opacity-100"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button
                        onClick={siguienteImagen}
                        className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/90 rounded-full p-4 shadow-xl transition-all duration-200 hover:scale-110 opacity-60 hover:opacity-100"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </>
                  )}
                </div>

                {/* Información de la imagen */}
                <div className="mt-8 text-center">
                  <h3 className="text-white text-2xl font-semibold mb-2">
                    {proyecto.galeriaVistas[categoriaActual].titulo}
                  </h3>
                  <p className="text-white/80 text-lg">
                    {imagenActual + 1} de {proyecto.galeriaVistas[categoriaActual].imagenes.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Sección de Características del Proyecto */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4 font-light">
              Características del Proyecto
            </h2>
            <p className="text-gray-600 text-lg">
              Especificaciones técnicas y características destacadas de la obra
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyecto.caracteristicas.map((caracteristica, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    {caracteristica.icono}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {caracteristica.titulo}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {caracteristica.valor}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {caracteristica.descripcion}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Sección de Cronología del Proyecto */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4 font-light">
              Cronología del Proyecto
            </h2>
            <p className="text-gray-600 text-lg">
              Seguimiento temporal desde el inicio hasta la finalización
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Inicio de Obra</h3>
              <div className="text-2xl font-bold text-gray-900 mb-2">{proyecto.cronologia.inicio}</div>
              <p className="text-gray-600">Comienzo de la construcción</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Duración</h3>
              <div className="text-2xl font-bold text-gray-900 mb-2">{proyecto.cronologia.duracion}</div>
              <p className="text-green-600 font-medium">{proyecto.cronologia.estado}</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Finalización</h3>
              <div className="text-2xl font-bold text-gray-900 mb-2">{proyecto.cronologia.finalizacion}</div>
              <p className="text-gray-600">Entrega de la obra</p>
            </motion.div>
          </div>

          {/* Timeline visual */}
          <div className="relative">
            <div className="h-1 bg-gray-300 rounded-full"></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full"></div>
            <div className="flex justify-between mt-4">
              <span className="text-sm text-gray-600">Inicio</span>
              <span className="text-sm text-gray-600">Fin</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProyectoIndividual;
