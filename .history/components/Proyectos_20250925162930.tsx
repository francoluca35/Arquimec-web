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
    <section id="proyectos" className="py-32 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <p
          className="text-gray-500 text-sm tracking-wider mb-4"
          style={{ letterSpacing: "0.15em" }}
        >
          PROYECTOS
        </p>
        <h2
          className="text-4xl lg:text-5xl text-gray-900 mb-8 leading-tight"
          style={{ fontWeight: 300 }}
        >
          Nuestros Trabajos Más Destacados
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            image:
              "https://images.unsplash.com/photo-1639405091806-01e8ab3cd13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            title: "Casa Moderna Minimalista",
            category: "Residencial",
            year: "2024",
          },
          {
            image:
              "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            title: "Edificio Corporativo",
            category: "Comercial",
            year: "2023",
          },
          {
            image:
              "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1Mjc5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            title: "Loft Contemporáneo",
            category: "Interiores",
            year: "2024",
          },
        ].map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
            }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  fill={true}
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs text-gray-500 tracking-wider"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {project.category.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400">
                    {project.year}
                  </span>
                </div>
                <h3
                  className="text-xl text-gray-900 group-hover:text-amber-600 transition-colors"
                  style={{ fontWeight: 300 }}
                >
                  {project.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Proyectos;
