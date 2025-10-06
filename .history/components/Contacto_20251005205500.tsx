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
    <section id="contacto" className="py-20" style={{ backgroundColor: '#003049' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Título principal */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h6 className="text-sm md:text-sm uppercase font-architectural-subtitle font-bold text-white/80 mb-6 tracking-wider">
            Contacto
          </h6>
          <h2 className="text-4xl md:text-5xl font-architectural-title font-bold text-white mb-6">
            Hablemos de tu proyecto
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Cuéntanos tu visión y trabajemos juntos para hacerla realidad
          </p>
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
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Grid de dos columnas para nombre y email */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* NOMBRE */}
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="block text-sm font-medium text-white/80 uppercase tracking-wider">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#AE1F23] focus:border-[#AE1F23] text-white placeholder-white/50 transition-all duration-300"
                      placeholder="Tu nombre"
                    />
                  </div>

                  {/* CORREO ELECTRÓNICO */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#AE1F23] focus:border-[#AE1F23] text-white placeholder-white/50 transition-all duration-300"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                {/* TELÉFONO */}
                <div className="space-y-2">
                  <label htmlFor="telefono" className="block text-sm font-medium text-white/80 uppercase tracking-wider">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#AE1F23] focus:border-[#AE1F23] text-white placeholder-white/50 transition-all duration-300"
                    placeholder="+54 11 1234-5678"
                  />
                </div>

                {/* MENSAJE */}
                <div className="space-y-2">
                  <label htmlFor="mensaje" className="block text-sm font-medium text-white/80 uppercase tracking-wider">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#AE1F23] focus:border-[#AE1F23] text-white placeholder-white/50 resize-none transition-all duration-300"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  />
                </div>

                {/* Botón ENVIAR */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#AE1F23] to-[#C1121F] hover:from-[#C1121F] hover:to-[#AE1F23] text-white py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5 inline mr-2" />
                  Enviar Mensaje
                </button>
              </form>
            </div>
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
                title="Mapa de ubicación de Arquimec en Buenos Aires, Argentina"
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
