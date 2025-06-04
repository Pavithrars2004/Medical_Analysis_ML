/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // 👈 this disables blocking
  },
};

module.exports = nextConfig;
