import { motion } from "motion/react";
import ButtonTrabajo from "./ButtonTrabajo";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { Users, FileText, FileSignature, PenTool, Hammer, Sofa } from "lucide-react";

const ProcesosTrabajo: React.FC = () => {
  const router = useRouter();
  const procesos = [
    {
      numero: "01",
      titulo: "NOS CONOCEMOS",
      descripcion: "Hablamos sobre la empresa, las ideas y necesidades del cliente. Armamos y firmamos una memoria descriptiva.",
      icono: Users,
      backgroundImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NTg1OTY3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      numero: "02", 
      titulo: "ASESORAMIENTO Y DESARROLLO",
      descripcion: "Desarrollo del concepto arquitectónico y planos preliminares con análisis detallado de requerimientos.",
      icono: FileText,
      backgroundImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcGxhbnN8ZW58MXx8fHwxNzU4NTk2NzIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      numero: "03",
      titulo: "CONTRATO",
      descripcion: "Firmamos el acuerdo de trabajo y establecemos los términos del proyecto arquitectónico.",
      icono: FileSignature,
      backgroundImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWduaW5nJTIwY29udHJhY3R8ZW58MXx8fHwxNzU4NTk2NzIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      numero: "04",
      titulo: "PLANIFICACIÓN Y DISEÑO",
      descripcion: "Desarrollamos el diseño arquitectónico completo con renders hiperrealistas y planos técnicos.",
      icono: PenTool,
      backgroundImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25pbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU4NTk2NzIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      numero: "05",
      titulo: "CONSTRUCCIÓN",
      descripcion: "Ejecutamos la obra dividida en etapas: obra gruesa, terminaciones y final de obra.",
      icono: Hammer,
      backgroundImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzU4NTk2NzIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      numero: "06",
      titulo: "TERMINACIONES Y ESTILO",
      descripcion: "Aplicamos los acabados finales y el estilo interior para completar el proyecto.",
      icono: Sofa,
      backgroundImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1OTY3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <section id="procesos" className="py-20 bg-[#0F1516]">
    <div className="max-w-6xl mx-auto px-4 lg:px-6">
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">
          <div className="text-center lg:text-left">
            <h2
              className="text-3xl lg:text-4xl text-gray-100 mb-2 leading-tight"
              style={{ fontWeight: 300 }}
            >
              Conocé nuestro proceso de trabajo
            </h2>
          </div>
          <div className="text-center lg:text-right">
            <p
              className="text-gray-100 text-xs tracking-wider"
              style={{ letterSpacing: "0.15em" }}
            >
              PROYECTOS EN TODO EL  PAÍS
            </p>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="w-full h-px bg-[#3e4b51] mb-10"></div>

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
              <div className="lg:col-span-8 text-center lg:text-left">
                <h3
                  className="text-xl lg:text-2xl text-gray-200 mb-2 leading-tight"
                  style={{ fontWeight: 300 }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-200 text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {step.description}
                </p>
              </div>

              {/* Icono */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
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
                <div className="lg:col-span-12 w-full h-px bg-[#3e4b51] mt-6"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Botón al final */}
        <motion.div
          className="mt-12 flex justify-center lg:justify-start"
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
