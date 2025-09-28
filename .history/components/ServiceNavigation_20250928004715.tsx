import { useRouter } from "next/router";
import { motion } from "motion/react";

interface ServiceNavigationProps {
  scrolled: boolean;
  currentPage: string;
}

const ServiceNavigation: React.FC<ServiceNavigationProps> = ({ scrolled, currentPage }) => {
  const router = useRouter();

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

  return (
    <div className="flex items-center space-x-6">
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
  );
};

export default ServiceNavigation;
