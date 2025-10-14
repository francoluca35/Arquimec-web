import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AnimatedLogo from "./AnimatedLogo";

interface ConstructoraHeaderProps {
  scrolled: boolean;
}

const ConstructoraHeader: React.FC<ConstructoraHeaderProps> = ({ scrolled }) => {
  const router = useRouter();

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-[#ffffff] shadow-lg" 
          : "bg-[#1a2a3c]"
      }`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full">
        <div className="flex justify-between items-center py-4 lg:py-6 px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <AnimatedLogo scrolled={scrolled} isMainHeader={true} />
          </motion.div>

          {/* Navigation simplificada - Solo Inicio */}
          <div className="flex items-center">
            <motion.button
              onClick={() => router.push('/')}
              className={`transition-colors duration-500 text-sm tracking-wider underline-offset-4 hover:underline ${
                scrolled 
                  ? "text-gray-900 hover:text-[#e5a648]" 
                  : "text-white hover:text-[#e5a648]"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              INICIO
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default ConstructoraHeader;
