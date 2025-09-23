import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const Fundador: React.FC = () => {
  return (
    <section className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Imagen del fundador */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="w-80 h-96 bg-gray-200 rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhcmNoaXRlY3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg1MzQ1MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Arquitecto fundador"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Contenido del lado derecho */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <h3
              className="text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight"
              style={{ fontWeight: 300 }}
            >
              Desde 2017, entregando calidad
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Arquimec es un estudio creado por el Arq.
              Nicolás Llanos, dedicado a la construcción de
              viviendas unifamiliares, proyectos
              comerciales, o urbanísticos, que busca
              desarrollar el proyecto y la ejecución de
              obra, con calidad y atención al detalle, en
              todas las etapas de la edificación.
            </p>
          </div>

          {/* Métrica grande */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div
              className="text-8xl lg:text-9xl text-gray-900 mb-2"
              style={{ fontWeight: 300 }}
            >
              5000
              <span className="text-amber-500">+</span>
            </div>
            <p
              className="text-gray-500 text-sm tracking-wider"
              style={{ letterSpacing: "0.15em" }}
            >
              M² CONSTRUIDOS
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

export default Fundador;
