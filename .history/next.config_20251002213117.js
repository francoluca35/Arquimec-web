/** @type {import('next').NextConfig} */
const nextConfig = {
  // OPTIMIZACIÓN EXTREMA DE IMÁGENES PARA MÓVIL
  images: {
    domains: [
      'images.unsplash.com',
      'unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // FORMATOS MÁS EFICIENTES - WEBP PRIORITARIO
    formats: ['image/webp', 'image/avif'],
    // TAMAÑOS OPTIMIZADOS PARA MÓVIL
    deviceSizes: [640, 750, 828, 1080],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
    // CONFIGURACIÓN EXTREMA
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    unoptimized: false,
  },
  
  // Optimización de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuración para evitar JavaScript legacy
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion/react'],
    esmExternals: true,
  },
  
  // Configuración específica para evitar transpilación legacy - SIMPLIFICADA
  
  // Optimización para mobile - evitar JavaScript legacy
  // swcMinify ya está habilitado por defecto en Next.js 15
  
  // Configuración de browserslist para evitar transpilación legacy
  // browserslist se configura en package.json
  
  // Optimización de bundle ya configurada arriba
  
  // Headers para caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/Assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // OPTIMIZACIÓN QUIRÚRGICA EXTREMA PARA MÓVIL
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // SPLITTING EXTREMO - CHUNKS MÍNIMOS
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 10000, // Reducido de 20k a 10k
        maxSize: 50000, // Reducido de 244k a 50k
        cacheGroups: {
          // React y Next.js en chunk separado
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 20,
            enforce: true,
          },
          // Motion en chunk separado
          motion: {
            test: /[\\/]node_modules[\\/]motion[\\/]/,
            name: 'motion',
            chunks: 'all',
            priority: 15,
            enforce: true,
          },
          // Radix UI en chunk separado
          radix: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix',
            chunks: 'all',
            priority: 15,
            enforce: true,
          },
          // Lucide icons en chunk separado
          icons: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'icons',
            chunks: 'all',
            priority: 15,
            enforce: true,
          },
          // Otros vendors
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
            maxSize: 30000, // Límite estricto
          },
          // Common chunks
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
            maxSize: 20000, // Límite estricto
          },
        },
      }
      
      // OPTIMIZACIONES EXTREMAS
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
      config.optimization.concatenateModules = true
      config.optimization.providedExports = true
      config.optimization.mangleExports = true
      
      // ELIMINAR POLYFILLS INNECESARIOS
      config.resolve.alias = {
        ...config.resolve.alias,
        'core-js': false,
        'regenerator-runtime': false,
        // Optimizar imports pesados
        'lucide-react': 'lucide-react/dist/esm/lucide-react.js',
      }
      
      // TREE SHAKING EXTREMO
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
      
      // COMPRESIÓN EXTREMA
      config.optimization.minimize = true
      config.optimization.minimizer = [
        ...config.optimization.minimizer,
        new (require('terser-webpack-plugin'))({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info', 'console.debug'],
            },
            mangle: true,
          },
        }),
      ]
    }
    return config
  },
}

module.exports = nextConfig