import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/sis_gate',
        destination: '/portal-access',
      },
    ];
  },
};

export default nextConfig;
