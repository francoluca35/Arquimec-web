import { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const Proyectos: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("todos");

  const categorias = [
    { id: "todos", nombre: "Todos" },
    { id: "residencial", nombre: "Residencial" },
    { id: "comercial", nombre: "Comercial" },
    { id: "institucional", nombre: "Institucional" }
  ];

  const proyectos = [
    {
      id: 1,
      titulo: "Casa Moderna Minimalista",
      categoria: "residencial",
      imagen: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      descripcion: "Diseño contemporáneo que maximiza la luz natural y la conexión con el exterior."
    },
    {
      id: 2,
      titulo: "Oficinas Corporativas",
      categoria: "comercial",
      imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      descripcion: "Espacios de trabajo innovadores que fomentan la colaboración y productividad."
    },
    {
      id: 3,
      titulo: "Centro Educativo",
      categoria: "institucional",
      imagen: "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      descripcion: "Instalaciones educativas diseñadas para el aprendizaje del siglo XXI."
    },
    {
      id: 4,
      titulo: "Villa de Lujo",
      categoria: "residencial",
      imagen: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      descripcion: "Residencia exclusiva con acabados de alta gama y diseño único."
    },
    {
      id: 5,
      titulo: "Centro Comercial",
      categoria: "comercial",
      imagen: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxsfGVufDF8fHx8MTc1ODUzOTMwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      descripcion: "Complejo comercial con diseño funcional y estético contemporáneo."
    },
    {
      id: 6,
      titulo: "Hospital Moderno",
      categoria: "institucional",
      imagen: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbHxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      descripcion: "Instalaciones médicas con enfoque en la experiencia del paciente."
    }
  ];

  const proyectosFiltrados = activeCategory === "todos" 
    ? proyectos 
    : proyectos.filter(proyecto => proyecto.categoria === activeCategory);

  return (
    <section id="proyectos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nuestros Proyectos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra cartera de proyectos que demuestran la versatilidad 
            y excelencia en el diseño arquitectónico.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setActiveCategory(categoria.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === categoria.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {categoria.nombre}
            </button>
          ))}
        </motion.div>

        {/* Grid de proyectos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectosFiltrados.map((proyecto, index) => (
            <motion.div
              key={proyecto.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={proyecto.imagen}
                  alt={proyecto.titulo}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  fallbackSrc="/Assets/fondoarq.png"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold">
                    Ver Proyecto
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {proyecto.titulo}
                </h3>
                <p className="text-gray-600">
                  {proyecto.descripcion}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold">
            Ver Todos los Proyectos
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Proyectos;
