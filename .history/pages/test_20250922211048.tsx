import type { NextPage } from 'next'
import Head from 'next/head'

const Test: NextPage = () => {
  return (
    <div className="min-h-screen bg-red-500">
      <Head>
        <title>Test Tailwind</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Test Simple de Tailwind
        </h1>

        <div className="space-y-4">
          <div className="p-4 bg-blue-500 text-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">
              Tarjeta Azul
            </h2>
            <p>
              Si ves este texto en azul, Tailwind está funcionando.
            </p>
          </div>

          <div className="p-4 bg-green-500 text-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">
              Tarjeta Verde
            </h2>
            <p>
              Si ves este texto en verde, Tailwind está funcionando.
            </p>
          </div>

          <button className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition-colors">
            Botón de Prueba
          </button>
        </div>
      </main>
    </div>
  )
}

export default Test
