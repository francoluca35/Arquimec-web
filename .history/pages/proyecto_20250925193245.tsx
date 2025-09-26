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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-lg">
                La casa se ubica en {proyecto.ubicacion}, un barrio netamente residencial que combina la tranquilidad del entorno con la accesibilidad a los servicios urbanos. El proyecto respeta la escala del barrio manteniendo la armonía con el contexto existente.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Este proyecto consiste básicamente en intervenir una casa existente incorporando elementos contemporáneos que mejoran la funcionalidad y la estética del espacio, creando una transición fluida entre lo tradicional y lo moderno.
              </p>
            </div>
            <div></div>
          </div>
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

      {/* Sección detalles */}
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
                Detalle
              </h3>
            </div>
            <div className="space-y-4">
              <div className="text-gray-600">
                <p className="font-medium">Proyecto y Dirección:</p>
                <p>ARQUIMEC - Arq. Marcelo Eduardo González Silva</p>
              </div>
              <div className="text-gray-600">
                <p className="font-medium">Ubicación:</p>
                <p>{proyecto.ubicacion}</p>
              </div>
              <div className="text-gray-600">
                <p className="font-medium">Año:</p>
                <p>{proyecto.año}</p>
              </div>
              <div className="text-gray-600">
                <p className="font-medium">Superficie:</p>
                <p>{proyecto.area}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Galería de imágenes con video */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Video como primera imagen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer group relative"
              whileHover={{ scale: 1.05 }}
            >
              <iframe
                src={proyecto.video}
                title={`Video de ${proyecto.titulo}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Imágenes de la galería */}
            {proyecto.imagenes.slice(0, 9).map((imagen, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                viewport={{ once: true }}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.05 }}
              >
                <ImageWithFallback
                  src={imagen}
                  alt={`${proyecto.titulo} - Imagen ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  fill={true}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer con navegación */}
      <footer className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              ANTERIOR
            </button>
            <button 
              onClick={() => router.push('/#proyectos')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              PROYECTOS
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              PRÓXIMO →
            </button>
          </div>
          <div className="text-center text-gray-500 text-sm">
            © 2024 ARQUIMEC. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProyectoDetalle;
