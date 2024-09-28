const createNextIntlPlugin = require('next-intl/plugin');
const { hostname } = require('os');

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  experimental: {
    optimizePackageImports: ['framer-motion']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
  },
  images: {
    loader: 'custom',
    loaderFile: './lib/strapi.ts',
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'dev.kush-test.pp.ua',
        pathname: 'uploads/**/*'
      },
      {
        protocol: 'https',
        hostname: 'placehold.co'
      }
    ]
  }
};

module.exports = withNextIntl(nextConfig);
