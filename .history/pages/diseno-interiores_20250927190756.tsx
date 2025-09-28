import { motion } from "motion/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ArrowLeft, Home, Palette, Users, Clock, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const DisenoInteriores: React.FC = () => {
  const router = useRouter();

  const servicios = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Diseño Conceptual",
      description: "Desarrollamos conceptos únicos que reflejan la personalidad y estilo de vida de nuestros clientes."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Consultoría Personalizada",
      description: "Asesoramiento especializado para optimizar espacios y mejorar la funcionalidad de tu hogar."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Proyecto Ejecutivo",
      description: "Documentación técnica completa para la ejecución del diseño con planos y especificaciones."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Supervisión de Obra",
      description: "Acompañamiento durante la ejecución para garantizar la fidelidad al diseño proyectado."
    }
  ];

  const galeriaProyectos = [
    {
      id: 1,
      titulo: "Loft Moderno en Palermo",
      categoria: "Residencial",
      imagen: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      descripcion: "Diseño minimalista con líneas limpias y materiales nobles."
    },
    {
      id: 2,
      titulo: "Casa Familiar en Belgrano",
      categoria: "Residencial",
      imagen: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      descripcion: "Interiorismo cálido y funcional para una familia de cuatro integrantes."
    },
    {
      id: 3,
      titulo: "Oficina Corporativa",
      categoria: "Comercial",
      imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      descripcion: "Espacio de trabajo colaborativo con diseño contemporáneo."
    },
    {
      id: 4,
      titulo: "Departamento Premium",
      categoria: "Residencial",
      imagen: "https://images.unsplash.com/photo-1560185127-6c7c354e2105?w=800&h=600&fit=crop",
      descripcion: "Lujo y confort en un espacio urbano de alta gama."
    },
    {
      id: 5,
      titulo: "Restaurante Gourmet",
      categoria: "Comercial",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      descripcion: "Ambiente sofisticado que complementa la experiencia gastronómica."
    },
    {
      id: 6,
      titulo: "Casa de Campo",
      categoria: "Residencial",
      imagen: "https://images.unsplash.com/photo-1571508601933-1c2b3c4b5d6e?w=800&h=600&fit=crop",
      descripcion: "Diseño rústico moderno que integra naturaleza y confort."
    }
  ];

  return (
    <>
      <Head>
        <title>Diseño de Interiores | Arquimec - Transformamos Espacios</title>
        <meta name="description" content="Servicio de diseño de interiores especializado en crear espacios únicos, funcionales y estéticamente excepcionales. Consultoría personalizada y proyectos ejecutivos." />
        <meta name="keywords" content="diseño de interiores, interiorismo, arquitectura de interiores, decoración, consultoría, Buenos Aires" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header con navegación */}
        <motion.header 
          className="bg-white shadow-sm sticky top-0 z-50"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Volver</span>
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => router.push('/')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Inicio</span>
                </button>
              </div>
              <div className="text-2xl font-light tracking-wider text-gray-900">
                ARQUIMEC
              </div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section 
          className="relative py-20 bg-gradient-to-br from-gray-50 to-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h1 
                className="text-5xl lg:text-6xl font-light tracking-wider text-gray-900 mb-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                DISEÑO DE INTERIORES
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Transformamos espacios en experiencias únicas que reflejan tu personalidad 
                y optimizan tu calidad de vida. Cada proyecto es una oportunidad de crear 
                algo extraordinario.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Servicios Section */}
        <motion.section 
          className="py-20 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light tracking-wider text-gray-900 mb-6">
                NUESTROS SERVICIOS
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ofrecemos un servicio integral de diseño de interiores adaptado a tus necesidades específicas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {servicios.map((servicio, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-gray-900 mb-4">
                    {servicio.icon}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    {servicio.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {servicio.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Galería Section */}
        <motion.section 
          className="py-20 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light tracking-wider text-gray-900 mb-6">
                PROYECTOS REALIZADOS
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Descubre algunos de nuestros proyectos de diseño de interiores que reflejan 
                nuestro compromiso con la excelencia y la innovación
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galeriaProyectos.map((proyecto, index) => (
                <motion.div
                  key={proyecto.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-64">
                    <ImageWithFallback
                      src={proyecto.imagen}
                      alt={proyecto.titulo}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                        {proyecto.categoria}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      {proyecto.titulo}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {proyecto.descripcion}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="py-20 bg-gray-900 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-light tracking-wider mb-6">
              ¿LISTO PARA TRANSFORMAR TU ESPACIO?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contactanos y comencemos a diseñar el interior de tus sueños. 
              Cada proyecto es único y merece una atención personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/#contacto')}
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Contactar Ahora
              </button>
              <button
                onClick={() => router.push('/#proyectos')}
                className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300"
              >
                Ver Más Proyectos
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default DisenoInteriores;
