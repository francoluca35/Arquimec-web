import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Phone, Headphones, X, Clock, Send, Bot } from "lucide-react";
import AIChatbot from './AIChatbot';

interface CustomerServiceBubbleProps {
  phoneNumber?: string;
}

const CustomerServiceBubble: React.FC<CustomerServiceBubbleProps> = ({ 
  phoneNumber = "1234567890" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWhatsAppAvailable, setIsWhatsAppAvailable] = useState(false);
  const [isChatbotAvailable, setIsChatbotAvailable] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAIChatbot, setShowAIChatbot] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, text: string, isUser: boolean, timestamp: Date}>>([]);
  const [currentStep, setCurrentStep] = useState<'initial' | 'form' | 'options' | 'chat' | 'specialists'>('initial');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [selectedSpecialist, setSelectedSpecialist] = useState<any>(null);
  const [conversationContext, setConversationContext] = useState({
    selectedOption: '',
    conversationHistory: [] as string[],
    userNeeds: [] as string[],
    currentTopic: '',
    conversationFlow: [] as Array<{type: 'question' | 'answer' | 'clarification', content: string, timestamp: Date}>,
    userProfile: {
      projectType: '',
      budget: '',
      timeline: '',
      preferences: [] as string[],
      concerns: [] as string[]
    },
    lastIntent: '',
    conversationStage: 'initial' as 'initial' | 'exploring' | 'detailed' | 'closing'
  });
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Verificar horarios de atención
  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour + minute / 60;

      // WhatsApp: L-V 8-19, S 9-16, D cerrado
      let whatsAppAvailable = false;
      if (day >= 1 && day <= 5) { // Lunes a Viernes
        whatsAppAvailable = currentTime >= 8 && currentTime < 19;
      } else if (day === 6) { // Sábado
        whatsAppAvailable = currentTime >= 9 && currentTime < 16;
      }
      // Domingo (day === 0) WhatsApp cerrado

      // Chatbot: Siempre disponible (24/7)
      const chatbotAvailable = true;

      setIsWhatsAppAvailable(whatsAppAvailable);
      setIsChatbotAvailable(chatbotAvailable);
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Verificar cada minuto
    return () => clearInterval(interval);
  }, []);

  const getAvailabilityMessage = () => {
    const now = new Date();
    const day = now.getDay();
    
    if (day === 0) { // Domingo
      return "WhatsApp cerrado domingos";
    }
    
    if (day >= 1 && day <= 5) { // Lunes a Viernes
      return "WhatsApp: L-V 8:00-19:00";
    }
    
    if (day === 6) { // Sábado
      return "WhatsApp: S 9:00-16:00";
    }
    
    return "WhatsApp fuera de horario";
  };

  const handleWhatsAppClick = () => {
    const message = "Hola! Me interesa conocer más sobre sus servicios de arquitectura.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsExpanded(false);
  };

  const addMessage = (text: string, isUser: boolean = false) => {
    const message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
    
    // Actualizar contexto de conversación
    if (isUser) {
      setConversationContext(prev => ({
        ...prev,
        conversationHistory: [...prev.conversationHistory, text]
      }));
    }
  };

  // Base de datos de especialistas
  const specialistsDatabase = {
    arquitectos: [
      {
        id: 'arq-001',
        name: 'Arq. María González',
        title: 'Arquitecta Senior',
        specialty: 'Arquitectura Residencial',
        experience: '15 años de experiencia',
        description: 'Especialista en diseño de viviendas unifamiliares y complejos residenciales. Experta en sostenibilidad y eficiencia energética.',
        phone: '+54 11 1234-5678',
        email: 'maria.gonzalez@arquimec.com',
        availability: 'Lunes a Viernes 9:00-18:00',
        languages: ['Español', 'Inglés'],
        projects: 'Más de 200 proyectos residenciales completados'
      },
      {
        id: 'arq-002',
        name: 'Arq. Carlos Rodríguez',
        title: 'Arquitecto Senior',
        specialty: 'Arquitectura Comercial',
        experience: '12 años de experiencia',
        description: 'Especialista en proyectos comerciales, oficinas y retail. Experto en normativas urbanas y diseño corporativo.',
        phone: '+54 11 2345-6789',
        email: 'carlos.rodriguez@arquimec.com',
        availability: 'Lunes a Viernes 8:00-17:00',
        languages: ['Español', 'Portugués'],
        projects: 'Más de 150 proyectos comerciales completados'
      }
    ],
    interiores: [
      {
        id: 'int-001',
        name: 'Diseñadora Ana Martínez',
        title: 'Diseñadora de Interiores Senior',
        specialty: 'Diseño de Interiores',
        experience: '10 años de experiencia',
        description: 'Especialista en transformación de espacios interiores. Experta en accesibilidad y diseño universal.',
        phone: '+54 11 3456-7890',
        email: 'ana.martinez@arquimec.com',
        availability: 'Lunes a Viernes 10:00-19:00',
        languages: ['Español', 'Inglés'],
        projects: 'Más de 300 proyectos de interiores completados'
      },
      {
        id: 'int-002',
        name: 'Diseñador Luis Fernández',
        title: 'Diseñador de Interiores',
        specialty: 'Diseño de Interiores Comerciales',
        experience: '8 años de experiencia',
        description: 'Especialista en diseño de interiores para espacios comerciales, restaurantes y oficinas corporativas.',
        phone: '+54 11 4567-8901',
        email: 'luis.fernandez@arquimec.com',
        availability: 'Lunes a Viernes 9:00-18:00',
        languages: ['Español'],
        projects: 'Más de 180 proyectos comerciales completados'
      }
    ],
    consultores: [
      {
        id: 'con-001',
        name: 'Ing. Patricia López',
        title: 'Consultora Técnica Senior',
        specialty: 'Consultorías Técnicas',
        experience: '18 años de experiencia',
        description: 'Especialista en normativas de construcción, permisos y asesoramiento técnico. Experta en reglamentaciones municipales.',
        phone: '+54 11 5678-9012',
        email: 'patricia.lopez@arquimec.com',
        availability: 'Lunes a Viernes 8:00-17:00',
        languages: ['Español', 'Inglés'],
        projects: 'Más de 500 consultorías técnicas completadas'
      }
    ]
  };

  // Sistema de IA Avanzado - Base de Conocimiento Especializada
  const advancedKnowledgeBase = {
    empresa: {
      nombre: "Arquimec",
      descripcion: "Estudio de arquitectura especializado en diseño y construcción de viviendas unifamiliares, proyectos comerciales y desarrollos urbanísticos en Buenos Aires y Córdoba.",
      ubicacion: "Buenos Aires y Córdoba, Argentina",
      experiencia: "Más de 7,000 m² construidos y más de 2,000 clientes satisfechos",
      filosofia: "Combinamos creatividad, funcionalidad y sostenibilidad en cada proyecto",
      fundacion: "Estudio con más de 10 años de experiencia en el mercado argentino",
      especialidades: ["Arquitectura residencial", "Arquitectura comercial", "Diseño de interiores", "Consultorías técnicas"],
      metodologia: "Trabajamos de forma colaborativa con nuestros clientes, involucrándolos en cada etapa del proceso"
    },
    servicios: {
      residencial: {
        titulo: "Arquitectura Residencial",
        descripcion: "Diseñamos hogares únicos que reflejan la personalidad y estilo de vida de nuestros clientes. Desde casas unifamiliares hasta complejos residenciales, creamos espacios que combinan funcionalidad, estética y sostenibilidad.",
        caracteristicas: ["Casas unifamiliares", "Complejos residenciales", "Diseño personalizado", "Sostenibilidad", "Funcionalidad"]
      },
      comercial: {
        titulo: "Arquitectura Comercial", 
        descripcion: "Desarrollamos espacios comerciales que potencian la experiencia del cliente y optimizan el flujo de trabajo. Oficinas corporativas, retail, restaurantes y espacios públicos con diseño innovador.",
        caracteristicas: ["Oficinas corporativas", "Retail", "Restaurantes", "Espacios públicos", "Optimización de flujos"]
      },
      interiores: {
        titulo: "Diseño de Interiores",
        descripcion: "Transformamos espacios interiores creando ambientes únicos y funcionales. Desde la conceptualización hasta la ejecución, cada proyecto refleja la identidad y necesidades específicas de nuestros clientes.",
        caracteristicas: ["Ambientes únicos", "Funcionalidad", "Identidad del cliente", "Conceptualización", "Ejecución completa"]
      },
      consultorias: {
        titulo: "Consultorías Técnicas",
        descripcion: "Brindamos asesoramiento especializado en aspectos técnicos, normativas y optimización de proyectos. Nuestros expertos te guían en cada etapa del proceso constructivo.",
        caracteristicas: ["Asesoramiento técnico", "Normativas", "Optimización", "Proceso constructivo", "Expertos especializados"]
      }
    },
    proceso: {
      etapas: [
        "Consulta inicial y análisis de necesidades",
        "Desarrollo del concepto y diseño preliminar", 
        "Planos técnicos y documentación",
        "Supervisión de obra y seguimiento",
        "Entrega final y post-venta"
      ],
      metodologia: "Trabajamos de forma colaborativa con nuestros clientes, involucrándolos en cada etapa del proceso para garantizar que el resultado final supere sus expectativas."
    },
    contacto: {
      telefono: "+54 11 3119-9882",
      email: "contacto@arquimec.com",
      ubicacion: "CABA, Argentina",
      horarios: "Lunes a Viernes: 8:00-19:00, Sábado: 9:00-16:00"
    }
  };

  // Sistema de IA Avanzado con Comprensión Contextual
  const advancedAI = {
    // Análisis semántico avanzado
    analyzeIntent: (message: string, context: typeof conversationContext) => {
      const words = message.toLowerCase().split(' ');
      const intentScores = {
        empresa: 0,
        servicios: 0,
        residencial: 0,
        comercial: 0,
        interiores: 0,
        consultorias: 0,
        proceso: 0,
        contacto: 0,
        presupuesto: 0,
        tiempo: 0,
        proyecto: 0
      };

      // Palabras clave con pesos semánticos
      const semanticKeywords = {
        empresa: {
          'quienes': 3, 'somos': 3, 'son': 3, 'empresa': 2, 'estudio': 2, 'arquimec': 3,
          'información': 2, 'historia': 2, 'filosofía': 2, 'conocerte': 2, 'saber': 2
        },
        servicios: {
          'servicio': 2, 'servicios': 2, 'ofrecen': 2, 'hacen': 2, 'trabajan': 2,
          'especialidad': 2, 'especialidades': 2
        },
        residencial: {
          'casa': 2, 'hogar': 3, 'vivienda': 3, 'residencial': 3, 'familia': 2,
          'unifamiliar': 3, 'complejo': 2, 'departamento': 1, 'apartamento': 1,
          'construir casa': 4, 'nueva casa': 4, 'casa desde cero': 4
        },
        comercial: {
          'comercial': 3, 'oficina': 3, 'retail': 3, 'restaurante': 3, 'negocio': 2,
          'corporativo': 2, 'empresarial': 2, 'local': 2
        },
        interiores: {
          'interior': 3, 'interiores': 3, 'decoración': 3, 'ambiente': 2, 'muebles': 2,
          'colores': 2, 'estilo': 2, 'diseño': 2, 'rediseñar': 3, 'rediseño': 3,
          'renovar': 2, 'transformar': 2, 'diseño de interior': 4, 'diseño interior': 4,
          'hacen diseño de interior': 4, 'hacen diseño interior': 4, 'diseño de interiores': 4,
          'hacen diseño de interiores': 4, 'rediseñar casa': 4, 'rediseñar departamento': 4,
          'renovar casa': 4, 'renovar departamento': 4, 'transformar casa': 4,
          'transformar departamento': 4, 'decorar casa': 4, 'decorar departamento': 4
        },
        consultorias: {
          'consultoría': 3, 'consultorías': 3, 'técnico': 2, 'asesoramiento': 2,
          'normativa': 2, 'reglamentación': 2, 'permisos': 2, 'tramites': 2
        },
        proceso: {
          'proceso': 2, 'metodología': 2, 'etapas': 2, 'cómo': 2, 'trabajan': 2,
          'trabajo': 2, 'desarrollo': 2
        },
        presupuesto: {
          'precio': 3, 'costo': 3, 'presupuesto': 3, 'tarifa': 2, 'valor': 2,
          'cuanto': 2, 'cuesta': 2, 'económico': 2
        },
        tiempo: {
          'tiempo': 2, 'duración': 2, 'cuando': 2, 'plazo': 2, 'urgente': 2,
          'rápido': 2, 'inmediato': 2
        },
        proyecto: {
          'proyecto': 3, 'obra': 2, 'construcción': 2, 'diseño': 2, 'planos': 2
        },
        especialista: {
          'especialista': 4, 'especialistas': 4, 'contactar': 3, 'hablar': 3, 'conectar': 3,
          'experto': 3, 'profesional': 3, 'arquitecto': 3, 'diseñador': 3, 'consultor': 3,
          'hablar con': 4, 'contacto directo': 4, 'conectar con': 4
        }
      };

      // Calcular puntuaciones semánticas
      Object.entries(semanticKeywords).forEach(([intent, keywords]) => {
        // Primero buscar frases completas (mayor peso)
        Object.entries(keywords).forEach(([phrase, weight]) => {
          if (message.includes(phrase.toLowerCase())) {
            intentScores[intent as keyof typeof intentScores] += weight;
          }
        });
        
        // Luego buscar palabras individuales
        words.forEach(word => {
          if (keywords[word as keyof typeof keywords]) {
            intentScores[intent as keyof typeof intentScores] += keywords[word as keyof typeof keywords];
          }
        });
      });

      // Lógica especial para detectar consultas sobre diseño de interiores
      const interiorPhrases = [
        'diseño de interior', 'diseño interior', 'diseño de interiores', 
        'hacen diseño de interior', 'hacen diseño interior', 'hacen diseño de interiores',
        'rediseñar casa', 'renovar casa', 'transformar casa', 'decorar casa'
      ];
      
      const hasInteriorPhrase = interiorPhrases.some(phrase => message.includes(phrase));
      
      // Si contiene frases específicas de interiores, priorizar esa intención
      if (hasInteriorPhrase) {
        intentScores.interiores += 5; // Bonus adicional
      }

      // Encontrar la intención con mayor puntuación
      const maxScore = Math.max(...Object.values(intentScores));
      const detectedIntent = Object.keys(intentScores).find(key => 
        intentScores[key as keyof typeof intentScores] === maxScore
      );

      return {
        intent: detectedIntent || 'general',
        confidence: maxScore,
        scores: intentScores
      };
    },

    // Generar respuesta contextual inteligente
    generateContextualResponse: (message: string, context: typeof conversationContext, analysis: any) => {
      const { intent, confidence } = analysis;
      
      // Actualizar etapa de conversación basada en el historial
      let newStage = context.conversationStage;
      if (context.conversationFlow.length > 2) {
        newStage = 'exploring';
      }
      if (context.conversationFlow.length > 6) {
        newStage = 'detailed';
      }
      if (context.conversationFlow.length > 10) {
        newStage = 'closing';
      }
      
      // Actualizar contexto
      setConversationContext(prev => ({
        ...prev,
        conversationStage: newStage,
        lastIntent: intent
      }));
      
      // Respuestas contextuales basadas en el estado de la conversación
      if (newStage === 'initial') {
        return advancedAI.getInitialResponse(intent, message);
      } else if (newStage === 'exploring') {
        return advancedAI.getExploringResponse(intent, message, context);
      } else if (newStage === 'detailed') {
        return advancedAI.getDetailedResponse(intent, message, context);
      } else {
        return advancedAI.getClosingResponse(intent, message, context);
      }
    },

    // Respuestas dinámicas y contextuales
    getInitialResponse: (intent: string, message: string) => {
      const responses = {
        empresa: `Somos ${advancedKnowledgeBase.empresa.nombre}, ${advancedKnowledgeBase.empresa.descripcion}. ${advancedKnowledgeBase.empresa.filosofia} Con ${advancedKnowledgeBase.empresa.experiencia}, trabajamos en ${advancedKnowledgeBase.empresa.ubicacion}. ¿Te interesa conocer más sobre nuestros servicios específicos?`,
        
        servicios: `Ofrecemos varios servicios especializados:\n\n• ${advancedKnowledgeBase.servicios.residencial.titulo}: ${advancedKnowledgeBase.servicios.residencial.descripcion}\n\n• ${advancedKnowledgeBase.servicios.comercial.titulo}: ${advancedKnowledgeBase.servicios.comercial.descripcion}\n\n• ${advancedKnowledgeBase.servicios.interiores.titulo}: ${advancedKnowledgeBase.servicios.interiores.descripcion}\n\n• ${advancedKnowledgeBase.servicios.consultorias.titulo}: ${advancedKnowledgeBase.servicios.consultorias.descripcion}\n\n¿Cuál de estos servicios te interesa más?`,
        
        residencial: `Nuestro servicio de ${advancedKnowledgeBase.servicios.residencial.titulo} incluye:\n\n${advancedKnowledgeBase.servicios.residencial.descripcion}\n\nCaracterísticas principales:\n• ${advancedKnowledgeBase.servicios.residencial.caracteristicas.join('\n• ')}\n\n¿Tienes algún proyecto residencial específico en mente?`,
        
        comercial: `Nuestro servicio de ${advancedKnowledgeBase.servicios.comercial.titulo} incluye:\n\n${advancedKnowledgeBase.servicios.comercial.descripcion}\n\nCaracterísticas principales:\n• ${advancedKnowledgeBase.servicios.comercial.caracteristicas.join('\n• ')}\n\n¿Qué tipo de espacio comercial necesitas diseñar?`,
        
        interiores: advancedAI.getInteriorResponse(message),
        
        consultorias: `Nuestro servicio de ${advancedKnowledgeBase.servicios.consultorias.titulo} incluye:\n\n${advancedKnowledgeBase.servicios.consultorias.descripcion}\n\nCaracterísticas principales:\n• ${advancedKnowledgeBase.servicios.consultorias.caracteristicas.join('\n• ')}\n\n¿En qué aspecto técnico necesitas asesoramiento?`,
        
        presupuesto: `Entiendo que te interesa conocer nuestros precios. Los costos varían según el tipo de proyecto y su complejidad. ¿Podrías contarme más sobre tu proyecto específico para darte una estimación más precisa?`,
        
        tiempo: `Los tiempos de desarrollo dependen del tipo de proyecto. ¿Qué tipo de proyecto tienes en mente? Esto me ayudará a darte una estimación más precisa de los plazos.`,
        
        proyecto: `Excelente, me interesa conocer más sobre tu proyecto. ¿Podrías contarme qué tipo de proyecto tienes en mente y qué aspectos te gustaría desarrollar?`,
        
        general: `Hola! Soy el asistente de Arquimec. Puedo ayudarte con información sobre nuestros servicios de arquitectura, diseño de interiores, consultorías técnicas y más. ¿En qué puedo ayudarte específicamente?`
      };

      return responses[intent as keyof typeof responses] || responses.general;
    },

    // Respuesta específica para diseño de interiores con contexto
    getInteriorResponse: (message: string) => {
      const interiorVariations = [
        `¡Perfecto! Nuestro servicio de ${advancedKnowledgeBase.servicios.interiores.titulo} está diseñado para transformar cualquier espacio. ${advancedKnowledgeBase.servicios.interiores.descripcion}\n\nCaracterísticas principales:\n• ${advancedKnowledgeBase.servicios.interiores.caracteristicas.join('\n• ')}\n\n¿Qué tipo de ambiente interior te gustaría transformar?`,
        
        `Excelente elección! En ${advancedKnowledgeBase.empresa.nombre} nos especializamos en ${advancedKnowledgeBase.servicios.interiores.titulo}. ${advancedKnowledgeBase.servicios.interiores.descripcion}\n\nNuestro enfoque incluye:\n• ${advancedKnowledgeBase.servicios.interiores.caracteristicas.join('\n• ')}\n\n¿Podrías contarme más sobre el espacio que quieres rediseñar?`,
        
        `¡Genial! El ${advancedKnowledgeBase.servicios.interiores.titulo} es una de nuestras especialidades. ${advancedKnowledgeBase.servicios.interiores.descripcion}\n\nLo que ofrecemos:\n• ${advancedKnowledgeBase.servicios.interiores.caracteristicas.join('\n• ')}\n\n¿Qué tipo de proyecto tienes en mente?`
      ];
      
      return interiorVariations[Math.floor(Math.random() * interiorVariations.length)];
    },

    // Respuestas para etapa de exploración
    getExploringResponse: (intent: string, message: string, context: typeof conversationContext) => {
      // Detectar información específica del mensaje
      const hasAge = message.match(/(\d+)\s*años?/);
      const hasDimensions = message.match(/(\d+)\s*metros?/);
      const hasIdeas = message.includes('ideas') || message.includes('sugerencias') || message.includes('recomendaciones');
      
      // Respuestas específicas para diseño de interiores
      if (intent === 'interiores' || context.lastIntent === 'interiores') {
        if (hasAge && hasDimensions) {
          const age = hasAge[1];
          const dimensions = hasDimensions[1];
          return advancedAI.getSeniorFriendlyResponse(age, dimensions);
        } else if (hasIdeas) {
          return advancedAI.getIdeasResponse(message);
        } else if (hasAge) {
          return advancedAI.getAgeSpecificResponse(hasAge[1]);
        } else if (hasDimensions) {
          return advancedAI.getDimensionSpecificResponse(hasDimensions[1]);
        }
      }
      
      // Lógica avanzada para mantener conversación coherente
      if (intent === 'proyecto' && context.userProfile.projectType) {
        return `Perfecto, veo que estás interesado en ${context.userProfile.projectType}. ¿Podrías contarme más detalles sobre las dimensiones, ubicación y tus necesidades específicas?`;
      }
      
      if (intent === 'presupuesto') {
        return `Para darte un presupuesto preciso, necesito conocer más detalles: ¿Qué tipo de proyecto es? ¿Cuáles son las dimensiones aproximadas? ¿Tienes alguna preferencia de materiales o estilo?`;
      }
      
      return `Entiendo, cuéntame más detalles sobre tu proyecto. ¿Qué aspectos específicos te gustaría desarrollar?`;
    },

    // Respuesta específica para personas mayores
    getSeniorFriendlyResponse: (age: string, dimensions: string) => {
      const seniorResponses = [
        `¡Excelente! Para una persona de ${age} años en un espacio de ${dimensions} metros, tenemos consideraciones especiales:\n\n🎯 **Accesibilidad y Seguridad:**\n• Iluminación natural y artificial optimizada\n• Suelos antideslizantes\n• Muebles con bordes redondeados\n• Pasillos amplios para movilidad\n\n🎨 **Diseño Funcional:**\n• Colores suaves y relajantes\n• Muebles ergonómicos\n• Organización intuitiva\n• Espacios multifuncionales\n\n¿Te gustaría que profundice en algún aspecto específico?`,
        
        `Perfecto, entiendo que es para una persona de ${age} años en ${dimensions} metros. Nuestro enfoque especializado incluye:\n\n🏠 **Adaptaciones Específicas:**\n• Contraste de colores para mejor visibilidad\n• Muebles de altura cómoda\n• Sistemas de iluminación graduales\n• Elementos de apoyo y agarraderas\n\n💡 **Ideas Creativas:**\n• Zonas de descanso estratégicas\n• Almacenamiento accesible\n• Espacios de socialización\n• Integración de tecnología asistiva\n\n¿Qué tipo de actividades realiza principalmente en este espacio?`
      ];
      
      return seniorResponses[Math.floor(Math.random() * seniorResponses.length)];
    },

    // Respuesta específica para solicitud de ideas
    getIdeasResponse: (message: string) => {
      const ideasResponses = [
        `¡Por supuesto! Te doy algunas ideas creativas para tu proyecto:\n\n💡 **Ideas de Diseño:**\n• **Iluminación inteligente**: Luces LED regulables para diferentes momentos del día\n• **Colores terapéuticos**: Paletas suaves que promueven bienestar\n• **Muebles modulares**: Que se adapten a diferentes necesidades\n• **Espacios verdes**: Plantas que purifiquen el aire\n\n🎨 **Elementos Especiales:**\n• Paredes con texturas táctiles\n• Espejos estratégicos para ampliar visualmente\n• Almacenamiento oculto y funcional\n• Superficies fáciles de limpiar\n\n¿Alguna de estas ideas te interesa más?`,
        
        `¡Genial! Aquí tienes ideas innovadoras para tu espacio:\n\n🚀 **Conceptos Modernos:**\n• **Minimalismo funcional**: Menos es más, pero inteligente\n• **Tecnología integrada**: Sistemas domóticos discretos\n• **Materiales sostenibles**: Opciones eco-friendly y duraderas\n• **Flexibilidad espacial**: Muebles que se transforman\n\n✨ **Detalles Únicos:**\n• Acabados con texturas interesantes\n• Iluminación que cambia según la hora\n• Elementos decorativos con historia personal\n• Espacios de meditación o relajación\n\n¿Te gustaría que desarrollemos alguna de estas ideas en detalle?`
      ];
      
      return ideasResponses[Math.floor(Math.random() * ideasResponses.length)];
    },

    // Respuesta específica por edad
    getAgeSpecificResponse: (age: string) => {
      const ageNum = parseInt(age);
      if (ageNum >= 80) {
        return `Para una persona de ${age} años, nuestro enfoque se centra en:\n\n🛡️ **Seguridad y Comodidad:**\n• Eliminación de barreras arquitectónicas\n• Iluminación uniforme sin deslumbramientos\n• Muebles estables y de fácil acceso\n• Colores de alto contraste\n\n¿Hay alguna condición específica de movilidad que debamos considerar?`;
      } else if (ageNum >= 60) {
        return `Para una persona de ${age} años, consideramos:\n\n🎯 **Diseño Adaptativo:**\n• Ergonomía en cada elemento\n• Iluminación natural y artificial balanceada\n• Espacios que envejecen bien\n• Tecnología de asistencia integrada\n\n¿Qué tipo de actividades realiza diariamente en este espacio?`;
      } else {
        return `Para una persona de ${age} años, podemos crear un espacio que:\n\n✨ **Se adapte a su estilo de vida:**\n• Refleje su personalidad\n• Sea funcional para sus necesidades\n• Permita crecimiento y cambios\n• Integre sus preferencias estéticas\n\n¿Podrías contarme más sobre sus gustos y necesidades?`;
      }
    },

    // Respuesta específica por dimensiones
    getDimensionSpecificResponse: (dimensions: string) => {
      const dimNum = parseInt(dimensions);
      if (dimNum <= 3) {
        return `Para un espacio de ${dimensions} metros, la clave está en:\n\n🔑 **Maximizar cada centímetro:**\n• Muebles multifuncionales\n• Almacenamiento vertical\n• Espejos para ampliar visualmente\n• Iluminación estratégica\n\n💡 **Ideas específicas:**\n• Camas con cajones debajo\n• Mesas plegables\n• Estanterías hasta el techo\n• Colores claros para amplitud\n\n¿Qué tipo de actividades necesita realizar en este espacio?`;
      } else if (dimNum <= 6) {
        return `Con ${dimensions} metros tenemos más flexibilidad para:\n\n🎨 **Zonificación inteligente:**\n• Separar áreas por función\n• Crear flujos de circulación\n• Integrar espacios de almacenamiento\n• Diseñar áreas de descanso\n\n✨ **Oportunidades de diseño:**\n• Muebles que definan espacios\n• Iluminación por zonas\n• Colores que creen ambientes\n• Elementos decorativos estratégicos\n\n¿Cómo te gustaría distribuir las diferentes áreas?`;
      } else {
        return `Con ${dimensions} metros tenemos un excelente espacio para:\n\n🏠 **Diseño completo:**\n• Múltiples zonas funcionales\n• Espacios de circulación amplios\n• Almacenamiento generoso\n• Áreas de socialización\n\n🎯 **Posibilidades:**\n• Salón-comedor integrado\n• Dormitorio con vestidor\n• Cocina funcional\n• Área de trabajo o estudio\n\n¿Qué distribución te parece más interesante para tu proyecto?`;
      }
    },

    // Respuestas para etapa detallada
    getDetailedResponse: (intent: string, message: string, context: typeof conversationContext) => {
      return `Excelente, con esa información puedo ayudarte mejor. ¿Hay algún aspecto específico en el que te gustaría que profundicemos?`;
    },

    // Respuestas para etapa de cierre
    getClosingResponse: (intent: string, message: string, context: typeof conversationContext) => {
      if (intent === 'especialista') {
        return `¡Perfecto! Te voy a mostrar nuestros especialistas disponibles para tu proyecto. ¿Qué tipo de especialista necesitas?`;
      }
      return `Perfecto, creo que tengo toda la información necesaria. ¿Te gustaría que te conecte con un especialista para continuar con tu proyecto?`;
    },

    // Obtener especialistas según el contexto
    getSpecialistsByContext: (context: typeof conversationContext) => {
      const specialists = [];
      
      // Agregar especialistas según el contexto de la conversación
      if (context.lastIntent === 'interiores' || context.selectedOption === '4') {
        specialists.push(...specialistsDatabase.interiores);
      }
      if (context.lastIntent === 'residencial' || context.selectedOption === '1') {
        specialists.push(specialistsDatabase.arquitectos[0]); // María González
      }
      if (context.lastIntent === 'comercial' || context.selectedOption === '1') {
        specialists.push(specialistsDatabase.arquitectos[1]); // Carlos Rodríguez
      }
      if (context.lastIntent === 'consultorias' || context.selectedOption === '3') {
        specialists.push(specialistsDatabase.consultores[0]); // Patricia López
      }
      
      // Si no hay contexto específico, mostrar todos
      if (specialists.length === 0) {
        specialists.push(...specialistsDatabase.arquitectos, ...specialistsDatabase.interiores, ...specialistsDatabase.consultores);
      }
      
      return specialists;
    }
  };

  // Sistema de IA para generar respuestas inteligentes (versión mejorada)
  const generateAIResponse = (userMessage: string, context: typeof conversationContext) => {
    const message = userMessage.toLowerCase();
    
    // Análisis semántico avanzado
    const analysis = advancedAI.analyzeIntent(message, context);
    
    // Actualizar contexto de conversación
    setConversationContext(prev => ({
      ...prev,
      lastIntent: analysis.intent,
      conversationFlow: [...prev.conversationFlow, {
        type: 'question',
        content: userMessage,
        timestamp: new Date()
      }]
    }));

    // Generar respuesta contextual
    const response = advancedAI.generateContextualResponse(message, context, analysis);
    
    // Actualizar flujo de conversación
    setConversationContext(prev => ({
      ...prev,
      conversationFlow: [...prev.conversationFlow, {
        type: 'answer',
        content: response,
        timestamp: new Date()
      }]
    }));

    return response;
  };

  // Manejar envío de mensaje del usuario
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput.trim();

    // Agregar mensaje del usuario
    addMessage(userMessage, true);
    
    // Verificar si el usuario quiere contactar con un especialista
    if (userMessage.toLowerCase().includes('especialista') || 
        userMessage.toLowerCase().includes('contactar') || 
        userMessage.toLowerCase().includes('hablar con') ||
        userMessage.toLowerCase().includes('conectar') ||
        userMessage.toLowerCase().includes('experto') ||
        userMessage.toLowerCase().includes('profesional')) {
      setCurrentStep('specialists');
      setUserInput('');
      return;
    }
    
    // Simular typing
    setIsTyping(true);
    
    // Generar respuesta de IA
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage, conversationContext);
      addMessage(aiResponse, false);
      setIsTyping(false);
      setUserInput('');
    }, 1500 + Math.random() * 1000); // Simular tiempo de procesamiento
  };

  const handleChatbotClick = () => {
    setShowChatbot(true);
    setIsExpanded(false);
    setCurrentStep('initial');
    setMessages([]);
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
    setCurrentStep('initial');
    setMessages([]);
    setFormData({ name: '', email: '' });
    setSelectedSpecialist(null);
  };

  // Manejar selección de especialista
  const handleSpecialistSelect = (specialist: any) => {
    setSelectedSpecialist(specialist);
    addMessage(`Has seleccionado a ${specialist.name}. Aquí tienes su información de contacto:`, false);
  };

  // Obtener especialistas según el contexto
  const getAvailableSpecialists = () => {
    return advancedAI.getSpecialistsByContext(conversationContext);
  };

  const handleStartChat = () => {
    setCurrentStep('form');
    addMessage("¡Perfecto! Para iniciar una consulta, necesito algunos datos básicos:");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setCurrentStep('options');
      addMessage(`Gracias ${formData.name}! Ahora, ¿en qué puedo ayudarte?`);
    }
  };

  const handleOptionSelect = (option: string) => {
    addMessage(option, true);
    
    // Actualizar contexto con la opción seleccionada
    setConversationContext(prev => ({
      ...prev,
      selectedOption: option,
      currentTopic: option
    }));
    
    const responses = {
      "¿Contratación de servicios?": "Te ayudo con información sobre nuestros servicios de arquitectura. ¿Te interesa algún servicio específico como diseño residencial, comercial o consultorías?",
      "Atención al cliente": "Estoy aquí para ayudarte. ¿Hay algún problema o consulta que tengas con nuestros servicios?",
      "Charla técnica": "Perfecto, podemos hablar sobre aspectos técnicos de tu proyecto. ¿Qué tema específico te interesa?",
      "Otro": "Cuéntame más sobre lo que necesitas y te ayudo en lo que pueda."
    };

    setTimeout(() => {
      addMessage(responses[option as keyof typeof responses] || "¿Cómo puedo ayudarte con eso?");
      // Agregar opciones de continuación después de la respuesta
      setTimeout(() => {
        addMessage("¿Te gustaría continuar la conversación, terminar el chat, o que te envíe un resumen por WhatsApp para hablar con un especialista?", false);
      }, 500);
    }, 1000);
    
    setCurrentStep('chat');
  };

  // Manejar opciones de continuación del chat
  const handleConversationAction = (action: 'continue' | 'end' | 'whatsapp') => {
    switch (action) {
      case 'continue':
        addMessage("Perfecto, continuemos. ¿Qué más te gustaría saber?", false);
        break;
      case 'end':
        addMessage("Ha sido un placer ayudarte. ¡Que tengas un excelente día!", false);
        setTimeout(() => {
          handleCloseChatbot();
        }, 2000);
        break;
      case 'whatsapp':
        const conversationSummary = `🏗️ *Consulta Arquimec - ${formData.name}*\n\n` +
          `📧 Email: ${formData.email}\n` +
          `🎯 Consulta inicial: ${conversationContext.selectedOption}\n\n` +
          `💬 *Resumen de la conversación:*\n${conversationContext.conversationHistory.map((msg, index) => `${index + 1}. ${msg}`).join('\n')}\n\n` +
          `✅ Cliente interesado en continuar conversación por WhatsApp.\n` +
          `📞 Contacto directo: ${advancedKnowledgeBase.contacto.telefono}\n` +
          `🕒 Horarios: ${advancedKnowledgeBase.contacto.horarios}`;
        
        const encodedMessage = encodeURIComponent(conversationSummary);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        addMessage("Te he enviado un resumen completo de nuestra conversación por WhatsApp. Un especialista de Arquimec se pondrá en contacto contigo pronto.", false);
        break;
    }
  };

  return (
    <>
      {/* Burbuja principal de atención al cliente */}
      <AnimatePresence>
        {!showChatbot && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: showChatbot ? 0 : 1 
            }}
          >
            {/* Botón principal */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`group relative w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
                isChatbotAvailable
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                  : 'bg-gray-400 hover:bg-gray-500'
              }`}
              aria-label="Atención al cliente"
            >
              {/* Pulse animation solo si está disponible */}
              {isChatbotAvailable && (
                <motion.div
                  className="absolute inset-0 bg-blue-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
              
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Headphones 
                  size={28} 
                  className="relative z-10 text-white"
                />
              </motion.div>
            </motion.button>

            {/* Menú expandible */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="absolute bottom-20 right-0 flex flex-col space-y-3"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
              {/* WhatsApp */}
              <motion.button
                onClick={handleWhatsAppClick}
                disabled={!isWhatsAppAvailable}
                className={`group relative w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
                  isWhatsAppAvailable
                    ? 'bg-green-500 hover:bg-green-600 hover:scale-110' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                whileHover={isWhatsAppAvailable ? { scale: 1.1 } : {}}
                whileTap={isWhatsAppAvailable ? { scale: 0.95 } : {}}
                aria-label="Contactar por WhatsApp"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="white"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                
                {/* Tooltip */}
                <div className="absolute right-full mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  WhatsApp
                  {!isWhatsAppAvailable && (
                    <div className="flex items-center mt-1">
                      <Clock size={10} className="mr-1" />
                      <span>{getAvailabilityMessage()}</span>
                    </div>
                  )}
                </div>
              </motion.button>

              {/* Chatbot */}
              <motion.button
                onClick={handleChatbotClick}
                disabled={!isChatbotAvailable}
                className={`group relative w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
                  isChatbotAvailable
                    ? 'bg-blue-500 hover:bg-blue-600 hover:scale-110' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                whileHover={isChatbotAvailable ? { scale: 1.1 } : {}}
                whileTap={isChatbotAvailable ? { scale: 0.95 } : {}}
                aria-label="Abrir chat"
              >
                <MessageCircle size={20} className="text-white" />
                
                {/* Tooltip */}
                <div className="absolute right-full mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Chat
                  {!isChatbotAvailable && (
                    <div className="flex items-center mt-1">
                      <Clock size={10} className="mr-1" />
                      <span>{getAvailabilityMessage()}</span>
                    </div>
                  )}
                </div>
              </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Indicador de disponibilidad */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className={`w-3 h-3 rounded-full ${
                isChatbotAvailable ? 'bg-green-500' : 'bg-red-500'
              }`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseChatbot}
          >
            <motion.div
              className="bg-white rounded-t-2xl w-full max-w-md h-96 flex flex-col mr-4"
              initial={{ y: 400, x: 0 }}
              animate={{ y: 0, x: 0 }}
              exit={{ y: 400, x: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold">Arquimec Chat</span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    {getAvailabilityMessage()}
                  </div>
                </div>
                <button
                  onClick={handleCloseChatbot}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {currentStep === 'initial' && (
                  <div className="text-center">
                    <p className="text-gray-700 mb-4">¿Quieres iniciar una consulta?</p>
                    <button
                      onClick={handleStartChat}
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      ¡Sí!
                    </button>
                  </div>
                )}

                {currentStep === 'form' && (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Continuar
                    </button>
                  </form>
                )}

                {currentStep === 'options' && (
                  <div className="space-y-3">
                    <p className="text-gray-700 font-medium">En qué puedo ayudarte:</p>
                    {[
                      "¿Contratación de servicios?",
                      "Atención al cliente", 
                      "Charla técnica",
                      "Otro"
                    ].map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {index + 1}. {option}
                      </button>
                    ))}
                  </div>
                )}

                {currentStep === 'specialists' && (
                  <div className="space-y-3">
                    <p className="text-gray-700 font-medium">Selecciona un especialista:</p>
                    {getAvailableSpecialists().map((specialist, index) => (
                      <button
                        key={specialist.id}
                        onClick={() => handleSpecialistSelect(specialist)}
                        className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border"
                      >
                        <div className="font-semibold text-gray-800">{specialist.name}</div>
                        <div className="text-sm text-gray-600">{specialist.title}</div>
                        <div className="text-xs text-gray-500">{specialist.specialty}</div>
                      </button>
                    ))}
                  </div>
                )}

                {selectedSpecialist && (
                  <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-800 mb-2">{selectedSpecialist.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{selectedSpecialist.title}</p>
                      <p className="text-xs text-gray-500 mb-3">{selectedSpecialist.specialty}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 w-20">Experiencia:</span>
                        <span className="text-gray-600">{selectedSpecialist.experience}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 w-20">Proyectos:</span>
                        <span className="text-gray-600">{selectedSpecialist.projects}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 w-20">Horarios:</span>
                        <span className="text-gray-600">{selectedSpecialist.availability}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 w-20">Idiomas:</span>
                        <span className="text-gray-600">{selectedSpecialist.languages.join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-blue-200">
                      <p className="text-sm text-gray-700 mb-3">{selectedSpecialist.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-700">📞 Teléfono:</span>
                          <a 
                            href={`tel:${selectedSpecialist.phone}`}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            {selectedSpecialist.phone}
                          </a>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-700">📧 Email:</span>
                          <a 
                            href={`mailto:${selectedSpecialist.email}`}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            {selectedSpecialist.email}
                          </a>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => window.open(`tel:${selectedSpecialist.phone}`, '_self')}
                          className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                        >
                          📞 Llamar
                        </button>
                        <button
                          onClick={() => window.open(`mailto:${selectedSpecialist.email}`, '_self')}
                          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          📧 Email
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 'chat' && (
                  <div className="space-y-3">
                    {/* Mensajes de la conversación */}
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs p-3 rounded-lg ${
                              message.isUser
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {message.text}
                          </div>
                        </div>
                      ))}
                      
                      {/* Indicador de typing */}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Input del usuario */}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Escribe tu mensaje..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        disabled={isTyping}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!userInput.trim() || isTyping}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                      >
                        <Send size={16} />
                      </button>
                    </div>

                    {/* Opciones de continuación */}
                    {messages.length > 2 && !isTyping && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 text-center">¿Qué te gustaría hacer?</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleConversationAction('continue')}
                            className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                          >
                            Continuar Chat
                          </button>
                          <button
                            onClick={() => handleConversationAction('whatsapp')}
                            className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Enviar WhatsApp
                          </button>
                          <button
                            onClick={() => handleConversationAction('end')}
                            className="flex-1 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                          >
                            Terminar
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {!isWhatsAppAvailable && (
                      <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800 mb-2">
                          WhatsApp fuera de horario
                        </p>
                        <button
                          onClick={handleWhatsAppClick}
                          className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                        >
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="white"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                          </svg>
                          <span>Contactar por WhatsApp</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomerServiceBubble;
