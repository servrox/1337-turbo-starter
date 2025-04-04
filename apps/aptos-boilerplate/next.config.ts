import type { NextConfig } from "next";
// import withPWAInit from "@ducanh2912/next-pwa";

// const withPWA = withPWAInit({
//   disable: false,
// });

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // output: "export", // Outputs a Single-Page Application (SPA).
  // distDir: "./dist", // Changes the build output directory to `./dist/`.
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH, // Sets the base path to `/some-base-path`.
};

// export default withPWA(nextConfig);
export default nextConfig;
