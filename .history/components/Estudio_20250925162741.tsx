import { motion, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const Estudio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transformar el scroll progress en opacidad para cada línea
  const line1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0.2, 0.8, 1]);
  const line2Opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [0.2, 0.8, 1]);
  const line3Opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0.2, 0.8, 1]);
  const line4Opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.2, 0.8, 1]);

  return (
    <section
    ref={sectionRef}
    id="estudio"
    className="py-32 bg-black relative overflow-hidden"
  >
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Texto lado izquierdo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <motion.p
              className="text-gray-400 text-sm tracking-wider mb-4"
              style={{ 
                letterSpacing: "0.15em",
                opacity: line1Opacity
              }}
            >
              ESTUDIO DE ARQUITECTURA EN BUENOS AIRES
            </motion.p>
          </div>

          <div className="mb-12">
            <div className="text-4xl lg:text-5xl text-white mb-8 leading-tight">
              <motion.div
                style={{ 
                  fontWeight: 300,
                  opacity: line1Opacity
                }}
              >
                Creamos espacios que reflejan tus ideas, con
              </motion.div>
              <motion.div
                style={{ 
                  fontWeight: 300,
                  opacity: line2Opacity
                }}
              >
                precisión y calidad constructiva, ofreciendo
              </motion.div>
              <motion.div
                style={{ 
                  fontWeight: 300,
                  opacity: line3Opacity
                }}
              >
                un servicio pensado para satisfacer a los
              </motion.div>
              <motion.div
                style={{ 
                  fontWeight: 300,
                  opacity: line4Opacity
                }}
              >
                clientes más exigentes.
              </motion.div>
            </div>
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
             
              className="border border-white/30 bg-gray-800 text-white hover:bg-transparent  hover:text-white px-8 py-3 rounded-full text-sm tracking-wider transition-all duration-300"
              style={{
                fontWeight: 400,
                letterSpacing: "0.1em",
              }}
            >
              Hablemos de tu proyecto
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Imagen lado derecho */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="relative h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
            <ImageWithFallback
              src="/Assets/estudio.webp"
              alt="Interior arquitectónico moderno"
              className="w-full h-full object-cover"
              fill={true}
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

export default Estudio;
