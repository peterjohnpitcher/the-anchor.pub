'use client'

import { useState, useEffect } from 'react'
import { StatusBar } from '@/components/StatusBar'
import { StatusBarSimple } from '@/components/StatusBarSimple'
import { HeaderStatusSectionDirect } from '@/components/HeaderStatusSectionDirect'
import { useBusinessHours } from '@/hooks/useBusinessHours'

export default function DebugHoursPage() {
  const [apiData, setApiData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const { hours, loading, error: hookError } = useBusinessHours()

  useEffect(() => {
    // Direct API call
    fetch('/api/business-hours')
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data)
        setApiData(data)
      })
      .catch(err => {
        console.error('API Error:', err)
        setError(err.message)
      })
  }, [])

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Business Hours Debug</h1>
      
      <div>
        <h2 className="text-xl font-bold mb-2">StatusBar Component (navigation variant)</h2>
        <StatusBar variant="navigation" />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">StatusBar Component (default variant)</h2>
        <StatusBar />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">StatusBarSimple Component (navigation)</h2>
        <StatusBarSimple variant="navigation" />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">HeaderStatusSectionDirect Component</h2>
        <HeaderStatusSectionDirect />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">useBusinessHours Hook</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
          {JSON.stringify({ hours, loading, error: hookError }, null, 2)}
        </pre>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Direct API Response</h2>
        {error && <p className="text-red-600">Error: {error}</p>}
        {apiData && (
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(apiData, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}