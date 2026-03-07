import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d24q3y6jxt.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
