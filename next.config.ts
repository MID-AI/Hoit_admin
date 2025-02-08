import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [`${process.env.R2_DOMAIN}`],
  },
};

export default nextConfig;
