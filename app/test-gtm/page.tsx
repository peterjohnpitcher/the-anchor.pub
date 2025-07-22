'use client'

import { useEffect, useState } from 'react'
import { trackPageView, trackPhoneCall } from '@/lib/gtm-events'

export default function TestGTMPage() {
  const [dataLayer, setDataLayer] = useState<any[]>([])
  const [gtmLoaded, setGtmLoaded] = useState(false)

  useEffect(() => {
    // Check GTM status
    const checkGTM = () => {
      if (typeof window !== 'undefined') {
        const hasDataLayer = 'dataLayer' in window
        setGtmLoaded(hasDataLayer)
        
        if (hasDataLayer) {
          setDataLayer([...(window as any).dataLayer])
        }
        
        console.log('Test Page - GTM Check:', {
          hasDataLayer,
          dataLayerLength: hasDataLayer ? (window as any).dataLayer.length : 0
        })
      }
    }

    // Initial check
    checkGTM()

    // Track page view
    trackPageView('/test-gtm', 'GTM Test Page')

    // Set up interval to monitor dataLayer
    const interval = setInterval(checkGTM, 1000)

    return () => clearInterval(interval)
  }, [])

  const triggerTestEvent = () => {
    trackPhoneCall('test-page')
    
    // Also push a custom event
    if (typeof window !== 'undefined' && 'dataLayer' in window) {
      (window as any).dataLayer.push({
        event: 'test_button_click',
        category: 'Test',
        action: 'Button Click',
        label: 'Test GTM Button'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">GTM Test Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">GTM Status</h2>
          <p className="mb-4">
            GTM Loaded: <span className={gtmLoaded ? 'text-green-600' : 'text-red-600'}>
              {gtmLoaded ? 'Yes' : 'No'}
            </span>
          </p>
          <p>DataLayer Events: {dataLayer.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Events</h2>
          <button
            onClick={triggerTestEvent}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Trigger Test Event
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">DataLayer Contents</h2>
          <div className="max-h-96 overflow-y-auto">
            <pre className="text-xs bg-gray-100 p-4 rounded">
              {JSON.stringify(dataLayer, null, 2)}
            </pre>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>Check the browser console for additional debug information.</p>
          <p>This page should show GTM loading and track a page view event.</p>
        </div>
      </div>
    </div>
  )
}