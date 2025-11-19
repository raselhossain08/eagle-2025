/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    // API URL - Required for dynamic payment settings
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    // WordPress Integration
    NEXT_PUBLIC_WORDPRESS_URL: process.env.NEXT_PUBLIC_WORDPRESS_URL,
    NEXT_PUBLIC_WORDPRESS_DISCLAIMER_URL: process.env.NEXT_PUBLIC_WORDPRESS_DISCLAIMER_URL,
    // Contact & YouTube
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    NEXT_PUBLIC_YOUTUBE_THUMBNAIL_BASE_URL: process.env.NEXT_PUBLIC_YOUTUBE_THUMBNAIL_BASE_URL,
    NEXT_PUBLIC_YOUTUBE_BASE_URL: process.env.NEXT_PUBLIC_YOUTUBE_BASE_URL,
    // Note: Payment gateway keys (Stripe, PayPal) are now fetched dynamically from backend API
    // See: src/lib/services/public-payment.service.ts
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const backendUrl = apiUrl.replace('/api', ''); // Remove /api to get base URL

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
