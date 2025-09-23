import type { NextPage } from 'next'
import Head from 'next/head'
import { Button } from '../components/ui/button'

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Test Tailwind</title>
        <meta name="description" content="Testing Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Test de Tailwind CSS
        </h1>

        <div className="space-y-4">
          <Button>Botón de Prueba</Button>
          
          <div className="p-4 bg-card border border-border rounded-lg">
            <h2 className="text-2xl font-semibold text-card-foreground mb-2">
              Tarjeta de Prueba
            </h2>
            <p className="text-muted-foreground">
              Este es un párrafo de prueba para verificar que los estilos de Tailwind funcionan correctamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-primary text-primary-foreground rounded-lg">
              <h3 className="font-semibold">Primario</h3>
              <p>Color primario</p>
            </div>
            <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
              <h3 className="font-semibold">Secundario</h3>
              <p>Color secundario</p>
            </div>
            <div className="p-4 bg-accent text-accent-foreground rounded-lg">
              <h3 className="font-semibold">Acento</h3>
              <p>Color de acento</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home