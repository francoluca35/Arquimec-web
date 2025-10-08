import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle } from "lucide-react";

const Resenas: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reseñas = [
    {
      id: 1,
      nombre: "María González",
      ubicacion: "Buenos Aires, Argentina",
      rating: 5,
      fecha: "Hace 1 mes",
      texto: "El equipo de Arquimec transformó completamente nuestra casa. Su atención al detalle y profesionalismo son excepcionales. Desde el primer día supieron exactamente lo que queríamos lograr.",
      proyecto: "Casa Familiar Norte",
      verificado: true
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      ubicacion: "Córdoba, Argentina", 
      rating: 5,
      fecha: "Hace 2 meses",
      texto: "Trabajar con Arquimec fue una experiencia increíble. Su visión arquitectónica moderna y funcional superó todas nuestras expectativas. El proyecto se completó a tiempo y con la máxima calidad.",
      proyecto: "Oficina Corporativa",
      verificado: true
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      ubicacion: "Rosario, Argentina",
      rating: 5,
      fecha: "Hace 3 meses", 
      texto: "La consultoría que recibimos fue invaluable. Nos ayudaron a optimizar nuestro espacio de manera inteligente y sostenible. Su expertise en diseño contemporáneo es evidente en cada detalle.",
      proyecto: "Consultoría Residencial",
      verificado: true
    },
    {
      id: 4,
      nombre: "Roberto Silva",
      ubicacion: "Mendoza, Argentina",
      rating: 5,
      fecha: "Hace 1 mes",
      texto: "Arquimec no solo diseñó nuestra oficina, sino que creó un espacio que inspira productividad y creatividad. Su enfoque en la sostenibilidad y funcionalidad es realmente impresionante.",
      proyecto: "Complejo Comercial",
      verificado: true
    },
    {
      id: 5,
      nombre: "Laura Fernández",
      ubicacion: "Buenos Aires, Argentina",
      rating: 5,
      fecha: "Hace 2 meses",
      texto: "El diseño de interiores que desarrollaron para nuestro hogar es simplemente perfecto. Cada elemento fue cuidadosamente seleccionado para crear armonía y elegancia. Altamente recomendados.",
      proyecto: "Diseño de Interiores",
      verificado: true
    }
  ];

  const totalSlides = Math.ceil(reseñas.length / 2);

  // Auto-play del carrusel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Reanudar auto-play después de 10s
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-light tracking-wider text-gray-900 mb-3">
            LO QUE DICEN NUESTROS CLIENTES
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es la base de nuestro compromiso
          </p>
        </motion.div>

        {/* Carrusel de Reseñas - 2 por fila */}
        <div className="relative max-w-6xl mx-auto">
          {/* Botones de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Contenedor del carrusel */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex"
              animate={{ x: -currentIndex * 50 + '%' }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Mostrar 2 reseñas por slide */}
              {Array.from({ length: Math.ceil(reseñas.length / 2) }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reseñas.slice(slideIndex * 2, slideIndex * 2 + 2).map((reseña, index) => (
                      <motion.div
                        key={reseña.id}
                        className="bg-stone-50 rounded-xl shadow-sm p-6 border border-stone-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      >
                        {/* Header con avatar y nombre */}
                        <div className="flex items-start space-x-4 mb-4">
                          {/* Avatar */}
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-sm">
                              {reseña.nombre.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>

                          {/* Información del cliente */}
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-1">
                              {reseña.nombre}
                            </h4>
                            <p className="text-sm text-gray-500 mb-2">{reseña.proyecto}</p>
                            
                            {/* Rating */}
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="flex space-x-1">
                                {renderStars(reseña.rating)}
                              </div>
                              <span className="text-sm text-gray-500">{reseña.fecha}</span>
                            </div>

                            {/* Verificación */}
                            {reseña.verificado && (
                              <p className="text-sm font-semibold text-gray-900">
                                Cliente verificado
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Texto de la reseña */}
                        <blockquote className="text-gray-800 leading-relaxed">
                          {reseña.texto}
                        </blockquote>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gray-900 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Estadísticas */}
        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="text-3xl font-light text-gray-900 mb-1">5.0</div>
            <div className="flex justify-center mb-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-600">Calificación promedio</p>
          </div>

          <div>
            <div className="text-3xl font-light text-gray-900 mb-1">150+</div>
            <p className="text-sm text-gray-600">Proyectos completados</p>
          </div>

          <div>
            <div className="text-3xl font-light text-gray-900 mb-1">98%</div>
            <p className="text-sm text-gray-600">Clientes satisfechos</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resenas;
