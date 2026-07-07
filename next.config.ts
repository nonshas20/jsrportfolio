import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-757962ac-65a0-4e87-81c1-ba71e1a9d939.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
