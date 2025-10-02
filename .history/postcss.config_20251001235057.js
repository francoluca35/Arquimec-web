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
          /^bg-/,
          /^text-/,
          /^border-/,
          /^hover:/,
          /^focus:/,
          /^active:/,
          /^group-hover:/,
          /^md:/,
          /^lg:/,
          /^xl:/,
          /^2xl:/,
        ],
      })
    ] : [])
  ],
}
