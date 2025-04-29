/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'], // Allow Cloudinary images
    formats: ['image/avif', 'image/webp'], // Enable modern image formats
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  compress: true, // Enable compression for better performance
  poweredByHeader: false, // Remove X-Powered-By header for security
  // Add trailing slash for SEO consistency
  async rewrites() {
    return [
      // Rewrite /blog to /blog/ for SEO consistency
      {
        source: '/blog',
        destination: '/blog/',
      },
    ];
  },
  // Ensure proper canonical URLs
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
