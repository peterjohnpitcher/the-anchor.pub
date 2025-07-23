'use client'

import { useEffect } from 'react'

export default function TestNavigationTracking() {
  useEffect(() => {
    // Listen for navigation_click events in the dataLayer
    if (typeof window !== 'undefined' && window.dataLayer) {
      const originalPush = window.dataLayer.push
      window.dataLayer.push = function(...args) {
        const result = originalPush.apply(window.dataLayer, args)
        
        // Log navigation_click events
        args.forEach(arg => {
          if (arg && arg.event === 'navigation_click') {
            console.log('Navigation Click Event:', {
              label: arg.event_label,
              url: arg.navigation_url,
              level: arg.navigation_level,
              device: arg.device_type,
              linkType: arg.link_type,
              location: arg.click_location,
              timestamp: new Date().toISOString()
            })
          }
        })
        
        return result
      }
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Navigation Tracking Test</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Testing Instructions</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Open the browser console (F12 → Console tab)</li>
          <li>Click on any navigation menu item (desktop or mobile)</li>
          <li>Click on dropdown menu items</li>
          <li>Click on footer navigation links</li>
          <li>Watch the console for navigation_click events</li>
        </ol>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">What's being tracked:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Menu item label:</strong> The text of the clicked link</li>
          <li><strong>Destination URL:</strong> Where the link goes</li>
          <li><strong>Menu level:</strong> main or dropdown</li>
          <li><strong>Device type:</strong> mobile or desktop</li>
          <li><strong>Link type:</strong> internal or external</li>
          <li><strong>Click location:</strong> header, footer, or mobile_menu</li>
        </ul>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">GTM Configuration Needed:</h3>
        <p className="mb-4">To complete the tracking setup, configure a trigger in GTM:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Trigger Type: Custom Event</li>
          <li>Event name: navigation_click</li>
          <li>Variables to capture:
            <ul className="list-circle list-inside ml-6 mt-1">
              <li>event_label</li>
              <li>navigation_url</li>
              <li>navigation_level</li>
              <li>device_type</li>
              <li>link_type</li>
              <li>click_location</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}