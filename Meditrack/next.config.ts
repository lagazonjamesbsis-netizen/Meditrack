import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  cacheComponents: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tosysoik0rjt4ojn.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default nextConfig
