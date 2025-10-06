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
          <h6 className="text-sm md:text-sm uppercase font-architectural-subtitle font-bold text-black mb-6">
            Contacto
          </h6>
          <h2 className="text-4xl md:text-5xl font-architectural-subtitle font-bold text-black mb-6">
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
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Grid de dos columnas para nombre y email */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* NOMBRE */}
                <div className="group">
                  <label htmlFor="nombre" className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-widest">
                    Nombre
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 border-0 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300 text-base"
                      placeholder="Tu nombre"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-focus-within:w-full"></div>
                  </div>
                </div>

                {/* CORREO ELECTRÓNICO */}
                <div className="group">
                  <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-widest">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 border-0 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300 text-base"
                      placeholder="tu@email.com"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-focus-within:w-full"></div>
                  </div>
                </div>
              </div>

              {/* TELÉFONO */}
              <div className="group">
                <label htmlFor="telefono" className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-widest">
                  Teléfono <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-0 py-3 border-0 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300 text-base"
                    placeholder="+54 11 1234-5678"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-focus-within:w-full"></div>
                </div>
              </div>

              {/* MENSAJE */}
              <div className="group">
                <label htmlFor="mensaje" className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-widest">
                  Mensaje
                </label>
                <div className="relative">
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-0 py-3 border-0 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300 text-base resize-none"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-focus-within:w-full"></div>
                </div>
              </div>

              {/* Botón ENVIAR */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="group relative w-full bg-black hover:bg-gray-800 text-white py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 border border-black hover:border-gray-800"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Enviar
                    <Send className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-black font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Enviar
                    <Send className="ml-2 w-4 h-4" />
                  </span>
                </Button>
              </div>
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
