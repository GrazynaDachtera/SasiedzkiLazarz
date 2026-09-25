import type { NextConfig } from "next";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 95],
    minimumCacheTTL: THIRTY_DAYS,
  },
  experimental: {
    inlineCss: true,
  },
  async headers() {
    return [
      {
        source: "/:all*(jpg|jpeg|JPG|JPEG|png|PNG|webp|gif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${THIRTY_DAYS}, stale-while-revalidate=86400`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
