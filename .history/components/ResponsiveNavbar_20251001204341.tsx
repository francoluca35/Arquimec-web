import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Home, Building, Building2, Palette, Users } from "lucide-react";
import { useRouter } from "next/router";
import AnimatedLogo from "./AnimatedLogo";

interface ResponsiveNavbarProps {
  scrolled: boolean;
  currentPage?: string;
}

const ResponsiveNavbar: React.FC<ResponsiveNavbarProps> = ({ scrolled, currentPage = "servicios" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navigationItems = [
    {
      name: "Inicio",
      href: "/",
      icon: <Home className="w-5 h-5" />
    },
    {
      name: "Arquitectura Residencial",
      href: "/arquitectura-residencial",
      icon: <Building className="w-5 h-5" />
    },
    {
      name: "Arquitectura Comercial",
      href: "/arquitectura-comercial",
      icon: <Building2 className="w-5 h-5" />
    },
    {
      name: "Diseño de Interiores",
      href: "/diseno-interiores",
      icon: <Palette className="w-5 h-5" />
    },
    {
      name: "Consultorías",
      href: "/consultorias",
      icon: <Users className="w-5 h-5" />
    }
  ];

  const handleNavigation = (href: string) => {
    setMobileMenuOpen(false);
    router.push(href);
  };

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
      
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-[#ffffff] shadow-lg" 
            : "bg-gray-900"
        }`}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center space-x-2 transition-colors duration-300 ${
                    scrolled 
                      ? "text-gray-600 hover:text-gray-900" 
                      : "text-gray-300 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.icon}
                  <span className="text-sm font-medium tracking-wider">
                    {item.name}
                  </span>
                </motion.button>
              ))}
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
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu */}
              <motion.div
                id="mobile-menu"
                className={`fixed top-0 right-0 h-full w-[85vw] max-w-md shadow-2xl z-50 lg:hidden ${
                  scrolled ? 'bg-white' : 'bg-gray-900'
                }`}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ 
                  type: "spring", 
                  damping: 30, 
                  stiffness: 300 
                }}
                role="navigation"
                aria-label="Menú de navegación móvil"
              >
                {/* Mobile Menu Header */}
                <div className={`flex items-center justify-between p-6 border-b ${
                  scrolled ? 'border-gray-200' : 'border-gray-700'
                }`}>
                  <span className={`text-lg font-medium tracking-wider ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}>
                    Menú
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      scrolled 
                        ? 'text-gray-500 hover:bg-gray-100' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex flex-col py-8 px-6">
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavigation(item.href)}
                      className={`flex items-center space-x-4 py-4 transition-colors duration-200 text-left ${
                        scrolled 
                          ? 'text-gray-700 hover:text-gray-900' 
                          : 'text-white hover:text-gray-300'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      {item.icon}
                      <span className="text-base font-medium tracking-wider">
                        {item.name}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Mobile Menu Footer */}
                <div className={`absolute bottom-0 left-0 right-0 p-6 border-t ${
                  scrolled ? 'border-gray-200' : 'border-gray-700'
                }`}>
                  <div className="flex flex-col space-y-4">
                    <button
                      onClick={() => {
                        handleNavigation('/#contacto');
                      }}
                      className={`w-full py-3 px-4 border-2 transition-all duration-300 font-medium tracking-wider ${
                        scrolled
                          ? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
                          : 'border-white text-white hover:bg-white hover:text-gray-900'
                      }`}
                    >
                      Contactar Ahora
                    </button>
                    
                    {/* Social Links */}
                    <div className="flex justify-center space-x-4 pt-2">
                      <a 
                        href="https://wa.me/1234567890" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                          scrolled 
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </a>
                      
                      <a 
                        href="https://instagram.com/arquimec" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                          scrolled 
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default ResponsiveNavbar;
