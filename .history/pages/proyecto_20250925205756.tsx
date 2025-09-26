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
            className="flex items-center gap-2 text-gray-800 hover:text-gray-950 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver a Proyectos</span>
          </button>
          <h1 className="text-2xl font-light text-gray-900">ARQUIMEC.</h1>
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Logo y Descripción */}
            <div className="space-y-4">
              <div className="flex items-center">
                <img 
                  src="/Assets/fondoarq.png" 
                  alt="ARQUIMEC Logo" 
                  className="h-20 w-auto"
                />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Arquitectura moderna y funcional. Transformamos espacios en experiencias únicas.
              </p>
            </div>

            {/* Redes Sociales */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white">Síguenos</h4>
              <div className="flex space-x-6">
                <a 
                  href="#" 
                  className="group relative p-3 rounded-full bg-gray-800/50 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="group relative p-3 rounded-full bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="group relative p-3 rounded-full bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="group relative p-3 rounded-full bg-gray-800/50 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contacto */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white">Contacto</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 info@arquimec.com</p>
                <p>📞 +54 11 1234-5678</p>
                <p>📍 Buenos Aires, Argentina</p>
              </div>
            </div>
          </div>

          {/* Línea divisoria */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm">
                Created by <a href="https://www.deamondd.com" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-gray-300 transition-colors duration-200">DeamonDD</a>
              </p>
              <a 
                href="/politicas-privacidad" 
                className="text-gray-500 hover:text-white text-sm transition-colors duration-200"
              >
                Políticas de Privacidad
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProyectoIndividual;
