import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const Fundador: React.FC = () => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Animar el contador de 0 a 7000 en 2 segundos
            const duration = 2000; // 2 segundos
            const startTime = Date.now();
            const startValue = 0;
            const endValue = 7000;

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Función de easing para suavizar la animación
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
              
              setCount(currentValue);
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 } // Se activa cuando el 30% de la sección es visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-32 bg-white">
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
            <div className="w-80 h-96  overflow-hidden ">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhcmNoaXRlY3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg1MzQ1MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Arquitecto fundador"
                className="w-full h-full object-contain filter brightness-110 contrast-110 saturate-125"
                fill={true}
                sizes=370px"
              
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
              Desde 2010, entregando calidad
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Arquimec es un estudio dirigido por el Arq. Marcelo Eduardo González Silva, especializado en el diseño y construcción de viviendas unifamiliares, proyectos comerciales y desarrollos urbanísticos. Nuestro propósito es transformar cada idea en una obra concreta, combinando creatividad, calidad y precisión en cada etapa del proceso. Nos enfocamos en brindar soluciones integrales que garanticen resultados estéticos, funcionales y duraderos, con especial atención a los detalles que hacen única cada construcción.
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
              className="text-5xl lg:text-6xl text-gray-900 mb-2"
              style={{ fontWeight: 300 }}
            >
              {count.toLocaleString()}
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
