import { useRouter } from "next/router";
import { motion } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface ServiceNavigationProps {
  scrolled: boolean;
  currentPage: string;
}

const ServiceNavigation: React.FC<ServiceNavigationProps> = ({ scrolled, currentPage }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    { name: "INICIO", href: "/", key: "inicio" },
    { name: "RESIDENCIAL", href: "/arquitectura-residencial", key: "residencial" },
    { name: "COMERCIAL", href: "/arquitectura-comercial", key: "comercial" },
    { name: "INTERIORES", href: "/diseno-interiores", key: "interiores" },
    { name: "CONSULTORÍAS", href: "/consultorias", key: "consultorias" },
  ];

  const getButtonStyles = (isActive: boolean) => {
    const baseStyles = "transition-colors duration-500 text-sm tracking-wider underline-offset-4 hover:underline";
    
    if (isActive) {
      // Página activa - color destacado
      return `${baseStyles} ${
        scrolled 
          ? "text-amber-600 hover:text-amber-700 font-bold" 
          : "text-amber-400 hover:text-amber-300 font-bold"
      }`;
    } else {
      // Páginas inactivas - color normal
      return `${baseStyles} ${
        scrolled 
          ? "text-black hover:text-amber-600" 
          : "text-white hover:text-amber-400"
      }`;
    }
  };

  const getMobileButtonStyles = (isActive: boolean) => {
    const baseStyles = "transition-colors duration-500 py-2 text-sm tracking-wider underline-offset-4 hover:underline text-left";
    
    if (isActive) {
      // Página activa - color destacado
      return `${baseStyles} ${
        scrolled 
          ? "text-amber-600 hover:text-amber-700 font-bold" 
          : "text-amber-400 hover:text-amber-300 font-bold"
      }`;
    } else {
      // Páginas inactivas - color normal
      return `${baseStyles} ${
        scrolled 
          ? "text-black hover:text-amber-600" 
          : "text-white hover:text-amber-400"
      }`;
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-6">
        {services.map((service, index) => {
          const isActive = currentPage === service.key;
          
          return (
            <motion.button
              key={service.key}
              onClick={() => router.push(service.href)}
              className={getButtonStyles(isActive)}
              style={{
                fontWeight: 400,
                letterSpacing: "0.1em",
              }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {service.name}
            </motion.button>
          );
        })}
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`p-2 rounded-md transition-colors duration-200 ${
            scrolled 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-white hover:bg-gray-700'
          }`}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-service-menu"
          aria-label={mobileMenuOpen ? "Cerrar menú de servicios" : "Abrir menú de servicios"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          id="mobile-service-menu"
          className={`lg:hidden fixed top-20 right-0 h-[calc(103vh-6rem)] w-80 shadow-lg z-50 ${
            scrolled ? 'bg-[#e4e4e4]' : 'bg-[#1a2a3c]'
          }`}
          initial={{ opacity: 0, x: 320 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 320 }}
          transition={{ duration: 0.3 }}
          role="navigation"
          aria-label="Menú de navegación de servicios móvil"
        >
          <div className="relative flex flex-col space-y-6 p-8 pt-8 h-full">
            {services.map((service) => {
              const isActive = currentPage === service.key;
              
              return (
                <button
                  key={service.key}
                  onClick={() => {
                    router.push(service.href);
                    setMobileMenuOpen(false);
                  }}
                  className={getMobileButtonStyles(isActive)}
                  style={{
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                  }}
                >
                  {service.name}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ServiceNavigation;
