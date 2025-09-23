import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";
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
import Contacto from "./components/Contacto";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <Header scrolled={scrolled} headerVisible={headerVisible} />

      {/* Hero Section */}
      <Hero scrolled={scrolled} />

      {/* Estudio Section */}
      <Estudio />

      {/* Fundador Section */}
      <Fundador />

      {/* Interludio Visual Section */}
      <InterludioVisual />

      {/* Procesos de Trabajo Section */}
      <ProcesosTrabajo />

      {/* Nuestro Lugar Section */}
      <NuestroLugar />

      {/* Proyectos Section */}
      <Proyectos />

      {/* Contacto Section */}
      <Contacto />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">ARQUIMEC</h3>
              <p className="text-gray-400">
                Arquitectura moderna y funcional para tu próximo proyecto.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Diseño Arquitectónico</li>
                <li>Consultoría</li>
                <li>Supervisión</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@arquimec.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Av. Principal 123</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ARQUIMEC. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}