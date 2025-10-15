import { motion } from "motion/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ChevronRight, Building2, Hammer, Users, Award, CheckCircle, ArrowLeft, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import ConstructoraHeader from "../components/ConstructoraHeader";

const ConstructoraPage: React.FC = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{src: string, titulo: string, alt: string} | null>(null);
  const [visibleImages, setVisibleImages] = useState(10);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicios = [
    {
      icono: Building2,
      titulo: "Construcción Residencial",
      descripcion: "Edificamos hogares únicos que reflejan la personalidad y estilo de vida de nuestros clientes. Desde casas unifamiliares hasta complejos residenciales, creamos espacios que combinan funcionalidad, estética y sostenibilidad.",
      caracteristicas: [
        "Casas unifamiliares personalizadas",
        "Complejos residenciales",
        "Remodelaciones integrales",
        "Ampliaciones y reformas"
      ]
    },
    {
      icono: Hammer,
      titulo: "Obras Comerciales",
      descripcion: "Desarrollamos espacios comerciales que potencian la experiencia del cliente y optimizan el flujo de trabajo. Oficinas corporativas, retail, restaurantes y espacios públicos con diseño innovador.",
      caracteristicas: [
        "Oficinas corporativas modernas",
        "Espacios de retail y comercial",
        "Restaurantes y gastronomía",
        "Edificios públicos y gubernamentales"
      ]
    },
    {
      icono: Users,
      titulo: "Equipo Especializado",
      descripcion: "Contamos con profesionales certificados en todas las áreas de construcción. Nuestro equipo multidisciplinario garantiza la excelencia en cada proyecto, desde la planificación hasta la entrega final.",
      caracteristicas: [
        "Arquitectos certificados",
        "Ingenieros especializados",
        "Maestros de obra experimentados",
        "Supervisores de calidad"
      ]
    },
    {
      icono: Award,
      titulo: "Calidad Garantizada",
      descripcion: "Cumplimos con todas las normativas y estándares de la industria. Nuestro compromiso con la calidad se refleja en cada detalle, desde la selección de materiales hasta los acabados finales.",
      caracteristicas: [
        "Materiales de primera calidad",
        "Normativas vigentes",
        "Certificaciones de seguridad",
        "Garantía de obra"
      ]
    }
  ];

  const openImageModal = (proyecto: {src: string, titulo: string, alt: string}) => {
    setSelectedImage(proyecto);
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset'; // Restaurar scroll del body
  };

  const loadMoreImages = () => {
    setVisibleImages(prev => prev + 10);
  };

  // Array con todas las imágenes de construcción
  const allImages = [
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494843/constru/construccion-01.jpg",
      alt: "construcción-01",
      titulo: "Construcción 01"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494845/constru/construccion-02.jpg",
      alt: "construcción-02",
      titulo: "Construcción 02"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494846/constru/construccion-03.jpg",
      alt: "construcción-03",
      titulo: "Construcción 03"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494847/constru/construccion-04.jpg",
      alt: "construcción-04",
      titulo: "Construcción 04"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494848/constru/construccion-05.jpg",
      alt: "construcción-05",
      titulo: "Construcción 05"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494850/constru/construccion-06.jpg",
      alt: "construcción-06",
      titulo: "Construcción 06"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494851/constru/construccion-07.jpg",
      alt: "construcción-07",
      titulo: "Construcción 07"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494852/constru/construccion-08.jpg",
      alt: "construcción-08",
      titulo: "Construcción 08"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494853/constru/construccion-09.jpg",
      alt: "construcción-09",
      titulo: "Construcción 09"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494855/constru/construccion-10.jpg",
      alt: "construcción-10",
      titulo: "Construcción 10"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494856/constru/construccion-11.jpg",
      alt: "construcción-11",
      titulo: "Construcción 11"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494857/constru/construccion-12.jpg",
      alt: "construcción-12",
      titulo: "Construcción 12"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494859/constru/construccion-13.jpg",
      alt: "construcción-13",
      titulo: "Construcción 13"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494860/constru/construccion-14.jpg",
      alt: "construcción-14",
      titulo: "Construcción 14"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494861/constru/construccion-15.jpg",
      alt: "construcción-15",
      titulo: "Construcción 15"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494863/constru/construccion-16.jpg",
      alt: "construcción-16",
      titulo: "Construcción 16"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494864/constru/construccion-17.jpg",
      alt: "construcción-17",
      titulo: "Construcción 17"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494865/constru/construccion-18.jpg",
      alt: "construcción-18",
      titulo: "Construcción 18"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494867/constru/construccion-19.jpg",
      alt: "construcción-19",
      titulo: "Construcción 19"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494868/constru/construccion-20.jpg",
      alt: "construcción-20",
      titulo: "Construcción 20"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494870/constru/construccion-21.jpg",
      alt: "construcción-21",
      titulo: "Construcción 21"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494872/constru/construccion-22.jpg",
      alt: "construcción-22",
      titulo: "Construcción 22"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494873/constru/construccion-24.jpg",
      alt: "construcción-24",
      titulo: "Construcción 24"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494874/constru/construccion-25.jpg",
      alt: "construcción-25",
      titulo: "Construcción 25"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494875/constru/construccion-26.jpg",
      alt: "construcción-26",
      titulo: "Construcción 26"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494876/constru/construccion-27.jpg",
      alt: "construcción-27",
      titulo: "Construcción 27"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494877/constru/construccion-28.jpg",
      alt: "construcción-28",
      titulo: "Construcción 28"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494879/constru/construccion-29.jpg",
      alt: "construcción-29",
      titulo: "Construcción 29"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494880/constru/construccion-30.jpg",
      alt: "construcción-30",
      titulo: "Construcción 30"
    },
    {
      src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494882/constru/construccion-31.jpg",
      alt: "construcción-31",
      titulo: "Construcción 31"
    }
  ];

  // Cerrar modal con ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedImage) {
        closeImageModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const procesos = [
    {
      numero: "01",
      titulo: "CONSULTA INICIAL",
      descripcion: "Evaluamos sus necesidades y requerimientos específicos para desarrollar una propuesta personalizada."
    },
    {
      numero: "02",
      titulo: "PROYECTO Y PLANOS",
      descripcion: "Desarrollamos el diseño arquitectónico completo con planos técnicos detallados y renders 3D."
    },
    {
      numero: "03",
      titulo: "LICENCIAS Y PERMISOS",
      descripcion: "Gestionamos toda la documentación necesaria y obtenemos las licencias municipales requeridas."
    },
    {
      numero: "04",
      titulo: "CONSTRUCCIÓN",
      descripcion: "Ejecutamos la obra con nuestro equipo especializado, manteniendo los más altos estándares de calidad."
    },
    {
      numero: "05",
      titulo: "ENTREGA FINAL",
      descripcion: "Realizamos la entrega con todas las certificaciones y documentación legal correspondiente."
    }
  ];

  return (
    <>
      <Head>
        <title>Constructora Arquimec | Construcción Profesional en Buenos Aires</title>
        <meta name="description" content="Constructora profesional especializada en construcción residencial y comercial. Equipo certificado, materiales de calidad y garantía de obra en Buenos Aires." />
        <meta name="keywords" content="constructora, construcción residencial, obras comerciales, Buenos Aires, arquitectura, construcción profesional" />
      </Head>

      <div className="min-h-screen bg-white constructora-page">
        {/* Header simplificado */}
        <ConstructoraHeader scrolled={scrolled} />

        {/* Hero Section */}
        <motion.section 
          id="main-content"
          className="relative h-screen bg-gray-900 flex items-center justify-center overflow-hidden hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1080&fit=crop"
              alt="Construcción profesional"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          {/* Contenido del hero */}
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <motion.h1 
              className="text-6xl lg:text-8xl font-light tracking-wider mb-8 leading-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              CONSTRUCTORA ARQUIMEC
            </motion.h1>
            <motion.p 
              className="text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto mb-12"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Construcción profesional con los más altos estándares de calidad y excelencia
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={() => router.push('/#contacto')}
                className="bg-[#e5a648] text-black px-8 py-4 text-lg font-medium hover:bg-[#d4941e] transition-colors duration-300"
              >
                Solicitar Presupuesto
              </button>
              <button
                onClick={() => router.push('/#proyectos')}
                className="border-2 border-white text-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300"
              >
                Ver Proyectos
              </button>
            </motion.div>
          </div>
        </motion.section>

        {/* Servicios Section */}
        <section id="servicios" className="py-20 bg-white services-section">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-light tracking-wider text-gray-900 mb-6">
                NUESTROS SERVICIOS
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Soluciones integrales de construcción que transforman ideas en realidades arquitectónicas excepcionales
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {servicios.map((servicio, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-[#e5a648] rounded-lg flex items-center justify-center flex-shrink-0">
                      <servicio.icono className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-gray-900 mb-3">
                        {servicio.titulo}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {servicio.descripcion}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {servicio.caracteristicas.map((caracteristica, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#e5a648] flex-shrink-0" />
                        <span className="text-gray-700">{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Proceso de Trabajo */}
        <section id="procesos" className="py-20 bg-gray-50 process-section">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-light tracking-wider text-gray-900 mb-6">
                NUESTRO PROCESO
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Desde la consulta inicial hasta la entrega final, cada paso está diseñado para garantizar la excelencia
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {procesos.map((proceso, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-[#e5a648] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{proceso.numero}</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {proceso.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {proceso.descripcion}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Galería Section */}
        <section id="galeria" className="py-20 bg-white gallery-section">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-light tracking-wider text-gray-900 mb-6">
                GALERÍA DE OBRAS
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Algunos de nuestros proyectos más destacados que reflejan nuestra calidad y experiencia
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494843/constru/construccion-01.jpg",
                  alt: "construcción-01",
                  titulo: "Construcción 01"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494845/constru/construccion-02.jpg",
                  alt: "construcción-02",
                  titulo: "Construcción 02"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494846/constru/construccion-03.jpg",
                  alt: "construcción-03",
                  titulo: "Construcción 03"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494847/constru/construccion-04.jpg",
                  alt: "construcción-04",
                  titulo: "Construcción 04"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494848/constru/construccion-05.jpg",
                  alt: "construcción-05",
                  titulo: "Construcción 05"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494850/constru/construccion-06.jpg",
                  alt: "construcción-06",
                  titulo: "Construcción 06"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494851/constru/construccion-07.jpg",
                  alt: "construcción-07",
                  titulo: "Construcción 07"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494852/constru/construccion-08.jpg",
                  alt: "construcción-08",
                  titulo: "Construcción 08"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494853/constru/construccion-09.jpg",
                  alt: "construcción-09",
                  titulo: "Construcción 09"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494855/constru/construccion-10.jpg",
                  alt: "construcción-10",
                  titulo: "Construcción 10"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494856/constru/construccion-11.jpg",
                  alt: "construcción-11",
                  titulo: "Construcción 11"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494857/constru/construccion-12.jpg",
                  alt: "construcción-12",
                  titulo: "Construcción 12"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494859/constru/construccion-13.jpg",
                  alt: "construcción-13",
                  titulo: "Construcción 13"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494860/constru/construccion-14.jpg",
                  alt: "construcción-14",
                  titulo: "Construcción 14"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494861/constru/construccion-15.jpg",
                  alt: "construcción-15",
                  titulo: "Construcción 15"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494863/constru/construccion-16.jpg",
                  alt: "construcción-16",
                  titulo: "Construcción 16"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494864/constru/construccion-17.jpg",
                  alt: "construcción-17",
                  titulo: "Construcción 17"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494865/constru/construccion-18.jpg",
                  alt: "construcción-18",
                  titulo: "Construcción 18"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494867/constru/construccion-19.jpg",
                  alt: "construcción-19",
                  titulo: "Construcción 19"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494868/constru/construccion-20.jpg",
                  alt: "construcción-20",
                  titulo: "Construcción 20"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494870/constru/construccion-21.jpg",
                  alt: "construcción-21",
                  titulo: "Construcción 21"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494872/constru/construccion-22.jpg",
                  alt: "construcción-22",
                  titulo: "Construcción 22"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494873/constru/construccion-24.jpg",
                  alt: "construcción-24",
                  titulo: "Construcción 24"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494874/constru/construccion-25.jpg",
                  alt: "construcción-25",
                  titulo: "Construcción 25"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494875/constru/construccion-26.jpg",
                  alt: "construcción-26",
                  titulo: "Construcción 26"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494876/constru/construccion-27.jpg",
                  alt: "construcción-27",
                  titulo: "Construcción 27"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494877/constru/construccion-28.jpg",
                  alt: "construcción-28",
                  titulo: "Construcción 28"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494879/constru/construccion-29.jpg",
                  alt: "construcción-29",
                  titulo: "Construcción 29"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494880/constru/construccion-30.jpg",
                  alt: "construcción-30",
                  titulo: "Construcción 30"
                },
                {
                  src: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760494882/constru/construccion-31.jpg",
                  alt: "construcción-31",
                  titulo: "Construcción 31"
                }
              ].map((proyecto, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => openImageModal(proyecto)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={proyecto.src}
                      alt={proyecto.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
                  </div>
                  
                  {/* Overlay con título */}
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white">
                      <h3 className="text-lg font-medium mb-2">{proyecto.titulo}</h3>
                      <div className="w-12 h-0.5 bg-[#e5a648]"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Botón para ver más proyectos */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => router.push('/#proyectos')}
                className="bg-[#e5a648] text-black px-8 py-3 text-sm font-medium tracking-wider hover:bg-[#d4941e] transition-colors duration-300 flex items-center mx-auto"
              >
                Ver más proyectos
                <ChevronRight className="ml-2 w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section 
          className="py-20 bg-[#1a2a3c] text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider mb-8">
              ¿LISTO PARA CONSTRUIR TU PROYECTO?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Contactanos y descubramos juntos cómo podemos materializar tu visión arquitectónica con la más alta calidad constructiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => router.push('/#contacto')}
                className="bg-[#e5a648] text-black px-8 py-4 text-lg font-medium hover:bg-[#d4941e] transition-colors duration-300"
              >
                Contactar Ahora
              </button>
              <button
                onClick={() => router.push('/')}
                className="border-2 border-white text-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300 flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver al Inicio
              </button>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          className="bg-[#1a2a3c] text-white py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <div className="mb-6">
                  <span className="text-2xl tracking-wider text-white font-light">
                    ARQUIMEC.
                  </span>
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
                  Constructora profesional especializada en proyectos residenciales y comerciales. Transformamos ideas en realidades arquitectónicas excepcionales.
                </p>
              </div>

              <div>
                <h2 className="text-lg mb-6 text-white tracking-wider font-light">
                  SERVICIOS
                </h2>
                <ul className="space-y-3 text-gray-300">
                  <li>Construcción Residencial</li>
                  <li>Obras Comerciales</li>
                  <li>Remodelaciones</li>
                  <li>Consultoría</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg mb-6 text-white tracking-wider font-light">
                  CONTACTO
                </h2>
                <ul className="space-y-3 text-gray-300">
                  <li>+54 11 3119-9882</li>
                  <li>contacto@arquimec.com</li>
                  <li>Av. Alicia Moreau de Justo 1150</li>
                  <li>Puerto Madero, CABA</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400">
                  &copy; 2025 Arquimec. Todos los derechos reservados.
                </p>
                <div className="flex items-center space-x-6">
                  <a href="/politicas-privacidad" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                    Políticas de Privacidad
                  </a>
                  <p className="text-gray-400">
                    Creado por <a href="https://www.deamondd.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors duration-200">DeamonDD</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.footer>

        {/* Modal para ver imagen en grande */}
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
          >
            <div className="relative max-w-6xl max-h-[90vh] mx-4">
              {/* Botón cerrar */}
              <button
                onClick={closeImageModal}
                className="absolute -top-12 right-0 text-white hover:text-[#e5a648] transition-colors duration-300 z-10"
              >
                <X className="w-8 h-8" />
              </button>
              
              {/* Imagen */}
              <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()} // Prevenir cerrar al hacer clic en la imagen
              >
                <ImageWithFallback
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="rounded-lg shadow-2xl max-h-[80vh] w-auto object-contain"
                />
                
                {/* Título de la imagen */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white text-xl font-medium">{selectedImage.titulo}</h3>
                  <div className="w-16 h-0.5 bg-[#e5a648] mt-2"></div>
                </div>
              </motion.div>
              
              {/* Instrucciones */}
              <p className="text-white/70 text-sm text-center mt-4">
                Presiona ESC o haz clic fuera de la imagen para cerrar
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default ConstructoraPage;
