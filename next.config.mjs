/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const csp = [
  "default-src 'self'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  isDev ? 
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'" :
  "script-src 'self' 'unsafe-inline'",
  `connect-src 'self' ${supabaseUrl}`,
].join("; ");

const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: "/",
        destination: "/top",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source : "/:path*",
        headers : [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains;' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: "Content-Security-Policy", value: csp }
        ]
      }
    ]
  },
  allowedDevOrigins: ['127.0.0.1'],
};

export default nextConfig;
