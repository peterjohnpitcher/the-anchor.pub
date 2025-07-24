'use client'

import { useEffect } from 'react'

interface SpeakableSchemaProps {
  selectors?: string[]
}

const defaultSelectors = [
  '.speakable-content',
  '.hero-title',
  '.opening-hours',
  '.contact-info',
  '.special-offers',
  'h1',
  '[data-speakable="true"]'
]

export function SpeakableSchema({ selectors = defaultSelectors }: SpeakableSchemaProps) {
  useEffect(() => {
    // Create and inject the speakable schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": selectors
      }
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      // Clean up on unmount
      document.head.removeChild(script)
    }
  }, [selectors])

  return null
}