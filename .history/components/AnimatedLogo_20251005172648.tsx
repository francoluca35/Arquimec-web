import { useState, useEffect } from "react";
import NextImage from 'next/image';

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
  const [animationPhase, setAnimationPhase] = useState<'typing' | 'pausing' | 'fading' | 'logo'>('typing');
  
  const fullText = "ARQUIMEC.";
  const typingSpeed = 300; // Velocidad de escritura más lenta en ms
  const pauseDuration = 2000; // Pausa después de escribir (2 segundos)
  const fadeDuration = 1500; // Duración de la transición más lenta
  const logoDisplayDuration = 4000; // Logo visible por 4 segundos

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    switch (animationPhase) {
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
          setAnimationPhase('fading');
        }, pauseDuration);
        break;

      case 'fading':
        timeout = setTimeout(() => {
          setShowLogo(true);
          setAnimationPhase('logo');
        }, fadeDuration);
        break;

      case 'logo':
        timeout = setTimeout(() => {
          // Resetear para volver a empezar el ciclo
          setShowLogo(false);
          setDisplayText("");
          setAnimationPhase('typing');
        }, logoDisplayDuration); // Mostrar logo por 4 segundos
        break;
    }

    return () => clearTimeout(timeout);
  }, [displayText, animationPhase]);

  // Efecto del cursor parpadeante
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

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
          <NextImage 
            src="/Assets/logoarqmec.webp" 
            alt="ARQUIMEC Logo" 
            width={80}
            height={80}
            className="object-contain drop-shadow-lg"
            priority={true}
            quality={90}
            sizes="(max-width: 768px) 60px, 80px"
            fetchPriority="high"
            style={{maxWidth: '100px', maxHeight: '100px'}}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            loading="eager"
            decoding="sync"
          />
        </button>
      </div>

      {/* Texto ARQUIMEC con efecto de escritura - Botón para ir arriba */}
      <div className={`absolute ml-3 inset-0 flex items-center justify-center transition-opacity duration-[1500ms] ${
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
              <span className="animate-pulse">|</span>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AnimatedLogo;
