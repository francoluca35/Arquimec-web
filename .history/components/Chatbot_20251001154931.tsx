import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Clock, Phone } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  phoneNumber?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ phoneNumber = "1234567890" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<'initial' | 'form' | 'options' | 'chat'>('initial');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isAvailable, setIsAvailable] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Verificar horarios de atención
  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour + minute / 60;

      let available = false;

      if (day >= 1 && day <= 5) { // Lunes a Viernes
        available = currentTime >= 8 && currentTime < 19;
      } else if (day === 6) { // Sábado
        available = currentTime >= 9 && currentTime < 16;
      }
      // Domingo (day === 0) siempre cerrado

      setIsAvailable(available);
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Verificar cada minuto
    return () => clearInterval(interval);
  }, []);

  const addMessage = (text: string, isUser: boolean = false) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
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

  const handleOptionSelect = async (option: string) => {
    addMessage(option, true);
    
    // Enviar la opción seleccionada al chatbot inteligente
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: option,
          history: messages,
          userInfo: {
            name: formData.name,
            email: formData.email
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTimeout(() => {
          addMessage(data.response);
        }, 1000);
      } else {
        setTimeout(() => {
          addMessage("Disculpa, hubo un problema técnico. ¿Podrías contactarnos directamente al +54 11 1234-5678? 😊");
        }, 1000);
      }
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      setTimeout(() => {
        addMessage("Disculpa, hubo un problema técnico. ¿Podrías contactarnos directamente al +54 11 1234-5678? 😊");
      }, 1000);
    }
    
    setCurrentStep('chat');
  };

  const handleWhatsAppRedirect = () => {
    const message = `Hola! Soy ${formData.name} (${formData.email}) y me gustaría consultar sobre sus servicios de arquitectura.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const getAvailabilityMessage = () => {
    if (isAvailable) {
      return "Estamos disponibles para atenderte";
    }
    
    const now = new Date();
    const day = now.getDay();
    
    if (day === 0) { // Domingo
      return "Cerrado los domingos. Atendemos L-V 8:00-19:00 y S 9:00-16:00";
    }
    
    if (day >= 1 && day <= 5) { // Lunes a Viernes
      return "Fuera de horario. Atendemos L-V 8:00-19:00 y S 9:00-16:00";
    }
    
    if (day === 6) { // Sábado
      return "Fuera de horario. Atendemos L-V 8:00-19:00 y S 9:00-16:00";
    }
    
    return "Fuera de horario de atención";
  };

  return (
    <>
      {/* Chatbot Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 1 
        }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className={`group relative w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
            isAvailable 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-gray-400 hover:bg-gray-500'
          }`}
          aria-label="Abrir chat de consultas"
        >
          {/* Pulse animation solo si está disponible */}
          {isAvailable && (
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
          
          <MessageCircle 
            size={28} 
            className="relative z-10 text-white"
          />
        </button>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
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
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
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
                    
                    {!isAvailable && (
                      <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800 mb-2">
                          Fuera de horario de atención
                        </p>
                        <button
                          onClick={handleWhatsAppRedirect}
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

export default Chatbot;
