import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete();
    }, 2500); // 2.5 segundos de carga

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Logo con animación de pulso */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <img 
            src="/Assets/fondoarq.png" 
            alt="ARQUIMEC Logo" 
            className="w-32 h-32 object-contain drop-shadow-lg"
            style={{maxWidth: '128px', maxHeight: '128px'}}
            onError={(e) => {
              console.error('Error loading logo:', e);
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'w-32 h-32 rounded-full border-4 border-[#1a2a3c] bg-[#1a2a3c] flex items-center justify-center drop-shadow-lg';
              fallback.innerHTML = '<span class="text-white font-bold text-5xl">A</span>';
              target.parentNode?.appendChild(fallback);
            }}
          />
        </motion.div>

        {/* Texto ARQUIMEC con animación de pulso */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <h1 className="text-4xl font-light tracking-wider text-[#1a2a3c] drop-shadow-lg">
            ARQUIMEC
          </h1>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
