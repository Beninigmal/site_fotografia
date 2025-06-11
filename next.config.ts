import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "meu-site-fotografia-strapi-production.up.railway.app",
      "localhost",
    ],
  },
};

export default nextConfig;
