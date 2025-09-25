import { motion } from "motion/react";
import { Button } from "./ui/button";
import Image from "next/image";

const ProcesosTrabajo: React.FC = () => {
  const procesos = [
    {
      numero: "P1",
      titulo: "Consulta Inicial",
      descripcion: "Reunión para entender tus necesidades, objetivos y visión del proyecto.",
      icono: "💬"
    },
    {
      numero: "P2", 
      titulo: "Análisis y Diseño",
      descripcion: "Desarrollo del concepto arquitectónico y planos preliminares.",
      icono: "✏️"
    },
    {
      numero: "P3",
      titulo: "Presentación",
      descripcion: "Mostramos las propuestas y refinamos según tus comentarios.",
      icono: "📋"
    },
  
  ];

  return (
    <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 lg:px-6">
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">
          <div>
            <h2
              className="text-3xl lg:text-4xl text-gray-900 mb-2 leading-tight"
              style={{ fontWeight: 300 }}
            >
              Conocé nuestro proceso de trabajo
            </h2>
          </div>
          <div className="text-right">
            <p
              className="text-gray-500 text-xs tracking-wider"
              style={{ letterSpacing: "0.15em" }}
            >
              PROYECTOS EN TODO EL  PAÍS
            </p>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="w-full h-px bg-gray-300 mb-10"></div>

        {/* Proceso de trabajo en 3 pasos */}
        <div className="space-y-12">
          {[
            {
              icon: "/Assets/icons/empresario.png",
              title: (
                <>
                  Desarrollo <span className="underline underline-offset-[6px] decoration-[1px]">administrativo</span>.
                </>
              ),
              description:
                "Relevamos en detalle tus necesidades para poder satisfacer cada uno de los requerimientos funcionales y estéticos del espacio de vivienda.",
            },
            {
              icon: "/Assets/icons/presentacion.png",
              title: (
                <>
                  Presentación del <span className="underline underline-offset-[6px] decoration-[1px]">proyecto</span>.
                </>
              ),
              description:
                "Hacemos una presentación del proyecto arquitectónico con renders hiperrealistas para su revisión, ajustes y aprobación.",
            },
            {
              icon: "/Assets/icons/grua.png",
              title: (
                <>
                  Construcción y <span className="underline underline-offset-[6px] decoration-[1px]">entrega</span>.
                </>
              ),
              description:
                "Llevamos a cabo la construcción de la vivienda dividida en etapa de obra gruesa, terminaciones y final de obra.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Título y descripción */}
              <div className="lg:col-span-8">
                <h3
                  className="text-xl lg:text-2xl text-gray-900 mb-2 leading-tight"
                  style={{ fontWeight: 300 }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed max-w-2xl">
                  {step.description}
                </p>
              </div>

              {/* Icono */}
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <div className="w-16 h-16 lg:w-20 lg:h-20 relative">
                  <Image
                    src={step.icon}
                    alt={`Icono paso ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 64px, 80px"
                    priority={index === 0}
                  />
                </div>
              </div>

              {/* Línea divisoria para todos excepto el último */}
              {index < 2 && (
                <div className="lg:col-span-12 w-full h-px bg-gray-300 mt-6"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Botón al final */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            className="border-2 border-gray-900 text-gray-900  hover:bg-gray-900 hover:text-white px-6 py-2.5 rounded-xl text-xs tracking-wider transition-all duration-300"
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
