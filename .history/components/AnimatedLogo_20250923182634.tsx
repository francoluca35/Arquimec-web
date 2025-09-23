import React, { useState, useEffect } from 'react';

interface AnimatedLogoProps {
  className?: string;
  onAnimationComplete?: () => void;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = '', onAnimationComplete }) => {
  const [animationPhase, setAnimationPhase] = useState<'forming' | 'formed' | 'disassembling' | 'text'>('forming');
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationPhase('formed');
    }, 2000);

    const timer2 = setTimeout(() => {
      setAnimationPhase('disassembling');
    }, 4000);

    const timer3 = setTimeout(() => {
      setAnimationPhase('text');
      setShowText(true);
      onAnimationComplete?.();
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onAnimationComplete]);

  return (
    <div className={`relative w-64 h-64 mx-auto ${className}`}>
      <svg
        width="256"
        height="256"
        viewBox="0 0 256 256"
        className="absolute inset-0"
      >
        {/* Letra A */}
        <g className={`transition-all duration-1000 ${
          animationPhase === 'forming' ? 'opacity-0 scale-0' : 
          animationPhase === 'formed' ? 'opacity-100 scale-100' :
          animationPhase === 'disassembling' ? 'opacity-0 scale-0 translate-x-[-50px]' :
          'opacity-0'
        }`}>
          {/* Lado izquierdo de la A */}
          <line
            x1="80"
            y1="200"
            x2="100"
            y2="80"
            stroke="#3B82F6"
            strokeWidth="8"
            strokeLinecap="round"
            className="animate-pulse"
          />
          {/* Lado derecho de la A */}
          <line
            x1="100"
            y1="80"
            x2="120"
            y2="200"
            stroke="#3B82F6"
            strokeWidth="8"
            strokeLinecap="round"
            className="animate-pulse"
          />
          {/* Línea horizontal de la A */}
          <line
            x1="85"
            y1="140"
            x2="115"
            y2="140"
            stroke="#3B82F6"
            strokeWidth="6"
            strokeLinecap="round"
            className="animate-pulse"
          />
        </g>

        {/* Letra M */}
        <g className={`transition-all duration-1000 delay-500 ${
          animationPhase === 'forming' ? 'opacity-0 scale-0' : 
          animationPhase === 'formed' ? 'opacity-100 scale-100' :
          animationPhase === 'disassembling' ? 'opacity-0 scale-0 translate-x-[50px]' :
          'opacity-0'
        }`}>
          {/* Lado izquierdo de la M */}
          <line
            x1="140"
            y1="200"
            x2="140"
            y2="80"
            stroke="#EF4444"
            strokeWidth="8"
            strokeLinecap="round"
            className="animate-pulse"
          />
          {/* Lado derecho de la M */}
          <line
            x1="180"
            y1="200"
            x2="180"
            y2="80"
            stroke="#EF4444"
            strokeWidth="8"
            strokeLinecap="round"
            className="animate-pulse"
          />
          {/* Línea diagonal izquierda de la M */}
          <line
            x1="140"
            y1="80"
            x2="160"
            y2="140"
            stroke="#EF4444"
            strokeWidth="8"
            strokeLinecap="round"
            className="animate-pulse"
          />
          {/* Línea diagonal derecha de la M */}
          <line
            x1="160"
            y1="140"
            x2="180"
            y2="80"
            stroke="#EF4444"
            strokeWidth="8"
            strokeLinecap="round"
            className="animate-pulse"
          />
        </g>

        {/* Partículas de desarme */}
        {animationPhase === 'disassembling' && (
          <>
            {/* Partículas de la A */}
            <circle cx="90" cy="120" r="3" fill="#3B82F6" className="animate-ping" />
            <circle cx="95" cy="130" r="2" fill="#3B82F6" className="animate-ping" />
            <circle cx="85" cy="110" r="2" fill="#3B82F6" className="animate-ping" />
            <circle cx="100" cy="100" r="3" fill="#3B82F6" className="animate-ping" />
            <circle cx="110" cy="90" r="2" fill="#3B82F6" className="animate-ping" />
            
            {/* Partículas de la M */}
            <circle cx="150" cy="120" r="3" fill="#EF4444" className="animate-ping" />
            <circle cx="160" cy="130" r="2" fill="#EF4444" className="animate-ping" />
            <circle cx="170" cy="110" r="2" fill="#EF4444" className="animate-ping" />
            <circle cx="175" cy="100" r="3" fill="#EF4444" className="animate-ping" />
            <circle cx="165" cy="90" r="2" fill="#EF4444" className="animate-ping" />
          </>
        )}
      </svg>

      {/* Texto ARQUIMEC */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
        showText ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent animate-pulse">
          ARQUIMEC
        </h1>
      </div>
    </div>
  );
};

export default AnimatedLogo;
