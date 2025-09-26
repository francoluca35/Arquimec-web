import { motion } from "motion/react";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { proyectosData, Proyecto } from "../data/proyectosData";
import { useState, useEffect } from "react";

const ProyectoDetalle: React.FC = () => {
  const router = useRouter();
  const [proyecto, setProyecto] = useState<Proyecto | null>(null);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      const proyectoEncontrado = proyectosData.find(p => p.id === parseInt(id as string));
      setProyecto(proyectoEncontrado || null);
    }
  }, [router.query]);

  if (!proyecto) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">Proyecto no encontrado</h2>
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-800"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
          <h1 className="text-2xl font-light text-gray-900">ARQUIMEC</h1>
        </div>
      </header>

      {/* Hero Section con fondo y nombre del proyecto */}
      <section className="relative h-[60vh] bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={proyecto.imagenHero}
            alt={proyecto.titulo}
            className="w-full h-full object-cover opacity-40"
            fill={true}
            sizes="100vw"
            style={{ objectPosition: 'center center' }}
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            className="text-5xl lg:text-7xl mb-4"
            style={{ fontWeight: 300 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {proyecto.titulo}
          </motion.h1>
          <motion.p
            className="text-xl lg:text-2xl text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {proyecto.categoria} • {proyecto.año}
          </motion.p>
        </div>
      </section>

      {/* Sección descripción inicial */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-lg">
                La casa se ubica en {proyecto.ubicacion}, un barrio netamente residencial que combina la tranquilidad del entorno con la accesibilidad a los servicios urbanos. El proyecto respeta la escala del barrio manteniendo la armonía con el contexto existente.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Este proyecto consiste básicamente en intervenir una casa existente incorporando elementos contemporáneos que mejoran la funcionalidad y la estética del espacio, creando una transición fluida entre lo tradicional y lo moderno.
              </p>
            </div>
            <div></div>
          </motion.div>
        </div>
      </section>

      {/* Imagen principal del proyecto */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-[4/3] overflow-hidden"
          >
            <ImageWithFallback
              src={proyecto.imagenPrincipal}
              alt={proyecto.titulo}
              className="w-full h-full object-cover"
              fill={true}
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Sección concepto */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            <div>
              <h3 className="text-2xl text-gray-900 mb-8" style={{ fontWeight: 300 }}>
                Concepto
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-lg">
                El concepto arquitectónico se basa en la integración de espacios fluidos que maximizan la luz natural y crean una conexión visual entre los diferentes ambientes. La intervención respeta la estructura existente mientras incorpora elementos contemporáneos.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                La propuesta estructural contempla la optimización de los espacios existentes mediante la eliminación de muros portantes no esenciales y la incorporación de nuevos elementos estructurales que permiten mayores vanos y mejor distribución.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                En cuanto al diseño interior, se propone un lenguaje minimalista que enfatiza los materiales en su estado natural, creando contrastes sutiles entre texturas y acabados que aportan calidez y sofisticación al espacio.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección características */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl lg:text-4xl text-gray-900 mb-4" style={{ fontWeight: 300 }}>
              Características del Proyecto
            </h3>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proyecto.caracteristicas.map((caracteristica, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-gray-700 font-light">{caracteristica}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería de imágenes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl lg:text-4xl text-gray-900 mb-4" style={{ fontWeight: 300 }}>
              Galería de Imágenes
            </h3>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {proyecto.imagenes.map((imagen, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.05 }}
              >
                <ImageWithFallback
                  src={imagen}
                  alt={`${proyecto.titulo} - Imagen ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  fill={true}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl lg:text-4xl text-gray-900 mb-4" style={{ fontWeight: 300 }}>
              Video del Proyecto
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="aspect-video rounded-lg overflow-hidden shadow-2xl"
          >
            <iframe
              src={proyecto.video}
              title={`Video de ${proyecto.titulo}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProyectoDetalle;
