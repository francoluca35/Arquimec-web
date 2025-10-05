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

        {/* Grid de procesos de trabajo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {procesos.map((proceso, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ perspective: "1000px" }}
            >
              {/* Card flip container */}
              <div className="relative w-full h-full transition-transform duration-700 group-hover:rotateY-180" style={{ transformStyle: "preserve-3d" }}>
                
                {/* Frente - Imagen de fondo */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                  <NextImage
                    src={proceso.backgroundImage}
                    alt={proceso.titulo}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay oscuro */}
                  <div className="absolute inset-0 bg-black/60"></div>

                  {/* Contenido del frente */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-8">
                    {/* Número */}
                    <div className="text-6xl lg:text-7xl font-light text-white/20">
                      {proceso.numero}
                    </div>

                    {/* Icono y título */}
                    <div className="flex flex-col items-center justify-center flex-1">
                      <div className="mb-4 p-4 rounded-full bg-white/10 backdrop-blur-sm">
                        <proceso.icono className="w-8 h-8 text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-white text-lg lg:text-xl font-medium text-center leading-tight">
                        {proceso.titulo}
                      </h3>
                    </div>
                  </div>

                  {/* Borde sutil */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10"></div>
                </div>

                {/* Reverso - Fondo con imagen */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotateY-180">
                  {/* Imagen de fondo */}
                  <div className="w-full h-full relative overflow-hidden">
                    <NextImage
                      src="/Assets/fondo-card.jpeg"
                      alt="Fondo arquitectónico"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Overlay sutil para legibilidad del texto */}
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>

                  {/* Contenido del reverso */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-8">
                    {/* Número */}
                    <div className="text-6xl lg:text-7xl font-light text-white/30">
                      {proceso.numero}
                    </div>

                    {/* Descripción centrada */}
                    <div className="flex flex-col items-center justify-center flex-1">
                      <div className="mb-6 p-4 rounded-full bg-white/20 backdrop-blur-sm">
                        <proceso.icono className="w-8 h-8 text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-white text-lg lg:text-xl font-medium text-center leading-tight mb-4 drop-shadow-lg">
                        {proceso.titulo}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed text-center max-w-xs drop-shadow-md">
                        {proceso.descripcion}
                      </p>
                    </div>
                  </div>

                  {/* Borde sutil */}
                  <div className="absolute inset-0 rounded-2xl border border-white/20"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      
      </motion.div>
    </div>
  </section>
  );
};

export default ProcesosTrabajo;
