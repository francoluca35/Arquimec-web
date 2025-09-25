import { motion } from "motion/react";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";

const ProyectoEjemplo: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
          <h1 className="text-2xl font-light text-gray-900">ARQUIMEC</h1>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-8" style={{ fontWeight: 300 }}>
            Proyecto Ejemplo
          </h2>
          
          <div className="aspect-video bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
            <p className="text-gray-500 text-lg">Imagen del proyecto aquí</p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-6">
              Esta es una página de ejemplo para mostrar los detalles del proyecto. 
              Aquí podrías incluir información detallada sobre el proyecto, 
              imágenes adicionales, especificaciones técnicas, etc.
            </p>
            
            <h3 className="text-2xl text-gray-900 mb-4" style={{ fontWeight: 300 }}>
              Detalles del Proyecto
            </h3>
            
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Área construida: 250 m²</li>
              <li>Año de construcción: 2024</li>
              <li>Ubicación: Buenos Aires, Argentina</li>
              <li>Tipo de proyecto: Residencial</li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProyectoEjemplo;
