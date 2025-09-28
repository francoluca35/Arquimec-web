import { motion } from "motion/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ArrowLeft, Home, Building, Users, MapPin, Calendar, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const ArquitecturaResidencial: React.FC = () => {
  const router = useRouter();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const proyectosResidenciales = [
    {
      id: 1,
      titulo: "CASA MODERNA NORTE",
      ubicacion: "Buenos Aires, Argentina",
      superficie: "280 mts²",
      imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      descripcion: "Vivienda unifamiliar con diseño contemporáneo que integra perfectamente el interior con el exterior, maximizando la luz natural y la ventilación."
    },
    {
      id: 2,
      titulo: "COMPLEJO RESIDENCIAL HORIZONTE",
      ubicacion: "Córdoba, Argentina",
      superficie: "1,200 mts²",
      imagen: "https://images.unsplash.com/photo-1560185127-6c7c354e2105?w=800&h=600&fit=crop",
      descripcion: "Desarrollo residencial de 8 unidades con espacios comunes, jardines y estacionamiento subterráneo."
    },
    {
      id: 3,
      titulo: "CASA FAMILIAR SUR",
      ubicacion: "Rosario, Argentina",
      superficie: "450 mts²",
      imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      descripcion: "Diseño de vivienda familiar que prioriza la funcionalidad y el confort, con espacios amplios y distribución inteligente."
    },
    {
      id: 4,
      titulo: "LOFT URBANO",
      ubicacion: "Buenos Aires, Argentina",
      superficie: "120 mts²",
      imagen: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      descripcion: "Reformulación de espacio industrial en loft residencial, optimizando cada metro cuadrado con diseño minimalista."
    }
  ];

  const serviciosResidenciales = [
    {
      icono: <Building className="w-8 h-8" />,
      titulo: "Viviendas Unifamiliares",
      descripcion: "Diseño de casas personalizadas que reflejan el estilo de vida y necesidades específicas de cada familia."
    },
    {
      icono: <Users className="w-8 h-8" />,
      titulo: "Complejos Residenciales",
      descripcion: "Desarrollo de proyectos multifamiliares con espacios comunes, jardines y servicios compartidos."
    },
    {
      icono: <MapPin className="w-8 h-8" />,
      titulo: "Urbanizaciones",
      descripcion: "Planificación integral de barrios y urbanizaciones con infraestructura completa y diseño paisajístico."
    },
    {
      icono: <Calendar className="w-8 h-8" />,
      titulo: "Remodelaciones",
      descripcion: "Transformación y modernización de viviendas existentes, optimizando espacios y mejorando la funcionalidad."
    }
  ];

  return (
    <>
      <Head>
        <title>Arquitectura Residencial | Arquimec - Diseño de Viviendas</title>
        <meta name="description" content="Especialistas en diseño de viviendas unifamiliares, complejos residenciales y urbanizaciones. Creamos hogares únicos que reflejan tu estilo de vida." />
        <meta name="keywords" content="arquitectura residencial, viviendas unifamiliares, complejos residenciales, diseño de casas, Buenos Aires, Córdoba" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header con navegación */}
        <motion.header
          className="bg-white shadow-sm sticky top-0 z-50"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Volver</span>
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => router.push('/')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Inicio</span>
                </button>
              </div>
              <div className="text-2xl font-light tracking-wider text-gray-900">
                ARQUIMEC
              </div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          className="relative h-screen bg-gray-900 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"
              alt="Casa residencial moderna"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Contenido del hero */}
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-8 leading-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ARQUITECTURA RESIDENCIAL
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl mb-6 opacity-90"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Diseñamos hogares únicos que reflejan tu estilo de vida
            </motion.p>
            <motion.p
              className="text-lg mb-12 opacity-80"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Desde viviendas unifamiliares hasta complejos residenciales, creamos espacios habitables que combinan funcionalidad, estética y sostenibilidad.
            </motion.p>
            <motion.button
              onClick={() => router.push('/#contacto')}
              className="bg-white text-gray-900 px-8 py-4 text-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              CONSULTAR PROYECTO
            </motion.button>
          </div>
        </motion.section>

        {/* Sección Manifiesto */}
        <motion.section
          className="py-20 bg-gray-50 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Marca de agua ARQUIMEC */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-100 text-9xl lg:text-[12rem] font-light tracking-wider opacity-10 select-none">
              ARQUIMEC
            </span>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  Hogares que inspiran y perduran
                </h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    La arquitectura residencial es el arte de crear espacios donde las familias crecen, se desarrollan y crean recuerdos. Cada proyecto es una oportunidad de materializar sueños y necesidades específicas.
                  </p>
                  <p>
                    Nuestro enfoque combina la funcionalidad práctica con la estética contemporánea, considerando aspectos como la distribución eficiente del espacio, la selección de materiales duraderos y la integración armoniosa con el entorno.
                  </p>
                  <p>
                    Desde casas unifamiliares hasta complejos residenciales, cada diseño refleja el estilo de vida único de nuestros clientes, priorizando el confort, la sostenibilidad y la calidad de vida.
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Trabajamos en estrecha colaboración con nuestros clientes para entender sus necesidades, aspiraciones y presupuesto, asegurando que cada proyecto sea una inversión inteligente y duradera.
                </p>
                <p>
                  Nuestra experiencia abarca desde la planificación inicial hasta la supervisión de obra, garantizando que cada detalle se ejecute con la máxima calidad y precisión.
                </p>
                <p>
                  El resultado son hogares que no solo cumplen con las expectativas funcionales, sino que superan las aspiraciones estéticas y emocionales de quienes los habitan.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Servicios Especializados */}
        <motion.section
          className="py-20 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ofrecemos soluciones integrales para cada tipo de proyecto residencial
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {serviciosResidenciales.map((servicio, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    {servicio.icono}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{servicio.titulo}</h3>
                  <p className="text-gray-600 leading-relaxed">{servicio.descripcion}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Interludio */}
        <motion.section
          className="relative h-screen flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1560185127-6c7c354e2105?w=1920&h=1080&fit=crop"
              alt="Interior residencial"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Texto superpuesto */}
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <motion.h2
              className="text-5xl lg:text-7xl font-bold leading-tight"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Donde la arquitectura se encuentra con la vida
            </motion.h2>
          </div>
        </motion.section>

        {/* Galería de Proyectos */}
        <motion.section
          className="py-20 bg-gray-900 text-white relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Proyectos Residenciales</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Una selección de nuestros proyectos residenciales más destacados, donde cada diseño cuenta una historia única.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {proyectosResidenciales.map((proyecto, index) => (
                <motion.div
                  key={proyecto.id}
                  className="relative group cursor-pointer"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredProject(proyecto.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative h-96 overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={proyecto.imagen}
                      alt={proyecto.titulo}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Overlay con información */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{proyecto.titulo}</h3>
                        <p className="text-white/90 mb-1">{proyecto.ubicacion}</p>
                        <p className="text-white/90 mb-3">{proyecto.superficie}</p>
                        <p className="text-sm text-white/80">{proyecto.descripcion}</p>
                      </div>
                    </div>

                    {/* Información visible sin hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-2xl font-bold mb-1">{proyecto.titulo}</h3>
                      <p className="text-white/90 text-sm">{proyecto.ubicacion}</p>
                      <p className="text-white/90 text-sm">{proyecto.superficie}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-20 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-light tracking-wider mb-8 text-gray-900">
              ¿LISTO PARA TU HOGAR IDEAL?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Comencemos a diseñar el hogar de tus sueños. Nuestro equipo está listo para transformar tu visión en una realidad arquitectónica excepcional.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => router.push('/#contacto')}
                className="bg-gray-900 text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors duration-300"
              >
                Consultar Proyecto
              </button>
              <button
                onClick={() => router.push('/#proyectos')}
                className="border border-gray-900 text-gray-900 px-8 py-4 text-lg font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
              >
                Ver Más Proyectos
              </button>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="bg-gray-900 text-white py-16"
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
                  Creando arquitectura excepcional que define el futuro. Transformamos ideas en espacios que inspiran y perduran.
                </p>
              </div>

              <div>
                <h2 className="text-lg mb-6 text-white tracking-wider font-light">
                  SERVICIOS
                </h2>
                <ul className="space-y-3 text-gray-300">
                  <li><button onClick={() => router.push('/arquitectura-residencial')} className="hover:text-white transition-colors">Arquitectura Residencial</button></li>
                  <li><button onClick={() => router.push('/arquitectura-comercial')} className="hover:text-white transition-colors">Arquitectura Comercial</button></li>
                  <li><button onClick={() => router.push('/diseno-interiores')} className="hover:text-white transition-colors">Diseño de Interiores</button></li>
                  <li><button onClick={() => router.push('/consultorias')} className="hover:text-white transition-colors">Consultorías</button></li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg mb-6 text-white tracking-wider font-light">
                  CONTACTO
                </h2>
                <ul className="space-y-3 text-gray-300">
                  <li>+54 11 3119-9882</li>
                  <li>contacto@arquimec.com</li>
                  <li>CABA, Argentina</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400">
                  &copy; 2024 Arquimec. Todos los derechos reservados.
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
      </div>
    </>
  );
};

export default ArquitecturaResidencial;
