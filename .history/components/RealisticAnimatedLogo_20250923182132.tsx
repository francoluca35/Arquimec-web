import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RealisticAnimatedLogoProps {
  onComplete?: () => void;
}

const RealisticAnimatedLogo: React.FC<RealisticAnimatedLogoProps> = ({ onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState<'forming' | 'assembling' | 'disassembling' | 'text' | 'complete'>('forming');
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase('assembling'), 2000);
    const timer2 = setTimeout(() => setAnimationPhase('disassembling'), 4000);
    const timer3 = setTimeout(() => {
      setAnimationPhase('text');
      setShowText(true);
    }, 6000);
    const timer4 = setTimeout(() => {
      setAnimationPhase('complete');
      onComplete?.();
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="realistic-logo-container">
      <div className="logo-svg-container">
        <svg width="400" height="400" viewBox="0 0 400 400" className="logo-svg">
          {/* Formas geométricas animadas basadas en el SVG original */}
          
          {/* Forma principal - A */}
          <motion.path
            d="M50 100 L100 50 L150 100 L140 120 L110 120 L110 180 L90 180 L90 120 L60 120 Z"
            fill="#C6A057"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: animationPhase === 'forming' ? 1 : 1,
              opacity: animationPhase === 'disassembling' ? 0 : 1,
              scale: animationPhase === 'assembling' ? 1.1 : 1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Forma secundaria - M */}
          <motion.path
            d="M200 50 L200 180 L220 180 L220 120 L240 120 L240 180 L260 180 L260 50 L240 50 L240 100 L220 100 L220 50 Z"
            fill="#AD863F"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: animationPhase === 'forming' ? 1 : 1,
              opacity: animationPhase === 'disassembling' ? 0 : 1,
              scale: animationPhase === 'assembling' ? 1.1 : 1
            }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />

          {/* Elementos decorativos */}
          <motion.circle
            cx="100"
            cy="200"
            r="20"
            fill="#D8B163"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: animationPhase === 'assembling' ? 1 : 0,
              opacity: animationPhase === 'disassembling' ? 0 : 1
            }}
            transition={{ duration: 0.8, delay: 1 }}
          />

          <motion.circle
            cx="250"
            cy="200"
            r="15"
            fill="#D0AA5C"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: animationPhase === 'assembling' ? 1 : 0,
              opacity: animationPhase === 'disassembling' ? 0 : 1
            }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />

          {/* Líneas decorativas */}
          <motion.line
            x1="50"
            y1="250"
            x2="300"
            y2="250"
            stroke="#C6A057"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: animationPhase === 'assembling' ? 1 : 0,
              opacity: animationPhase === 'disassembling' ? 0 : 1
            }}
            transition={{ duration: 1, delay: 1.5 }}
          />

          <motion.line
            x1="50"
            y1="280"
            x2="300"
            y2="280"
            stroke="#AD863F"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: animationPhase === 'assembling' ? 1 : 0,
              opacity: animationPhase === 'disassembling' ? 0 : 1
            }}
            transition={{ duration: 1, delay: 1.7 }}
          />

          {/* Partículas flotantes */}
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={i}
              cx={50 + i * 30}
              cy={320}
              r="3"
              fill="#D8B163"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: animationPhase === 'assembling' ? [0, 1, 0] : 0,
                opacity: animationPhase === 'assembling' ? [0, 1, 0] : 0,
                y: animationPhase === 'assembling' ? [0, -20, 0] : 0
              }}
              transition={{ 
                duration: 2,
                delay: 2 + i * 0.1,
                repeat: animationPhase === 'assembling' ? 1 : 0
              }}
            />
          ))}
        </svg>
      </div>

      {/* Texto ARQUIMEC */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="logo-text"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="arquimec-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              ARQUIMEC
            </motion.h1>
            <motion.p
              className="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Ingeniería y Arquitectura
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .realistic-logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 500px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 20px;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .logo-svg-container {
          position: relative;
          z-index: 2;
        }

        .logo-svg {
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
        }

        .logo-text {
          text-align: center;
          margin-top: 30px;
          z-index: 3;
          position: relative;
        }

        .arquimec-text {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(45deg, #C6A057, #AD863F, #D8B163);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
          letter-spacing: 0.1em;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .subtitle {
          font-size: 1.2rem;
          color: #666;
          margin: 10px 0 0 0;
          font-weight: 300;
          letter-spacing: 0.05em;
        }

        .realistic-logo-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(198, 160, 87, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(173, 134, 63, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(216, 177, 99, 0.1) 0%, transparent 50%);
          z-index: 1;
        }

        @media (max-width: 768px) {
          .arquimec-text {
            font-size: 2.2rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .realistic-logo-container {
            padding: 20px;
            min-height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default RealisticAnimatedLogo;
