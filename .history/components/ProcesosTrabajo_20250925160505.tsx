import { motion } from "motion/react";
import { Button } from "./ui/button";

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
    <section className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
          <div>
            <h2
              className="text-4xl lg:text-5xl text-gray-900 mb-4 leading-tight"
              style={{ fontWeight: 300 }}
            >
              Conocé nuestro proceso de trabajo
            </h2>
          </div>
          <div className="text-right">
            <p
              className="text-gray-500 text-sm tracking-wider"
              style={{ letterSpacing: "0.15em" }}
            >
              PROYECTOS EN BUENOS AIRES Y CÓRDOBA
            </p>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="w-full h-px bg-gray-400 mb-16"></div>

        {/* Proceso de trabajo en 3 pasos */}
        <div className="space-y-16">
          {[
            {
              number: "01",
              title: "Desarrollo ejecutivo.",
              description:
                "Relevamos en detalle tus necesidades para poder satisfacer cada uno de los requerimientos funcionales y estéticos del espacio de vivienda.",
            },
            {
              number: "02",
              title: "Presentación del proyecto.",
              description:
                "Hacemos una presentación del proyecto arquitectónico con renders hiperrealistas para su revisión, ajustes y aprobación.",
            },
            {
              number: "03",
              title: "Construcción y entrega.",
              description:
                "Llevamos a cabo la construcción de la vivienda dividida en etapa de obra gruesa, terminaciones y final de obra.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Título y descripción */}
              <div className="lg:col-span-8">
                <h3
                  className="text-2xl lg:text-3xl text-gray-900 mb-4 leading-tight"
                  style={{ fontWeight: 300 }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                  {step.description}
                </p>
              </div>

              {/* Número */}
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <span
                  className="text-6xl lg:text-8xl text-red-600"
                  style={{ fontWeight: 300 }}
                >
                  {step.number}
                </span>
              </div>

              {/* Línea divisoria para todos excepto el último */}
              {index < 2 && (
                <div className="lg:col-span-12 w-full h-px bg-gray-200 mt-8"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Botón al final */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-full text-sm tracking-wider transition-all duration-300"
            style={{
              fontWeight: 400,
              letterSpacing: "0.1em",
            }}
          >
            Hablemos de tu proyecto →
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </section>
  );
};

export default ProcesosTrabajo;
