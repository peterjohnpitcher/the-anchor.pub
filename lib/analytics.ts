// Analytics tracking utility
// This provides a centralized way to track events across the application

import { dispatchTrackingEvent } from './tracking/dispatcher'

export type AnalyticsEvent = 
  | { action: 'page_view'; category: 'navigation'; label: string; value?: number }
  | { action: 'click'; category: 'cta' | 'navigation' | 'social' | 'booking'; label: string; value?: number }
  | { action: 'form_submit'; category: 'booking' | 'contact'; label: string; value?: number }
  | { action: 'error'; category: 'booking' | 'api' | 'form'; label: string; value?: number }
  | { action: 'search'; category: 'events' | 'menu'; label: string; value?: number }
  | { action: 'filter'; category: 'events'; label: string; value?: number }
  | { action: 'view_item'; category: 'event' | 'menu_item'; label: string; value?: number }
  | { action: 'share'; category: 'social'; label: string; value?: number }
  | { action: 'phone_call_click'; category: 'phone'; label: string; value?: number; metadata?: Record<string, any> }
  | { action: 'email_click'; category: 'email'; label: string; value?: number; metadata?: Record<string, any> }

interface AnalyticsConfig {
  debug?: boolean
  enabled?: boolean
}

class Analytics {
  private config: AnalyticsConfig = {
    debug: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true',
    enabled: true
  }

  constructor(config?: AnalyticsConfig) {
    if (config) {
      this.config = { ...this.config, ...config }
    }
  }

  track(event: AnalyticsEvent) {
    if (!this.config.enabled) return

    const metadata = 'metadata' in event ? event.metadata : undefined
    const extraData = (metadata && typeof metadata === 'object') ? metadata : undefined

    dispatchTrackingEvent(
      {
        event: event.action,
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...extraData
      },
      { sendToApi: true }
    )
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

  phoneCall(phoneNumber: string, source: string, page?: string) {
    this.track({
      action: 'phone_call_click',
      category: 'phone',
      label: phoneNumber,
      metadata: {
        source,
        page: page || (typeof window !== 'undefined' ? window.location.pathname : undefined),
        timestamp: new Date().toISOString()
      }
    })
  }

  emailClick(email: string, source: string, subject?: string, page?: string) {
    this.track({
      action: 'email_click',
      category: 'email',
      label: email,
      metadata: {
        source,
        subject,
        page: page || (typeof window !== 'undefined' ? window.location.pathname : undefined),
        timestamp: new Date().toISOString()
      }
    })
  }
}

// Export singleton instance
export const analytics = new Analytics()

// Export convenience function for backward compatibility
export function trackEvent(event: AnalyticsEvent) {
  analytics.track(event)
}
