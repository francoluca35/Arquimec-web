import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/router";
import { NavbarButton } from "./ui/navbar-button";
import AnimatedLogo from "./AnimatedLogo";

interface HeaderProps {
  scrolled: boolean;
  headerVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled, headerVisible }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Skip to main content link */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[60] bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
        tabIndex={1}
      >
        Saltar al contenido principal
      </a>
      
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled 
            ? "bg-[#e4e4e4] shadow-lg" 
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
            <AnimatedLogo scrolled={scrolled} />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 pr-4">
            <nav className="flex items-center space-x-4">
              {[
                { name: "ESTUDIO", href: "#estudio" },
                { name: "SERVICIO", href: "#servicio" },
                { name: "PROYECTOS", href: "#proyectos" },
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-500 text-sm tracking-wider underline-offset-4 hover:underline ${
                    scrolled 
                      ? "text-black hover:text-amber-600" 
                      : "text-white hover:text-amber-600"
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
                  {item.name}
                </motion.a>
              ))}
            </nav>
            <NavbarButton
              scrolled={scrolled}
              style={{
                fontWeight: 500,
                letterSpacing: "0.1em",
              }}
              onClick={() => router.push('/#contacto')}
            >
              Hablemos de tu proyecto
            </NavbarButton>
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
              {[
                { name: "ESTUDIO", href: "#estudio" },
                { name: "SERVICIO", href: "#servicio" },
                { name: "PROYECTOS", href: "#proyectos" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-500 py-2 text-sm tracking-wider underline-offset-4 hover:underline ${
                    scrolled 
                      ? "text-black hover:text-yellow-400" 
                      : "text-white hover:text-yellow-400"
                  }`}
                  style={{
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <NavbarButton
                scrolled={scrolled}
                className="w-full mt-4 hover:-translate-y-1"
                style={{
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                }}
                onClick={() => router.push('/#contacto')}
              >
                Hablemos de tu proyecto
              </NavbarButton>
              
              {/* Redes sociales */}
              <div className="absolute bottom-12 left-0 right-0 flex justify-center space-x-6">
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    scrolled 
                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
                
                {/* Instagram */}
                <a 
                  href="https://instagram.com/arquimec" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    scrolled 
                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                {/* TikTok */}
                <a 
                  href="https://tiktok.com/@arquimec" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    scrolled 
                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
    </>
  );
};

export default Header;
