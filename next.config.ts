import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/mail',
        destination: 'https://api.mailersend.com/v1/email'
      }
    ]
  },
};

export default nextConfig;
