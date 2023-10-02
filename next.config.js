
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  experimental: {
    appDir: true,
    // typedRoutes: true,
  },
  images: {
    domains: ['173.214.165.67'],
  }
}

module.exports = nextConfig
