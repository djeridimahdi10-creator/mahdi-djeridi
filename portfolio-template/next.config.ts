import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  experimental: {
    // Opt out of PPR to ensure full client-side canvas works cleanly
  },
};

export default nextConfig;
