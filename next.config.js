const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev.kush-test.pp.ua',
        port: '443',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'dev.kush-test.pp.ua',
        pathname: 'uploads/**/*',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'files.stripe.com',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
