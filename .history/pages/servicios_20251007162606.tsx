import { motion } from "motion/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ArrowLeft, Home, Building, Building2, Palette, Users, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import AnimatedLogo from "../components/AnimatedLogo";
import ResponsiveNavbar from "../components/ResponsiveNavbar";

const Servicios: React.FC = () => {
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

  const servicios = [
    {
      id: 1,
      titulo: "Arquitectura Residencial",
      descripcion: "Diseñamos hogares únicos que reflejan la personalidad y estilo de vida de nuestros clientes. Desde casas unifamiliares hasta complejos residenciales, creamos espacios que combinan funcionalidad, estética y sostenibilidad.",
      imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      icono: <Building className="w-8 h-8" />,
      color: "from-blue-500 to-blue-700",
      posicion: "derecha"
    },
    {
      id: 2,
      titulo: "Arquitectura Comercial",
      descripcion: "Desarrollamos espacios comerciales que potencian la experiencia del cliente y optimizan el flujo de trabajo. Oficinas corporativas, retail, restaurantes y espacios públicos con diseño innovador.",
      imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      icono: <Building2 className="w-8 h-8" />,
      color: "from-green-500 to-green-700",
      posicion: "izquierda"
    },
    {
      id: 3,
      titulo: "Diseño de Interiores",
      descripcion: "Transformamos espacios interiores creando ambientes únicos y funcionales. Desde la conceptualización hasta la ejecución, cada proyecto refleja la identidad y necesidades específicas de nuestros clientes.",
      imagen: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      icono: <Palette className="w-8 h-8" />,
      color: "from-purple-500 to-purple-700",
      posicion: "derecha"
    },
    {
      id: 4,
      titulo: "Consultorías",
      descripcion: "Brindamos asesoramiento especializado en arquitectura y diseño. Evaluamos proyectos existentes, optimizamos espacios y proporcionamos soluciones innovadoras para desafíos arquitectónicos complejos.",
      imagen: "https://images.unsplash.com/photo-1560185127-6c7c354e2105?w=800&h=600&fit=crop",
      icono: <Users className="w-8 h-8" />,
      color: "from-orange-500 to-orange-700",
      posicion: "izquierda"
    }
  ];

  const handleServiceClick = (servicio: any) => {
    switch (servicio.titulo) {
      case "Arquitectura Residencial":
        router.push('/arquitectura-residencial');
        break;
      case "Arquitectura Comercial":
        router.push('/arquitectura-comercial');
        break;
      case "Diseño de Interiores":
        router.push('/diseno-interiores');
        break;
      case "Consultorías":
        router.push('/consultorias');
        break;
      default:
        router.push('/#servicio');
    }
  };

  return (
    <>
      <Head>
        <title>Nuestros Servicios | Arquimec - Arquitectura y Diseño</title>
        <meta name="description" content="Descubre nuestros servicios de arquitectura residencial, comercial, diseño de interiores y consultorías. Soluciones integrales para cada proyecto." />
        <meta name="keywords" content="arquitectura residencial, arquitectura comercial, diseño de interiores, consultorías, servicios arquitectónicos, Buenos Aires" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Responsive Navbar */}
        <ResponsiveNavbar scrolled={scrolled} currentPage="servicios" />

        {/* Hero Section */}
        <motion.section 
          id="main-content"
          className="relative h-screen bg-gray-900 flex items-center justify-center overflow-hidden pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Imagen de fondo */}
          <div className="absolute inset-0 ">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
              alt="Arquitectura moderna"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          {/* Contenido del hero */}
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <motion.h1 
              className="text-6xl lg:text-8xl font-light tracking-wider mb-8 leading-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              NUESTROS SERVICIOS
            </motion.h1>
            <motion.p 
              className="text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Soluciones arquitectónicas integrales que transforman ideas en espacios excepcionales
            </motion.p>
          </div>
        </motion.section>

        {/* Servicios Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {servicios.map((servicio, index) => (
              <motion.div
                key={servicio.id}
                className={`mb-32 ${servicio.posicion === 'derecha' ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex-row items-center gap-16`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Contenido de texto */}
                <div className="flex-1 space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-lg bg-gradient-to-r ${servicio.color} text-white`}>
                      {servicio.icono}
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-light tracking-wider text-gray-900">
                      {servicio.titulo}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                    {servicio.descripcion}
                  </p>
                  
                  <button
                    onClick={() => handleServiceClick(servicio)}
                    className="group flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors duration-300"
                    onMouseEnter={() => setHoveredService(servicio.id)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <span className="text-lg font-medium">Explora más</span>
                    <ChevronRight 
                      className={`w-5 h-5 transition-transform duration-300 ${
                        hoveredService === servicio.id ? 'translate-x-2' : ''
                      }`} 
                    />
                  </button>
                </div>

                {/* Imagen */}
                <div className="flex-1 relative">
                  <motion.div
                    className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageWithFallback
                      src={servicio.imagen}
                      alt={servicio.titulo}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
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
              ¿LISTO PARA TU PRÓXIMO PROYECTO?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Contactanos y descubramos juntos cómo podemos transformar tu visión en una realidad arquitectónica excepcional.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => router.push('/#contacto')}
                className="bg-white text-gray-900 px-8 py-4 text-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Contactar Ahora
              </button>
              <button
                onClick={() => router.push('/#proyectos')}
                className="border-2 border-white text-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300" 
                style={{ border: '2px solid #ffffff', boxSizing: 'border-box' }}
              >
                Ver Proyectos
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
                  Creando arquitectura excepcional que define el futuro. Transformamos ideas en espacios que inspiran y perduran.
                </p>
              </div>

              <div>
                <h2 className="text-lg mb-6 text-white tracking-wider font-light">
                  SERVICIOS
                </h2>
                <ul className="space-y-3 text-gray-300 ">
                  <li><button onClick={() => router.push('/arquitectura-residencial')} className="hover:hover:text-amber-600 hover:underline transition-colors">Arquitectura Residencial</button></li>
                  <li><button onClick={() => router.push('/arquitectura-comercial')} className="hover:hover:text-amber-600 hover:underline transition-colors">Arquitectura Comercial</button></li>
                  <li><button onClick={() => router.push('/diseno-interiores')} className="hover:hover:text-amber-600 hover:underline transition-colors">Diseño de Interiores</button></li>
                  <li><button onClick={() => router.push('/consultorias')} className="hover:hover:text-amber-600 hover:underline transition-colors">Consultorías</button></li>
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

export default Servicios;
