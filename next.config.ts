import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "meu-site-fotografia-strapi-production.up.railway.app",
      "localhost",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
