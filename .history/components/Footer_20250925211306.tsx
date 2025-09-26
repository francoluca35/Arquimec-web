const Footer: React.FC = () => {
  return (
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
              <li>+54 11 3119-9882</li>
              <li>contacto@arquimec.com</li>
              <li>CABA, Argentina</li>
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
  );
};

export default Footer;
