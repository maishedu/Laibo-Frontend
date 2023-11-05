
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  experimental: {
    appDir: true,
    // typedRoutes: true,
  },
  images: {
    domains: ['173.214.165.67'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        
      },
    ],
    
  }
}

module.exports = nextConfig
