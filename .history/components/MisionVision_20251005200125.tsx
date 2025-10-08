import { motion } from "motion/react";
import { Target, Eye, Award, Zap, Ruler, Telescope } from "lucide-react";

const MisionVision: React.FC = () => {
  return (
    <section id="mision-vision" className="py-20 bg-[#0F1516]">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="text-center lg:text-left mb-12">
            <h2
              className="text-3xl lg:text-4xl text-gray-100 mb-4 leading-tight"
              style={{ fontWeight: 300 }}
            >
              Nuestra <span className="underline underline-offset-[6px] decoration-[1px]">filosofía</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto lg:mx-0">
              Los principios que guían cada proyecto y definen nuestra identidad arquitectónica
            </p>
          </div>

          {/* Línea divisoria */}
          <div className="w-full h-px bg-[#3e4b51] mb-12"></div>

          {/* Grid de Misión y Visión */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Misión */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-[#1a1f20] to-[#0f1516] border border-[#3e4b51] rounded-2xl p-8 h-full hover:border-[#4a5568] transition-all duration-300">
                {/* Icono */}
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  <div className="w-16 h-16 border border-gray-600 rounded-lg flex items-center justify-center group-hover:border-gray-400 transition-all duration-300">
                    <Target className="w-8 h-8 text-gray-300" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Contenido */}
                <h3 className="text-2xl lg:text-3xl text-gray-100 mb-4 font-light">
                  Nuestra <span className="text-gray-300">Misión</span>
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  Crear espacios arquitectónicos que fusionen funcionalidad, estética y sostenibilidad, 
                  transformando las visiones de nuestros clientes en realidades tangibles que enriquezcan 
                  la vida de quienes los habitan.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">
                      Diseño centrado en las necesidades humanas
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">
                      Compromiso con la excelencia constructiva
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">
                      Innovación en materiales y tecnologías
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visión */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-[#1a1f20] to-[#0f1516] border border-[#3e4b51] rounded-2xl p-8 h-full hover:border-[#4a5568] transition-all duration-300">
                {/* Icono */}
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  <div className="w-16 h-16 border border-gray-600 rounded-lg flex items-center justify-center group-hover:border-gray-400 transition-all duration-300">
                    <Eye className="w-8 h-8 text-gray-300" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Contenido */}
                <h3 className="text-2xl lg:text-3xl text-gray-100 mb-4 font-light">
                  Nuestra <span className="text-gray-300">Visión</span>
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  Ser reconocidos como el estudio de arquitectura líder en la región, pioneros en 
                  el desarrollo de soluciones arquitectónicas innovadoras que establezcan nuevos 
                  estándares de calidad y sostenibilidad en el sector.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">
                      Liderazgo en arquitectura sostenible
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">
                      Expansión nacional e internacional
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">
                      Formación de nuevos talentos arquitectónicos
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Valores */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl lg:text-3xl text-gray-100 mb-4 font-light">
                Nuestros <span className="text-gray-400">Valores</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Excelencia",
                  description: "Compromiso con la más alta calidad en cada proyecto",
                  icon: Award
                },
                {
                  title: "Innovación",
                  description: "Búsqueda constante de soluciones creativas y eficientes",
                  icon: Zap
                },
                {
                  title: "Precisión",
                  description: "Atención meticulosa a cada detalle del diseño",
                  icon: Ruler
                },
                {
                  title: "Visión",
                  description: "Anticipación de las necesidades futuras del espacio",
                  icon: Telescope
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-br from-[#1a1f20] to-[#0f1516] border border-[#3e4b51] rounded-xl p-6 h-full hover:border-[#4a5568] transition-all duration-300 group-hover:scale-105">
                    <div className="w-12 h-12 border border-gray-600 rounded-lg flex items-center justify-center mb-4 mx-auto lg:mx-0 group-hover:border-gray-400 transition-all duration-300">
                      <value.icon className="w-6 h-6 text-gray-300" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-lg text-gray-100 mb-2 font-medium text-center lg:text-left">
                      {value.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed text-center lg:text-left">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MisionVision;
