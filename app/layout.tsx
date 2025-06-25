import type { Metadata } from 'next'
import { Outfit, Merriweather } from 'next/font/google'
import './globals.css'
import { organizationSchema, localBusinessSchema, webSiteSchema } from '@/lib/schema'
import { WebVitals } from './web-vitals'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { StatusBar } from '@/components/StatusBar'
import { Weather } from '@/components/Weather'

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const merriweather = Merriweather({ 
  subsets: ['latin'], 
  variable: '--font-merriweather',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://the-anchor.pub'),
  title: {
    default: 'The Anchor Pub Near Me | Heathrow\'s Local Pub | Open Now',
    template: '%s | The Anchor Stanwell Moor'
  },
  description: 'The Anchor pub in Stanwell Moor near Heathrow Airport. Traditional British pub with drag shows, quiz nights & more. Dog-friendly beer garden under the flight path.',
  keywords: ['pub near me', 'pub near Heathrow', 'Stanwell Moor pub', 'drag shows near me', 'pub quiz', 'dog friendly pub', 'beer garden', 'TW19 pub'],
  authors: [{ name: 'The Anchor' }],
  creator: 'The Anchor',
  publisher: 'The Anchor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'The Anchor Pub - Stanwell Moor\'s Premier Entertainment Venue',
    description: 'Traditional British pub near Heathrow with drag shows, live entertainment & great food. Dog-friendly beer garden.',
    url: 'https://the-anchor.pub',
    siteName: 'The Anchor',
    images: [
      {
        url: '/images/venue/the-anchor-pub-exterior-stanwell-moor.jpg',
        width: 1200,
        height: 630,
        alt: 'The Anchor Pub in Stanwell Moor',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Anchor Pub - Near Heathrow Airport',
    description: 'Traditional pub with modern entertainment. Drag shows, quiz nights, great food & more.',
    images: ['/images/venue/the-anchor-pub-exterior-stanwell-moor.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://the-anchor.pub',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${merriweather.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://management.orangejelly.co.uk" />
        <link rel="dns-prefetch" href="https://management.orangejelly.co.uk" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, localBusinessSchema, webSiteSchema])
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <WebVitals />
        <Navigation 
          statusComponent={<StatusBar variant="navigation" />}
          weatherComponent={<Weather variant="compact" theme={{ text: 'text-white' }} />}
        />
        {children}
        <Footer />
      </body>
    </html>
  )
}