import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const Fundador: React.FC = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Imagen del fundador */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R8ZW58MXx8fHwxNzU4NTM5MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fundador de ARQUIMEC"
                className="w-full h-full object-cover"
                fallbackSrc="/Assets/fondoarq.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </motion.div>

          {/* Contenido de texto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              El
              <br />
              <span className="text-amber-400">Fundador</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Con más de 15 años de experiencia en arquitectura, nuestro fundador ha liderado 
              proyectos que han transformado comunidades y creado espacios únicos que combinan 
              funcionalidad, estética y sostenibilidad.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-4 mt-3"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Arquitecto Certificado</h3>
                  <p className="text-gray-600">
                    Formación académica sólida y certificaciones profesionales reconocidas.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-4 mt-3"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Especialista en Diseño Sostenible</h3>
                  <p className="text-gray-600">
                    Comprometido con la arquitectura responsable y el cuidado del medio ambiente.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-4 mt-3"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Más de 100 Proyectos Completados</h3>
                  <p className="text-gray-600">
                    Amplia experiencia en diversos tipos de proyectos arquitectónicos.
                  </p>
                </div>
              </div>
            </div>

            <blockquote className="text-xl text-gray-700 italic border-l-4 border-amber-400 pl-6">
              "Creemos que la arquitectura debe servir a las personas, creando espacios 
              que inspiren y mejoren la calidad de vida."
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Fundador;
