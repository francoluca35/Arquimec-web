import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Pago() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    // Get query parameters from URL
    const { query } = router;
    setPaymentData(query);
  }, [router]);

  if (!paymentData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Procesando Pago
          </h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Plan:
              </label>
              <p className="text-lg">{paymentData.plan}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Precio:
              </label>
              <p className="text-lg">{paymentData.precio} {paymentData.moneda}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Final:
              </label>
              <p className="text-lg font-bold">{paymentData.totalFinal} {paymentData.moneda}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Restaurante:
              </label>
              <p className="text-lg">{paymentData.nombreRestaurante}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Propietario:
              </label>
              <p className="text-lg">{paymentData.nombrePropietario}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <p className="text-lg">{paymentData.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono:
              </label>
              <p className="text-lg">{paymentData.telefono}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dirección:
              </label>
              <p className="text-lg">{paymentData.direccion}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Con Finanzas:
              </label>
              <p className="text-lg">{paymentData.conFinanzas}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cantidad de Dispositivos:
              </label>
              <p className="text-lg">{paymentData.cantidadDispositivos}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Código de Activación:
              </label>
              <p className="text-lg">{paymentData.codigoActivacion}</p>
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Procesar Pago
            </button>
            <button 
              onClick={() => router.back()}
              className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
