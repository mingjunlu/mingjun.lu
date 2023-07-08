/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hackmd.io',
        port: '',
        pathname: '/_uploads/**',
      },
    ],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
