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
    // Make sure these are available at build time
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_PAYPAL_MODE: process.env.NEXT_PUBLIC_PAYPAL_MODE,
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    NEXT_PUBLIC_PAYPAL_SDK_URL: process.env.NEXT_PUBLIC_PAYPAL_SDK_URL,
    PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
    PAYPAL_API: process.env.PAYPAL_API,
    NEXT_PUBLIC_WORDPRESS_URL: process.env.NEXT_PUBLIC_WORDPRESS_URL,
    NEXT_PUBLIC_WORDPRESS_DISCLAIMER_URL: process.env.NEXT_PUBLIC_WORDPRESS_DISCLAIMER_URL,
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    NEXT_PUBLIC_YOUTUBE_THUMBNAIL_BASE_URL: process.env.NEXT_PUBLIC_YOUTUBE_THUMBNAIL_BASE_URL,
    NEXT_PUBLIC_YOUTUBE_BASE_URL: process.env.NEXT_PUBLIC_YOUTUBE_BASE_URL,
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
