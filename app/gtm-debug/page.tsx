'use client'

import { useEffect, useState } from 'react'
import { Section, Button } from '@/components/ui'

export default function GTMDebugPage() {
  const [gtmStatus, setGtmStatus] = useState<{
    loaded: boolean
    containerId: string | null
    dataLayerExists: boolean
    dataLayerEvents: any[]
    error: string | null
  }>({
    loaded: false,
    containerId: null,
    dataLayerExists: false,
    dataLayerEvents: [],
    error: null
  })
  const debugEnabled = process.env.NEXT_PUBLIC_STATUSBAR_DEBUG === 'true'

  useEffect(() => {
    const checkGTM = () => {
      try {
        // Check if dataLayer exists
        const dataLayerExists = typeof window !== 'undefined' && 'dataLayer' in window
        
        // Get dataLayer events
        const dataLayerEvents = dataLayerExists ? (window as any).dataLayer : []
        
        // Check if GTM script is loaded
        const gtmScripts = Array.from(document.querySelectorAll('script')).filter(
          script => script.src.includes('googletagmanager.com')
        )
        
        // Extract container ID from script
        let containerId = null
        if (gtmScripts.length > 0) {
          const match = gtmScripts[0].src.match(/id=(GTM-[A-Z0-9]+)/)
          containerId = match ? match[1] : null
        }
        
        // Check environment variable
        const envContainerId = process.env.NEXT_PUBLIC_GTM_ID
        
        // Log for debugging
        if (debugEnabled) {
          console.debug('[GTMDebug] status', {
            dataLayerExists,
            dataLayerLength: dataLayerEvents.length,
            scriptsFound: gtmScripts.length,
            containerId,
            envContainerId
          })
        }
        
        setGtmStatus({
          loaded: gtmScripts.length > 0,
          containerId: containerId || envContainerId || null,
          dataLayerExists,
          dataLayerEvents,
          error: null
        })
      } catch (error) {
        setGtmStatus(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Unknown error'
        }))
      }
    }

    // Initial check
    checkGTM()

    // Check again after a delay
    const timer = setTimeout(checkGTM, 2000)
    
    // Check periodically
    const interval = setInterval(checkGTM, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [debugEnabled])

  const testDataLayerPush = () => {
    if (typeof window !== 'undefined' && 'dataLayer' in window) {
      (window as any).dataLayer.push({
        event: 'test_event',
        event_category: 'GTM Debug',
        event_label: 'Manual Test',
        timestamp: new Date().toISOString()
      })
      
      // Refresh status after push
      setTimeout(() => {
        setGtmStatus(prev => ({
          ...prev,
          dataLayerEvents: (window as any).dataLayer
        }))
      }, 100)
    }
  }

  return (
    <>
      <Section spacing="sm" container>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-anchor-green">GTM Debug Page</h1>
          <p className="text-sm text-gray-600">
            Inspect Google Tag Manager loading status, dataLayer pushes, and environment configuration. Enable
            `NEXT_PUBLIC_STATUSBAR_DEBUG` to stream console output while testing.
          </p>
        </div>
      </Section>

      <Section spacing="md" container containerSize="md" className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">GTM Status</h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`inline-block w-3 h-3 rounded-full ${gtmStatus.loaded ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-medium">GTM Script Loaded:</span>
              <span>{gtmStatus.loaded ? 'Yes' : 'No'}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`inline-block w-3 h-3 rounded-full ${gtmStatus.dataLayerExists ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-medium">DataLayer Exists:</span>
              <span>{gtmStatus.dataLayerExists ? 'Yes' : 'No'}</span>
            </div>
            
            <div>
              <span className="font-medium">Container ID:</span>
              <span className="ml-2 font-mono">{gtmStatus.containerId || 'Not found'}</span>
            </div>
            
            <div>
              <span className="font-medium">Environment Variable (NEXT_PUBLIC_GTM_ID):</span>
              <span className="ml-2 font-mono">{process.env.NEXT_PUBLIC_GTM_ID || 'Not set'}</span>
            </div>
            
            {gtmStatus.error && (
              <div className="p-3 bg-red-100 text-red-700 rounded">
                Error: {gtmStatus.error}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">DataLayer Events</h2>
          
          <Button onClick={testDataLayerPush} className="mb-4">
            Push Test Event
          </Button>
          
          <div className="max-h-96 overflow-y-auto">
            <pre className="text-xs bg-gray-100 p-4 rounded">
              {JSON.stringify(gtmStatus.dataLayerEvents, null, 2)}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
          
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Check if NEXT_PUBLIC_GTM_ID is set in your .env.local file</li>
            <li>Verify the GTM container ID is correct (GTM-WWFQTQS)</li>
            <li>Check the browser console for any JavaScript errors</li>
            <li>Use GTM Preview mode to debug tag firing</li>
            <li>Check network tab to ensure GTM script is loading (should see gtm.js)</li>
            <li>Verify no ad blockers are preventing GTM from loading</li>
            <li>Check if the GTM container is published (not just saved)</li>
          </ol>
        </div>
      </Section>
    </>
  )
}
