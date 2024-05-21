
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  experimental: {
    appDir: true,
    // typedRoutes: true,
  },
  images: {
    domains: ['216.219.83.153','api.laibo.co.ke'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        
      },
    ],
    
  }
}

module.exports = nextConfig
