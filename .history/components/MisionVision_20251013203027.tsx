import { motion } from "motion/react";
import { Target, Eye, Home, Building, Palette, Users } from "lucide-react";
import { useRouter } from "next/router";

const MisionVision: React.FC = () => {
  const router = useRouter();
  
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
                Materializar con excelencia cada proyecto, actuando como socios estratégicos de nuestros clientes para convertir sus visiones en espacios funcionales, estéticos y sostenibles que inspiren y perduren en el tiempo.
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
                Ser la empresa referente en arquitectura y construcción, reconocida por transformar ideas y diseños innovadores en realidades edificadas de la más alta calidad, que superan las expectativas y mejoran la vida de las personas, siendo el puente esencial entre la visión y su materialización duradera.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">
                      Constructora profesional con alcance global
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">
                      Proyectos integrales: diseño + construcción
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">
                      Liderazgo en construcción sostenible
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Servicios */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl lg:text-3xl text-gray-100 mb-4 font-light">
                Nuestros <span className="text-gray-400">Servicios</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Arquitectura Residencial",
                  description: "Diseñamos hogares únicos que reflejan la personalidad y estilo de vida de nuestros clientes.",
                  icon: Home,
                  route: "/arquitectura-residencial"
                },
                {
                  title: "Arquitectura Comercial",
                  description: "Desarrollamos espacios comerciales que potencian la experiencia del cliente y optimizan el flujo de trabajo.",
                  icon: Building,
                  route: "/arquitectura-comercial"
                },
                {
                  title: "Diseño de Interiores",
                  description: "Transformamos espacios interiores creando ambientes únicos y funcionales.",
                  icon: Palette,
                  route: "/diseno-interiores"
                },
                {
                  title: "Consultorías",
                  description: "Brindamos asesoramiento especializado en arquitectura y diseño.",
                  icon: Users,
                  route: "/consultorias"
                }
              ].map((service, index) => (
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
                      <service.icon className="w-6 h-6 text-gray-300" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-lg text-gray-100 mb-3 font-medium text-center lg:text-left">
                      {service.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed text-center lg:text-left mb-4">
                      {service.description}
                    </p>
                    <button
                      onClick={() => router.push(service.route)}
                      className="w-full text-center text-xs text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg py-2 px-4 transition-all duration-300 group-hover:bg-gray-800"
                    >
                      Leer más
                    </button>
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
