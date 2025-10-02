/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimización de imágenes para móvil
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
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Optimización específica para móvil
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
  
  // Configuración específica para evitar transpilación legacy
  transpilePackages: [],
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
  
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
  
  // Optimización de webpack
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }
      
      // Optimización para reducir JavaScript legacy
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
      
      // Optimización para móvil
      config.optimization.concatenateModules = true
      config.optimization.providedExports = true
    }
    return config
  },
}

module.exports = nextConfig