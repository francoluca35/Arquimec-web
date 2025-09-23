import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "./components/ui/button";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Estudio from "./components/Estudio";
import Fundador from "./components/Fundador";
import InterludioVisual from "./components/InterludioVisual";
import ProcesosTrabajo from "./components/ProcesosTrabajo";
import NuestroLugar from "./components/NuestroLugar";
import Proyectos from "./components/Proyectos";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Imágenes para el carousel del hero
  const heroImages = [
    "https://images.unsplash.com/photo-1624226784657-1e30fccdd59b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBleHRlcmlvcnxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1706808849777-96e0d7be3bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZSUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1NDY3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1651510351672-620d8dc31b72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1ODU4NDYxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1667375186583-0e90493826c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcGhvdG9ncmFwaHklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg1ODQ2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Mostrar/ocultar header basado en dirección de scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setHeaderVisible(false);
      } else {
        // Scrolling up - show header
        setHeaderVisible(true);
      }
      
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Auto-cambio de imágenes en el hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
   <Header scrolled={scrolled} headerVisible={headerVisible}/>

      {/* Hero Section - Solo imágenes cambiando */}
    <Hero scrolled={scrolled}/>

      {/* Sección Estudio - Inspirada en la segunda imagen */}
   <Estudio/>

      {/* Sección Fundador - Inspirada en la tercera imagen */}
    <Fundador/>

      {/* Interludio Visual - Casa Moderna */}
   <InterludioVisual/>

      {/* Sección Proceso de Trabajo */}
    <ProcesosTrabajo/>

      {/* Sección Nuestro Lugar - Inspirada en la primera imagen */}
    <NuestroLugar/>

      {/* Sección de Proyectos */}
  <Proyectos/>

      {/* Sección de Contacto */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p
              className="text-gray-500 text-sm tracking-wider mb-4"
              style={{ letterSpacing: "0.15em" }}
            >
              CONTACTO
            </p>
            <h2
              className="text-4xl lg:text-5xl text-gray-900 mb-8 leading-tight"
              style={{ fontWeight: 300 }}
            >
              Trabajemos Juntos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {[
              {
                icon: Phone,
                title: "Teléfono",
                info: "+52 (55) 1234-5678",
              },
              {
                icon: Mail,
                title: "Email",
                info: "contacto@arquimec.com",
              },
              {
                icon: MapPin,
                title: "Ubicación",
                info: "Ciudad de México, México",
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <contact.icon className="w-8 h-8 mx-auto text-gray-600" />
                </div>
                <h3
                  className="text-lg text-gray-900 mb-2"
                  style={{ fontWeight: 400 }}
                >
                  {contact.title}
                </h3>
                <p className="text-gray-600">{contact.info}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 rounded-full text-sm tracking-wider transition-all duration-300"
              style={{
                fontWeight: 400,
                letterSpacing: "0.1em",
              }}
            >
              Iniciar Proyecto
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6">
                <span
                  className="text-2xl tracking-wider text-white"
                  style={{
                    fontWeight: 300,
                    letterSpacing: "0.1em",
                  }}
                >
                  ARQUIMEC
                </span>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
                Creando arquitectura excepcional que define el
                futuro. Transformamos ideas en espacios que
                inspiran y perduran.
              </p>
            </div>

            <div>
              <h4
                className="text-lg mb-6 text-white tracking-wider"
                style={{
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                }}
              >
                SERVICIOS
              </h4>
              <ul className="space-y-3 text-gray-300">
                {[
                  "Arquitectura Residencial",
                  "Arquitectura Comercial",
                  "Diseño de Interiores",
                  "Consultoría",
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="text-lg mb-6 text-white tracking-wider"
                style={{
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                }}
              >
                CONTACTO
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li>+52 (55) 1234-5678</li>
                <li>contacto@arquimec.com</li>
                <li>Ciudad de México, México</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Arquimec. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}