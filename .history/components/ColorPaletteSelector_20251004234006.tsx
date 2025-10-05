import React, { useState } from 'react';
import { useColorPalette } from '../contexts/ColorPaletteContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Palette, Check, Settings2 } from 'lucide-react';

interface ColorPaletteSelectorProps {
  className?: string;
}

export default function ColorPaletteSelector({ className = '' }: ColorPaletteSelectorProps) {
  const { currentPalette, setPalette, availablePalettes } = useColorPalette();
  const [isOpen, setIsOpen] = useState(false);

  const handlePaletteChange = (paletteId: string) => {
    setPalette(paletteId);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Botón de activación */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/50 transition-all duration-200"
        aria-label="Seleccionar paleta de colores"
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">Paleta</span>
        <Settings2 className="w-3 h-3" />
      </Button>

      {/* Panel de selección */}
      {isOpen && (
        <>
          {/* Overlay para cerrar */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Panel de paletas */}
          <Card className="absolute top-full right-0 mt-2 w-80 z-50 bg-background/95 backdrop-blur-md border-border/50 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Paleta de Colores</h3>
              </div>
              
              <div className="space-y-3">
                {availablePalettes.map((palette) => (
                  <div
                    key={palette.id}
                    className={`relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      currentPalette.id === palette.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-accent/20'
                    }`}
                    onClick={() => handlePaletteChange(palette.id)}
                  >
                    {/* Indicador de selección actual */}
                    {currentPalette.id === palette.id && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                    )}

                    {/* Nombre de la paleta */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{palette.name}</span>
                      {currentPalette.id === palette.id && (
                        <Badge variant="secondary" className="text-xs">
                          Activa
                        </Badge>
                      )}
                    </div>

                    {/* Muestra de colores */}
                    <div className="flex gap-1">
                      <div
                        className="w-8 h-8 rounded border border-border/50"
                        style={{ backgroundColor: palette.colors.primary }}
                        title="Primario"
                      />
                      <div
                        className="w-8 h-8 rounded border border-border/50"
                        style={{ backgroundColor: palette.colors.secondary }}
                        title="Secundario"
                      />
                      <div
                        className="w-8 h-8 rounded border border-border/50"
                        style={{ backgroundColor: palette.colors.accent }}
                        title="Acento"
                      />
                      <div
                        className="w-8 h-8 rounded border border-border/50"
                        style={{ backgroundColor: palette.colors.neutral }}
                        title="Neutral"
                      />
                      <div
                        className="w-8 h-8 rounded border border-border/50"
                        style={{ backgroundColor: palette.colors.light }}
                        title="Claro"
                      />
                    </div>

                    {/* Códigos de color */}
                    <div className="mt-2 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Primario: {palette.colors.primary}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Información adicional */}
              <div className="mt-4 pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  La paleta seleccionada se aplicará inmediatamente y se guardará para futuras visitas.
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// Componente compacto para mostrar la paleta actual
export function CurrentPaletteIndicator() {
  const { currentPalette } = useColorPalette();

  return (
    <div className="flex items-center gap-2 p-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border/50">
      <Palette className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-foreground">{currentPalette.name}</span>
      <div className="flex gap-1">
        <div
          className="w-3 h-3 rounded-full border border-border/50"
          style={{ backgroundColor: currentPalette.colors.primary }}
        />
        <div
          className="w-3 h-3 rounded-full border border-border/50"
          style={{ backgroundColor: currentPalette.colors.accent }}
        />
      </div>
    </div>
  );
}
