import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    ...(process.env.NODE_ENV === 'development' && {
      minimumCacheTTL: 0,
    }),
  },
};

export default nextConfig;