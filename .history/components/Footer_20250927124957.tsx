import { motion } from "motion/react";
import { useState, useEffect } from "react";

const Footer: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "ARQUIMEC.";
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && textIndex < fullText.length) {
        setDisplayText(fullText.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      } else if (isDeleting && textIndex > 0) {
        setDisplayText(fullText.slice(0, textIndex - 1));
        setTextIndex(textIndex - 1);
      } else if (textIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (textIndex === 0 && isDeleting) {
        setIsDeleting(false);
      }
    }, isDeleting ? 100 : 200);

    return () => clearTimeout(timeout);
  }, [textIndex, isDeleting, fullText]);

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <motion.span
                className="text-2xl tracking-wider text-white"
                style={{
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                }}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {displayText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-white"
                >
                  |
                </motion.span>
              </motion.span>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
              Creando arquitectura excepcional que define el
              futuro. Transformamos ideas en espacios que
              inspiran y perduran.
            </p>
          </div>

          <div>
            <h2
              className="text-lg mb-6 text-white tracking-wider"
              style={{
                fontWeight: 300,
                letterSpacing: "0.1em",
              }}
            >
              SERVICIOS
            </h2>
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
                    className="hover:text-white transition-colors underline-offset-2 hover:underline"
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
              <li>+54 11 3119-9882</li>
              <li>contacto@arquimec.com</li>
              <li>CABA, Argentina</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              &copy; 2024 Arquimec. Todos los derechos
              reservados.
            </p>
            <div className="flex items-center space-x-6">
              <a 
                href="/politicas-privacidad" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200 underline underline-offset-2 hover:no-underline"
              >
                Políticas de Privacidad
              </a>
              <p className="text-gray-400">
                Creado por <a href="https://www.deamondd.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors duration-200 underline underline-offset-2 hover:no-underline">DeamonDD</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
