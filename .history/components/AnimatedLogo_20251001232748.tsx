import { useState, useEffect } from "react";

interface AnimatedLogoProps {
  className?: string;
  onAnimationComplete?: () => void;
  scrolled?: boolean;
  isMainHeader?: boolean; // Nuevo prop para distinguir entre header principal y páginas de servicios
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  className = '', 
  onAnimationComplete, 
  scrolled = false,
  isMainHeader = false
}) => {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo(prev => !prev);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`relative w-32 h-12 ml-0 lg:ml-10 ${className}`}>
      {/* Logo con imagen - Botón para ir arriba */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
        showLogo ? 'opacity-100' : 'opacity-0'
      }`}>
        <button 
          onClick={scrollToTop}
          className="cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <Image 
            src="/Assets/logoarqmec.png" 
            alt="ARQUIMEC Logo" 
            width={80}
            height={80}
            className="object-contain drop-shadow-lg"
            priority={true}
            quality={85}
            sizes="80px"
            fetchPriority="high"
            style={{maxWidth: '100px', maxHeight: '100px'}}
          />
        </button>
      </div>

      {/* Texto ARQUIMEC - Botón para ir arriba */}
      <div className={`absolute ml-3 inset-0 flex items-center justify-center transition-opacity duration-1000 ${
        !showLogo ? 'opacity-100' : 'opacity-0'
      }`}>
        <button 
          onClick={scrollToTop}
          className="cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <span className={`text-xl font-light tracking-wider ml-4 lg:-ml-4 drop-shadow-lg ${
            isMainHeader 
              ? (scrolled ? 'text-black' : 'text-white') // Header principal: siempre blanco
              : (scrolled ? 'text-black' : 'text-white') // Páginas servicios: blanco cuando scrolled, negro cuando no
          }`} style={{letterSpacing: '0.2em', textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
            ARQUIMEC.
          </span>
        </button>
      </div>
    </div>
  );
};

export default AnimatedLogo;
