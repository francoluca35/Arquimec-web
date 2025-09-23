import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const Estudio: React.FC = () => {
  return (
    <section
      id="estudio"
      className="py-32 bg-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contenido de texto */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Nuestro
              <br />
              <span className="text-amber-400">Estudio</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Somos un estudio de arquitectura especializado en proyectos residenciales y comerciales, 
              comprometidos con la excelencia en el diseño y la funcionalidad.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-4 mt-3"></div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Diseño Arquitectónico</h3>
                  <p className="text-gray-300">
                    Proyectos únicos que combinan estética y funcionalidad para crear espacios excepcionales.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-4 mt-3"></div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Consultoría</h3>
                  <p className="text-gray-300">
                    Asesoramiento especializado en todas las fases de tu proyecto arquitectónico.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-4 mt-3"></div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Supervisión</h3>
                  <p className="text-gray-300">
                    Acompañamiento completo desde la concepción hasta la entrega final del proyecto.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Imagen */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU4NTM5MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Estudio de arquitectura"
                className="w-full h-full object-cover"
                fallbackSrc="/Assets/fondoarq.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Estudio;
