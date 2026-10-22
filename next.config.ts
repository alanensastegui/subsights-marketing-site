import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/case-studies/dylans-tours',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/legal/terms',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/legal/privacy',
        permanent: true,
      },
      {
        source: '/data-processing',
        destination: '/legal/data-processing',
        permanent: true,
      },
      {
        source: '/phoenix-2025',
        destination: '/demo/phoenix-2025',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
