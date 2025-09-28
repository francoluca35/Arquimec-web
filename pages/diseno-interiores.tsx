import { motion } from "motion/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ArrowLeft, Home, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import AnimatedLogo from "../components/AnimatedLogo";
import ServiceNavigation from "../components/ServiceNavigation";

const DisenoInteriores: React.FC = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const proyectosInteriores = [
    {
      id: 1,
      titulo: "CASA FAZ",
      ubicacion: "Sao Paulo, Brasil.",
      superficie: "1050 mts²",
      imagen: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      descripcion: "Diseño minimalista con líneas limpias y materiales nobles que integran perfectamente el interior con el exterior."
    },
    {
      id: 2,
      titulo: "CASA GALO",
      ubicacion: "Córdoba, Argentina.",
      superficie: "680 mts²",
      imagen: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      descripcion: "Interiorismo cálido y funcional para una familia, con espacios amplios y diseño contemporáneo."
    },
    {
      id: 3,
      titulo: "CASA GRINI",
      ubicacion: "Rosario, Argentina.",
      superficie: "1000 mts²",
      imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      descripcion: "Diseño de interiores que combina elegancia y funcionalidad en un espacio urbano moderno."
    },
    {
      id: 4,
      titulo: "CASA HAMZ",
      ubicacion: "Santiago de Chile, Chile.",
      superficie: "450 mts²",
      imagen: "https://images.unsplash.com/photo-1560185127-6c7c354e2105?w=800&h=600&fit=crop",
      descripcion: "Proyecto de interiorismo que maximiza el espacio disponible con un diseño inteligente y sofisticado."
    }
  ];

  const handleImageClick = (imagen: string) => {
    setSelectedImage(imagen);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Head>
        <title>Diseño de Interiores | Arquimec - Transformamos Espacios</title>
        <meta name="description" content="Servicio de diseño de interiores especializado en crear espacios únicos, funcionales y estéticamente excepcionales. Consultoría personalizada y proyectos ejecutivos." />
        <meta name="keywords" content="diseño de interiores, interiorismo, arquitectura de interiores, decoración, consultoría, Buenos Aires" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header con navegación */}
        <motion.header 
          className={`shadow-sm sticky top-0 z-50 transition-all duration-500 ${
            scrolled 
              ? "bg-gray-900 shadow-lg" 
              : "bg-white"
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className={`flex items-center space-x-2 transition-colors ${
                    scrolled 
                      ? "text-white hover:text-gray-300" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Volver</span>
                </button>
                <span className={scrolled ? "text-gray-400" : "text-gray-300"}>|</span>
                <button
                  onClick={() => router.push('/')}
                  className={`flex items-center space-x-2 transition-colors ${
                    scrolled 
                      ? "text-white hover:text-gray-300" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span>Inicio</span>
                </button>
              </div>
              <ServiceNavigation scrolled={scrolled} currentPage="interiores" />
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <AnimatedLogo scrolled={scrolled} />
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section - Primera imagen */}
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
              alt="Casa moderna nocturna"
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
              Creamos espacios que potencian los sentidos.
            </motion.h1>
            <motion.p 
              className="text-xl lg:text-2xl mb-6 opacity-90"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Proyectos de arquitectura e interiorismo con visión internacional.
            </motion.p>
            <motion.p 
              className="text-lg mb-12 opacity-80"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Más de 60 años creando experiencias únicas en Argentina, Chile, Brasil, Paraguay, Uruguay, Estados Unidos, España y más.
            </motion.p>
            <motion.button
              onClick={() => router.push('/#contacto')}
              className="bg-white text-gray-900 px-8 py-4 text-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              AGENDAR CONSULTA
            </motion.button>
          </div>
        </motion.section>

        {/* Sección Manifiesto - Segunda imagen */}
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
                  Diseñamos cada proyecto como una pieza única.
                </h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    ARQUIMEC es un estudio de arquitectura y diseño con múltiples reconocimientos por su trabajo, que opera en el ámbito del interiorismo y la arquitectura.
                  </p>
                  <p>
                    Con más de sesenta años de trayectoria, fue fundado por una familia de arquitectos que ha cultivado una visión propia a lo largo de tres generaciones, en la constante búsqueda de la perfección.
                  </p>
                  <p>
                    El estudio se distingue por su diseño de alta gama, experiencia internacional y capacidad local.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Trabaja en amplia variedad de tipologías: viviendas privadas, complejos residenciales, arquitectura corporativa, proyectos comerciales y más.
                </p>
                <p>
                  Cada obra se diseña a medida, atendiendo al contexto, al entorno y a las necesidades reales de quienes la habitan.
                </p>
                <p>
                  Comprender el alcance y las aspiraciones de cada proyecto, así como escuchar a los clientes, usuarios y contratistas, permite crear soluciones de diseño bien concebidas.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Interludio - Tercera imagen */}
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
              alt="Interior moderno"
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
              Si podemos diseñarlo,<br />Podemos hacerlo.
            </motion.h2>
          </div>
        </motion.section>

        {/* Sección Expertise - Cuarta imagen */}
        <motion.section 
          className="py-20 bg-gray-900 text-white relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Marca de agua ARQUIMEC */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-700 text-8xl lg:text-[10rem] font-light tracking-wider opacity-10 select-none">
              ARQUIMEC
            </span>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
              <div className="text-center">
                <div className="text-6xl lg:text-7xl font-bold mb-4 text-white">+360</div>
                <div className="text-xl font-medium mb-2">proyectos concretados</div>
                <div className="text-gray-300 text-sm">
                  Diseñamos más de 100 proyectos alrededor del mundo.
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-6xl lg:text-7xl font-bold mb-4 text-white">+140.000</div>
                <div className="text-xl font-medium mb-2">mts² construidos</div>
                <div className="text-gray-300 text-sm">
                  Aportamos innovación, sensibilidad y detalle en más de 140.000 metros cuadrados.
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-6xl lg:text-7xl font-bold mb-4 text-white">+60</div>
                <div className="text-xl font-medium mb-2">años trayectoria</div>
                <div className="text-gray-300 text-sm">
                  Tenemos más de 60 años de experiencia en el mundo de la arquitectura y el diseño.
                </div>
              </div>
            </div>
            
            {/* Tipologías */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Tipologías.</h3>
              <p className="text-gray-300 max-w-4xl mx-auto">
                Trabajamos en viviendas privadas, arquitectura comercial, corporativa, complejos residenciales, etc. 
                Hacemos proyectos de interiorismo y dirección artística.
              </p>
            </div>
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
              <h2 className="text-4xl font-bold mb-4">Proyectos en desarrollo</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Diseños recientes que se encuentran actualmente en desarrollo. Estas propuestas reflejan 
                nuestra continua exploración del habitar contemporáneo y la expresión arquitectónica.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {proyectosInteriores.map((proyecto, index) => (
                <motion.div
                  key={proyecto.id}
                  className="relative group cursor-pointer"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => handleImageClick(proyecto.imagen)}
                >
                  <div className="relative h-96 overflow-hidden">
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
                  <li><button onClick={() => router.push('/#servicio')} className="hover:text-white transition-colors">Arquitectura Residencial</button></li>
                  <li><button onClick={() => router.push('/#servicio')} className="hover:text-white transition-colors">Arquitectura Comercial</button></li>
                  <li><button onClick={() => router.push('/diseno-interiores')} className="hover:text-white transition-colors">Diseño de Interiores</button></li>
                  <li><button onClick={() => router.push('/#contacto')} className="hover:text-white transition-colors">Consultoría</button></li>
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

        {/* Modal de imagen */}
        {isModalOpen && selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <div className="relative max-w-5xl max-h-full">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>
              <ImageWithFallback
                src={selectedImage}
                alt="Imagen ampliada"
                width={800}
                height={600}
                className="object-contain max-h-[80vh] w-auto"
              />
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default DisenoInteriores;
