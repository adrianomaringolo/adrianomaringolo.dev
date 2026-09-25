import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Disable React profiling in development to avoid performance measurement errors
  reactStrictMode: true,

  // Image optimization
  // Vercel's Image Optimization is a separately billed/limited feature
  // (the /_next/image route). Source images are already pre-sized and
  // compressed by hand, so we skip that route entirely and serve them as
  // plain static files — immune to Image Optimization billing or limits.
  images: {
    unoptimized: true,
  },

  // Compression
  compress: true,

  // Headers for better caching
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
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
