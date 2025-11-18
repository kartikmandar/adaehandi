import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode (catches issues early)
  reactStrictMode: true,

  // Experimental features
  experimental: {
    // Typed routes for type-safe navigation
    typedRoutes: true,
  },

  // Image optimization configuration
  images: {
    // Modern formats (AVIF is smaller than WebP)
    formats: ['image/avif', 'image/webp'],
    // Responsive image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Will add domains later for external images
    remotePatterns: [],
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false, // Remove X-Powered-By header (security)
}

export default nextConfig
