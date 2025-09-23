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
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Título principal */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Hablemos de tu proyecto
          </h2>
        </motion.div>

        {/* Grid 50/50: Formulario + Mapa */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Formulario de contacto - Lado izquierdo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NOMBRE */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                  NOMBRE
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-lg"
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* CORREO ELECTRÓNICO */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                  CORREO ELECTRÓNICO
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                  placeholder="tu@email.com"
                />
              </div>

              {/* TELÉFONO (OPCIONAL) */}
              <div>
                <label htmlFor="telefono" className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                  TELÉFONO (OPCIONAL)
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* MENSAJE */}
              <div>
                <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                  MENSAJE
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>

              {/* reCAPTCHA placeholder */}
              <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <input
                  type="checkbox"
                  id="recaptcha"
                  className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                />
                <label htmlFor="recaptcha" className="text-sm text-gray-700">
                  No soy un robot
                </label>
                <div className="ml-auto flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500">reCAPTCHA</span>
                </div>
              </div>

              {/* Botón ENVIAR */}
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                ENVIAR
              </Button>
            </form>
          </motion.div>

          {/* Mapa - Lado derecho */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016713276848!2d-58.381592!3d-34.603722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf9a8e6e1b%3A0x3b8f92c4b5a5b5b5!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1ses!2sar!4v1647892345678!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>

            {/* Información de contacto debajo del mapa */}
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-black mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Dirección</p>
                    <p className="text-gray-600">Av. Corrientes 1234, Buenos Aires, Argentina</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-black mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Teléfono</p>
                    <p className="text-gray-600">+54 11 1234-5678</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-black mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">contacto@arquimec.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Contacto;
