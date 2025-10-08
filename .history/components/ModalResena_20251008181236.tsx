import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, CheckCircle } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

interface ModalResenaProps {
  isOpen: boolean;
  onClose: () => void;
  onResenaSent?: () => void;
}

const ModalResena: React.FC<ModalResenaProps> = ({ isOpen, onClose, onResenaSent }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    lugar: "",
    calidad: 0,
    mensaje: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      calidad: rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre.trim() || !formData.lugar.trim() || !formData.mensaje.trim()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await addDoc(collection(db, "Resenas"), {
        nombre: formData.nombre.trim(),
        email: formData.email.trim() || null,
        lugar: formData.lugar.trim(),
        calidad: formData.calidad,
        mensaje: formData.mensaje.trim(),
        fecha: serverTimestamp(),
        verificado: !!formData.email.trim()
      });

      setSubmitStatus("success");
      
      // Reset form
      setFormData({
        nombre: "",
        email: "",
        lugar: "",
        calidad: 0,
        mensaje: ""
      });

      // Recargar reseñas y cerrar modal
      if (onResenaSent) {
        onResenaSent();
      }
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitStatus("idle");
      }, 2000);

    } catch (error) {
      console.error("Error al enviar reseña:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isFilled = starNumber <= (hoveredStar || formData.calidad);
      
      return (
        <button
          key={index}
          type="button"
          onClick={() => handleStarClick(starNumber)}
          onMouseEnter={() => setHoveredStar(starNumber)}
          onMouseLeave={() => setHoveredStar(0)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            className={`w-8 h-8 ${
              isFilled ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        </button>
      );
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-light tracking-wider text-gray-900">
                  DEJA TU RESEÑA
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Nombre (obligatorio) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {/* Email (opcional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-gray-400">(opcional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                    placeholder="tu@email.com"
                  />
                  {formData.email && (
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Tu reseña aparecerá como verificada
                    </p>
                  )}
                </div>

                {/* Lugar/Empresa (obligatorio) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lugar o Empresa <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lugar"
                    value={formData.lugar}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                    placeholder="Nombre de tu empresa o lugar del proyecto"
                  />
                </div>

                {/* Calificación (obligatorio) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Calificación <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-2">
                    {renderStars()}
                  </div>
                  {formData.calidad > 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      {formData.calidad} de 5 estrellas
                    </p>
                  )}
                </div>

                {/* Mensaje (obligatorio) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors resize-none"
                    placeholder="Cuéntanos sobre tu experiencia con Arquimec..."
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <p className="text-green-800 font-medium">
                        ¡Reseña enviada exitosamente! Gracias por tu feedback.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-medium">
                      Error al enviar la reseña. Por favor, inténtalo de nuevo.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.nombre || !formData.lugar || !formData.mensaje || formData.calidad === 0}
                    className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      "Enviar Reseña"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalResena;
