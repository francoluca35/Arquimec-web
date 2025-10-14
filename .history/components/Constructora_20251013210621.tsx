import { motion, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ArrowRight, Building2, Hammer, Users, Award } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/router";

const Constructora: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transformar el scroll progress en opacidad para cada línea
  const line1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0.2, 0.8, 1]);
  const line2Opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [0.2, 0.8, 1]);
  const line3Opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0.2, 0.8, 1]);

  const servicios = [
    {
      icono: Building2,
      titulo: "Construcción Residencial",
      descripcion: "Edificamos hogares con los más altos estándares de calidad y eficiencia."
    },
    {
      icono: Hammer,
      titulo: "Obras Comerciales",
      descripcion: "Desarrollamos proyectos comerciales e industriales de gran envergadura."
    },
    {
      icono: Users,
      titulo: "Equipo Especializado",
      descripcion: "Contamos con profesionales certificados en todas las áreas de construcción."
    },
    {
      icono: Award,
      titulo: "Calidad Garantizada",
      descripcion: "Cumplimos con todas las normativas y estándares de la industria."
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="constructora"
      className="py-32 -mt-40 bg-[#0F1516] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Imagen lado izquierdo */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop"
                alt="Construcción profesional en progreso"
                className="w-full h-full object-cover"
                fill={true}
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Contenido lado derecho */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <motion.p
                className="text-[#e2e2e2] text-sm tracking-wider mb-4"
                style={{ 
                  letterSpacing: "0.15em",
                  opacity: line1Opacity
                }}
              >
                CONSTRUCCIONES EN TODO EL PAÍS
              </motion.p>
            </div>

            <div className="mb-12">
              <div className="text-3xl lg:text-4xl text-white mb-8 leading-tight">
                <motion.div
                  style={{ 
                    fontWeight: 300,
                    opacity: line1Opacity
                  }}
                >
                  Construimos con excelencia y precisión.
                </motion.div>
                <motion.div
                  style={{ 
                    fontWeight: 300,
                    opacity: line2Opacity
                  }}
                >
                  Desde la planificación hasta la entrega,
                </motion.div>
                <motion.div
                  style={{ 
                    fontWeight: 300,
                    opacity: line3Opacity
                  }}
                >
                  garantizamos resultados excepcionales.
                </motion.div>
              </div>
            </div>

             {/* Servicios de construcción */}
             <div className="grid grid-cols-2 gap-6 mb-8">
               {servicios.map((servicio, index) => (
                 <motion.div
                   key={index}
                   className="bg-gradient-to-br from-[#1a1f20] to-[#2a2f30] border border-[#3e4b51] p-4 rounded-lg hover:border-[#4a5568] transition-all duration-300 group"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                   viewport={{ once: true }}
                 >
                   <div className="flex items-start space-x-3">
                     <div className="w-10 h-10 bg-gradient-to-br from-[#e5a648] to-[#d4941e] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                       <servicio.icono className="w-5 h-5 text-white" strokeWidth={1.5} />
                     </div>
                     <div>
                       <h4 className="font-medium text-white text-sm mb-1 group-hover:text-[#e5a648] transition-colors duration-300">
                         {servicio.titulo}
                       </h4>
                       <p className="text-xs text-gray-300 leading-relaxed">
                         {servicio.descripcion}
                       </p>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>

            <motion.div
              whileHover={{ x: 10 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Button
                className="contact-button-border bg-[#1a2a3c00] text-white hover:bg-[#2a3a4c00] hover:border-red-500 px-8 py-3 text-sm tracking-wider transition-all duration-300"
                style={{
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                }}
                onClick={() => router.push('/#contacto')}
              >
                Solicitar presupuesto
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Constructora;
