import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/router";
import AnimatedLogo from "./AnimatedLogo";

interface ServiceNavigationProps {
  scrolled: boolean;
  currentPage: string;
}

const ServiceNavigation: React.FC<ServiceNavigationProps> = ({ scrolled, currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const services = [
    { name: "INICIO", href: "/", key: "inicio" },
    { name: "RESIDENCIAL", href: "/arquitectura-residencial", key: "residencial" },
    { name: "COMERCIAL", href: "/arquitectura-comercial", key: "comercial" },
    { name: "INTERIORES", href: "/diseno-interiores", key: "interiores" },
    { name: "CONSULTORÍAS", href: "/consultorias", key: "consultorias" },
  ];

  return (
    <>
      {/* Skip to main content link */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[60] bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg"
        style={{ 
          fontSize: '16px',
          fontWeight: '700',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
        }}
      >
        Saltar al contenido principal
      </a>
      
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
              {/* Navegación izquierda - Volver e Inicio */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className={`flex items-center space-x-2 transition-colors ${
                    scrolled 
                      ? "text-gray-600 hover:text-gray-900" 
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Volver</span>
                </button>
                <span className={`hidden lg:block ${scrolled ? "text-gray-300" : "text-white/50"}`}>|</span>
                <button
                  onClick={() => router.push('/')}
                  className={`hidden lg:flex items-center space-x-2 transition-colors ${
                    scrolled 
                      ? "text-gray-600 hover:text-gray-900" 
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span>Inicio</span>
                </button>
              </div>
              
              {/* Logo en el centro - solo desktop */}
              <motion.div
                className="hidden lg:flex items-center"
                whileHover={{ scale: 1.02 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <AnimatedLogo scrolled={scrolled} />
              </motion.div>
              
              {/* Desktop Navigation */}
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
                        className={`transition-colors duration-500 text-sm tracking-wider underline-offset-4 hover:underline ${
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

              {/* Mobile: Logo y hamburger juntos */}
              <div className="lg:hidden flex items-center space-x-4">
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
                
                {/* Mobile menu button */}
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
                {/* Navegación de servicios */}
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
                      className={`transition-colors duration-500 py-2 text-sm tracking-wider underline-offset-4 hover:underline text-left ${
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
                
                {/* Separador */}
                <div className={`border-t ${scrolled ? 'border-gray-200' : 'border-gray-700'} my-4`}></div>
                
                {/* Navegación adicional */}
                <button
                  onClick={() => {
                    router.back();
                    setMobileMenuOpen(false);
                  }}
                  className={`transition-colors duration-500 py-2 text-sm tracking-wider text-left flex items-center space-x-2 ${
                    scrolled 
                      ? "text-gray-600 hover:text-gray-900" 
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                
                <button
                  onClick={() => {
                    router.push('/');
                    setMobileMenuOpen(false);
                  }}
                  className={`transition-colors duration-500 py-2 text-sm tracking-wider text-left flex items-center space-x-2 ${
                    scrolled 
                      ? "text-gray-600 hover:text-gray-900" 
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Inicio</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>
    </>
  );
};

export default ServiceNavigation;
