module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // PurgeCSS solo se aplica en producción y si está disponible
    ...(process.env.NODE_ENV === 'production' && process.env.VERCEL === '1' ? [
      (() => {
        try {
          const purgecss = require('@fullhuman/postcss-purgecss');
          return purgecss({
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
              // Mantener clases de Tailwind
              /^sm:/,
              /^md:/,
              /^lg:/,
              /^xl:/,
              /^2xl:/,
            ],
            keyframes: true,
            fontFace: true,
            variables: true,
          });
        } catch (error) {
          console.warn('PurgeCSS not available, skipping CSS optimization');
          return null;
        }
      })()
    ].filter(Boolean) : [])
  ],
}
