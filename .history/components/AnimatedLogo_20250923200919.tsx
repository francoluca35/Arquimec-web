import { useState, useEffect } from "react";

interface AnimatedLogoProps {
  className?: string;
  onAnimationComplete?: () => void;
  scrolled?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  className = '', 
  onAnimationComplete, 
  scrolled = false 
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
    <div className={`relative w-32 h-12 ml-10 ${className}`}>
      {/* Logo con imagen - Botón para ir arriba */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
        showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}>
        <button 
          onClick={scrollToTop}
          className="cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <img 
            src="/Assets/fondoarq.png" 
            alt="ARQUIMEC Logo" 
            className="w-16 h-16 object-contain drop-shadow-lg"
            style={{maxWidth: '64px', maxHeight: '64px'}}
            onError={(e) => {
              console.error('Error loading logo:', e);
              // Si falla, mostrar el logo CSS como fallback
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'w-16 h-16 rounded-full border-2 border-white bg-[#1a2a3c] flex items-center justify-center drop-shadow-lg';
              fallback.innerHTML = '<span class="text-white font-bold text-2xl">A</span>';
              target.parentNode?.appendChild(fallback);
            }}
          />
        </button>
      </div>

      {/* Texto ARQUIMEC - Botón para ir arriba */}
      <div className={`absolute ml-3 inset-0 flex items-center justify-center transition-all duration-1000 ${
        !showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}>
        <button 
          onClick={scrollToTop}
          className="cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <span className={`text-xl font-light tracking-wider drop-shadow-lg ${
            scrolled ? 'text-gray-800' : 'text-white'
          }`} style={{letterSpacing: '0.2em', textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
            ARQUIMEC
          </span>
        </button>
      </div>
    </div>
  );
};

export default AnimatedLogo;
