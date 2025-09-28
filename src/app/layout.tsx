import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' })
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://chimacoffee.vercel.app'),
  title: 'Chima Coffee - Premium Coffee & Pastries',
  description: 'Experience the finest coffee at Chima Coffee. From rich espressos to delicious pastries, enjoy quality brews in a cozy atmosphere. Order online for pickup or delivery.',
  keywords: ['coffee', 'espresso', 'latte', 'pastries', 'cafe', 'brew', 'Chima Coffee'],
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
      <body className={`${playfair.className} ${montserrat.className}`}>{children}</body>
    </html>
  )
}