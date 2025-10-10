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
  const [showLogo, setShowLogo] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<'logo' | 'fading' | 'typing' | 'pausing'>('logo');
  const [logoKey, setLogoKey] = useState(0); // Key para forzar reinicio del GIF
  
  const fullText = "ARQUIMEC.";
  const typingSpeed = 250; // Velocidad de escritura más fluida
  const pauseDuration = 3000; // Pausa después de escribir (3 segundos)
  const fadeDuration = 2000; // Duración de la transición más suave
  const logoDisplayDuration = 4000; // Logo visible por 4 segundos

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    switch (animationPhase) {
      case 'logo':
        // Empezar mostrando el logo
        setShowLogo(true);
        setDisplayText("");
        setLogoKey(prev => prev + 1); // Incrementar key para forzar reinicio del GIF
        timeout = setTimeout(() => {
          setAnimationPhase('fading');
        }, logoDisplayDuration); // Mostrar logo por 4 segundos
        break;

      case 'fading':
        // Transición suave del logo al texto
        setShowLogo(false);
        timeout = setTimeout(() => {
          setAnimationPhase('typing');
        }, fadeDuration);
        break;

      case 'typing':
        if (displayText.length < fullText.length) {
          timeout = setTimeout(() => {
            setDisplayText(fullText.slice(0, displayText.length + 1));
          }, typingSpeed);
        } else {
          timeout = setTimeout(() => {
            setAnimationPhase('pausing');
          }, pauseDuration);
        }
        break;

      case 'pausing':
        timeout = setTimeout(() => {
          // Volver al logo para empezar el ciclo de nuevo
          setAnimationPhase('logo');
        }, pauseDuration);
        break;
    }

    return () => clearTimeout(timeout);
  }, [displayText, animationPhase]);

  // Efecto del cursor parpadeante más suave
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600); // Más lento para ser más suave

    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`relative w-32 h-12 ml-0 lg:ml-10 ${className}`}>
      {/* Logo con imagen - Botón para ir arriba */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[1500ms] ${
        showLogo ? 'opacity-100' : 'opacity-0'
      }`}>
        <button 
          onClick={scrollToTop}
          className="cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <img 
            key={logoKey}
            src={`/Assets/logo-mov.gif?t=${Date.now()}`} 
            alt="ARQUIMEC Logo" 
            width={100}
            height={100}
            className="object-contain drop-shadow-lg"
            style={{maxWidth: '100px', maxHeight: '100px'}}
            loading="eager"
          />
        </button>
      </div>

      {/* Texto ARQUIMEC con efecto de escritura - Botón para ir arriba */}
      <div className={`absolute ml-3 inset-0 flex items-center justify-center transition-opacity duration-[2000ms] ease-in-out ${
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
            {displayText}
            {animationPhase === 'typing' && showCursor && (
              <span className="opacity-75 transition-opacity duration-300">|</span>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AnimatedLogo;
