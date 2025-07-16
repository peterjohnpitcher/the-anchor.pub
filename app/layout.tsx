import type { Metadata } from 'next'
import { Outfit, Merriweather } from 'next/font/google'
import './globals.css'
import { WebVitals } from './web-vitals'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { StatusBar } from '@/components/StatusBar'
import { Weather } from '@/components/Weather'
import { FloatingActions } from '@/components/FloatingActions'
import { organizationSchema, localBusinessSchema, webSiteSchema } from '@/lib/schema'
import { AnalyticsProvider } from '@/components/AnalyticsProvider'
// Critical CSS for above-the-fold content
const criticalCSS = `
/* Critical CSS for above-the-fold content */
:root {
  --anchor-green: #005131;
  --anchor-gold: #a57626;
  --anchor-cream: #faf8f3;
  --anchor-charcoal: #1a1a1a;
  --anchor-gold-light: #d4a574;
  --anchor-green-dark: #003d25;
  --anchor-warm-white: #ffffff;
  --anchor-sage: #7a8b7f;
  --anchor-sand: #f5e6d3;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  background: var(--anchor-warm-white);
}

body {
  color: var(--anchor-charcoal);
  font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
  font-weight: 400;
  line-height: 1.7;
}

/* Critical hero section styles */
.relative { position: relative; }
.absolute { position: absolute; }
.inset-0 { inset: 0; }
.z-10 { z-index: 10; }
.min-h-\[90vh\] { min-height: 90vh; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.text-center { text-align: center; }
.object-cover { object-fit: cover; }

/* Critical text styles */
.text-white { color: white; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }

@media (min-width: 768px) {
  .md\:text-6xl { font-size: 3.75rem; line-height: 1; }
}

@media (min-width: 1024px) {
  .lg\:text-7xl { font-size: 4.5rem; line-height: 1; }
}

/* Prevent layout shift */
.min-h-\[44px\] { min-height: 44px; }
.h-\[44px\] { height: 44px; }
.w-\[280px\] { width: 280px; }
.h-\[300px\] { height: 300px; }

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
  adjustFontFallback: true,
})

const merriweather = Merriweather({ 
  subsets: ['latin'], 
  variable: '--font-merriweather',
  weight: ['400'],
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://the-anchor.pub'),
  title: {
    default: 'Traditional Pub Near Me | The Anchor Stanwell Moor | Surrey Pub Near Heathrow',
    template: '%s | The Anchor Stanwell Moor'
  },
  description: 'The Anchor pub in Stanwell Moor, Surrey\'s best kept secret near Heathrow Airport. Traditional British pub with drag shows, quiz nights & more. Dog-friendly beer garden under the flight path.',
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
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://management.orangejelly.co.uk" />
        <link rel="dns-prefetch" href="https://management.orangejelly.co.uk" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#005131" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, localBusinessSchema, webSiteSchema])
          }}
          defer
        />
      </head>
      <body className="font-sans antialiased">
        <AnalyticsProvider>
          <WebVitals />
          <Navigation 
            statusComponent={<StatusBar variant="navigation" />}
            weatherComponent={<Weather variant="compact" theme={{ text: 'text-white' }} />}
          />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <FloatingActions />
        </AnalyticsProvider>
      </body>
    </html>
  )
}