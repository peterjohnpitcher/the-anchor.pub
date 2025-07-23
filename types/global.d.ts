// Global type declarations for The Anchor website

// Google Tag Manager data layer
interface Window {
  dataLayer?: Array<Record<string, any>>
  gtag?: (
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date,
    config?: Record<string, any>
  ) => void
}

// Ensure TypeScript recognizes the global Window interface extension
declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
  }
}

export {}