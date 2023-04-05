/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/index",
        destination: "/_index",
      },
    ];
  },
}

module.exports = nextConfig
