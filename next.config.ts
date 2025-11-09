/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // زود الحد إلى 10 ميجا
    },
  },
};

export default nextConfig;
