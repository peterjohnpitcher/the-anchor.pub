'use client'

import { useEffect, useState } from 'react'

export default function TestSimplePage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/business-hours')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (!data || !data.success) {
    return <div className="p-8">Error loading data</div>
  }

  const { currentStatus } = data.data

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API is working!</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-bold">Current Status:</h2>
        <p>Bar is: {currentStatus.isOpen ? '✅ OPEN' : '❌ CLOSED'}</p>
        <p>Kitchen is: {currentStatus.kitchenOpen ? '✅ OPEN' : '❌ CLOSED'}</p>
        {currentStatus.closesIn && <p>Closes in: {currentStatus.closesIn}</p>}
        {currentStatus.opensIn && <p>Opens in: {currentStatus.opensIn}</p>}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Full API Response:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  )
}