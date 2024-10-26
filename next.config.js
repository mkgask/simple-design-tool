/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['tsx', 'ts'],
  distDir: 'build',
  srcDir: 'src',
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
