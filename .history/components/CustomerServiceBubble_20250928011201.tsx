import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Phone, Headphones, X, Clock, Send } from "lucide-react";

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
  const [messages, setMessages] = useState<Array<{id: string, text: string, isUser: boolean}>>([]);
  const [currentStep, setCurrentStep] = useState<'initial' | 'form' | 'options' | 'chat'>('initial');
  const [formData, setFormData] = useState({ name: '', email: '' });

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
      return "Cerrado los domingos";
    }
    
    if (day >= 1 && day <= 5) { // Lunes a Viernes
      return "L-V: 8:00-19:00";
    }
    
    if (day === 6) { // Sábado
      return "S: 9:00-16:00";
    }
    
    return "Fuera de horario";
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
      isUser
    };
    setMessages(prev => [...prev, message]);
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
    
    const responses = {
      "¿Contratación de servicios?": "Te ayudo con información sobre nuestros servicios de arquitectura. ¿Te interesa algún servicio específico como diseño residencial, comercial o consultorías?",
      "Atención al cliente": "Estoy aquí para ayudarte. ¿Hay algún problema o consulta que tengas con nuestros servicios?",
      "Charla técnica": "Perfecto, podemos hablar sobre aspectos técnicos de tu proyecto. ¿Qué tema específico te interesa?",
      "Otro": "Cuéntame más sobre lo que necesitas y te ayudo en lo que pueda."
    };

    setTimeout(() => {
      addMessage(responses[option as keyof typeof responses] || "¿Cómo puedo ayudarte con eso?");
    }, 1000);
    
    setCurrentStep('chat');
  };

  return (
    <>
      {/* Burbuja principal de atención al cliente */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 1 
        }}
      >
        {/* Botón principal */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`group relative w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
            isWhatsAppAvailable || isChatbotAvailable
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
              : 'bg-gray-400 hover:bg-gray-500'
          }`}
          aria-label="Atención al cliente"
        >
          {/* Pulse animation solo si está disponible */}
          {(isWhatsAppAvailable || isChatbotAvailable) && (
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
                <Phone size={20} className="text-white" />
                
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
            isWhatsAppAvailable || isChatbotAvailable ? 'bg-green-500' : 'bg-red-500'
          }`} />
        </div>
      </motion.div>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseChatbot}
          >
            <motion.div
              className="bg-white rounded-t-2xl w-full max-w-md h-96 flex flex-col"
              initial={{ y: 400 }}
              animate={{ y: 0 }}
              exit={{ y: 400 }}
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

                {currentStep === 'chat' && (
                  <div className="space-y-3">
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
                    
                    {!isChatbotAvailable && (
                      <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800 mb-2">
                          Fuera de horario de atención
                        </p>
                        <button
                          onClick={handleWhatsAppClick}
                          className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                        >
                          <Phone size={16} />
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
