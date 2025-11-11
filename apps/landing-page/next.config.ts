import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  typescript: {
    ignoreBuildErrors: true,
  },
  cacheComponents: true,
};

export default nextConfig;
