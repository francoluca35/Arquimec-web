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
  // Remove experimental optimizePackageImports as it's causing deploymentId issues in Next.js 15
  // experimental: {
  //   optimizePackageImports: ['lucide-react'],
  // },
}

module.exports = nextConfig