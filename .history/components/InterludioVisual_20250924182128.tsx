import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const InterludioVisual: React.FC = () => {
  return (
    <section className="relative h-[90vh] overflow-hidden">
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
    >
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1627141234469-24711efb373c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1ODUzNDk5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Casa moderna contemporánea"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30"></div>
    </motion.div>

    {/* Logo pequeño en la esquina */}
    <div className="absolute top-8 left-8 z-20">
      <span
        className="text-white text-lg tracking-wider"
        style={{
          fontWeight: 300,
          letterSpacing: "0.1em",
        }}
      >
        ARQUIMEC
      </span>
    </div>

    {/* Texto y botón en la esquina inferior derecha */}
    <div className="absolute bottom-20 right-8 z-20 text-right">
      <p className="text-white/80 text-sm tracking-wider mb-4">
        VIVIENDAS TEMPORALES
      </p>
      <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 text-sm tracking-wider hover:bg-white/30 transition-all duration-300 hover:scale-105">
        VER PROYECTO
      </button>
    </div>
  </section>
  );
};

export default InterludioVisual;
