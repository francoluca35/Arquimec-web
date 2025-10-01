import { useRouter } from "next/router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X, Home, Building, Building2, Palette, Lightbulb, ChevronRight } from "lucide-react";

interface ServiceNavigationProps {
  scrolled: boolean;
  currentPage: string;
}

const ServiceNavigation: React.FC<ServiceNavigationProps> = ({ scrolled, currentPage }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    { 
      name: "Residencial", 
      fullName: "Arquitectura Residencial",
      href: "/arquitectura-residencial", 
      key: "residencial",
      icon: Building,
      description: "Viviendas únicas y personalizadas",
      color: "blue"
    },
    { 
      name: "Comercial", 
      fullName: "Arquitectura Comercial",
      href: "/arquitectura-comercial", 
      key: "comercial",
      icon: Building2,
      description: "Espacios empresariales modernos",
      color: "green"
    },
    { 
      name: "Interiores", 
      fullName: "Diseño de Interiores",
      href: "/diseno-interiores", 
      key: "interiores",
      icon: Palette,
      description: "Transformamos tus espacios",
      color: "purple"
    },
    { 
      name: "Consultorías", 
      fullName: "Consultorías",
      href: "/consultorias", 
      key: "consultorias",
      icon: Lightbulb,
      description: "Asesoramiento experto",
      color: "orange"
    },
  ];

  // Cerrar menú al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const getDesktopButtonStyles = (isActive: boolean) => {
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

  const getMobileButtonStyles = (service: any, isActive: boolean) => {
    const colorMap = {
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-50 text-green-600 hover:bg-green-100',
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-600 hover:bg-purple-100',
      orange: isActive ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
    };
    
    return `group relative w-full p-4 rounded-2xl border-2 transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] ${colorMap[service.color as keyof typeof colorMap]} shadow-lg hover:shadow-xl`;
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
              className={getDesktopButtonStyles(isActive)}
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
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`relative p-3 rounded-xl transition-all duration-300 ${
            scrolled 
              ? 'text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm' 
              : 'text-gray-700 hover:bg-gray-100 bg-gray-50'
          } ${mobileMenuOpen ? 'bg-opacity-20' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-service-menu"
          aria-label={mobileMenuOpen ? "Cerrar menú de servicios" : "Abrir menú de servicios"}
        >
          <motion.div
            animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
          
          {/* Indicador de menú abierto */}
          {mobileMenuOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              id="mobile-service-menu"
              className={`lg:hidden fixed top-20 right-4 w-80 max-w-[calc(100vw-2rem)] shadow-2xl z-50 rounded-2xl overflow-hidden ${
                scrolled 
                  ? 'bg-gray-900/95 backdrop-blur-xl border border-white/10' 
                  : 'bg-white/95 backdrop-blur-xl border border-gray-200'
              }`}
              initial={{ opacity: 0, x: 320, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 320, scale: 0.9 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              role="navigation"
              aria-label="Menú de navegación de servicios móvil"
            >
              {/* Header */}
              <div className={`px-6 py-4 border-b ${
                scrolled ? 'border-white/10' : 'border-gray-200'
              }`}>
                <h3 className={`text-lg font-bold ${
                  scrolled ? 'text-white' : 'text-gray-900'
                }`}>
                  Nuestros Servicios
                </h3>
                <p className={`text-sm ${
                  scrolled ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Explora nuestras especialidades
                </p>
              </div>

              {/* Services */}
              <div className="p-4 space-y-3">
                {services.map((service, index) => {
                  const isActive = currentPage === service.key;
                  const IconComponent = service.icon;
                  
                  return (
                    <motion.div
                      key={service.key}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.1
                      }}
                    >
                      <motion.button
                        onClick={() => {
                          router.push(service.href);
                          setMobileMenuOpen(false);
                        }}
                        className={getMobileButtonStyles(service, isActive)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              isActive 
                                ? 'bg-white/20' 
                                : scrolled 
                                  ? 'bg-white/10' 
                                  : 'bg-gray-100'
                            }`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-sm">
                                {service.name}
                              </div>
                              <div className={`text-xs ${
                                scrolled ? 'text-gray-300' : 'text-gray-500'
                              }`}>
                                {service.description}
                              </div>
                            </div>
                          </div>
                          
                          <motion.div
                            animate={{ 
                              x: isActive ? 4 : 0,
                              opacity: isActive ? 1 : 0.5
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className={`px-6 py-4 border-t ${
                scrolled ? 'border-white/10' : 'border-gray-200'
              }`}>
                <button
                  onClick={() => {
                    router.push('/');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-xl transition-all duration-300 ${
                    scrolled 
                      ? 'text-white hover:bg-white/10' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span className="font-medium text-sm">Volver al Inicio</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServiceNavigation;
