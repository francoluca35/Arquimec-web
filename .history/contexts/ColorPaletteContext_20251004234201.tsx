import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definición de las paletas de colores
export interface ColorPalette {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    light: string;
    background?: string;
  };
  cssVariables: {
    [key: string]: string;
  };
}

export const colorPalettes: ColorPalette[] = [
  // Paleta Original (mantener como está)
  {
    id: 'original',
    name: 'Original',
    colors: {
      primary: '#1a2a3c',
      secondary: '#4a5568',
      accent: '#ed8936',
      neutral: '#718096',
      light: '#f7fafc',
      background: '#ffffff'
    },
    cssVariables: {
      '--primary': '222.2 47.4% 11.2%',
      '--primary-foreground': '210 40% 98%',
      '--secondary': '210 40% 96%',
      '--secondary-foreground': '222.2 47.4% 11.2%',
      '--accent': '25 95% 53%',
      '--accent-foreground': '222.2 47.4% 11.2%',
      '--background': '0 0% 100%',
      '--foreground': '222.2 84% 4.9%',
    }
  },
  // Paleta 1: Tonos Tierra (primera imagen)
  {
    id: 'earth-tones',
    name: 'Tonos Tierra',
    colors: {
      primary: '#1B1B1B',
      secondary: '#555151',
      accent: '#B76E2D',
      neutral: '#9F9689',
      light: '#FFF1E2',
      background: '#ffffff'
    },
    cssVariables: {
      '--primary': '0 0% 11%',
      '--primary-foreground': '210 40% 98%',
      '--secondary': '0 2% 34%',
      '--secondary-foreground': '0 0% 100%',
      '--accent': '32 74% 45%',
      '--accent-foreground': '0 0% 100%',
      '--background': '0 0% 100%',
      '--foreground': '0 0% 11%',
    }
  },
  // Paleta 2: Tonos Azules (segunda imagen)
  {
    id: 'blue-tones',
    name: 'Tonos Azules',
    colors: {
      primary: '#071739',
      secondary: '#4B6382',
      accent: '#A68868',
      neutral: '#A4B5C4',
      light: '#E3C39D',
      background: '#ffffff'
    },
    cssVariables: {
      '--primary': '220 79% 12%',
      '--primary-foreground': '210 40% 98%',
      '--secondary': '214 25% 39%',
      '--secondary-foreground': '210 40% 98%',
      '--accent': '32 32% 52%',
      '--accent-foreground': '210 40% 98%',
      '--background': '0 0% 100%',
      '--foreground': '220 79% 12%',
    }
  },
  // Paleta 3: Tonos Neutros (tercera imagen)
  {
    id: 'neutral-tones',
    name: 'Tonos Neutros',
    colors: {
      primary: '#2C3639',
      secondary: '#3F4E4F',
      accent: '#A27858',
      neutral: '#CDD5DB',
      light: '#DCD7C9',
      background: '#ffffff'
    },
    cssVariables: {
      '--primary': '188 13% 20%',
      '--primary-foreground': '210 40% 98%',
      '--secondary': '188 11% 28%',
      '--secondary-foreground': '210 40% 98%',
      '--accent': '23 21% 42%',
      '--accent-foreground': '210 40% 98%',
      '--background': '0 0% 100%',
      '--foreground': '188 13% 20%',
    }
  }
];

interface ColorPaletteContextType {
  currentPalette: ColorPalette;
  setPalette: (paletteId: string) => void;
  availablePalettes: ColorPalette[];
}

const ColorPaletteContext = createContext<ColorPaletteContextType | undefined>(undefined);

interface ColorPaletteProviderProps {
  children: ReactNode;
}

export function ColorPaletteProvider({ children }: ColorPaletteProviderProps) {
  const [currentPalette, setCurrentPalette] = useState<ColorPalette>(colorPalettes[0]);

  // Cargar paleta guardada del localStorage al inicializar
  useEffect(() => {
    const savedPaletteId = localStorage.getItem('selected-palette');
    if (savedPaletteId) {
      const savedPalette = colorPalettes.find(palette => palette.id === savedPaletteId);
      if (savedPalette) {
        setCurrentPalette(savedPalette);
      }
    }
  }, []);

  // Aplicar variables CSS cuando cambie la paleta
  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar todas las variables CSS de la paleta actual
    Object.entries(currentPalette.cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Guardar en localStorage
    localStorage.setItem('selected-palette', currentPalette.id);
  }, [currentPalette]);

  const setPalette = (paletteId: string) => {
    const palette = colorPalettes.find(p => p.id === paletteId);
    if (palette) {
      setCurrentPalette(palette);
    }
  };

  return (
    <ColorPaletteContext.Provider value={{
      currentPalette,
      setPalette,
      availablePalettes: colorPalettes
    }}>
      {children}
    </ColorPaletteContext.Provider>
  );
}

export function useColorPalette() {
  const context = useContext(ColorPaletteContext);
  if (context === undefined) {
    throw new Error('useColorPalette must be used within a ColorPaletteProvider');
  }
  return context;
}
