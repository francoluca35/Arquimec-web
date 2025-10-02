import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/router";

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
            ? "bg-[#ffffff] shadow-lg" 
            : "bg-[#1a2a3c]"
        }`}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full">
          <div className="flex justify-between items-center py-4 lg:py-6 px-2 lg:px-2">
            {/* Logo */}
            <motion.div
              className="flex items-center pl-0 lg:pl-6"
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 pr-4">
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
                            ? "text-black hover:text-amber-600" 
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

            {/* Mobile menu button */}
            <div className="lg:hidden pr-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  scrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-gray-700'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              className={`lg:hidden fixed top-20 right-0 h-[calc(103vh-6rem)] w-80 shadow-lg z-50 ${
                scrolled ? 'bg-[#e4e4e4]' : 'bg-[#1a2a3c]'
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
                      className={`transition-colors duration-500 py-2 text-sm tracking-wider underline-offset-4 hover:underline text-left ${
                        isActive
                          ? scrolled 
                            ? "text-amber-600 font-bold" 
                            : "text-amber-400 font-bold"
                          : scrolled 
                            ? "text-black hover:text-amber-400" 
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
    </>
  );
};

export default ServiceNavigation;
