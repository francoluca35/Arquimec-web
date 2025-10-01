import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import chatbotResponses from '../data/chatbotResponses.json';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isAI?: boolean;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: '¡Hola! Soy el asistente de Arquimec. ¿En qué puedo ayudarte hoy?',
        isUser: false,
        timestamp: new Date(),
        isAI: false
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Function to find matching response from JSON
  const findMatchingResponse = (userMessage: string): string | null => {
    const message = userMessage.toLowerCase();
    
    // Check greetings
    if (chatbotResponses.greetings.patterns.some(pattern => message.includes(pattern))) {
      return chatbotResponses.greetings.responses[Math.floor(Math.random() * chatbotResponses.greetings.responses.length)];
    }

    // Check services
    for (const [serviceKey, serviceData] of Object.entries(chatbotResponses.services)) {
      if (serviceData.patterns.some(pattern => message.includes(pattern))) {
        return serviceData.responses[Math.floor(Math.random() * serviceData.responses.length)];
      }
    }

    // Check company info
    if (chatbotResponses.company_info.patterns.some(pattern => message.includes(pattern))) {
      return chatbotResponses.company_info.responses[Math.floor(Math.random() * chatbotResponses.company_info.responses.length)];
    }

    // Check contact
    if (chatbotResponses.contact.patterns.some(pattern => message.includes(pattern))) {
      return chatbotResponses.contact.responses[Math.floor(Math.random() * chatbotResponses.contact.responses.length)];
    }

    // Check pricing
    if (chatbotResponses.pricing.patterns.some(pattern => message.includes(pattern))) {
      return chatbotResponses.pricing.responses[Math.floor(Math.random() * chatbotResponses.pricing.responses.length)];
    }

    // Enhanced pattern matching for complex queries
    const complexPatterns = {
      'interior_especifico': ['diseño de interior', 'interior', 'decoración', 'ambiente', 'muebles'],
      'arquitectura_especifica': ['casa', 'hogar', 'vivienda', 'oficina', 'comercial'],
      'construccion_edificios': ['construcción', 'edificio', 'edificios', 'construir', 'obra', 'construcción de edificios'],
      'consultoria_especifica': ['consultoría', 'técnico', 'asesoramiento', 'normativa', 'permisos'],
      'presupuesto_especifico': ['presupuesto', 'precio', 'costo', 'tarifa', 'valor', 'cuanto cuesta']
    };

    for (const [key, patterns] of Object.entries(complexPatterns)) {
      if (patterns.some(pattern => message.includes(pattern))) {
        return getEnhancedResponse(key, message);
      }
    }

    return null;
  };

  // Enhanced response function for complex queries
  const getEnhancedResponse = (patternType: string, message: string): string => {
    const responses = {
      'interior_especifico': [
        'Nuestro servicio de Diseño de Interiores incluye la transformación completa de espacios. ¿Podrías contarme más detalles sobre el tipo de ambiente que quieres rediseñar?',
        'En Arquimec nos especializamos en crear interiores únicos y funcionales. ¿Qué tipo de espacio quieres transformar?',
        'Nuestros diseñadores de interiores tienen experiencia en crear ambientes que reflejan la personalidad de nuestros clientes. ¿Podrías contarme más sobre tu proyecto?'
      ],
      'arquitectura_especifica': [
        'Nuestro servicio de Arquitectura incluye diseño de viviendas y espacios comerciales. ¿Qué tipo de proyecto tienes en mente?',
        'En Arquimec diseñamos espacios que combinan funcionalidad y estética. ¿Podrías contarme más sobre tu proyecto arquitectónico?',
        'Nuestros arquitectos tienen amplia experiencia en diferentes tipos de proyectos. ¿Qué tipo de espacio necesitas diseñar?'
      ],
      'consultoria_especifica': [
        'Nuestro servicio de Consultorías Técnicas incluye asesoramiento especializado. ¿En qué aspecto técnico necesitas ayuda?',
        'Nuestros consultores técnicos tienen experiencia en normativas y reglamentaciones. ¿Podrías contarme más sobre tu consulta?',
        'En Arquimec ofrecemos consultorías especializadas. ¿Qué tipo de asesoramiento necesitas?'
      ],
      'presupuesto_especifico': [
        'Para darte un presupuesto preciso, necesito conocer más detalles sobre tu proyecto. ¿Podrías contarme qué tipo de proyecto tienes en mente?',
        'Los costos varían según el tipo de proyecto y su complejidad. ¿Te gustaría que te conecte con un especialista para una cotización personalizada?',
        'Para una estimación precisa, necesito más información sobre tu proyecto. ¿Podrías contarme más detalles?'
      ]
    };

    const responseArray = responses[patternType as keyof typeof responses];
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  // Smart fallback response function
  const getSmartFallbackResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check for specific keywords and provide contextual responses
    if (message.includes('proyecto') || message.includes('obra') || message.includes('construcción')) {
      return 'Entiendo que tienes un proyecto en mente. Para darte la mejor asesoría, te recomiendo contactar con nuestros especialistas. Puedes llamarnos al +54 11 1234-5678 o escribirnos por WhatsApp.';
    }
    
    if (message.includes('tiempo') || message.includes('plazo') || message.includes('cuando')) {
      return 'Los tiempos de desarrollo dependen del tipo de proyecto. Para darte una estimación precisa, te sugiero contactar con nuestros especialistas. ¿Te gustaría que te conecte con ellos?';
    }
    
    if (message.includes('material') || message.includes('estilo') || message.includes('diseño')) {
      return 'Excelente consulta sobre materiales y estilos. Nuestros especialistas pueden ayudarte a elegir las mejores opciones para tu proyecto. ¿Te gustaría que te conecte con un diseñador?';
    }
    
    if (message.includes('permiso') || message.includes('tramite') || message.includes('normativa')) {
      return 'Para consultas sobre permisos y normativas, te recomiendo contactar con nuestra consultora técnica Patricia López. ¿Te gustaría que te conecte con ella?';
    }
    
    // Default smart response
    const smartResponses = [
      'Entiendo tu consulta. Para darte la mejor respuesta posible, te recomiendo contactar directamente con nuestros especialistas. Puedes llamarnos al +54 11 1234-5678 o escribirnos por WhatsApp.',
      'Excelente pregunta. Nuestros especialistas pueden ayudarte mejor con esa consulta específica. ¿Te gustaría que te conecte con ellos?',
      'Para consultas como la tuya, es mejor que hables directamente con uno de nuestros especialistas. ¿Te interesa que te conecte con ellos?',
      'Esa es una consulta muy específica. Nuestros especialistas tienen la experiencia necesaria para ayudarte. ¿Te gustaría que te conecte con ellos?'
    ];
    
    return smartResponses[Math.floor(Math.random() * smartResponses.length)];
  };

  // Function to call OpenAI API
  const callOpenAI = async (userMessage: string, conversationHistory: Message[]): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: conversationHistory.slice(-10), // Last 10 messages for context
          companyContext: `
            Arquimec es un estudio de arquitectura especializado en:
            - Arquitectura Residencial: Viviendas unifamiliares y complejos residenciales
            - Arquitectura Comercial: Oficinas, retail, restaurantes
            - Diseño de Interiores: Transformación de espacios interiores
            - Consultorías Técnicas: Asesoramiento en normativas y permisos
            
            Ubicación: Buenos Aires y Córdoba, Argentina
            Experiencia: Más de 7,000 m² construidos y más de 2,000 clientes satisfechos
            Contacto: +54 11 1234-5678, info@arquimec.com
            Horarios: Lunes a Viernes 8:00-19:00, Sábado 9:00-16:00
          `
        }),
      });

      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        // Return a more helpful fallback response
        return `Entiendo tu consulta, pero para darte la mejor respuesta posible, te recomiendo contactar directamente con nuestros especialistas. Puedes llamarnos al +54 11 1234-5678 o escribirnos por WhatsApp.`;
      }

      const data = await response.json();
      return data.response || data.error || 'Lo siento, no pude procesar tu consulta. Te recomiendo contactar con nuestros especialistas.';
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      // Return a helpful fallback response
      return `Entiendo tu consulta, pero para darte la mejor respuesta posible, te recomiendo contactar directamente con nuestros especialistas. Puedes llamarnos al +54 11 1234-5678 o escribirnos por WhatsApp.`;
    }
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // First, try to find a matching response from JSON
      const jsonResponse = findMatchingResponse(userMessage);
      
      let aiResponse: string;
      
      if (jsonResponse) {
        // Use JSON response
        aiResponse = jsonResponse;
      } else {
        // Use enhanced fallback for complex queries
        aiResponse = getSmartFallbackResponse(userMessage);
      }

      // Add AI response
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        isAI: false // No longer using real AI, using smart responses
      };
      
      setMessages(prev => [...prev, aiMsg]);
      
    } catch (error) {
      console.error('Error processing message:', error);
      
      // Fallback response
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: chatbotResponses.fallback.responses[Math.floor(Math.random() * chatbotResponses.fallback.responses.length)],
        isUser: false,
        timestamp: new Date(),
        isAI: false
      };
      
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
                <span className="font-semibold">Arquimec AI Chat</span>
                <div className="flex items-center text-xs text-gray-500">
                  <Bot size={12} className="mr-1" />
                  Asistente Inteligente
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {!message.isUser && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot size={12} className="text-white" />
                      </div>
                    )}
                    {message.isUser && (
                      <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={12} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg ${
                        message.isUser
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="text-sm">{message.text}</div>
                      {message.isAI && (
                        <div className="text-xs opacity-70 mt-1">🤖 Respuesta con IA</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Bot size={12} className="text-white" />
                    </div>
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading indicator for AI */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Bot size={12} className="text-white" />
                    </div>
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                      <div className="text-sm">🤖 Consultando con IA...</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatbot;
