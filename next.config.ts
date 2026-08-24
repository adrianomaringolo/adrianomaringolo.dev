import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Disable React profiling in development to avoid performance measurement errors
  reactStrictMode: true,

  // Image optimization
  images: {
    // A single format halves the transformation count per source image
    // (Vercel bills per unique width x format combination).
    formats: ['image/webp'],
    // Trimmed to the widths actually requested across the site's `sizes`
    // props (thumbnails at 64-288px, full-bleed heroes up to ~2560px).
    deviceSizes: [640, 828, 1200, 1920, 2560],
    imageSizes: [64, 96, 256, 384],
    // Cache each transformed variant for 31 days instead of re-optimizing
    // on every cache expiry.
    minimumCacheTTL: 2678400,
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
