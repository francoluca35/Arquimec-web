import React, { useState, useEffect } from 'react';

interface LogoAnimationProps {
  onComplete?: () => void;
  autoStart?: boolean;
  className?: string;
}

const LogoAnimation: React.FC<LogoAnimationProps> = ({ 
  onComplete, 
  autoStart = true, 
  className = '' 
}) => {
  const [animationPhase, setAnimationPhase] = useState<'forming' | 'formed' | 'disassembling' | 'text'>('forming');
  const [showText, setShowText] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!autoStart) return;

    const timer1 = setTimeout(() => {
      setAnimationPhase('formed');
    }, 2000);

    const timer2 = setTimeout(() => {
      setAnimationPhase('disassembling');
    }, 4000);

    const timer3 = setTimeout(() => {
      setAnimationPhase('text');
      setShowText(true);
    }, 6000);

    const timer4 = setTimeout(() => {
      setIsComplete(true);
      onComplete?.();
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [autoStart, onComplete]);

  const restartAnimation = () => {
    setAnimationPhase('forming');
    setShowText(false);
    setIsComplete(false);
  };

  return (
    <div className={`logo-animation-container ${className}`}>
      <div className="logo-stage">
        {/* Letra A */}
        <div className={`letter-a ${animationPhase}`}>
          <div className="a-left-line"></div>
          <div className="a-right-line"></div>
          <div className="a-horizontal-line"></div>
        </div>

        {/* Letra M */}
        <div className={`letter-m ${animationPhase}`}>
          <div className="m-left-line"></div>
          <div className="m-middle-line"></div>
          <div className="m-right-line"></div>
        </div>

        {/* Texto ARQUIMEC */}
        <div className={`text-arquimec ${showText ? 'visible' : ''}`}>
          <span className="letter">A</span>
          <span className="letter">R</span>
          <span className="letter">Q</span>
          <span className="letter">U</span>
          <span className="letter">I</span>
          <span className="letter">M</span>
          <span className="letter">E</span>
          <span className="letter">C</span>
        </div>
      </div>

      {isComplete && (
        <div className="animation-controls">
          <button onClick={restartAnimation} className="restart-btn">
            Repetir Animación
          </button>
        </div>
      )}

      <style jsx>{`
        .logo-animation-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          position: relative;
        }

        .logo-stage {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Estilos para la letra A */
        .letter-a {
          position: absolute;
          width: 80px;
          height: 100px;
          transform-origin: center;
        }

        .a-left-line {
          position: absolute;
          width: 4px;
          height: 80px;
          background: #333;
          left: 20px;
          top: 20px;
          transform: rotate(-25deg);
          transform-origin: bottom;
        }

        .a-right-line {
          position: absolute;
          width: 4px;
          height: 80px;
          background: #333;
          right: 20px;
          top: 20px;
          transform: rotate(25deg);
          transform-origin: bottom;
        }

        .a-horizontal-line {
          position: absolute;
          width: 40px;
          height: 4px;
          background: #333;
          left: 50%;
          top: 50%;
          transform: translateX(-50%);
        }

        /* Estilos para la letra M */
        .letter-m {
          position: absolute;
          width: 80px;
          height: 100px;
          transform-origin: center;
        }

        .m-left-line {
          position: absolute;
          width: 4px;
          height: 80px;
          background: #333;
          left: 10px;
          top: 20px;
        }

        .m-middle-line {
          position: absolute;
          width: 4px;
          height: 50px;
          background: #333;
          left: 50%;
          top: 20px;
          transform: translateX(-50%) rotate(25deg);
          transform-origin: bottom;
        }

        .m-right-line {
          position: absolute;
          width: 4px;
          height: 80px;
          background: #333;
          right: 10px;
          top: 20px;
        }

        /* Animaciones de formación */
        .letter-a.forming .a-left-line,
        .letter-a.forming .a-right-line,
        .letter-a.forming .a-horizontal-line {
          animation: drawLine 1s ease-out forwards;
        }

        .letter-m.forming .m-left-line,
        .letter-m.forming .m-middle-line,
        .letter-m.forming .m-right-line {
          animation: drawLine 1s ease-out 0.5s forwards;
        }

        .letter-a.forming .a-left-line { animation-delay: 0s; }
        .letter-a.forming .a-right-line { animation-delay: 0.3s; }
        .letter-a.forming .a-horizontal-line { animation-delay: 0.6s; }
        .letter-m.forming .m-left-line { animation-delay: 0.8s; }
        .letter-m.forming .m-middle-line { animation-delay: 1.1s; }
        .letter-m.forming .m-right-line { animation-delay: 1.4s; }

        /* Animaciones de desarme */
        .letter-a.disassembling {
          animation: disassemble 1s ease-in forwards;
        }

        .letter-m.disassembling {
          animation: disassemble 1s ease-in 0.2s forwards;
        }

        /* Texto ARQUIMEC */
        .text-arquimec {
          position: absolute;
          display: flex;
          gap: 8px;
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s ease-out;
        }

        .text-arquimec.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .text-arquimec .letter {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          display: inline-block;
          animation: letterAppear 0.5s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .text-arquimec .letter:nth-child(1) { animation-delay: 0s; }
        .text-arquimec .letter:nth-child(2) { animation-delay: 0.1s; }
        .text-arquimec .letter:nth-child(3) { animation-delay: 0.2s; }
        .text-arquimec .letter:nth-child(4) { animation-delay: 0.3s; }
        .text-arquimec .letter:nth-child(5) { animation-delay: 0.4s; }
        .text-arquimec .letter:nth-child(6) { animation-delay: 0.5s; }
        .text-arquimec .letter:nth-child(7) { animation-delay: 0.6s; }
        .text-arquimec .letter:nth-child(8) { animation-delay: 0.7s; }

        .animation-controls {
          margin-top: 20px;
        }

        .restart-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .restart-btn:hover {
          background: #5a6fd8;
          transform: translateY(-2px);
        }

        @keyframes drawLine {
          0% {
            height: 0;
            opacity: 0;
          }
          100% {
            height: var(--target-height, 80px);
            opacity: 1;
          }
        }

        @keyframes disassemble {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(0.3) rotate(180deg) translateY(-100px);
            opacity: 0;
          }
        }

        @keyframes letterAppear {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .logo-stage {
            width: 250px;
            height: 250px;
          }
          
          .letter-a, .letter-m {
            width: 60px;
            height: 80px;
          }
          
          .text-arquimec .letter {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LogoAnimation;
