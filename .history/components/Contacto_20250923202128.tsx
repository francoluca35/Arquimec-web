import { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "./ui/button";

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData);
    alert("¡Mensaje enviado correctamente!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contacto" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contacto
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente? Estamos aquí para ayudarte a hacerlo realidad. 
            Contáctanos y comencemos a diseñar tu próximo espacio.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Información de Contacto
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Teléfono</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">info@arquimec.com</p>
                  <p className="text-gray-600">proyectos@arquimec.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Dirección</h4>
                  <p className="text-gray-600">
                    Av. Principal 123, Centro<br />
                    Ciudad, País 12345
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-600 text-white rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Horarios de Atención</h4>
              <p className="text-blue-100">
                Lunes - Viernes: 9:00 AM - 6:00 PM<br />
                Sábados: 10:00 AM - 2:00 PM<br />
                Domingos: Cerrado
              </p>
            </div>
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Envíanos un Mensaje
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensaje
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
