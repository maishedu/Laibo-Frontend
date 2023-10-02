
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  experimental: {
    appDir: true,
    // typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "173.214.165.67",
        port: "",
        pathname: "/**"
      }
    ]
  }
}

module.exports = nextConfig
