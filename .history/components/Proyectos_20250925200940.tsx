import { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "next/router";
import { proyectosData, Proyecto } from "../data/proyectosData";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";

const Proyectos: React.FC = () => {
  const router = useRouter();
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);
  const [imagenActual, setImagenActual] = useState(0);

  const handleProjectClick = (proyecto: Proyecto) => {
    setProyectoSeleccionado(proyecto);
    setImagenActual(0);
  };

  const cerrarProyecto = () => {
    setProyectoSeleccionado(null);
  };

  const siguienteImagen = () => {
    if (proyectoSeleccionado) {
      setImagenActual((prev) => 
        prev === proyectoSeleccionado.imagenes.length - 1 ? 0 : prev + 1
      );
    }
  };

  const imagenAnterior = () => {
    if (proyectoSeleccionado) {
      setImagenActual((prev) => 
        prev === 0 ? proyectoSeleccionado.imagenes.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="proyectos" className="py-32 bg-gray-50">
      <div className="w-full">
        <motion.div
          className="text-center mb-20 max-w-7xl mx-auto px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p
            className="text-gray-500 text-sm tracking-wider mb-4"
            style={{ letterSpacing: "0.15em" }}
          >
            PROYECTOS
          </p>
          <h2
            className="text-4xl lg:text-5xl text-gray-900 mb-8 leading-tight"
            style={{ fontWeight: 300 }}
          >
            Alguno de nuestros trabajos
          </h2>
        </motion.div>

        {/* Grid Responsivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {proyectosData.map((proyecto, index) => (
            <motion.div
              key={proyecto.id}
              className="relative overflow-hidden cursor-pointer group aspect-square"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleProjectClick(proyecto)}
            >
              <ImageWithFallback
                src={proyecto.imagenHero}
                alt={proyecto.titulo}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                fill={true}
                sizes="(max-width:768px) 100vw, 25vw"
              />
              
              {/* Overlay con hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                <div className="p-6 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3
                    className="text-white text-lg mb-2"
                    style={{ fontWeight: 300 }}
                  >
                    {proyecto.titulo}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">{proyecto.categoria} • {proyecto.año}</p>
                  <button className="bg-white/60 text-black px-4 py-2 text-sm tracking-wider hover:bg-gray-100 transition-colors">
                    VER PROYECTO
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal de Proyecto Detallado */}
        {proyectoSeleccionado && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header del Modal */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-3xl text-gray-900" style={{ fontWeight: 300 }}>
                    {proyectoSeleccionado.titulo}
                  </h2>
                  <div className="flex gap-4 text-sm text-gray-600 mt-2">
                    <span>📍 {proyectoSeleccionado.ubicacion}</span>
                    <span>📅 {proyectoSeleccionado.año}</span>
                    <span>📐 {proyectoSeleccionado.area}</span>
                    <span>🏷️ {proyectoSeleccionado.categoria}</span>
                  </div>
                </div>
                <button
                  onClick={cerrarProyecto}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Contenido del Modal */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Video Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Video del Proyecto</h3>
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src={proyectoSeleccionado.video}
                      title={`Video de ${proyectoSeleccionado.titulo}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Galería de Imágenes */}
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">
                    Galería de Imágenes ({proyectoSeleccionado.imagenes.length})
                  </h3>
                  
                  <div className="relative">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={proyectoSeleccionado.imagenes[imagenActual]}
                        alt={`${proyectoSeleccionado.titulo} - Imagen ${imagenActual + 1}`}
                        className="w-full h-full object-cover"
                        fill={true}
                        sizes="100vw"
                      />
                    </div>

                    {/* Navegación de imágenes */}
                    {proyectoSeleccionado.imagenes.length > 1 && (
                      <>
                        <button
                          onClick={imagenAnterior}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={siguienteImagen}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}

                    {/* Indicadores */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {proyectoSeleccionado.imagenes.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setImagenActual(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === imagenActual ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-6 gap-2 mt-4">
                    {proyectoSeleccionado.imagenes.map((imagen, index) => (
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
                          sizes="(max-width:768px) 16vw, 8vw"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Descripción */}
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {proyectoSeleccionado.descripcion}
                  </p>
                </div>

                {/* Características */}
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Características Principales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {proyectoSeleccionado.caracteristicas.map((caracteristica, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gray-900 rounded-full flex-shrink-0" />
                        <span className="text-gray-600">{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Proyectos;
