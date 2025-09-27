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
        <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
          <span
            className="text-white text-lg tracking-wider font-bold"
            style={{
              fontWeight: 700,
              letterSpacing: "0.1em",
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
            }}
          >
            ARQUIMEC
          </span>
        </div>
      </div>

      {/* Nombre del proyecto en la parte superior */}
      <div className="absolute top-8 right-8 z-20 text-right">
        <div className="bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg">
          <p className="text-white text-2xl font-bold tracking-wider" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
            {proyectoDestacado.titulo}
          </p>
        </div>
      </div>

      {/* Texto y botón en la esquina inferior derecha */}
      <div className="absolute bottom-8 right-8 z-20 text-right">
        <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg mb-4">
          <p className="text-white text-sm tracking-wider font-bold" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
            {proyectoDestacado.categoria}
          </p>
        </div>
        <button 
          onClick={handleProjectClick}
          className="bg-black/80 backdrop-blur-sm border-2 border-white text-white px-6 py-3 text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 font-bold"
          aria-label={`Ver proyecto ${proyectoDestacado.titulo}`}
        >
          VER PROYECTO
        </button>
      </div>
    </section>
  );
};

export default InterludioVisual;
