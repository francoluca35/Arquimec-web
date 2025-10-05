import React from 'react';
import { useColorPalette } from '../contexts/ColorPaletteContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function ColorPaletteDemo() {
  const { currentPalette } = useColorPalette();

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Demostración de Paleta de Colores
        </h2>
        <p className="text-muted-foreground">
          Paleta actual: <Badge variant="secondary">{currentPalette.name}</Badge>
        </p>
      </div>

      {/* Muestra de colores */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Colores de la Paleta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <div
                className="w-full h-20 rounded-lg border border-border/50"
                style={{ backgroundColor: currentPalette.colors.primary }}
              />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Primario</p>
                <p className="text-xs text-muted-foreground">{currentPalette.colors.primary}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div
                className="w-full h-20 rounded-lg border border-border/50"
                style={{ backgroundColor: currentPalette.colors.secondary }}
              />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Secundario</p>
                <p className="text-xs text-muted-foreground">{currentPalette.colors.secondary}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div
                className="w-full h-20 rounded-lg border border-border/50"
                style={{ backgroundColor: currentPalette.colors.accent }}
              />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Acento</p>
                <p className="text-xs text-muted-foreground">{currentPalette.colors.accent}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div
                className="w-full h-20 rounded-lg border border-border/50"
                style={{ backgroundColor: currentPalette.colors.neutral }}
              />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Neutral</p>
                <p className="text-xs text-muted-foreground">{currentPalette.colors.neutral}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div
                className="w-full h-20 rounded-lg border border-border/50"
                style={{ backgroundColor: currentPalette.colors.light }}
              />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Claro</p>
                <p className="text-xs text-muted-foreground">{currentPalette.colors.light}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ejemplos de componentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Botones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full">Botón Primario</Button>
            <Button variant="secondary" className="w-full">Botón Secundario</Button>
            <Button variant="outline" className="w-full">Botón Outline</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Badges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Texto de ejemplo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Tipografía</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Título Principal</h3>
            <p className="text-foreground">
              Este es un párrafo de ejemplo que muestra cómo se ve el texto con la paleta actual. 
              El color del texto se adapta automáticamente a la paleta seleccionada.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium text-foreground mb-2">Subtítulo</h4>
            <p className="text-muted-foreground">
              Este texto usa el color muted para mostrar jerarquía visual.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
