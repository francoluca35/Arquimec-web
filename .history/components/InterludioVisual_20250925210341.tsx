import { motion } from "motion/react";
import { useRouter } from "next/router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { proyectoDestacado } from "../data/proyectosData";

const InterludioVisual: React.FC = () => {
  const router = useRouter();

  const handleProjectClick = () => {
    router.push(`/proyecto?id=${proyectoDestacado.id}`);
  };

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
          src={proyectoDestacado.imagenHero}
          alt={proyectoDestacado.titulo}
          className="object-cover"
          fill={true}
          sizes="100vw"
          priority={true}
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
      <div className="absolute bottom-8 right-8 z-20 text-right">
        <p className="text-white/80 text-sm tracking-wider mb-4" style={{textShadow: '2px 2px 4px rgba(251,191,36,0.8)'}}>
          {proyectoDestacado.categoria}
        </p>
        <button 
          onClick={handleProjectClick}
          className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 text-sm tracking-wider hover:bg-white/30 transition-all duration-300 hover:scale-105"
        >
          VER PROYECTO
        </button>
      </div>
    </section>
  );
};

export default InterludioVisual;
