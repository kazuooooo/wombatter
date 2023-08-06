/**
 * @format
 * @type {import('next').NextConfig}
 */

const { hostname } = require("os")

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
}

module.exports = nextConfig
