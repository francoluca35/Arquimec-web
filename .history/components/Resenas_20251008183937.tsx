import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle, MessageSquarePlus } from "lucide-react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../lib/firebase";
import ModalResena from "./ModalResena";

interface ResenaFirebase {
  id: string;
  nombre: string;
  email?: string;
  lugar: string;
  calidad: number;
  mensaje: string;
  fecha: any;
  verificado: boolean;
}

const Resenas: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reseñasFirebase, setReseñasFirebase] = useState<ResenaFirebase[]>([]);
  const [loading, setLoading] = useState(true);


  // Función para cargar reseñas de Firebase
  const loadReseñasFromFirebase = async () => {
    try {
      const q = query(
        collection(db, "Resenas"),
        orderBy("fecha", "desc"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const reseñasData: ResenaFirebase[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reseñasData.push({
          id: doc.id,
          nombre: data.nombre,
          email: data.email,
          lugar: data.lugar,
          calidad: data.calidad,
          mensaje: data.mensaje,
          fecha: data.fecha,
          verificado: data.verificado
        });
      });
      
      setReseñasFirebase(reseñasData);
    } catch (error) {
      console.error("Error al cargar reseñas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar reseñas al montar el componente
  useEffect(() => {
    loadReseñasFromFirebase();
  }, []);

  // Filtrar y mapear reseñas de Firebase (solo 4+ estrellas)
  const todasLasReseñas = reseñasFirebase
    .filter(r => r.calidad >= 4) // Solo reseñas de 4 o más estrellas
    .map(r => ({
      id: r.id,
      nombre: r.nombre,
      ubicacion: r.lugar,
      rating: r.calidad,
      fecha: r.fecha ? new Date(r.fecha.seconds * 1000).toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long' 
      }) : 'Fecha reciente',
      texto: r.mensaje,
      proyecto: r.lugar,
      verificado: r.verificado
    }));

  // Calcular slides según el dispositivo
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const reseñasPorSlide = isMobile ? 1 : 2;
  const totalSlides = Math.ceil(todasLasReseñas.length / reseñasPorSlide);

  // Auto-play del carrusel
  useEffect(() => {
    if (!isAutoPlaying || loading) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, loading]);

  // Reset currentIndex cuando cambia el número de slides
  useEffect(() => {
    setCurrentIndex(0);
  }, [totalSlides]);

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
    <section className="py-12 -mt-12 bg-gray-50">
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
              animate={{ x: -currentIndex * (100 / reseñasPorSlide) + '%' }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Mostrar 2 reseñas por slide */}
              {loading ? (
                <div className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((index) => (
                      <div key={index} className="bg-stone-50 rounded-xl shadow-sm p-6 border border-stone-200 animate-pulse">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-5 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-300 rounded"></div>
                          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : todasLasReseñas.length === 0 ? (
                <div className="w-full flex-shrink-0 px-4">
                  <div className="text-center py-12">
                    <div className="bg-stone-50 rounded-xl shadow-sm p-8 border border-stone-200">
                      <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Aún no hay reseñas
                      </h3>
                      <p className="text-gray-600">
                        Sé el primero en compartir tu experiencia con Arquimec
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                Array.from({ length: totalSlides }, (_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {todasLasReseñas.slice(slideIndex * reseñasPorSlide, slideIndex * reseñasPorSlide + reseñasPorSlide).map((reseña, index) => (
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
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-lg font-bold text-gray-900">
                                {reseña.nombre}
                              </h4>
                              {reseña.verificado && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{reseña.proyecto}</p>
                            
                            {/* Rating */}
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="flex space-x-1">
                                {renderStars(reseña.rating)}
                              </div>
                              <span className="text-sm text-gray-500">{reseña.fecha}</span>
                            </div>
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
                ))
              )}
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
            <div className="text-3xl font-light text-gray-900 mb-1">
              {todasLasReseñas.length > 0 
                ? (todasLasReseñas.reduce((acc, r) => acc + r.rating, 0) / todasLasReseñas.length).toFixed(1)
                : "5.0"
              }
            </div>
            <div className="flex justify-center mb-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-600">Calificación promedio</p>
          </div>

          <div>
            <div className="text-3xl font-light text-gray-900 mb-1">{todasLasReseñas.length}</div>
            <p className="text-sm text-gray-600">Reseñas destacadas</p>
          </div>

          <div>
            <div className="text-3xl font-light text-gray-900 mb-1">
              {todasLasReseñas.length > 0 
                ? `${Math.round((todasLasReseñas.filter(r => r.verificado).length / todasLasReseñas.length) * 100)}%`
                : "100%"
              }
            </div>
            <p className="text-sm text-gray-600">Clientes verificados</p>
          </div>
        </motion.div>

        {/* Botón DEJA RESEÑA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium tracking-wide"
          >
            <MessageSquarePlus className="w-5 h-5 mr-3" />
            DEJA RESEÑA
          </button>
        </motion.div>
      </div>

      {/* Modal de Reseña */}
      <ModalResena 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onResenaSent={loadReseñasFromFirebase}
      />
    </section>
  );
};

export default Resenas;
