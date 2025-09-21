'use client'

import { useState, useEffect } from 'react'
import { Section } from '@/components/ui'

export default function TestHoursPage() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/business-hours')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <Section spacing="md" container>
        <p>Loading business hours…</p>
      </Section>
    )
  }

  if (error) {
    return (
      <Section spacing="md" container>
        <p className="text-red-600">Error: {error}</p>
      </Section>
    )
  }

  return (
    <Section spacing="md" container containerSize="md" className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-anchor-green mb-2">Business Hours API Test</h1>
        <p className="text-sm text-gray-600">
          Snapshot of `/api/business-hours` including derived open/close status.
        </p>
      </div>
      <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
      {data?.success && data?.data && (
        <div className="space-y-1">
          <h2 className="text-xl font-bold">Current Status</h2>
          <p>Is Open: {data.data.currentStatus?.isOpen ? 'Yes' : 'No'}</p>
          <p>Kitchen Open: {data.data.currentStatus?.kitchenOpen ? 'Yes' : 'No'}</p>
          <p>Closes In: {data.data.currentStatus?.closesIn || 'N/A'}</p>
          <p>Opens In: {data.data.currentStatus?.opensIn || 'N/A'}</p>
        </div>
      )}
    </Section>
  )
}
