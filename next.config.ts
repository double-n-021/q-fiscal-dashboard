import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'be-admin-dev.tinhocabc.com',
      },
      {
        protocol: 'https',
        hostname: 'quanlydoanhnghiep.net',
      },
    ],
  },
};

export default nextConfig;
