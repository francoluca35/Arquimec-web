import { motion } from "motion/react";

const Estudio: React.FC = () => {
  return (
    <section id="estudio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nuestro Estudio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos un estudio de arquitectura especializado en proyectos residenciales y comerciales, 
            comprometidos con la excelencia en el diseño y la funcionalidad.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Diseño Arquitectónico",
              description: "Proyectos únicos que combinan estética y funcionalidad para crear espacios excepcionales.",
              icon: "🏗️"
            },
            {
              title: "Consultoría",
              description: "Asesoramiento especializado en todas las fases de tu proyecto arquitectónico.",
              icon: "💡"
            },
            {
              title: "Supervisión",
              description: "Acompañamiento completo desde la concepción hasta la entrega final del proyecto.",
              icon: "👁️"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Estudio;
