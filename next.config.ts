import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';


const nextConfig: NextConfig = {
  output: "export", // Static export for cPanel File Manager
  images: {
    unoptimized: true,
  },
  // BasePath only for production (cPanel deployment)
  basePath: isProd ? '/ar/business-setup-saudi' : '',
  
  // Asset prefix to ensure correct paths in production
  assetPrefix: isProd ? '/ar/business-setup-saudi' : '',
  
  // Ensure trailing slashes for better compatibility
  trailingSlash: true,
  
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;

