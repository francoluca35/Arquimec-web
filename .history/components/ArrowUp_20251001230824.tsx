import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";

const ArrowUp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar el botón cuando el usuario esté cerca del final de la página
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Mostrar cuando esté a 200px del final de la página
      if (scrollTop + windowHeight >= documentHeight - 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Escuchar el evento de scroll
    window.addEventListener("scroll", toggleVisibility);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Scroll suave
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          onClick={scrollToTop}
            className="fixed bottom-0 left-6 z-50 bg-gray-900 hover:bg-amber-600 text-white p-3 rounded-none shadow-lg transition-all duration-300 hover:shadow-xl group"
          aria-label="Volver arriba"
          title="Volver arriba"
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp size={24} className="group-hover:text-amber-400 transition-colors duration-200" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ArrowUp;
