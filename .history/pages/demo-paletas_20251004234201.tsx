import React from 'react';
import Head from 'next/head';
import ColorPaletteSelector from '../components/ColorPaletteSelector';
import ColorPaletteDemo from '../components/ColorPaletteDemo';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export default function DemoPaletas() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Demo - Selector de Paletas de Colores | Arquimec</title>
        <meta name="description" content="Demostración del selector de paletas de colores de Arquimec" />
      </Head>

      <div className="min-h-screen bg-background">
        {/* Header simple */}
        <header className="bg-background border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/')}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al inicio
                </Button>
                <h1 className="text-xl font-bold text-foreground">
                  Demo - Selector de Paletas
                </h1>
              </div>
              
              <ColorPaletteSelector />
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="py-8">
          <ColorPaletteDemo />
        </main>

        {/* Footer simple */}
        <footer className="bg-background border-t border-border/50 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-muted-foreground">
              <p>Demostración del selector de paletas de colores de Arquimec</p>
              <p className="text-sm mt-2">
                Los colores se aplican automáticamente y se guardan para futuras visitas
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
