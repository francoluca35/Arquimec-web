import { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "next/router";
import { proyectosData, Proyecto } from "../data/proyectosData";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";

const Proyectos: React.FC = () => {
  const router = useRouter();

  const handleProjectClick = (proyecto: Proyecto) => {
    router.push(`/proyecto?id=${proyecto.id}`);
  };

  return (
    <section id="proyectos" className="py-32 bg-gray-50">
      <div className="w-full">
        <motion.div
          className="text-center mb-20 max-w-7xl mx-auto px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p
            className="text-gray-500 text-sm tracking-wider mb-4"
            style={{ letterSpacing: "0.15em" }}
          >
            PROYECTOS
          </p>
          <h2
            className="text-4xl lg:text-5xl text-gray-900 mb-8 leading-tight"
            style={{ fontWeight: 300 }}
          >
            Alguno de nuestros trabajos
          </h2>
        </motion.div>

        {/* Grid Responsivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {proyectosData.map((proyecto, index) => (
            <motion.div
              key={proyecto.id}
              className="relative overflow-hidden cursor-pointer group aspect-square"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleProjectClick(proyecto)}
            >
              <ImageWithFallback
                src={proyecto.imagenHero}
                alt={proyecto.titulo}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                fill={true}
                sizes="(max-width:768px) 100vw, 25vw"
              />
              
              {/* Overlay con hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                <div className="p-6 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3
                    className="text-white text-lg mb-2"
                    style={{ fontWeight: 300 }}
                  >
                    {proyecto.titulo}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">{proyecto.categoria} • {proyecto.año}</p>
                  <button className="bg-white/60 text-black px-4 py-2 text-sm tracking-wider hover:bg-gray-100 transition-colors">
                    VER PROYECTO
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proyectos;
