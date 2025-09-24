import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X, MessageCircle, Instagram, Music } from "lucide-react";
import { NavbarButton } from "./ui/navbar-button";
import AnimatedLogo from "./AnimatedLogo";

interface HeaderProps {
  scrolled: boolean;
  headerVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled, headerVisible }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
                  className={`transition-colors duration-500 text-sm tracking-wider ${
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
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            className={`lg:hidden fixed top-20 right-0 h-[calc(103vh-6rem)] w-80 shadow-lg z-50 ${
              scrolled ? 'bg-[#e4e4e4]' : 'bg-[#1a2a3c]'
            }`}
            initial={{ opacity: 0, x: 320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 320 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-6 p-8 pt-8">
              {[
                { name: "ESTUDIO", href: "#estudio" },
                { name: "SERVICIO", href: "#servicio" },
                { name: "PROYECTOS", href: "#proyectos" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-500 py-2 text-sm tracking-wider ${
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
              >
                Hablemos de tu proyecto
              </NavbarButton>
              
              {/* Redes sociales */}
              <div className="flex justify-center space-x-6 mt-8">
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
                  <MessageCircle size={24} />
                </a>
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
                  <Instagram size={24} />
                </a>
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
                  <Music size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
