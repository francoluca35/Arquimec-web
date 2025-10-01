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
    { name: "Arq Residencial", href: "/arquitectura-residencial", key: "residencial" },
    { name: "Arq Comercial", href: "/arquitectura-comercial", key: "comercial" },
    { name: "Diseño de Interiores", href: "/diseno-interiores", key: "interiores" },
    { name: "Consultorías", href: "/consultorias", key: "consultorias" },
  ];

  const getButtonStyles = (isActive: boolean) => {
    const baseStyles = "transition-colors font-medium";
    
    if (isActive) {
      // Página activa - color destacado
      return `${baseStyles} ${
        scrolled 
          ? "text-amber-400 hover:text-amber-300 font-bold" 
          : "text-blue-600 hover:text-blue-700 font-bold"
      }`;
    } else {
      // Páginas inactivas - color normal
      return `${baseStyles} ${
        scrolled 
          ? "text-white hover:text-gray-300" 
          : "text-gray-600 hover:text-gray-900"
      }`;
    }
  };

  const getMobileButtonStyles = (isActive: boolean) => {
    const baseStyles = "transition-colors font-medium py-2 text-sm tracking-wider";
    
    if (isActive) {
      // Página activa - color destacado
      return `${baseStyles} ${
        scrolled 
          ? "text-amber-400 hover:text-amber-300 font-bold" 
          : "text-blue-600 hover:text-blue-700 font-bold"
      }`;
    } else {
      // Páginas inactivas - color normal
      return `${baseStyles} ${
        scrolled 
          ? "text-white hover:text-gray-300" 
          : "text-gray-600 hover:text-gray-900"
      }`;
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-6">
        {services.map((service) => {
          const isActive = currentPage === service.key;
          
          return (
            <motion.button
              key={service.key}
              onClick={() => router.push(service.href)}
              className={getButtonStyles(isActive)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
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
              ? 'text-white hover:bg-gray-700' 
              : 'text-gray-600 hover:bg-gray-100'
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
          className={`lg:hidden fixed top-20 right-0 h-auto w-80 shadow-lg z-50 ${
            scrolled ? 'bg-gray-900' : 'bg-white'
          }`}
          initial={{ opacity: 0, x: 320 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 320 }}
          transition={{ duration: 0.3 }}
          role="navigation"
          aria-label="Menú de navegación de servicios móvil"
        >
          <div className="relative flex flex-col space-y-2 p-6 pt-6 h-auto">
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
