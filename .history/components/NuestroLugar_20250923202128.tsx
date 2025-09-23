import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const NuestroLugar: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nuestro Lugar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce nuestro estudio y descubre el espacio donde nacen las ideas 
            que transforman la arquitectura.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Información del Estudio
              </h3>
              
              <div className="space-y-6">
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

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Teléfono</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@arquimec.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Horarios</h4>
                    <p className="text-gray-600">
                      Lunes - Viernes: 9:00 AM - 6:00 PM<br />
                      Sábados: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Mapa del Estudio</p>
                <p className="text-gray-400 text-sm mt-2">
                  Ubicación estratégica en el centro de la ciudad
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-blue-600 text-white p-8 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              ¿Quieres visitarnos?
            </h3>
            <p className="text-blue-100 mb-6">
              Agenda una cita para conocer nuestro estudio y discutir tu proyecto.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold">
              Agendar Visita
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NuestroLugar;
