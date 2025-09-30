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
    unoptimized: process.env.NEXT_IMAGE_UNOPTIMIZED === 'true',
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      // Allow inline styles due to Tailwind injector; prefer hashing if possible
      "style-src 'self' 'unsafe-inline' https:",
      "style-src-elem 'self' 'unsafe-inline' https:",
  // hCaptcha, GA, Stripe scripts and frames
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.hcaptcha.com https://www.googletagmanager.com https://js.stripe.com",
  "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://js.hcaptcha.com https://www.googletagmanager.com https://js.stripe.com",
  "frame-src 'self' https://hcaptcha.com https://*.hcaptcha.com https://js.stripe.com",
      // images from allowed domains
      "img-src 'self' data: https:",
  // connect for API calls
  "connect-src 'self' https: wss: https://api.stripe.com https://m.stripe.com https://m.stripe.network https://js.stripe.com",
      // fonts
      "font-src 'self' data: https:",
      // manifest
      "manifest-src 'self'",
      // disallow everything else by default
    ].join('; ');
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
