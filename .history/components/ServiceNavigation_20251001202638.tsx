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
    const baseStyles = "transition-colors font-medium";
    
    if (isActive) {
      return `${baseStyles} ${
        scrolled 
          ? "text-amber-400 hover:text-amber-300 font-bold" 
          : "text-blue-600 hover:text-blue-700 font-bold"
      }`;
    } else {
      return `${baseStyles} ${
        scrolled 
          ? "text-white hover:text-gray-300" 
          : "text-gray-600 hover:text-gray-900"
      }`;
    }
  };

  const getMobileButtonStyles = (isActive: boolean) => {
    const baseStyles = "transition-colors font-medium py-2 text-sm tracking-wider text-left";
    
    if (isActive) {
      return `${baseStyles} ${
        scrolled 
          ? "text-amber-400 hover:text-amber-300 font-bold" 
          : "text-blue-600 hover:text-blue-700 font-bold"
      }`;
    } else {
      return `${baseStyles} ${
        scrolled 
          ? "text-white hover:text-gray-300" 
          : "text-gray-600 hover:text-gray-900"
      }`;
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white shadow-lg" 
          : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Navegación izquierda - Inicio */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className={`flex items-center space-x-2 transition-colors ${
                  scrolled 
                    ? "text-gray-600 hover:text-gray-900" 
                    : "text-white hover:text-gray-300"
                }`}
              >
                <span className="text-sm font-medium">Inicio</span>
              </button>
            </div>
            
            {/* Desktop Navigation - Centro */}
            <div className="hidden lg:flex items-center space-x-6">
              <nav className="flex items-center space-x-4">
                {services.map((service, index) => {
                  const isActive = service.key === "inicio" 
                    ? router.pathname === "/" 
                    : currentPage === service.key;
                  
                  return (
                    <motion.button
                      key={service.key}
                      onClick={() => router.push(service.href)}
                      className={`transition-colors duration-500 text-sm tracking-wider ${
                        isActive
                          ? scrolled 
                            ? "text-amber-600 font-bold" 
                            : "text-amber-400 font-bold"
                          : scrolled 
                            ? "text-gray-600 hover:text-amber-600" 
                            : "text-white hover:text-amber-400"
                      }`}
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
              </nav>
            </div>
            
            {/* Logo en el centro - solo mobile */}
            <motion.div
              className="lg:hidden flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <span className={`text-2xl font-light tracking-wider ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                ARQUIMEC.
              </span>
            </motion.div>

            {/* Logo en la derecha - solo desktop */}
            <motion.div
              className="hidden lg:flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-amber-400 rounded-sm flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className={`font-bold text-lg ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  ARQUIMEC
                </span>
              </div>
            </motion.div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  scrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className={`lg:hidden fixed top-20 right-0 h-[calc(100vh-5rem)] w-80 shadow-lg z-50 ${
              scrolled ? 'bg-white' : 'bg-gray-900'
            }`}
            initial={{ opacity: 0, x: 320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 320 }}
            transition={{ duration: 0.3 }}
            role="navigation"
            aria-label="Menú de navegación móvil"
          >
            <div className="relative flex flex-col space-y-6 p-8 pt-8 h-full">
              {services.map((service) => {
                const isActive = service.key === "inicio" 
                  ? router.pathname === "/" 
                  : currentPage === service.key;
                
                return (
                  <button
                    key={service.key}
                    onClick={() => {
                      router.push(service.href);
                      setMobileMenuOpen(false);
                    }}
                    className={`transition-colors duration-500 py-2 text-sm tracking-wider text-left ${
                      isActive
                        ? scrolled 
                          ? "text-amber-600 font-bold" 
                          : "text-amber-400 font-bold"
                        : scrolled 
                          ? "text-gray-600 hover:text-amber-400" 
                          : "text-white hover:text-amber-400"
                    }`}
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
      </div>
    </motion.header>
  );
};

export default ServiceNavigation;
