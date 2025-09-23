import { motion } from "motion/react";

const ProcesosTrabajo: React.FC = () => {
  const procesos = [
    {
      numero: "01",
      titulo: "Consulta Inicial",
      descripcion: "Reunión para entender tus necesidades, objetivos y visión del proyecto.",
      icono: "💬"
    },
    {
      numero: "02", 
      titulo: "Análisis y Diseño",
      descripcion: "Desarrollo del concepto arquitectónico y planos preliminares.",
      icono: "✏️"
    },
    {
      numero: "03",
      titulo: "Presentación",
      descripcion: "Mostramos las propuestas y refinamos según tus comentarios.",
      icono: "📋"
    },
    {
      numero: "04",
      titulo: "Desarrollo Técnico",
      descripcion: "Planos ejecutivos, especificaciones y documentación completa.",
      icono: "📐"
    },
    {
      numero: "05",
      titulo: "Supervisión",
      descripcion: "Acompañamiento durante la construcción para garantizar calidad.",
      icono: "👷"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nuestro Proceso de Trabajo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un método probado que garantiza la excelencia en cada proyecto, 
            desde la concepción hasta la entrega final.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {procesos.map((proceso, index) => (
            <motion.div
              key={index}
              className="flex items-start mb-12 last:mb-0"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0 mr-8">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {proceso.numero}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{proceso.icono}</span>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {proceso.titulo}
                  </h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {proceso.descripcion}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-50 p-8 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              ¿Listo para comenzar tu proyecto?
            </h3>
            <p className="text-gray-600 mb-6">
              Contáctanos y descubre cómo podemos hacer realidad tu visión arquitectónica.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Iniciar Proyecto
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcesosTrabajo;
