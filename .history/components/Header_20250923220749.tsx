import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
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
          ? "bg-[#e2e2e2] shadow-lg" 
          : "bg-[#1a2a3c]"
      }`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full px-2 lg:px-2">
        <div className="flex justify-between items-center py-4 lg:py-6">
          {/* Logo */}
          <motion.div
            className="flex items-center pl-4 lg:pl-6"
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
            <Button
              variant="outline"
              className={`border-4 uppercase px-6 py-3 text-sm tracking-wider transition-all duration-500 transform hover:scale-101 ${
                scrolled
                  ? " text-black hover:text-amber-500 hover:border-amber-400"
                  : " text-white hover:text-amber-500 hover:border-amber-400"
              }`}
              style={{
                fontWeight: 500,
                letterSpacing: "0.1em",
                borderRadius: "0px",
                background: "transparent",
                borderWidth: "4px !important",
                borderStyle: "solid !important",
                borderColor:  "#000000 !important",
              }}
            >
              Hablemos de tu proyecto
            </Button>
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
            className="lg:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
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
              <Button
                variant="outline"
              className={`border-4 w-full mt-4 text-sm tracking-wider transition-all duration-500 transform hover:scale-101 hover:-translate-y-1 ${
                scrolled
                  ? "border-black text-black hover:text-amber-500 hover:border-amber-400"
                  : "border-white text-white hover:text-amber-500 hover:border-amber-400"
              }`}
                style={{
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  borderRadius: "8px",
                  background: "transparent",
                  borderWidth: "4px !important",
                  borderStyle: "solid !important",
                  borderColor: scrolled ? "#000000 !important" : "#ffffff !important",
                }}
              >
                Hablemos de tu proyecto
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
