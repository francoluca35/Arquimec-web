import React, { useState, useEffect } from 'react';

const EnhancedAnimatedLogo: React.FC = () => {
  const [animationPhase, setAnimationPhase] = useState<'forming' | 'formed' | 'disassembling' | 'text'>('forming');
  const [showText, setShowText] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationPhase('formed');
    }, 2500);

    const timer2 = setTimeout(() => {
      setAnimationPhase('disassembling');
      // Crear partículas para el efecto de desarme
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 300,
        y: Math.random() * 300,
        delay: Math.random() * 0.5
      }));
      setParticles(newParticles);
    }, 5000);

    const timer3 = setTimeout(() => {
      setAnimationPhase('text');
      setShowText(true);
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="enhanced-logo-container">
      <div className="logo-stage">
        {/* Partículas de fondo */}
        <div className="background-particles">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }} />
          ))}
        </div>

        {/* Letra A con efectos mejorados */}
        <div className={`letter-a ${animationPhase}`}>
          <div className="a-left-line">
            <div className="line-glow"></div>
          </div>
          <div className="a-right-line">
            <div className="line-glow"></div>
          </div>
          <div className="a-horizontal-line">
            <div className="line-glow"></div>
          </div>
        </div>

        {/* Letra M con efectos mejorados */}
        <div className={`letter-m ${animationPhase}`}>
          <div className="m-left-line">
            <div className="line-glow"></div>
          </div>
          <div className="m-middle-line">
            <div className="line-glow"></div>
          </div>
          <div className="m-right-line">
            <div className="line-glow"></div>
          </div>
        </div>

        {/* Partículas de desarme */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="disassemble-particle"
            style={{
              left: particle.x,
              top: particle.y,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}

        {/* Texto ARQUIMEC con efectos mejorados */}
        <div className={`text-arquimec ${showText ? 'visible' : ''}`}>
          <span className="letter" style={{ animationDelay: '0s' }}>A</span>
          <span className="letter" style={{ animationDelay: '0.1s' }}>R</span>
          <span className="letter" style={{ animationDelay: '0.2s' }}>Q</span>
          <span className="letter" style={{ animationDelay: '0.3s' }}>U</span>
          <span className="letter" style={{ animationDelay: '0.4s' }}>I</span>
          <span className="letter" style={{ animationDelay: '0.5s' }}>M</span>
          <span className="letter" style={{ animationDelay: '0.6s' }}>E</span>
          <span className="letter" style={{ animationDelay: '0.7s' }}>C</span>
        </div>
      </div>

      <style jsx>{`
        .enhanced-logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%);
          overflow: hidden;
          position: relative;
        }

        .logo-stage {
          position: relative;
          width: 350px;
          height: 350px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .background-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        /* Estilos mejorados para la letra A */
        .letter-a {
          position: absolute;
          width: 100px;
          height: 120px;
          transform-origin: center;
        }

        .a-left-line, .a-right-line, .a-horizontal-line {
          position: absolute;
          background: linear-gradient(45deg, #fff, #e0e0e0);
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .a-left-line {
          width: 5px;
          height: 100px;
          left: 25px;
          top: 20px;
          transform: rotate(-25deg);
          transform-origin: bottom;
        }

        .a-right-line {
          width: 5px;
          height: 100px;
          right: 25px;
          top: 20px;
          transform: rotate(25deg);
          transform-origin: bottom;
        }

        .a-horizontal-line {
          width: 50px;
          height: 5px;
          left: 50%;
          top: 50%;
          transform: translateX(-50%);
        }

        /* Estilos mejorados para la letra M */
        .letter-m {
          position: absolute;
          width: 100px;
          height: 120px;
          transform-origin: center;
        }

        .m-left-line, .m-middle-line, .m-right-line {
          position: absolute;
          background: linear-gradient(45deg, #fff, #e0e0e0);
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .m-left-line {
          width: 5px;
          height: 100px;
          left: 15px;
          top: 20px;
        }

        .m-middle-line {
          width: 5px;
          height: 60px;
          left: 50%;
          top: 20px;
          transform: translateX(-50%) rotate(25deg);
          transform-origin: bottom;
        }

        .m-right-line {
          width: 5px;
          height: 100px;
          right: 15px;
          top: 20px;
        }

        .line-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
          animation: glow 2s ease-in-out infinite;
        }

        /* Animaciones de formación mejoradas */
        .letter-a.forming .a-left-line,
        .letter-a.forming .a-right-line,
        .letter-a.forming .a-horizontal-line {
          animation: drawLineEnhanced 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .letter-m.forming .m-left-line,
        .letter-m.forming .m-middle-line,
        .letter-m.forming .m-right-line {
          animation: drawLineEnhanced 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .letter-a.forming .a-left-line { animation-delay: 0s; }
        .letter-a.forming .a-right-line { animation-delay: 0.4s; }
        .letter-a.forming .a-horizontal-line { animation-delay: 0.8s; }
        .letter-m.forming .m-left-line { animation-delay: 1.2s; }
        .letter-m.forming .m-middle-line { animation-delay: 1.6s; }
        .letter-m.forming .m-right-line { animation-delay: 2s; }

        /* Animaciones de desarme mejoradas */
        .letter-a.disassembling {
          animation: disassembleEnhanced 1.5s ease-in forwards;
        }

        .letter-m.disassembling {
          animation: disassembleEnhanced 1.5s ease-in 0.3s forwards;
        }

        .disassemble-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: particleExplode 1s ease-out forwards;
        }

        /* Texto ARQUIMEC mejorado */
        .text-arquimec {
          position: absolute;
          display: flex;
          gap: 12px;
          opacity: 0;
          transform: translateY(60px) scale(0.8);
          transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .text-arquimec.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .text-arquimec .letter {
          font-size: 2.5rem;
          font-weight: 900;
          color: #fff;
          display: inline-block;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
          animation: letterAppearEnhanced 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
          transform: translateY(30px) scale(0.5) rotateX(90deg);
        }

        @keyframes drawLineEnhanced {
          0% {
            height: 0;
            opacity: 0;
            transform: scaleY(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            height: var(--target-height, 100px);
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @keyframes disassembleEnhanced {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
            filter: blur(0px);
          }
          50% {
            transform: scale(0.8) rotate(90deg);
            opacity: 0.7;
            filter: blur(1px);
          }
          100% {
            transform: scale(0.2) rotate(180deg) translateY(-150px);
            opacity: 0;
            filter: blur(3px);
          }
        }

        @keyframes particleExplode {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(360deg) translateY(-100px);
            opacity: 0;
          }
        }

        @keyframes letterAppearEnhanced {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.5) rotateX(90deg);
          }
          50% {
            transform: translateY(-10px) scale(1.1) rotateX(0deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px);
            opacity: 1;
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .logo-stage {
            width: 280px;
            height: 280px;
          }
          
          .letter-a, .letter-m {
            width: 80px;
            height: 100px;
          }
          
          .text-arquimec .letter {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedAnimatedLogo;
