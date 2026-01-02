/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: "/",
        destination: "/top",
        permanent: false, // まずは false 推奨（301ではなく302）
      },
    ];
  },
};

export default nextConfig;
