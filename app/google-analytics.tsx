'use client'

import Script from 'next/script'

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

// Event tracking helper functions
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Specific event trackers for The Anchor
export const trackPhoneClick = () => {
  trackEvent('click', 'contact', 'phone_number')
}

export const trackDirectionsClick = (from?: string) => {
  trackEvent('click', 'directions', from || 'unknown')
}

export const trackBookingClick = (type: 'table' | 'event') => {
  trackEvent('click', 'booking', type)
}

export const trackMenuView = (section: string) => {
  trackEvent('view', 'menu', section)
}

export const trackEventView = (eventName: string) => {
  trackEvent('view', 'event', eventName)
}

// Conversion tracking
export const trackConversion = (type: 'phone' | 'directions' | 'booking' | 'form_submit') => {
  trackEvent('conversion', type)
}

// Enhanced Ecommerce for menu items (future use)
export const trackMenuItemView = (itemName: string, price: number, category: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'GBP',
      value: price,
      items: [
        {
          item_name: itemName,
          price: price,
          item_category: category,
          quantity: 1
        }
      ]
    })
  }
}

// Custom dimensions for local SEO tracking
export const setUserLocation = (location: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      custom_map: { dimension1: 'user_location' },
      user_location: location
    })
  }
}

// Track which terminal page users visit
export const trackTerminalPageView = (terminal: string) => {
  trackEvent('page_view', 'heathrow_terminal', terminal)
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}