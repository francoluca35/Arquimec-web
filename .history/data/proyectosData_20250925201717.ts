export interface Proyecto {
  id: number;
  titulo: string;
  categoria: string;
  año: string;
  ubicacion: string;
  area: string;
  descripcion: string;
  descripcionLarga: string;
  imagenHero: string; // Imagen única para el hero
  imagenPrincipal: string; // Imagen para la sección de descripción
  imagenes: string[];
  video: string;
  caracteristicas: string[];
  concepto: {
    titulo: string;
    descripcion: string;
    sectores: {
      publico: string[];
      privado: string[];
    };
  };
  detalle: {
    proyectoDireccion: string;
    equipoProyecto: string;
    asesoriaPatrimonio?: string;
    disenoIluminacion?: string;
    ubicacion: string;
    año: string;
    superficie: string;
  };
  proceso: {
    titulo: string;
    descripcion: string;
    etapas: string[];
  };
}

export const proyectosData: Proyecto[] = [
  {
    id: 1,
    titulo: "Reforma Perón 1890",
    categoria: "Residencial",
    año: "2022",
    ubicacion: "CABA, Argentina",
    area: "240 m²",
    descripcion: "Se trata de una reforma integral de un departamento ubicado en un edificio histórico de valor patrimonial, de los arquitectos franceses Norbert Eugène Gantner y Albert Desiré Guilbert.",
    descripcionLarga: "Se trata de una reforma integral de un departamento ubicado en un edificio histórico de valor patrimonial, de los arquitectos franceses Norbert Eugène Gantner y Albert Desiré Guilbert. La renovación se hizo para una pareja y sus dos hijos, una familia que ya vivía en la zona y siempre había admirado el edificio. El objetivo principal fue preservar la esencia y el carácter del edificio patrimonial, logrando un plan funcional y moderno, manteniendo la estructura general de la vivienda y un estilo académico francés detallado y elegante de la década de 1920.",
    imagenHero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imagenPrincipal: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imagenes: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1639405091806-01e8ab3cd13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1Mjc5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxsfGVufDF8fHx8MTc1ODUzOTMwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbHxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1639156137702-2e6e1d7f40d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1ODQ5MTA2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    caracteristicas: [
      "Restauración de pisos de roble",
      "Molduras elaboradas originales",
      "Carpintería interior y exterior restaurada",
      "Chimeneas de mármol preservadas",
      "Proyecto de iluminación discreto",
      "Salón revestido en roble"
    ],
    concepto: {
      titulo: "Concepto",
      descripcion: "La reforma se dividió en dos partes: una restauración meticulosa en el sector público y un enfoque flexible y adaptable en el sector privado para adecuarse a los estilos de vida contemporáneos.",
      sectores: {
        publico: ["hall", "estar", "comedor", "escritorio"],
        privado: ["dormitorios", "cocina", "lavadero"]
      }
    },
    detalle: {
      proyectoDireccion: "Estudio 87 Arquitectura - Arq. Barbara Cosentino, Arq. Nicolas Bozzano, Arq. Leonardo Aguirre",
      equipoProyecto: "Arq. Lucia Billorou",
      asesoriaPatrimonio: "Marta Zaffora",
      disenoIluminacion: "Cappiello & Partners",
      ubicacion: "CABA, Argentina",
      año: "2022",
      superficie: "240 m²"
    },
    proceso: {
      titulo: "Proceso de Diseño",
      descripcion: "El diseño aprovechó la complejidad de la estructura existente para potenciar los procesos históricos, con intervenciones mínimas para preservar las características patrimoniales.",
      etapas: [
        "Análisis del edificio patrimonial",
        "Restauración de elementos originales",
        "Reorganización de espacios privados",
        "Implementación de iluminación contemporánea",
        "Finalización y entrega"
      ]
    }
  },
  {
    id: 2,
    titulo: "Oficinas Corporativas",
    categoria: "Comercial",
    año: "2023",
    ubicacion: "CABA, Argentina",
    area: "800 m²",
    descripcion: "Complejo de oficinas corporativas diseñado para fomentar la colaboración y la productividad. El espacio abierto se complementa con áreas de reunión privadas y espacios de descanso.",
    descripcionLarga: "Complejo de oficinas corporativas diseñado para fomentar la colaboración y la productividad. El espacio abierto se complementa con áreas de reunión privadas y espacios de descanso. La iluminación LED inteligente y los sistemas de climatización eficientes crean un ambiente de trabajo óptimo. El diseño prioriza la flexibilidad y la adaptabilidad para diferentes tipos de trabajo y reuniones.",
    imagenHero: "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imagenPrincipal: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imagenes: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1Mjc5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1639405091806-01e8ab3cd13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxsfGVufDF8fHx8MTc1ODUzOTMwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbHxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1639156137702-2e6e1d7f40d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1ODQ5MTA2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    caracteristicas: [
      "Espacios de trabajo colaborativos",
      "Sistema de iluminación LED inteligente",
      "Climatización eficiente",
      "Áreas de reunión modulares",
      "Espacios de descanso integrados",
      "Tecnología de videoconferencias"
    ],
    concepto: {
      titulo: "Concepto",
      descripcion: "Diseño de oficinas modernas que fomenta la colaboración y la productividad, con espacios flexibles que se adaptan a diferentes necesidades de trabajo.",
      sectores: {
        publico: ["recepción", "área de trabajo abierta", "sala de reuniones"],
        privado: ["oficinas privadas", "área de descanso", "cocina"]
      }
    },
    detalle: {
      proyectoDireccion: "Estudio 87 Arquitectura - Arq. Barbara Cosentino, Arq. Nicolas Bozzano",
      equipoProyecto: "Arq. Lucia Billorou",
      ubicacion: "CABA, Argentina",
      año: "2023",
      superficie: "800 m²"
    },
    proceso: {
      titulo: "Proceso de Diseño",
      descripcion: "Desarrollo de un espacio de trabajo que prioriza la flexibilidad y la colaboración, con tecnología integrada y sistemas eficientes.",
      etapas: [
        "Análisis de necesidades corporativas",
        "Diseño de espacios colaborativos",
        "Implementación de tecnología",
        "Sistemas de climatización",
        "Finalización y entrega"
      ]
    }
  },
  {
    id: 3,
    titulo: "Centro Educativo",
    categoria: "Educativo",
    año: "2023",
    ubicacion: "Buenos Aires, Argentina",
    area: "1200 m²",
    descripcion: "Centro educativo moderno diseñado para fomentar el aprendizaje colaborativo y la creatividad. Espacios flexibles que se adaptan a diferentes metodologías pedagógicas.",
    descripcionLarga: "Centro educativo moderno diseñado para fomentar el aprendizaje colaborativo y la creatividad. Espacios flexibles que se adaptan a diferentes metodologías pedagógicas. El diseño prioriza la luz natural, la ventilación y la accesibilidad, creando un ambiente óptimo para el desarrollo educativo de los estudiantes.",
    imagenHero: "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imagenPrincipal: "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imagenes: [
      "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1Mjc5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1639405091806-01e8ab3cd13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxsfGVufDF8fHx8MTc1ODUzOTMwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbHxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1639156137702-2e6e1d7f40d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1ODQ5MTA2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    caracteristicas: [
      "Aulas flexibles y modulares",
      "Espacios de colaboración",
      "Biblioteca integrada",
      "Patio central con vegetación",
      "Sistema de ventilación natural",
      "Accesibilidad universal"
    ],
    concepto: {
      titulo: "Concepto",
      descripcion: "Diseño educativo que fomenta el aprendizaje colaborativo y la creatividad, con espacios que se adaptan a diferentes metodologías pedagógicas.",
      sectores: {
        publico: ["aulas", "biblioteca", "patio central"],
        privado: ["oficinas administrativas", "sala de profesores", "almacén"]
      }
    },
    detalle: {
      proyectoDireccion: "Estudio 87 Arquitectura - Arq. Barbara Cosentino, Arq. Nicolas Bozzano",
      equipoProyecto: "Arq. Lucia Billorou",
      ubicacion: "Buenos Aires, Argentina",
      año: "2023",
      superficie: "1200 m²"
    },
    proceso: {
      titulo: "Proceso de Diseño",
      descripcion: "Desarrollo de un centro educativo que prioriza el aprendizaje colaborativo y la creatividad, con espacios flexibles y tecnología educativa integrada.",
      etapas: [
        "Análisis de necesidades educativas",
        "Diseño de espacios flexibles",
        "Implementación de tecnología educativa",
        "Sistemas de ventilación natural",
        "Finalización y entrega"
      ]
    }
  }
  // Agregar más proyectos aquí...
];
