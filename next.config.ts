import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
