// Analytics tracking utility
// This provides a centralized way to track events across the application

export type AnalyticsEvent = 
  | { action: 'page_view'; category: 'navigation'; label: string; value?: number }
  | { action: 'click'; category: 'cta' | 'navigation' | 'social' | 'booking'; label: string; value?: number }
  | { action: 'form_submit'; category: 'booking' | 'contact'; label: string; value?: number }
  | { action: 'error'; category: 'booking' | 'api' | 'form'; label: string; value?: number }
  | { action: 'search'; category: 'events' | 'menu'; label: string; value?: number }
  | { action: 'filter'; category: 'events'; label: string; value?: number }
  | { action: 'view_item'; category: 'event' | 'menu_item'; label: string; value?: number }
  | { action: 'share'; category: 'social'; label: string; value?: number }

interface AnalyticsConfig {
  debug?: boolean
  enabled?: boolean
}

class Analytics {
  private config: AnalyticsConfig = {
    debug: process.env.NODE_ENV === 'development',
    enabled: true
  }

  constructor(config?: AnalyticsConfig) {
    if (config) {
      this.config = { ...this.config, ...config }
    }
  }

  track(event: AnalyticsEvent) {
    if (!this.config.enabled) return

    // Log in development
    if (this.config.debug) {
      console.log('[Analytics]', {
        action: event.action,
        category: event.category,
        label: event.label,
        value: event.value,
        timestamp: new Date().toISOString()
      })
    }

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      })
    }

    // Also push to dataLayer for GTM
    if (typeof window !== 'undefined' && 'dataLayer' in window) {
      (window as any).dataLayer.push({
        event: event.action,
        event_category: event.category,
        event_label: event.label,
        value: event.value
      })
    }

    // Send to custom analytics endpoint
    if (typeof window !== 'undefined') {
      // Fire and forget - don't wait for response
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...event,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent
        })
      }).catch(() => {
        // Silently fail - analytics should not break the app
      })
    }
  }

  // Convenience methods
  pageView(page: string) {
    this.track({
      action: 'page_view',
      category: 'navigation',
      label: page
    })
  }

  clickEvent(category: 'cta' | 'navigation' | 'social' | 'booking', label: string, value?: number) {
    this.track({
      action: 'click',
      category,
      label,
      value
    })
  }

  formSubmit(category: 'booking' | 'contact', label: string, value?: number) {
    this.track({
      action: 'form_submit',
      category,
      label,
      value
    })
  }

  error(category: 'booking' | 'api' | 'form', label: string) {
    this.track({
      action: 'error',
      category,
      label
    })
  }

  search(category: 'events' | 'menu', searchTerm: string, resultCount?: number) {
    this.track({
      action: 'search',
      category,
      label: searchTerm,
      value: resultCount
    })
  }

  filter(filterType: string, filterValue: string) {
    this.track({
      action: 'filter',
      category: 'events',
      label: `${filterType}:${filterValue}`
    })
  }

  viewItem(category: 'event' | 'menu_item', itemName: string, itemId?: string | number) {
    this.track({
      action: 'view_item',
      category,
      label: itemName,
      value: typeof itemId === 'number' ? itemId : undefined
    })
  }
}

// Export singleton instance
export const analytics = new Analytics()

// React hook for analytics
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    analytics.pageView(pathname)
  }, [pathname])

  return analytics
}