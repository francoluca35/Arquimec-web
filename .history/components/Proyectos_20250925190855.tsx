import { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "next/router";

const Proyectos: React.FC = () => {
  const router = useRouter();

  const proyectos = [
    {
      id: 1,
      titulo: "Casa Moderna Minimalista",
      imagen: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      titulo: "Oficinas Corporativas",
      imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 3,
      titulo: "Centro Educativo",
      imagen: "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 4,
      titulo: "Villa de Lujo",
      imagen: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 5,
      titulo: "Centro Comercial",
      imagen: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxsfGVufDF8fHx8MTc1ODUzOTMwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 6,
      titulo: "Hospital Moderno",
      imagen: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbHxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 7,
      titulo: "Loft Contemporáneo",
      imagen: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1Mjc5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 8,
      titulo: "Casa de Campo",
      imagen: "https://images.unsplash.com/photo-1639405091806-01e8ab3cd13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const handleProjectClick = () => {
    router.push('/proyecto');
  };

  return (
    <section id="proyectos" className="py-32 bg-gray-50">
      <div className="w-full px-4 lg:px-0">
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
          {proyectos.map((proyecto, index) => (
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
              onClick={handleProjectClick}
            >
              <ImageWithFallback
                src={proyecto.imagen}
                alt={proyecto.titulo}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                fill={true}
                sizes="(max-width:768px) 100vw, 25vw"
              />
              
              {/* Overlay con hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                <div className="p-6 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3
                    className="text-white text-lg mb-4"
                    style={{ fontWeight: 300 }}
                  >
                    {proyecto.titulo}
                  </h3>
                  <button className="bg-white text-black px-4 py-2 text-sm tracking-wider hover:bg-gray-100 transition-colors">
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
