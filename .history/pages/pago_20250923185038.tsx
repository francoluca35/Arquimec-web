import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

interface PaymentParams {
  plan: string;
  precio: string;
  totalFinal: string;
  moneda: string;
  nombreRestaurante: string;
  nombrePropietario: string;
  email: string;
  telefono: string;
  direccion: string;
  conFinanzas: string;
  cantidadDispositivos: string;
  codigoActivacion: string;
}

export default function Pago() {
  const router = useRouter();
  const [params, setParams] = useState<PaymentParams | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (router.isReady) {
      const query = router.query;
      setParams({
        plan: query.plan as string || '',
        precio: query.precio as string || '',
        totalFinal: query.totalFinal as string || '',
        moneda: query.moneda as string || '',
        nombreRestaurante: query.nombreRestaurante as string || '',
        nombrePropietario: query.nombrePropietario as string || '',
        email: query.email as string || '',
        telefono: query.telefono as string || '',
        direccion: query.direccion as string || '',
        conFinanzas: query.conFinanzas as string || '',
        cantidadDispositivos: query.cantidadDispositivos as string || '',
        codigoActivacion: query.codigoActivacion as string || ''
      });
      setLoading(false);
    }
  }, [router.isReady, router.query]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de procesamiento del pago
    console.log('Processing payment with data:', paymentData);
    console.log('Payment params:', params);
    
    // Simular procesamiento
    alert('Pago procesado exitosamente!');
  };

  const formatCurrency = (amount: string, currency: string) => {
    const numAmount = parseFloat(amount);
    if (currency === 'ars') {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
      }).format(numAmount);
    }
    return `${currency} ${numAmount}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando información de pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Procesar Pago
          </h1>
          <p className="text-gray-600">
            Complete los datos para finalizar su compra
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resumen del pedido */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-light">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium capitalize">{params?.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Restaurante:</span>
                  <span className="font-medium">{params?.nombreRestaurante}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Propietario:</span>
                  <span className="font-medium">{params?.nombrePropietario}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dispositivos:</span>
                  <span className="font-medium">{params?.cantidadDispositivos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Finanzas:</span>
                  <span className="font-medium capitalize">{params?.conFinanzas}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-green-600">
                    {params?.totalFinal && params?.moneda && 
                      formatCurrency(params.totalFinal, params.moneda)
                    }
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Formulario de pago */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-light">Datos de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  {/* Información de contacto */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Información de Contacto</h3>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={paymentData.email}
                        onChange={(e) => setPaymentData({...paymentData, email: e.target.value})}
                        placeholder="su@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={paymentData.phone}
                        onChange={(e) => setPaymentData({...paymentData, phone: e.target.value})}
                        placeholder="+54 11 1234-5678"
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Información de tarjeta */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Información de Tarjeta</h3>
                    
                    <div>
                      <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                      <Input
                        id="cardName"
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                        placeholder="Juan Pérez"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Número de tarjeta</Label>
                      <Input
                        id="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Fecha de vencimiento</Label>
                        <Input
                          id="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium"
                  >
                    Procesar Pago
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>Su información está protegida con encriptación SSL</p>
          <p className="mt-1">Código de activación: <span className="font-mono font-medium">{params?.codigoActivacion}</span></p>
        </motion.div>
      </div>
    </div>
  );
}
