import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@software-factory/booking-core",
    "@software-factory/demo-shell",
    "@software-factory/mock-data",
    "@software-factory/ui",
    "@software-factory/verticals",
  ],
};

export default nextConfig;
