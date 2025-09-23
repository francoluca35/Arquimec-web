import { motion } from "motion/react";

const Fundador: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              El Fundador
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Con más de 15 años de experiencia en arquitectura, nuestro fundador ha liderado 
              proyectos que han transformado comunidades y creado espacios únicos que combinan 
              funcionalidad, estética y sostenibilidad.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Arquitecto certificado</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Especialista en diseño sostenible</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Más de 100 proyectos completados</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Foto del Fundador</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Nombre del Fundador
              </h3>
              <p className="text-gray-600 mb-4">
                Arquitecto Principal
              </p>
              <blockquote className="text-gray-700 italic">
                "Creemos que la arquitectura debe servir a las personas, creando espacios 
                que inspiren y mejoren la calidad de vida."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Fundador;
