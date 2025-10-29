import { motion, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/router";

const Estudio: React.FC = () => {
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
  const line4Opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.2, 0.8, 1]);

  return (
    <section
    ref={sectionRef}
    id="estudio"
    className="py-32 bg-[#0F1516] relative overflow-hidden -mt-10"
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
              className="text-[#A4B5C4] text-sm tracking-wider mb-4"
              style={{ 
                letterSpacing: "0.15em",
                opacity: line1Opacity
              }}
            >
              ARQUITECTURA Y CONSTRUCCIÓN EN BUENOS AIRES
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
                Somos el puente que da vida a tus proyectos.
              </motion.div>
              <motion.div
                style={{ 
                  fontWeight: 300,
                  opacity: line2Opacity
                }}
              >
                Diseñamos y construimos con la máxima precisión, un servicio
              </motion.div>
              <motion.div
                style={{ 
                  fontWeight: 300,
                  opacity: line3Opacity
                }}
              >
                 pensado para satisfacer a los estándares más exigentes
              </motion.div>
              <motion.div
                style={{ 
                  fontWeight: 300,
                  opacity: line4Opacity
                }}
              >
              y garantizar una   calidad
              </motion.div>
              <motion.div
                style={{ 
                  fontWeight: 300,
                  opacity: line4Opacity
                }}
              >
               constructiva excepcional.
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
             
              className="contact-button-border bg-transparent text-white hover:bg-transparent hover:text-[#e5a648] px-8 py-3 text-sm tracking-wider transition-all duration-300"
              style={{
                fontWeight: 400,
                letterSpacing: "0.1em",
              }}
              onClick={() => router.push('/#contacto')}
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
              src="https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760413291/estudio/oficina.jpg"
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
