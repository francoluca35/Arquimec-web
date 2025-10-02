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
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-center py-6">
        <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
          {services.map((service) => {
            const isActive = service.key === "inicio" 
              ? router.pathname === "/" 
              : currentPage === service.key;
            
            return (
              <motion.button
                key={service.key}
                onClick={() => router.push(service.href)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-900 shadow-lg"
                    : "text-white hover:bg-white/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {service.name}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex justify-center py-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="lg:hidden fixed top-20 left-1/2 transform -translate-x-1/2 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
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
                  className={`w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 mb-2 ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {service.name}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ServiceNavigation;
