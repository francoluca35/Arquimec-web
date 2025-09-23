import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "./components/ui/button";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Imágenes para el carousel del hero
  const heroImages = [
    "https://images.unsplash.com/photo-1624226784657-1e30fccdd59b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBleHRlcmlvcnxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1706808849777-96e0d7be3bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZSUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1NDY3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1651510351672-620d8dc31b72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1ODU4NDYxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1667375186583-0e90493826c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcGhvdG9ncmFwaHklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg1ODQ2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-cambio de imágenes en el hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg"
            : "bg-white/90 backdrop-blur-sm"
        }`}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <span
                className="text-2xl lg:text-3xl tracking-wider text-gray-900"
                style={{
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                }}
              >
                ARQUIMEC
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              {[
                { name: "ESTUDIO", href: "#estudio" },
                { name: "SERVICIO", href: "#servicio" },
                { name: "PROYECTOS", href: "#proyectos" },
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 transition-colors text-sm tracking-wider"
                  style={{
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                  }}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 py-2 rounded-full text-sm tracking-wider transition-all duration-300"
                  style={{
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                  }}
                >
                  HABLEMOS DE TU PROYECTO
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.nav
              className="lg:hidden py-4 border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col space-y-4">
                {[
                  { name: "ESTUDIO", href: "#estudio" },
                  { name: "SERVICIO", href: "#servicio" },
                  { name: "PROYECTOS", href: "#proyectos" },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 transition-colors py-2 text-sm tracking-wider"
                    style={{
                      fontWeight: 400,
                      letterSpacing: "0.1em",
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <Button
                  variant="outline"
                  className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white w-full mt-4 rounded-full text-sm tracking-wider"
                  style={{
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                  }}
                >
                  HABLEMOS DE TU PROYECTO
                </Button>
              </div>
            </motion.nav>
          )}
        </div>
      </motion.header>

      {/* Hero Section - Solo imágenes cambiando */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <ImageWithFallback
              src={heroImages[currentImageIndex]}
              alt={`Arquitectura moderna ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </motion.div>
        </AnimatePresence>

        {/* Indicadores de imágenes */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Sección Estudio - Inspirada en la segunda imagen */}
      <section
        id="estudio"
        className="py-32 bg-black relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Texto lado izquierdo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <p
                  className="text-gray-400 text-sm tracking-wider mb-4"
                  style={{ letterSpacing: "0.15em" }}
                >
                  ESTUDIO DE ARQUITECTURA EN BUENOS AIRES
                </p>
              </div>

              <div className="mb-12">
                <h2
                  className="text-4xl lg:text-5xl text-white mb-8 leading-tight"
                  style={{ fontWeight: 300 }}
                >
                  Creamos espacios que reflejan tus ideas, con
                  precisión y calidad constructiva, ofreciendo
                  un servicio pensado para satisfacer a los
                  clientes más exigentes.
                </h2>
              </div>

              <motion.div
                whileHover={{ x: 10 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Button
                  variant="outline"
                  className="border border-white/30 text-white hover:bg-white hover:text-black px-8 py-3 rounded-full text-sm tracking-wider transition-all duration-300"
                  style={{
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                  }}
                >
                  Hablemos de tu proyecto
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Imagen lado derecho */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1667375186583-0e90493826c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcGhvdG9ncmFwaHklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg1ODQ2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Interior arquitectónico moderno"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección Fundador - Inspirada en la tercera imagen */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Imagen del fundador */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="w-80 h-96 bg-gray-200 rounded-lg overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhcmNoaXRlY3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg1MzQ1MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Arquitecto fundador"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Contenido del lado derecho */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h3
                  className="text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight"
                  style={{ fontWeight: 300 }}
                >
                  Desde 2017, entregando calidad
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Arquimec es un estudio creado por el Arq.
                  Nicolás Llanos, dedicado a la construcción de
                  viviendas unifamiliares, proyectos
                  comerciales, o urbanísticos, que busca
                  desarrollar el proyecto y la ejecución de
                  obra, con calidad y atención al detalle, en
                  todas las etapas de la edificación.
                </p>
              </div>

              {/* Métrica grande */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div
                  className="text-8xl lg:text-9xl text-gray-900 mb-2"
                  style={{ fontWeight: 300 }}
                >
                  5000
                  <span className="text-amber-500">+</span>
                </div>
                <p
                  className="text-gray-500 text-sm tracking-wider"
                  style={{ letterSpacing: "0.15em" }}
                >
                  M² CONSTRUIDOS
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interludio Visual - Casa Moderna */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1627141234469-24711efb373c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1ODUzNDk5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Casa moderna contemporánea"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </motion.div>

        {/* Logo pequeño en la esquina */}
        <div className="absolute top-8 left-8 z-20">
          <span
            className="text-white text-lg tracking-wider"
            style={{
              fontWeight: 300,
              letterSpacing: "0.1em",
            }}
          >
            ARQUIMEC
          </span>
        </div>

        {/* Texto en la esquina inferior derecha */}
        <div className="absolute bottom-8 right-8 z-20 text-right">
          <p className="text-white/80 text-sm tracking-wider">
            VIVIENDAS TEMPORALES
          </p>
        </div>
      </section>

      {/* Sección Proceso de Trabajo */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
              <div>
                <h2
                  className="text-4xl lg:text-5xl text-gray-900 mb-4 leading-tight"
                  style={{ fontWeight: 300 }}
                >
                  Conocé nuestro proceso de trabajo
                </h2>
              </div>
              <div className="text-right">
                <p
                  className="text-gray-500 text-sm tracking-wider"
                  style={{ letterSpacing: "0.15em" }}
                >
                  PROYECTOS EN BUENOS AIRES Y CÓRDOBA
                </p>
              </div>
            </div>

            {/* Línea divisoria */}
            <div className="w-full h-px bg-gray-300 mb-16"></div>

            {/* Proceso de trabajo en 3 pasos */}
            <div className="space-y-16">
              {[
                {
                  number: "01",
                  title: "Desarrollo ejecutivo.",
                  description:
                    "Relevamos en detalle tus necesidades para poder satisfacer cada uno de los requerimientos funcionales y estéticos del espacio de vivienda.",
                },
                {
                  number: "02",
                  title: "Presentación del proyecto.",
                  description:
                    "Hacemos una presentación del proyecto arquitectónico con renders hiperrealistas para su revisión, ajustes y aprobación.",
                },
                {
                  number: "03",
                  title: "Construcción y entrega.",
                  description:
                    "Llevamos a cabo la construcción de la vivienda dividida en etapa de obra gruesa, terminaciones y final de obra.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Título y descripción */}
                  <div className="lg:col-span-8">
                    <h3
                      className="text-2xl lg:text-3xl text-gray-900 mb-4 leading-tight"
                      style={{ fontWeight: 300 }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                  </div>

                  {/* Número */}
                  <div className="lg:col-span-4 flex justify-start lg:justify-end">
                    <span
                      className="text-6xl lg:text-8xl text-gray-300"
                      style={{ fontWeight: 300 }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Línea divisoria para todos excepto el último */}
                  {index < 2 && (
                    <div className="lg:col-span-12 w-full h-px bg-gray-200 mt-8"></div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Botón al final */}
            <motion.div
              className="mt-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outline"
                className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-full text-sm tracking-wider transition-all duration-300"
                style={{
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                }}
              >
                Hablemos de tu proyecto →
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sección Nuestro Lugar - Inspirada en la primera imagen */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p
              className="text-gray-500 text-sm tracking-wider mb-4"
              style={{ letterSpacing: "0.15em" }}
            >
              NUESTRO LUGAR
            </p>
            <h2
              className="text-4xl lg:text-5xl text-gray-900 mb-8 leading-tight max-w-4xl mx-auto"
              style={{ fontWeight: 300 }}
            >
              Espacios que combinan funcionalidad y diseño
              excepcional
            </h2>
          </motion.div>

          <motion.div
            className="relative h-[600px] lg:h-[700px] overflow-hidden rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1639156137702-2e6e1d7f40d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1ODQ5MTA2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Cocina moderna minimalista"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Sección de Proyectos */}
      <section id="proyectos" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p
              className="text-gray-500 text-sm tracking-wider mb-4"
              style={{ letterSpacing: "0.15em" }}
            >
              PROYECTOS
            </p>
            <h2
              className="text-4xl lg:text-5xl text-gray-900 mb-8 leading-tight"
              style={{ fontWeight: 300 }}
            >
              Nuestros Trabajos Más Destacados
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1639405091806-01e8ab3cd13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZXxlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                title: "Casa Moderna Minimalista",
                category: "Residencial",
                year: "2024",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1ODQyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                title: "Edificio Corporativo",
                category: "Comercial",
                year: "2023",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NTg1Mjc5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                title: "Loft Contemporáneo",
                category: "Interiores",
                year: "2024",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs text-gray-500 tracking-wider"
                        style={{ letterSpacing: "0.1em" }}
                      >
                        {project.category.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">
                        {project.year}
                      </span>
                    </div>
                    <h3
                      className="text-xl text-gray-900 group-hover:text-amber-600 transition-colors"
                      style={{ fontWeight: 300 }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p
              className="text-gray-500 text-sm tracking-wider mb-4"
              style={{ letterSpacing: "0.15em" }}
            >
              CONTACTO
            </p>
            <h2
              className="text-4xl lg:text-5xl text-gray-900 mb-8 leading-tight"
              style={{ fontWeight: 300 }}
            >
              Trabajemos Juntos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {[
              {
                icon: Phone,
                title: "Teléfono",
                info: "+52 (55) 1234-5678",
              },
              {
                icon: Mail,
                title: "Email",
                info: "contacto@arquimec.com",
              },
              {
                icon: MapPin,
                title: "Ubicación",
                info: "Ciudad de México, México",
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <contact.icon className="w-8 h-8 mx-auto text-gray-600" />
                </div>
                <h3
                  className="text-lg text-gray-900 mb-2"
                  style={{ fontWeight: 400 }}
                >
                  {contact.title}
                </h3>
                <p className="text-gray-600">{contact.info}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 rounded-full text-sm tracking-wider transition-all duration-300"
              style={{
                fontWeight: 400,
                letterSpacing: "0.1em",
              }}
            >
              Iniciar Proyecto
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6">
                <span
                  className="text-2xl tracking-wider text-white"
                  style={{
                    fontWeight: 300,
                    letterSpacing: "0.1em",
                  }}
                >
                  ARQUIMEC
                </span>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
                Creando arquitectura excepcional que define el
                futuro. Transformamos ideas en espacios que
                inspiran y perduran.
              </p>
            </div>

            <div>
              <h4
                className="text-lg mb-6 text-white tracking-wider"
                style={{
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                }}
              >
                SERVICIOS
              </h4>
              <ul className="space-y-3 text-gray-300">
                {[
                  "Arquitectura Residencial",
                  "Arquitectura Comercial",
                  "Diseño de Interiores",
                  "Consultoría",
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="text-lg mb-6 text-white tracking-wider"
                style={{
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                }}
              >
                CONTACTO
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li>+52 (55) 1234-5678</li>
                <li>contacto@arquimec.com</li>
                <li>Ciudad de México, México</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Arquimec. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}