# Selector de Paletas de Colores - Arquimec

## Descripción

Este sistema permite a los usuarios cambiar la paleta de colores de la página web de Arquimec manteniendo el color principal original. Se han implementado 4 paletas diferentes basadas en las imágenes proporcionadas.

## Paletas Disponibles

### 1. Original (Predeterminada)
- **ID**: `original`
- **Nombre**: Original
- **Colores**: Mantiene la paleta actual de la página
- **Uso**: Esta es la paleta que ya estaba implementada en el sitio

### 2. Tonos Tierra
- **ID**: `earth-tones`
- **Nombre**: Tonos Tierra
- **Colores**:
  - Primario: `#1B1B1B` (Gris muy oscuro)
  - Secundario: `#555151` (Gris medio)
  - Acento: `#B76E2D` (Naranja-marrón)
  - Neutral: `#9F9689` (Beige-gris claro)
  - Claro: `#FFF1E2` (Crema)

### 3. Tonos Azules
- **ID**: `blue-tones`
- **Nombre**: Tonos Azules
- **Colores**:
  - Primario: `#071739` (Azul marino muy oscuro)
  - Secundario: `#4B6382` (Azul medio)
  - Acento: `#A68868` (Marrón cálido)
  - Neutral: `#A4B5C4` (Azul grisáceo claro)
  - Claro: `#E3C39D` (Beige claro)

### 4. Tonos Neutros
- **ID**: `neutral-tones`
- **Nombre**: Tonos Neutros
- **Colores**:
  - Primario: `#2C3639` (Gris teal oscuro)
  - Secundario: `#3F4E4F` (Gris teal medio)
  - Acento: `#A27858` (Marrón cálido)
  - Neutral: `#CDD5DB` (Gris azul muy claro)
  - Claro: `#DCD7C9` (Crema claro)

## Componentes Implementados

### 1. ColorPaletteContext
- **Archivo**: `contexts/ColorPaletteContext.tsx`
- **Función**: Maneja el estado global de las paletas de colores
- **Características**:
  - Persistencia en localStorage
  - Aplicación automática de variables CSS
  - Gestión de paletas disponibles

### 2. ColorPaletteSelector
- **Archivo**: `components/ColorPaletteSelector.tsx`
- **Función**: Componente UI para seleccionar paletas
- **Características**:
  - Botón compacto con icono
  - Panel desplegable con preview de colores
  - Responsive design
  - Accesibilidad mejorada

### 3. ColorPaletteDemo
- **Archivo**: `components/ColorPaletteDemo.tsx`
- **Función**: Componente de demostración
- **Características**:
  - Muestra todos los colores de la paleta actual
  - Ejemplos de componentes UI
  - Tipografía de ejemplo

## Integración

### En el Header
El selector se ha integrado en el componente `Header.tsx`:
- **Desktop**: Aparece junto al botón "Hablemos de tu proyecto"
- **Mobile**: Se incluye en el menú móvil desplegable

### En la Aplicación Principal
Se ha agregado el `ColorPaletteProvider` en `pages/_app.tsx` para:
- Envolver toda la aplicación
- Proporcionar contexto global
- Aplicar variables CSS automáticamente

## Uso

### Para Usuarios
1. Hacer clic en el botón de paleta (icono de paleta) en el header
2. Seleccionar una paleta del panel desplegable
3. Los colores se aplican inmediatamente
4. La selección se guarda automáticamente

### Para Desarrolladores

#### Cambiar Paleta Programáticamente
```tsx
import { useColorPalette } from '../contexts/ColorPaletteContext';

function MyComponent() {
  const { setPalette } = useColorPalette();
  
  const handlePaletteChange = () => {
    setPalette('earth-tones'); // Cambiar a tonos tierra
  };
  
  return <button onClick={handlePaletteChange}>Cambiar Paleta</button>;
}
```

#### Acceder a la Paleta Actual
```tsx
import { useColorPalette } from '../contexts/ColorPaletteContext';

function MyComponent() {
  const { currentPalette } = useColorPalette();
  
  return (
    <div style={{ backgroundColor: currentPalette.colors.primary }}>
      Contenido con color primario
    </div>
  );
}
```

## Demo

Para ver el selector en acción, visita:
- **URL**: `/demo-paletas`
- **Componente**: `pages/demo-paletas.tsx`

Esta página muestra:
- El selector de paletas funcionando
- Ejemplos de todos los colores
- Componentes UI con diferentes paletas
- Tipografía de ejemplo

## Variables CSS

El sistema utiliza variables CSS que se actualizan automáticamente:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --accent: 25 95% 53%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}
```

## Personalización

### Agregar Nueva Paleta
1. Editar `contexts/ColorPaletteContext.tsx`
2. Agregar nueva paleta al array `colorPalettes`
3. Definir colores y variables CSS correspondientes

### Modificar Colores Existentes
1. Editar el objeto de la paleta en `colorPalettes`
2. Actualizar tanto `colors` como `cssVariables`
3. Los cambios se aplicarán automáticamente

## Características Técnicas

- **Persistencia**: localStorage para mantener selección
- **Performance**: Variables CSS para cambios instantáneos
- **Accesibilidad**: ARIA labels y navegación por teclado
- **Responsive**: Funciona en desktop y mobile
- **TypeScript**: Completamente tipado
- **Tailwind**: Compatible con el sistema de diseño existente

## Notas Importantes

1. **Color Principal**: Se mantiene el color principal original como solicitado
2. **Compatibilidad**: Funciona con el sistema de diseño existente
3. **Fallback**: Si hay error, se usa la paleta original por defecto
4. **SEO**: No afecta el SEO ya que solo cambia variables CSS
5. **Performance**: Cambios instantáneos sin recarga de página
