import { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, Upload, X, FileText, Image, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      
      // Agregar datos del formulario
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('apellido', formData.apellido);
      formDataToSend.append('empresa', formData.empresa);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('telefono', formData.telefono);
      formDataToSend.append('mensaje', formData.mensaje);
      
      // Agregar archivo si existe
      if (selectedFile) {
        formDataToSend.append('archivo', selectedFile);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.');
        // Limpiar el formulario
        setFormData({
          nombre: "",
          apellido: "",
          empresa: "",
          email: "",
          telefono: "",
          mensaje: ""
        });
        setSelectedFile(null);
        setIsFileUploadOpen(false);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message || 'Error al enviar el mensaje. Inténtalo de nuevo.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus('error');
        setSubmitMessage('El archivo no puede superar los 5MB.');
        return;
      }

      // Validar tipo de archivo
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
      ];

      if (!allowedTypes.includes(file.type)) {
        setSubmitStatus('error');
        setSubmitMessage('Solo se permiten archivos PDF o imágenes (JPG, PNG, GIF, WEBP).');
        return;
      }

      setSelectedFile(file);
      setSubmitStatus('idle'); // Limpiar mensaje de error si había uno
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setIsFileUploadOpen(false);
  };

  const toggleFileUpload = () => {
    setIsFileUploadOpen(!isFileUploadOpen);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section id="contacto" className="py-20 bg-gray-50">
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
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Grid de dos columnas para nombre y apellido */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* NOMBRE */}
                <div className="group relative">
                  <div className="relative">
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-0 pt-6 pb-2 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 focus:outline-none transition-all duration-500 text-base peer"
                      placeholder=" "
                    />
                    <label 
                      htmlFor="nombre" 
                      className="absolute left-0 top-6 text-sm font-medium text-gray-500 uppercase tracking-widest transition-all duration-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:-translate-y-4 peer-focus:tracking-widest cursor-text"
                    >
                      Nombre
                    </label>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-500 peer-focus:w-full shadow-lg"></div>
                    <div className="absolute -bottom-1 left-0 w-full h-px bg-gray-100 peer-focus:bg-transparent transition-all duration-500"></div>
                  </div>
                </div>

                {/* APELLIDO */}
                <div className="group relative">
                  <div className="relative">
                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                      className="w-full px-0 pt-6 pb-2 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 focus:outline-none transition-all duration-500 text-base peer"
                      placeholder=" "
                    />
                    <label 
                      htmlFor="apellido" 
                      className="absolute left-0 top-6 text-sm font-medium text-gray-500 uppercase tracking-widest transition-all duration-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:-translate-y-4 peer-focus:tracking-widest cursor-text"
                    >
                      Apellido
                    </label>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-500 peer-focus:w-full shadow-lg"></div>
                    <div className="absolute -bottom-1 left-0 w-full h-px bg-gray-100 peer-focus:bg-transparent transition-all duration-500"></div>
                  </div>
                </div>
              </div>

              {/* Grid de dos columnas para empresa y email */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* EMPRESA */}
                <div className="group relative">
                  <div className="relative">
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      required
                      className="w-full px-0 pt-6 pb-2 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 focus:outline-none transition-all duration-500 text-base peer"
                      placeholder=" "
                    />
                    <label 
                      htmlFor="empresa" 
                      className="absolute left-0 top-6 text-sm font-medium text-gray-500 uppercase tracking-widest transition-all duration-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:-translate-y-4 peer-focus:tracking-widest cursor-text"
                    >
                      Empresa
                    </label>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-500 peer-focus:w-full shadow-lg"></div>
                    <div className="absolute -bottom-1 left-0 w-full h-px bg-gray-100 peer-focus:bg-transparent transition-all duration-500"></div>
                  </div>
                </div>

                {/* CORREO ELECTRÓNICO */}
                <div className="group relative">
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 pt-6 pb-2 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 focus:outline-none transition-all duration-500 text-base peer"
                      placeholder=" "
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-0 top-6 text-sm font-medium text-gray-500 uppercase tracking-widest transition-all duration-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:-translate-y-4 peer-focus:tracking-widest cursor-text"
                    >
                      Email
                    </label>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-500 peer-focus:w-full shadow-lg"></div>
                    <div className="absolute -bottom-1 left-0 w-full h-px bg-gray-100 peer-focus:bg-transparent transition-all duration-500"></div>
                  </div>
                </div>
              </div>

              {/* TELÉFONO */}
              <div className="group relative">
                <div className="relative">
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-0 pt-6 pb-2 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 focus:outline-none transition-all duration-500 text-base peer"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="telefono" 
                    className="absolute left-0 top-6 text-sm font-medium text-gray-500 uppercase tracking-widest transition-all duration-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:-translate-y-4 peer-focus:tracking-widest cursor-text"
                  >
                    <span>Teléfono</span>
                    <span className="text-gray-400 font-normal ml-2">(opcional)</span>
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-500 peer-focus:w-full shadow-lg"></div>
                  <div className="absolute -bottom-1 left-0 w-full h-px bg-gray-100 peer-focus:bg-transparent transition-all duration-500"></div>
                </div>
              </div>

              {/* MENSAJE */}
              <div className="group relative">
                <div className="relative">
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-0 pt-6 pb-2 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 focus:outline-none transition-all duration-500 text-base resize-none peer"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="mensaje" 
                    className="absolute left-0 top-6 text-sm font-medium text-gray-500 uppercase tracking-widest transition-all duration-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:-translate-y-4 peer-focus:tracking-widest cursor-text"
                  >
                    Mensaje
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-500 peer-focus:w-full shadow-lg"></div>
                  <div className="absolute -bottom-1 left-0 w-full h-px bg-gray-100 peer-focus:bg-transparent transition-all duration-500"></div>
                </div>
              </div>

              {/* SUBIDA DE ARCHIVO COLAPSABLE */}
              <div className="group relative">
                <div className="relative">
                  {/* Header colapsable */}
                  <button
                    type="button"
                    onClick={toggleFileUpload}
                    className="w-full flex items-center justify-between text-sm font-medium text-gray-500 uppercase tracking-widest mb-4 hover:text-gray-700 transition-colors duration-200"
                  >
                    <span>
                      Archivo Adjunto
                      <span className="text-gray-400 font-normal ml-2">(opcional - máx. 5MB)</span>
                    </span>
                    {isFileUploadOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  
                  {/* Área de subida - solo visible cuando está abierta */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isFileUploadOpen ? "auto" : 0,
                      opacity: isFileUploadOpen ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors duration-300">
                      <input
                        type="file"
                        id="archivo"
                        name="archivo"
                        onChange={handleFileSelect}
                        accept=".pdf,.jpg,.jpeg,.png,.gif,.webp"
                        className="hidden"
                      />
                      
                      {!selectedFile ? (
                        <label htmlFor="archivo" className="cursor-pointer">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-1">
                            Haz clic para seleccionar un archivo
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, JPG, PNG, GIF, WEBP (máx. 5MB)
                          </p>
                        </label>
                      ) : (
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {selectedFile.type === 'application/pdf' ? (
                              <FileText className="w-6 h-6 text-red-500" />
                            ) : (
                              <Image className="w-6 h-6 text-blue-500" />
                            )}
                            <div className="text-left">
                              <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                {selectedFile.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(selectedFile.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                  
                  {/* Mostrar archivo seleccionado fuera del área colapsable */}
                  {selectedFile && !isFileUploadOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        {selectedFile.type === 'application/pdf' ? (
                          <FileText className="w-5 h-5 text-red-500" />
                        ) : (
                          <Image className="w-5 h-5 text-blue-500" />
                        )}
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(selectedFile.size)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={toggleFileUpload}
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Mensaje de estado */}
              {submitStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center space-x-3 p-4 rounded-lg ${
                    submitStatus === 'success' 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm font-medium">{submitMessage}</p>
                </motion.div>
              )}

              {/* Botón ENVIAR */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-[#0F1516] hover:bg-[#151c1e] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-5 text-sm font-medium tracking-widest uppercase transition-all duration-500 border border-black hover:border-gray-900 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="transition-transform duration-500 group-hover:scale-105">
                      {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </span>
                    {!isSubmitting && (
                      <Send className="ml-3 w-4 h-4 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110" />
                    )}
                  </span>
                  
                  {/* Efecto de onda al hacer hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  
                  {/* Borde animado */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-700 transition-all duration-500 rounded-sm"></div>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.4760368774905!2d-58.36819662472929!3d-34.61740867294938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334d6aeb49a51%3A0xecc0cad33c1130c3!2sAv.%20Alicia%20Moreau%20de%20Justo%201150%2C%20C1107%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1760391165282!5m2!1ses!2sar"
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
                    <p className="text-gray-600">Buenos Aires, Argentina</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-black mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Teléfono</p>
                    <p className="text-gray-600">+54 11 3119-9882</p>
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
