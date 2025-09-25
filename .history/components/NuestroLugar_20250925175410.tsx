import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const NuestroLugar: React.FC = () => {
  return (
    <section className="py-32 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <p
          className="text-gray-500 text-sm tracking-wider mb-4"
          style={{ letterSpacing: "0.15em" }}
        >
          NUESTRO LUGAR
        </p>
        <h2
          className="text-4xl lg:text-5xl text-gray-900 mb-8 leading-tight max-w-4xl mx-auto"
          style={{ fontWeight: 300 }}
        >
          Espacios que combinan funcionalidad y diseño
          excepcional
        </h2>
      </motion.div>

      <motion.div
        className="relative h-[600px] lg:h-[700px] overflow-hidden rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1639156137702-2e6e1d7f40d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1ODQ5MTA2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cocina moderna minimalista"
          className="object-cover"
          fill={true}
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </motion.div>
    </div>
  </section>
  );
};

export default NuestroLugar;
