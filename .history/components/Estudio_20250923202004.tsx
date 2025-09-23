import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "react-day-picker";
import { ArrowRight } from "lucide-react";

const Estudio: React.FC = () => {
  return (
    <section
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
            <p
              className="text-gray-400 text-sm tracking-wider mb-4"
              style={{ letterSpacing: "0.15em" }}
            >
              ESTUDIO DE ARQUITECTURA EN BUENOS AIRES
            </p>
          </div>

          <div className="mb-12">
            <h2
              className="text-4xl lg:text-5xl text-white mb-8 leading-tight"
              style={{ fontWeight: 300 }}
            >
              Creamos espacios que reflejan tus ideas, con
              precisión y calidad constructiva, ofreciendo
              un servicio pensado para satisfacer a los
              clientes más exigentes.
            </h2>
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
              variant="outline"
              className="border border-white/30 text-white hover:bg-white hover:text-black px-8 py-3 rounded-full text-sm tracking-wider transition-all duration-300"
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
            <ImageWithFallbac
              src="https://images.unsplash.com/photo-1667375186583-0e90493826c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcGhvdG9ncmFwaHklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg1ODQ2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Interior arquitectónico moderno"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

export default Estudio;
