/** @type {import('next').NextConfig} */

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
  images: {
    domains: ['dev.kush-test.pp.ua', 'lh3.googleusercontent.com'],
  }
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: 'dev.kush-test.pp.ua',
  //       port: '443',
  //       pathname: '/uploads/**/*',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'placehold.co',
  //     },
  //     {
  //       hostname: 'lh3.googleusercontent.com',
  //     },
  //     {
  //       hostname: 'files.stripe.com',
  //     },
  //   ],
  // },
};

module.exports = nextConfig;
