import { motion } from "motion/react";
import { Target, Eye, Home, Building, Palette, Users } from "lucide-react";
import { useRouter } from "next/router";

const MisionVision: React.FC = () => {
  const router = useRouter();
  
  return (
    <section id="mision-vision" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="text-center lg:text-left mb-16">
            <h2
              className="text-4xl lg:text-5xl text-black mb-6 leading-tight font-light tracking-tight"
            >
              Nuestra <span className="relative">
                <span className="underline underline-offset-8 decoration-2 decoration-amber-500">filosofía</span>
              </span>
            </h2>
            <p className="text-gray-800 text-xl max-w-4xl mx-auto lg:mx-0 leading-relaxed font-light">
              Los principios que guían cada proyecto y definen nuestra identidad arquitectónica
            </p>
          </div>

    

          {/* Grid de Misión y Visión */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Misión */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 h-full hover:border-amber-500 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Icono */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl text-amber-500 mb-3 font-semibold">
                      Nuestra Misión
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-base mb-6">
                      Materializar con excelencia cada proyecto, actuando como socios estratégicos de nuestros clientes para convertir sus visiones en espacios funcionales, estéticos y sostenibles que inspiren y perduren en el tiempo.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-400 text-sm">
                          Diseño centrado en las necesidades humanas
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-400 text-sm">
                          Compromiso con la excelencia constructiva
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-400 text-sm">
                          Innovación en materiales y tecnologías
                        </p>
                      </div>
                    </div>
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
              <div className="bg-white border-2 border-gray-200 rounded-3xl p-10 h-full hover:border-amber-300 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Icono */}
                <div className="flex items-center justify-center lg:justify-start mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-2xl flex items-center justify-center group-hover:border-amber-300 group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-500">
                    <Eye className="w-10 h-10 text-gray-950" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Contenido */}
                <h3 className="text-3xl lg:text-4xl text-black mb-6 font-light tracking-tight">
                  Nuestra <span className="text-amber-600 font-normal">Visión</span>
                </h3>
                <p className="text-gray-800 leading-relaxed text-lg mb-8 font-light">
                Ser la empresa referente en arquitectura y construcción, reconocida por transformar ideas y diseños innovadores en realidades edificadas de la más alta calidad, que superan las expectativas y mejoran la vida de las personas, siendo el puente esencial entre la visión y su materialización duradera.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                    <p className="text-gray-700 text-base font-light">
                      Constructora profesional con alcance global
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                    <p className="text-gray-700 text-base font-light">
                      Proyectos integrales: diseño + construcción
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                    <p className="text-gray-700 text-base font-light">
                      Liderazgo en construcción sostenible
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Servicios */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center lg:text-left mb-12">
              <h3 className="text-3xl lg:text-4xl text-black mb-6 font-light tracking-tight">
                Nuestros <button 
                  onClick={() => router.push('/servicios')}
                  className="text-amber-600 hover:text-amber-700 underline underline-offset-8 decoration-2 hover:underline-offset-12 transition-all duration-300 cursor-pointer font-normal"
                >
                  Servicios
                </button>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 h-full hover:border-amber-300 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1 flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-xl flex items-center justify-center mb-6 mx-auto lg:mx-0  transition-all duration-500">
                      <service.icon className="w-8 h-8 text-gray-950" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-xl text-black mb-4 font-medium text-center lg:text-left tracking-tight">
                      {service.title}
                    </h4>
                    <p className="text-gray-700 text-base leading-relaxed text-center lg:text-left mb-6 flex-grow font-light">
                      {service.description}
                    </p>
                    <button
                      onClick={() => router.push(service.route)}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-center text-sm text-white hover:from-amber-600 hover:to-amber-700 border-0 rounded-xl py-3 px-6 transition-all duration-300 group-hover:shadow-lg mt-auto font-medium"
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
