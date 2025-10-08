import { motion } from "motion/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ArrowLeft, Home, Lightbulb, FileText, Target, Users, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import AnimatedLogo from "../components/AnimatedLogo";
import ResponsiveNavbar from "../components/ResponsiveNavbar";

const Consultorias: React.FC = () => {
  const router = useRouter();
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviciosConsultoria = [
    {
      id: 1,
      titulo: "CONSULTORÍA ESTRATÉGICA",
      descripcion: "Asesoramiento integral para la planificación y desarrollo de proyectos arquitectónicos complejos, optimizando recursos y garantizando el éxito.",
      imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      icono: <Lightbulb className="w-8 h-8" />
    },
    {
      id: 2,
      titulo: "EVALUACIÓN DE PROYECTOS",
      descripcion: "Análisis detallado de proyectos existentes para identificar oportunidades de mejora, optimización de espacios y potencial de valorización.",
      imagen: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      icono: <FileText className="w-8 h-8" />
    },
    {
      id: 3,
      titulo: "PLANIFICACIÓN URBANA",
      descripcion: "Desarrollo de estrategias urbanísticas y planificación integral de desarrollos inmobiliarios con enfoque sostenible y funcional.",
      imagen: "https://images.unsplash.com/photo-1560185127-6c7c354e2105?w=800&h=600&fit=crop",
      icono: <Target className="w-8 h-8" />
    },
    {
      id: 4,
      titulo: "ASESORAMIENTO TÉCNICO",
      descripcion: "Soporte especializado en normativas, permisos, licitaciones y supervisión técnica para garantizar el cumplimiento y calidad del proyecto.",
      imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      icono: <Users className="w-8 h-8" />
    }
  ];

  const areasEspecializacion = [
    {
      icono: <Lightbulb className="w-8 h-8" />,
      titulo: "Estrategia Arquitectónica",
      descripcion: "Desarrollo de estrategias integrales para proyectos arquitectónicos que maximizan el valor y optimizan la inversión."
    },
    {
      icono: <FileText className="w-8 h-8" />,
      titulo: "Análisis de Viabilidad",
      descripcion: "Evaluación técnica y económica de proyectos para determinar su factibilidad y potencial de éxito en el mercado."
    },
    {
      icono: <Target className="w-8 h-8" />,
      titulo: "Planificación Urbana",
      descripcion: "Desarrollo de planes maestros y estrategias urbanísticas para proyectos de gran escala y desarrollos inmobiliarios."
    },
    {
      icono: <Users className="w-8 h-8" />,
      titulo: "Gestión de Proyectos",
      descripcion: "Coordinación integral de equipos multidisciplinarios para la ejecución exitosa de proyectos arquitectónicos complejos."
    }
  ];

  return (
    <>
      <Head>
        <title>Consultorías | Arquimec - Asesoramiento Especializado</title>
        <meta name="description" content="Servicios de consultoría arquitectónica especializada. Asesoramiento experto en planificación, diseño y ejecución de proyectos arquitectónicos complejos." />
        <meta name="keywords" content="consultoría arquitectónica, asesoramiento especializado, planificación urbana, análisis de viabilidad, Buenos Aires" />
      </Head>

      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Responsive Navbar */}
        <ResponsiveNavbar scrolled={scrolled} currentPage="consultorias" />

        {/* Hero Section */}
        <motion.section
          id="main-content"
          className="relative h-screen bg-gray-900 flex items-center justify-center overflow-hidden pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
              alt="Consultoría arquitectónica"
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
              CONSULTORÍAS
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl mb-6 opacity-90"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Asesoramiento experto que transforma ideas en proyectos exitosos
            </motion.p>
            <motion.p
              className="text-lg mb-12 opacity-80"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Brindamos asesoramiento especializado en arquitectura y diseño, ofreciendo soluciones personalizadas que optimizan recursos, cumplen normativas y materializan ideas en proyectos exitosos.
            </motion.p>
            <motion.button
              onClick={() => router.push('/#contacto')}
              className="bg-white text-gray-900 px-8 py-4 text-lg font-medium hover:bg-[#b48f42] hover:text-white transition-colors duration-300"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              CONSULTAR SERVICIOS
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
                  Experiencia que marca la diferencia
                </h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Nuestros servicios de consultoría arquitectónica se basan en más de 60 años de experiencia en el diseño y construcción de proyectos complejos. Ofrecemos asesoramiento experto que va más allá de la arquitectura tradicional.
                  </p>
                  <p>
                    Trabajamos como socios estratégicos de nuestros clientes, proporcionando soluciones personalizadas que optimizan recursos, mejoran la eficiencia energética, seleccionan materiales adecuados y garantizan el cumplimiento de normativas vigentes.
                  </p>
                  <p>
                    Nuestro objetivo es acompañar a nuestros clientes en cada etapa del proceso, asegurando que sus proyectos se desarrollen de manera exitosa y alineados con sus necesidades y expectativas específicas.
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Desde la evaluación inicial hasta la supervisión de obra, nuestro equipo multidisciplinario proporciona el conocimiento técnico y la experiencia práctica necesaria para resolver los desafíos más complejos de la arquitectura contemporánea.
                </p>
                <p>
                  Nuestro enfoque integral considera aspectos como la sostenibilidad, la accesibilidad, la eficiencia energética y la integración con el entorno, asegurando que cada proyecto contribuya positivamente a su contexto.
                </p>
                <p>
                  El resultado son proyectos que no solo cumplen con los requisitos técnicos y normativos, sino que superan las expectativas de calidad, funcionalidad y valor a largo plazo.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Servicios de Consultoría */}
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
                Soluciones especializadas para cada tipo de consultoría arquitectónica
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {serviciosConsultoria.map((servicio, index) => (
                <motion.div
                  key={servicio.id}
                  className="relative group cursor-pointer"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredService(servicio.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="relative h-80 overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={servicio.imagen}
                      alt={servicio.titulo}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Overlay con información */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                      <div className="text-center text-white">
                        <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          {servicio.icono}
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{servicio.titulo}</h3>
                        <p className="text-sm text-white/90">{servicio.descripcion}</p>
                      </div>
                    </div>

                    {/* Información visible sin hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-orange-500 w-8 h-8 rounded-full flex items-center justify-center">
                          {servicio.icono}
                        </div>
                        <h3 className="text-xl font-bold text-white">{servicio.titulo}</h3>
                      </div>
                    </div>
                  </div>
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
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop"
              alt="Consultoría especializada"
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
              Donde la experiencia se encuentra con la innovación
            </motion.h2>
          </div>
        </motion.section>

        {/* Áreas de Especialización */}
        <motion.section
          className="py-20 bg-gray-900 text-white relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Áreas de Especialización</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Nuestro equipo multidisciplinario se especializa en diversas áreas de la arquitectura y el diseño
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {areasEspecializacion.map((area, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-lg hover:bg-white/10 transition-colors duration-300"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {area.icono}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{area.titulo}</h3>
                  <p className="text-gray-300 leading-relaxed">{area.descripcion}</p>
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
              ¿LISTO PARA OPTIMIZAR TU PROYECTO?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Comencemos a analizar tu proyecto y descubramos juntos cómo podemos optimizarlo para alcanzar el máximo potencial. Nuestro equipo de consultores está listo para brindarte el asesoramiento experto que necesitas.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => router.push('/#contacto')}
                className="bg-gray-900 text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors duration-300"
              >
                Consultar Servicios
              </button>
              <button
                onClick={() => router.push('/#proyectos')}
                className="border border-gray-900 text-gray-900 px-8 py-4 text-lg font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
              >
                Ver Proyectos
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
      </div>
    </>
  );
};

export default Consultorias;
