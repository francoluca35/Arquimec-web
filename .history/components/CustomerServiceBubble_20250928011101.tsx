import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Phone, Headphones, X, Clock } from "lucide-react";
import WhatsAppFloat from "./WhatsAppFloat";
import Chatbot from "./Chatbot";

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

      setIsWhatsAppAvailable(available);
      setIsChatbotAvailable(available);
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

  const handleChatbotClick = () => {
    setShowChatbot(true);
    setIsExpanded(false);
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
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
              <div className="flex-1 overflow-y-auto p-4">
                <Chatbot phoneNumber={phoneNumber} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomerServiceBubble;
