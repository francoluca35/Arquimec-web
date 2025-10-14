import { motion } from "motion/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ChevronRight, Building2, Hammer, Users, Award, CheckCircle, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import ConstructoraHeader from "../components/ConstructoraHeader";

const ConstructoraPage: React.FC = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

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

      <div className="min-h-screen bg-white">
        {/* Header simplificado */}
        <ConstructoraHeader scrolled={scrolled} />

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
        <section id="servicios" className="py-20 bg-white">
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
        <section className="py-20 bg-gray-50">
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
      </div>
    </>
  );
};

export default ConstructoraPage;
