const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      [require.resolve('@fullhuman/postcss-purgecss')]: {
        content: [
          './pages/**/*.{js,ts,jsx,tsx}',
          './components/**/*.{js,ts,jsx,tsx}',
          './App.tsx'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: [
          /data-theme/,
          /^motion-/,
          /^animate-/,
          /^hover:/,
          /^focus:/,
          /^group-hover:/,
          /^lg:/,
          /^md:/,
          /^sm:/,
          /^xl:/
        ]
      }
    } : {})
  },
}
