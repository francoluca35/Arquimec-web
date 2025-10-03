const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [
      purgecss({
        content: [
          './pages/**/*.{js,ts,jsx,tsx}',
          './components/**/*.{js,ts,jsx,tsx}',
          './styles/**/*.css',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: [
          // Mantener clases dinámicas y de animación
          /^motion-/,
          /^animate-/,
          /^transition-/,
          /^duration-/,
          /^ease-/,
          /^opacity-/,
          /^scale-/,
          /^translate-/,
          /^rotate-/,
          /^skew-/,
          /^transform/,
          /^backdrop-/,
          /^bg-gradient-/,
          /^text-gradient-/,
          /^shadow-/,
          /^drop-shadow-/,
          /^blur-/,
          /^brightness-/,
          /^contrast-/,
          /^grayscale-/,
          /^hue-rotate-/,
          /^invert-/,
          /^saturate-/,
          /^sepia-/,
          // Mantener clases de Tailwind UI
          /^ui-/,
          /^radix-/,
          // Mantener clases de componentes específicos
          'hero-section',
          'customer-service-bubble',
          'animated-logo',
          'whatsapp-float',
          'loading-screen',
          // Mantener clases de responsive
          /^sm:/,
          /^md:/,
          /^lg:/,
          /^xl:/,
          /^2xl:/,
        ],
        // Configuración específica para móvil
        keyframes: true,
        fontFace: true,
        variables: true,
      })
    ] : [])
  ],
}
