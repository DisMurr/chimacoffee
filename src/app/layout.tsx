import type { Metadata } from 'next'
import { CartProvider } from '../context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' })
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://chimacoffee.vercel.app'),
  title: 'Chima Coffee - Premium Coffee & Pastries | Luxury Cafe Experience',
  description: 'Experience the finest coffee at Chima Coffee. From rich espressos to delicious pastries, enjoy quality brews in a cozy atmosphere. Order online for pickup or delivery.',
  keywords: ['luxury coffee shop', 'premium coffee', 'espresso', 'latte', 'artisan pastries', 'cafe', 'brew', 'Chima Coffee', 'coffee delivery', 'fresh pastries', 'sustainable coffee'],
  authors: [{ name: 'Chima Coffee' }],
  openGraph: {
    title: 'Chima Coffee - Premium Coffee & Pastries',
    description: 'Experience the finest coffee at Chima Coffee. From rich espressos to delicious pastries, enjoy quality brews in a cozy atmosphere.',
    url: 'https://chimacoffee.vercel.app',
    siteName: 'Chima Coffee',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=800',
        width: 1200,
        height: 800,
        alt: 'Chima Coffee - Premium Coffee Experience',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chima Coffee - Premium Coffee & Pastries',
    description: 'Experience the finest coffee at Chima Coffee. From rich espressos to delicious pastries, enjoy quality brews in a cozy atmosphere.',
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=800'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body className={`${playfair.className} ${montserrat.className}`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
