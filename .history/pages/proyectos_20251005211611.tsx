import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRouter } from "next/router";
import Head from "next/head";
import AnimatedLogo from "../components/AnimatedLogo";
import Footer from "../components/Footer";

const ProyectosPage: React.FC = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const proyectos = [
    {
      id: 1,
      titulo: "Casa Moderna Minimalista",
      categoria: "Residencial",
      imagen: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      titulo: "Oficinas Corporativas",
      categoria: "Comercial",
      imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 3,
      titulo: "Centro Educativo",
      categoria: "Educativo",
      imagen: "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 4,
      titulo: "Villa de Lujo",
      categoria: "Residencial",
      imagen: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 5,
      titulo: "Centro Comercial",
      categoria: "Comercial",
      imagen: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxsfGVufDF8fHx8MTc1ODUzOTMwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 6,
      titulo: "Hospital Moderno",
      categoria: "Salud",
      imagen: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1Mjc5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 7,
      titulo: "Loft Contemporáneo",
      categoria: "Residencial",
      imagen: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1Mjc5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 8,
      titulo: "Casa de Campo",
      categoria: "Residencial",
      imagen: "https://images.unsplash.com/photo-1639405091806-01e8ab3cd13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 9,
      titulo: "Edificio de Apartamentos",
      categoria: "Residencial",
      imagen: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 10,
      titulo: "Museo de Arte",
      categoria: "Cultural",
      imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 11,
      titulo: "Restaurante Gourmet",
      categoria: "Comercial",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU4NTM5MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 12,
      titulo: "Centro Deportivo",
      categoria: "Deportivo",
      imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const [filtroCategoria, setFiltroCategoria] = useState("Todos");

  const categorias = ["Todos", ...Array.from(new Set(proyectos.map(p => p.categoria)))];

  const proyectosFiltrados = filtroCategoria === "Todos" 
    ? proyectos 
    : proyectos.filter(p => p.categoria === filtroCategoria);

  const handleProjectClick = (proyectoId: number) => {
    router.push(`/proyecto?id=${proyectoId}`);
  };

  return (
    <>
      <Head>
        <title>Proyectos - Arquimec</title>
        <meta name="description" content="Descubre todos nuestros proyectos de arquitectura, diseño y construcción." />
      </Head>
      
      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white shadow-lg" 
            : "bg-[#0F1516]"
        }`}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full">
          <div className="flex justify-between items-center py-4 lg:py-6 px-6 lg:px-8">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <AnimatedLogo scrolled={scrolled} isMainHeader={false} />
            </motion.div>

            {/* Botón de inicio */}
            <motion.button
              onClick={() => router.push('/')}
              className={`px-6 py-3 text-sm tracking-wider transition-all duration-300 hover:scale-105 ${
                scrolled 
                  ? "bg-[#0F1516] text-white hover:bg-gray-800" 
                  : "bg-white text-[#0F1516] hover:bg-gray-100"
              }`}
              style={{ fontWeight: 300 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              INICIO
            </motion.button>
          </div>
        </div>
      </motion.header>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <motion.div
          className="pt-24 pb-16 bg-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mt-10">
        
            <motion.h2
              className="text-4xl lg:text-6xl text-gray-900 mb-8 leading-tight"
              style={{ fontWeight: 300 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Nuestros Proyectos
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Descubre nuestra colección completa de proyectos arquitectónicos, desde residenciales hasta comerciales.
            </motion.p>
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="max-w-7xl mx-auto px-6 lg:px-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setFiltroCategoria(categoria)}
                className={`px-6 py-3 text-sm tracking-wider transition-all duration-300 ${
                  filtroCategoria === categoria
                    ? "bg-[#0F1516] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                style={{ fontWeight: 300 }}
              >
                {categoria.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid de Proyectos */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {proyectosFiltrados.map((proyecto, index) => (
              <motion.div
                key={proyecto.id}
                className="relative overflow-hidden cursor-pointer group bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -5 }}
                onClick={() => handleProjectClick(proyecto.id)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <ImageWithFallback
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    fill={true}
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw"
                  />
                  
                  {/* Overlay con hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                    <div className="p-6 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3
                        className="text-white text-lg mb-2"
                        style={{ fontWeight: 300 }}
                      >
                        {proyecto.titulo}
                      </h3>
                      <p className="text-white/80 text-sm mb-4">{proyecto.categoria}</p>
                      <button className="bg-white/60 text-black px-4 py-2 text-sm tracking-wider hover:bg-gray-100 transition-colors">
                        VER PROYECTO
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProyectosPage;
