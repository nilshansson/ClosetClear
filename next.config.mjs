import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve("src"), // Using ES module syntax for path
    };
    return config;
  },
};

export default nextConfig;
