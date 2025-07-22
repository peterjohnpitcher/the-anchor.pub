import type { Metadata } from 'next'
import { Outfit, Merriweather } from 'next/font/google'
import './globals.css'
import { WebVitals } from './web-vitals'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Weather } from '@/components/Weather'
import { HeaderStatusSection } from '@/components/HeaderStatusSection'
import { FloatingActions } from '@/components/FloatingActions'
import { DynamicSchema } from '@/components/DynamicSchema'
import { AnalyticsProvider } from '@/components/AnalyticsProvider'
import { GoogleTagManager, GoogleTagManagerNoscript } from '@/components/GoogleTagManager'
import { GTMProvider, GTMNoscript } from '@/components/GTMProvider'
import { CanonicalLink } from '@/components/CanonicalLink'
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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || ''

  return (
    <html lang="en" className={`${outfit.variable} ${merriweather.variable}`}>
      <head>
        <GoogleTagManager gtmId={gtmId} />
        
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://management.orangejelly.co.uk" />
        <link rel="preconnect" href="https://openweathermap.org" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Favicons and manifest */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#005131" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Canonical URL */}
        <CanonicalLink />
        
        {/* Inline critical CSS to prevent render blocking */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        {/* Next.js handles font preloading automatically when using next/font */}
        {/* Preload critical images */}
        <link 
          rel="preload" 
          as="image" 
          href="/images/page-headers/home/Page Headers - Homepage.jpg"
          type="image/jpeg"
        />
        <link 
          rel="preload" 
          as="image" 
          href="/images/branding/the-anchor-pub-logo-white-transparent.png"
          type="image/png"
        />
        <DynamicSchema />
      </head>
      <body className="font-sans antialiased">
        <GTMNoscript gtmId={gtmId} />
        <GTMProvider gtmId={gtmId}>
          <AnalyticsProvider>
            <WebVitals />
            {/* Skip Navigation Links for Accessibility */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-anchor-gold focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-anchor-gold"
            >
              Skip to main content
            </a>
            <header role="banner">
              <Navigation 
                statusComponent={<HeaderStatusSection />}
                showWeather={false}
              />
            </header>
            <main id="main-content" role="main">
              {children}
            </main>
            <footer role="contentinfo">
              <Footer />
            </footer>
            <FloatingActions />
          </AnalyticsProvider>
        </GTMProvider>
      </body>
    </html>
  )
}