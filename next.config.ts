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
  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      // Allow inline styles due to Tailwind injector; prefer hashing if possible
      "style-src 'self' 'unsafe-inline' https:",
      "style-src-elem 'self' 'unsafe-inline' https:",
      // hCaptcha scripts and frames when needed on /admin/login
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.hcaptcha.com https://www.googletagmanager.com",
      "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://js.hcaptcha.com https://www.googletagmanager.com",
      "frame-src 'self' https://hcaptcha.com https://*.hcaptcha.com",
      // images from allowed domains
      "img-src 'self' data: https:",
      // connect for API calls
      "connect-src 'self' https: wss:",
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
