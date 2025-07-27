'use client'

import { useState, useEffect } from 'react'

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

  if (loading) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Business Hours API Test</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
      {data?.success && data?.data && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Current Status</h2>
          <p>Is Open: {data.data.currentStatus?.isOpen ? 'Yes' : 'No'}</p>
          <p>Kitchen Open: {data.data.currentStatus?.kitchenOpen ? 'Yes' : 'No'}</p>
          <p>Closes In: {data.data.currentStatus?.closesIn || 'N/A'}</p>
          <p>Opens In: {data.data.currentStatus?.opensIn || 'N/A'}</p>
        </div>
      )}
    </div>
  )
}