import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import { LocalBusinessJsonLd } from 'next-seo'
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
        <LocalBusinessJsonLd
          type="LocalBusiness"
          id="https://chimacoffee.vercel.app"
          name="Chima Coffee"
          description="Experience the finest coffee at Chima Coffee. From rich espressos to delicious pastries, enjoy quality brews in a cozy atmosphere."
          url="https://chimacoffee.vercel.app"
          telephone="+1-234-567-890"
          address={{
            streetAddress: "123 Coffee Street",
            addressLocality: "Brew City",
            addressRegion: "Coffee Land",
            postalCode: "12345",
            addressCountry: "US",
          }}
          geo={{
            latitude: "40.7128",
            longitude: "-74.0060",
          }}
          images={["https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=800"]}
          openingHours={[
            {
              opens: "07:00",
              closes: "19:00",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
            },
          ]}
        />
        {children}
      </body>
    </html>
  )
}