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
      {/* SVG Logo will go here */}
    </div>
  );
};
