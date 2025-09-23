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
    <div className="relative w-12 h-12 lg:w-16 lg:h-16">
      {/* Letter A - Left side */}
      <motion.div
        className="absolute"
        initial={{ x: -50, opacity: 0 }}
        animate={{
          x: animationPhase === 'forming' ? 0 : animationPhase === 'disassembling' ? -50 : 0,
          opacity: animationPhase === 'disassembling' ? 0 : 1,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {/* A - Left diagonal */}
        <motion.div
          className={`w-1 h-8 lg:h-10 ${
            scrolled ? "bg-black" : "bg-yellow-400"
          }`}
          style={{
            transform: "rotate(-45deg)",
            transformOrigin: "bottom left",
          }}
        />
        {/* A - Right diagonal */}
        <motion.div
          className={`w-1 h-8 lg:h-10 ${
            scrolled ? "bg-black" : "bg-yellow-400"
          }`}
          style={{
            transform: "rotate(45deg)",
            transformOrigin: "bottom right",
            position: "absolute",
            left: "8px",
          }}
        />
        {/* A - Horizontal bar */}
        <motion.div
          className={`w-6 h-1 lg:h-1 ${
            scrolled ? "bg-black" : "bg-yellow-400"
          }`}
          style={{
            position: "absolute",
            top: "12px",
            left: "2px",
          }}
        />
      </motion.div>

      {/* Letter M - Right side */}
      <motion.div
        className="absolute"
        initial={{ x: 50, opacity: 0 }}
        animate={{
          x: animationPhase === 'forming' ? 0 : animationPhase === 'disassembling' ? 50 : 0,
          opacity: animationPhase === 'disassembling' ? 0 : 1,
        }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
      >
        {/* M - Left vertical */}
        <motion.div
          className={`w-1 h-8 lg:h-10 ${
            scrolled ? "bg-black" : "bg-yellow-400"
          }`}
        />
        {/* M - Right vertical */}
        <motion.div
          className={`w-1 h-8 lg:h-10 ${
            scrolled ? "bg-black" : "bg-yellow-400"
          }`}
          style={{
            position: "absolute",
            left: "12px",
          }}
        />
        {/* M - Center diagonal */}
        <motion.div
          className={`w-1 h-6 lg:h-8 ${
            scrolled ? "bg-black" : "bg-yellow-400"
          }`}
          style={{
            transform: "rotate(45deg)",
            transformOrigin: "bottom left",
            position: "absolute",
            left: "6px",
            top: "2px",
          }}
        />
      </motion.div>

      {/* Connecting line between A and M */}
      <motion.div
        className={`w-8 h-1 lg:h-1 ${
          scrolled ? "bg-black" : "bg-yellow-400"
        }`}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
