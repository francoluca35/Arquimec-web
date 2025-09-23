/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Add deployment configuration to fix deploymentId error
  env: {
    NEXT_PUBLIC_DEPLOYMENT_ID: process.env.NEXT_PUBLIC_DEPLOYMENT_ID || 'local-dev',
  },
}

module.exports = nextConfig