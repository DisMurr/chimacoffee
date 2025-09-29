/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'eebtypurwmrmdpmvvtcy.supabase.co',
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'source.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'eebtypurwmrmdpmvvtcy.supabase.co', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
