export interface Proyecto {
  id: number;
  titulo: string;
  categoria: string;
  ubicacion: string;
  año: string;
  imagenHero: string;
  descripcion: string;
  conceptoArquitectonico: string;
  galeriaVistas: {
    titulo: string;
    imagenes: string[];
  }[];
  caracteristicas: {
    titulo: string;
    valor: string;
    descripcion: string;
    icono: string;
  }[];
  cronologia: {
    inicio: string;
    duracion: string;
    finalizacion: string;
    estado: string;
  };
  video?: string;
}

// Proyecto destacado para el interludio (no aparece en catálogo)
export const proyectoDestacado: Proyecto = {
  id: 999, // ID especial para distinguirlo
  titulo: "CASA TOTARO",
  categoria: "PROYECTO DESTACADO",
  ubicacion: "Pilar del este, Buenos Aires (barrio Santa Sofia)",
  año: "2025",
  imagenHero: "https://res.cloudinary.com/dmfy5ohhf/image/upload/v1760412842/destacado/principal.jpg",
  descripcion: "Complejo de viviendas temporales diseñado para brindar comodidad y funcionalidad en espacios reducidos. Cada unidad combina eficiencia espacial con diseño contemporáneo, creando ambientes acogedores que maximizan la calidad de vida de sus habitantes.",
  conceptoArquitectonico: "El diseño se basa en la optimización del espacio y la flexibilidad funcional. Utilizamos materiales sustentables y sistemas constructivos modulares que permiten adaptabilidad y eficiencia energética. La integración con el entorno natural es fundamental, creando espacios que se conectan fluidamente con el exterior.",
  galeriaVistas: [
    {
      titulo: "Fachada Principal",
      imagenes: [
        "/Assets/destacado/frente2.webp",
        "/Assets/destacado/frentetrasero.webp",
        "/Assets/destacado/frentetrasero2.webp"
      ]
    },
    {
      titulo: "Interior",
      imagenes: [
        "/Assets/destacado/interior.webp",
        "/Assets/destacado/entresala.webp",
        "/Assets/destacado/sala.webp"
      ]
    }
  ],
  caracteristicas: [
   
    {
      titulo: "Superficie",
      valor: "45 m²",
      descripcion: "Cada unidad optimizada",
      icono: "📏"
    },
    {
      titulo: "Duración",
      valor: "6 meses",
      descripcion: "Proyecto de construcción",
      icono: "⏱️"
    },
    {
      titulo: "Sustentabilidad",
      valor: "A+",
      descripcion: "Certificación eco-friendly",
      icono: "🌱"
    }
  ],
  cronologia: {
    inicio: "Enero 2024",
    duracion: "6 meses",
    finalizacion: "Julio 2024",
    estado: "Proyecto Finalizado"
  }
};

export const proyectosData: Proyecto[] = [
  {
    id: 1,
    titulo: "Casa Dirube –Tozzelli",
    categoria: "PROYECTO RESIDENCIAL",
    ubicacion: "San Isidro, Buenos Aires",
    año: "2024",
    imagenHero: "/Assets/CasaDirube/principal.webp",
    descripcion: "Esta residencia contemporánea ubicada en Nordelta representa la perfecta fusión entre elegancia y funcionalidad. Con un diseño minimalista que prioriza la amplitud de espacios y la integración perfecta con el entorno natural, esta vivienda fue concebida para una familia moderna que busca comodidad, privacidad y un estilo de vida sofisticado.",
    conceptoArquitectonico: "El concepto arquitectónico se basa en crear espacios fluidos que conecten el interior con el exterior. Utilizamos líneas limpias, materiales nobles y grandes ventanales para maximizar la entrada de luz natural. La sustentabilidad es un pilar fundamental, incorporando tecnologías eco-eficientes y diseño bioclimático para reducir el consumo energético.",
    galeriaVistas: [
      {
        titulo: "Fachada Principal",
        imagenes: [
          "/Assets/CasaDirube/principal.webp",
          "/Assets/CasaDirube/MODELO.webp"
        ]
      },
      {
        titulo: "Interior",
        imagenes: [
          "/Assets/CasaDirube/interior.webp"
        ]
      },
      {
        titulo: "Patio Trasero",
        imagenes: [
          "/Assets/CasaDirube/patio-trasero.webp"
        ]
      }
    ],
    caracteristicas: [
      {
        titulo: "Superficie Total",
        valor: "350 m²",
        descripcion: "Distribución inteligente de espacios",
        icono: "🏠"
      },
      {
        titulo: "Superficie Cubierta",
        valor: "280 m²",
        descripcion: "Optimización del espacio interior",
        icono: "📏"
      },
      {
        titulo: "Dormitorios",
        valor: "4",
        descripcion: "Incluye suite principal con vestidor",
        icono: "👥"
      },
      {
        titulo: "Cocheras",
        valor: "2",
        descripcion: "Cubiertas con portón automático",
        icono: "🚗"
      },
      {
        titulo: "Jardín",
        valor: "120 m²",
        descripcion: "Diseño paisajístico incluido",
        icono: "🌳"
      },
      {
        titulo: "Eficiencia Energética",
        valor: "A+",
        descripcion: "Certificación sustentable",
        icono: "⚡"
      }
    ],
    cronologia: {
      inicio: "Marzo 2023",
      duracion: "10 meses",
      finalizacion: "Enero 2024",
      estado: "Proyecto Finalizado"
    },
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 2,
    titulo: "Oficinas Corporativas",
    categoria: "PROYECTO COMERCIAL",
    ubicacion: "CABA, Argentina",
    año: "2023",
    imagenHero: "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    descripcion: "Complejo de oficinas corporativas diseñado para fomentar la colaboración y la productividad. El espacio abierto se complementa con áreas de reunión privadas y espacios de descanso. La iluminación LED inteligente y los sistemas de climatización eficientes crean un ambiente de trabajo óptimo.",
    conceptoArquitectonico: "El diseño prioriza la flexibilidad y la adaptabilidad para diferentes tipos de trabajo y reuniones. Utilizamos materiales sustentables y tecnologías inteligentes para crear un ambiente de trabajo que fomente la creatividad y la colaboración entre equipos.",
    galeriaVistas: [
      {
        titulo: "Área de Trabajo",
        imagenes: [
          "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        ]
      },
      {
        titulo: "Sala de Reuniones",
        imagenes: [
          "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1Mjc5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        ]
      },
      {
        titulo: "Área de Descanso",
        imagenes: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        ]
      }
    ],
    caracteristicas: [
      {
        titulo: "Superficie Total",
        valor: "800 m²",
        descripcion: "Espacios de trabajo colaborativos",
        icono: "🏢"
      },
      {
        titulo: "Capacidad",
        valor: "50 personas",
        descripcion: "Puestos de trabajo optimizados",
        icono: "👥"
      },
      {
        titulo: "Salas de Reunión",
        valor: "6",
        descripcion: "Equipadas con tecnología",
        icono: "💼"
      },
      {
        titulo: "Eficiencia Energética",
        valor: "A+",
        descripcion: "Sistema LED inteligente",
        icono: "⚡"
      }
    ],
    cronologia: {
      inicio: "Enero 2023",
      duracion: "8 meses",
      finalizacion: "Septiembre 2023",
      estado: "Proyecto Finalizado"
    }
  }
];
