import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    }
  },
  images: {
    domains: ["gvbcnq1sqxiyp5sq.public.blob.vercel-storage.com"],
  }
};

export default nextConfig;
