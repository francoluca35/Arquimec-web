import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface AnimatedLogoProps {
  scrolled: boolean;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ scrolled }) => {
  const [showText, setShowText] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'forming' | 'formed' | 'disassembling' | 'text'>('forming');

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase('formed');
    }, 2000);

    const textTimer = setTimeout(() => {
      setAnimationPhase('disassembling');
    }, 4000);

    const finalTimer = setTimeout(() => {
      setAnimationPhase('text');
      setShowText(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(textTimer);
      clearTimeout(finalTimer);
    };
  }, []);

  // Reset animation when scrolled state changes
  useEffect(() => {
    setAnimationPhase('forming');
    setShowText(false);
  }, [scrolled]);

  if (showText) {
    return (
      <motion.span
        className={`text-2xl lg:text-3xl tracking-wider transition-colors duration-500 ${
          scrolled ? "text-black" : "text-white"
        }`}
        style={{
          fontWeight: 300,
          letterSpacing: "0.1em",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        ARQUIMEC
      </motion.span>
    );
  }

  return (
    <div className="relative w-16 h-12 lg:w-20 lg:h-16">
      {/* Main A structure - Left side */}
      <motion.div
        className="absolute left-0"
        initial={{ x: -50, opacity: 0 }}
        animate={{
          x: animationPhase === 'forming' ? 0 : animationPhase === 'disassembling' ? -50 : 0,
          opacity: animationPhase === 'disassembling' ? 0 : 1,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {/* A - Left diagonal (top-left to center) */}
        <motion.div
          className={`w-1 h-6 lg:h-8 ${
            scrolled ? "bg-black" : "bg-yellow-400"
          }`}
          style={{
            transform: "rotate(-30deg)",
            transformOrigin: "bottom left",
            position: "absolute",
            left: "0px",
            top: "0px",
          }}
        />
        
        {/* A - Right diagonal (top-right to center) */}
        <motion.div
          className={`w-1 h-6 lg:h-8 ${
            scrolled ? "bg-black" : "bg-yellow-400"
          }`}
          style={{
            transform: "rotate(30deg)",
            transformOrigin: "bottom right",
            position: "absolute",
            left: "8px",
            top: "0px",
          }}
        />
        
        {/* A - Horizontal bar connecting the diagonals */}
        <motion.div
          className={`w-6 h-1 lg:h-1 ${
            scrolled ? "bg-black" : "bg-yellow-400"
          }`}
          style={{
            position: "absolute",
            top: "8px",
            left: "2px",
          }}
        />
        
        {/* A - Vertical line from center */}
        <motion.div
          className={`w-1 h-4 lg:h-6 ${
            scrolled ? "bg-black" : "bg-yellow-400"
          }`}
          style={{
            position: "absolute",
            top: "12px",
            left: "4px",
          }}
        />
        
        {/* A - Bottom diagonal (center to bottom-right) */}
        <motion.div
          className={`w-1 h-3 lg:h-4 ${
            scrolled ? "bg-black" : "bg-yellow-400"
          }`}
          style={{
            transform: "rotate(45deg)",
            transformOrigin: "top left",
            position: "absolute",
            left: "4px",
            top: "16px",
          }}
        />
      </motion.div>

      {/* M structure - Right side */}
      <motion.div
        className="absolute right-0"
        initial={{ x: 50, opacity: 0 }}
        animate={{
          x: animationPhase === 'forming' ? 0 : animationPhase === 'disassembling' ? 50 : 0,
          opacity: animationPhase === 'disassembling' ? 0 : 1,
        }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
      >
        {/* M - Horizontal line (right side) */}
        <motion.div
          className={`w-4 h-1 lg:h-1 ${
            scrolled ? "bg-black" : "bg-yellow-400"
          }`}
          style={{
            position: "absolute",
            top: "8px",
            left: "0px",
          }}
        />
      </motion.div>

      {/* Connecting line between A and M */}
      <motion.div
        className={`w-6 h-1 lg:h-1 ${
          scrolled ? "bg-black" : "bg-yellow-400"
        }`}
        style={{
          position: "absolute",
          top: "8px",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: animationPhase === 'forming' ? 1 : animationPhase === 'disassembling' ? 0 : 1,
        }}
        transition={{ duration: 0.8, delay: 1 }}
      />
    </div>
  );
};
