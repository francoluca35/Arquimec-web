import { motion } from "motion/react";
import ButtonTrabajo from "./ButtonTrabajo";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { useColorPalette } from "../contexts/ColorPaletteContext";

const ProcesosTrabajo: React.FC = () => {
  const router = useRouter();
  const { currentPalette } = useColorPalette();
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
    <section id="procesos" className="py-20" style={{ backgroundColor: currentPalette.colors.primary }}>
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
              className="text-3xl lg:text-4xl mb-2 leading-tight"
              style={{ fontWeight: 300, color: currentPalette.colors.light }}
            >
              Conocé nuestro proceso de trabajo
            </h2>
          </div>
          <div className="text-right">
            <p
              className="text-xs tracking-wider"
              style={{ letterSpacing: "0.15em", color: currentPalette.colors.light }}
            >
              PROYECTOS EN TODO EL  PAÍS
            </p>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="w-full h-px mb-10" style={{ backgroundColor: currentPalette.colors.neutral }}></div>

        {/* Proceso de trabajo en 3 pasos */}
        <div className="space-y-12">
          {[
            {
              icon: "/Assets/icons/empresario.webp",
              title: (
                <>
                  Desarrollo <span className="underline underline-offset-[6px] decoration-[1px]">administrativo</span>.
                </>
              ),
              description:
                "Relevamos en detalle tus necesidades para poder satisfacer cada uno de los requerimientos funcionales y estéticos del espacio de vivienda.",
            },
            {
              icon: "/Assets/icons/presentacion.webp",
              title: (
                <>
                  Presentación del <span className="underline underline-offset-[6px] decoration-[1px]">proyecto</span>.
                </>
              ),
              description:
                "Hacemos una presentación del proyecto arquitectónico con renders hiperrealistas para su revisión, ajustes y aprobación.",
            },
            {
              icon: "/Assets/icons/grua.webp",
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
                  className="text-xl lg:text-2xl mb-2 leading-tight"
                  style={{ fontWeight: 300, color: currentPalette.colors.light }}
                >
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed max-w-2xl" style={{ color: currentPalette.colors.light }}>
                  {step.description}
                </p>
              </div>

              {/* Icono */}
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <div className="w-16 h-16 lg:w-20 lg:h-20 relative">
                  <NextImage
                    src={step.icon}
                    alt={`Icono paso ${index + 1}`}
                    fill
                    className="object-contain"
                    style={{
                      filter: "brightness(0) invert(1)"
                    }}
                    sizes="(max-width: 768px) 64px, 80px"
                    priority={index === 0}
                  />
                </div>
              </div>

              {/* Línea divisoria para todos excepto el último */}
              {index < 2 && (
                <div className="lg:col-span-12 w-full h-px mt-6" style={{ backgroundColor: currentPalette.colors.neutral }}></div>
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
          <ButtonTrabajo onClick={() => router.push('/#contacto')}>
            Hablemos de tu proyecto →
          </ButtonTrabajo>
        </motion.div>
      </motion.div>
    </div>
  </section>
  );
};

export default ProcesosTrabajo;
