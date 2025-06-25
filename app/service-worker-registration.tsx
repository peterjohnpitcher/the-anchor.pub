'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Only register in production
      if (process.env.NODE_ENV === 'production') {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/sw.js')
            .then((registration) => {
              console.log('Service Worker registered successfully:', registration.scope)
              
              // Check for updates periodically
              setInterval(() => {
                registration.update()
              }, 60 * 60 * 1000) // Check every hour
              
              // Handle updates
              registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing
                if (newWorker) {
                  newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                      // New content is available
                      console.log('New content available, please refresh.')
                      // You could show a notification to the user here
                    }
                  })
                }
              })
            })
            .catch((error) => {
              console.error('Service Worker registration failed:', error)
            })
        })
      }
    }
  }, [])

  return null
}