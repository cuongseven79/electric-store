/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '172.168.98.81:3000'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'people.pic1.co',
      },
      {
        protocol: 'https',
        hostname: 'app-uploads-cdn.fera.ai',
      },
    ],
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
};

module.exports = nextConfig;
