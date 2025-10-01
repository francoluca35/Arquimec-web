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
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [showForm, setShowForm] = useState(true);

  // Verificar horarios de atención
  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour + minute / 60;

      let available = false;
      if (day >= 1 && day <= 5) {
        available = currentTime >= 8 && currentTime < 19;
      } else if (day === 6) {
        available = currentTime >= 9 && currentTime < 16;
      }

      setIsAvailable(available);
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000);
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

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    addMessage(messageText, true);
    setIsLoading(true);

    console.log('🔍 Sending message:', messageText);
    console.log('🔍 User info:', userInfo);
    console.log('🔍 Messages history:', messages);

    try {
      const requestBody = {
        message: messageText,
        history: messages,
        userInfo: {
          name: userInfo.name || "Usuario",
          email: userInfo.email || "usuario@ejemplo.com"
        }
      };

      console.log('🔍 Request body:', requestBody);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('🔍 Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('🔍 Response data:', data);
        setTimeout(() => {
          addMessage(data.response);
        }, 1000);
      } else {
        console.error('🔍 API Error:', response.status, response.statusText);
        setTimeout(() => {
          addMessage("Disculpa, hubo un problema técnico. ¿Podrías contactarnos directamente al +54 11 1234-5678? 😊");
        }, 1000);
      }
    } catch (error) {
      console.error('🔍 Error calling chatbot API:', error);
      setTimeout(() => {
        addMessage("Disculpa, hubo un problema técnico. ¿Podrías contactarnos directamente al +54 11 1234-5678? 😊");
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.name && userInfo.email) {
      setShowForm(false);
      addMessage(`¡Hola ${userInfo.name}! Soy ARQ-BOT, tu asistente virtual de Arquimec. ¿En qué puedo ayudarte hoy? 😊`);
    }
  };

  const handleUserMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim() || isLoading) return;

    const message = userMessage.trim();
    setUserMessage('');
    sendMessage(message);
  };

  const handleWhatsAppRedirect = () => {
    const message = `Hola! Soy ${userInfo.name || "Usuario"} (${userInfo.email || "usuario@ejemplo.com"}) y me gustaría consultar sobre sus servicios de arquitectura.`;
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
    
    if (day === 0) {
      return "Cerrado los domingos. Atendemos L-V 8:00-19:00 y S 9:00-16:00";
    }
    
    if (day >= 1 && day <= 5) {
      return "Fuera de horario. Atendemos L-V 8:00-19:00 y S 9:00-16:00";
    }
    
    if (day === 6) {
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
                  <span className="font-semibold">ARQ-BOT</span>
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

              {/* Form inicial */}
              {showForm && (
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold mb-4">¡Hola! 👋</h3>
                  <p className="text-gray-600 mb-4">Para iniciar una conversación, necesito algunos datos básicos:</p>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
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
                        value={userInfo.email}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      ¡Empezar conversación!
                    </button>
                  </form>
                </div>
              )}

              {/* Chat */}
              {!showForm && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
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

                  {/* Input field */}
                  <div className="border-t p-4">
                    <form onSubmit={handleUserMessage} className="flex space-x-2">
                      <input
                        type="text"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        disabled={isLoading}
                      />
                      <button
                        type="submit"
                        disabled={!userMessage.trim() || isLoading}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send size={16} />
                      </button>
                    </form>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
