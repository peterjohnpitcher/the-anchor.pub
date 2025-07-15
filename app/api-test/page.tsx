'use client'

import { useState } from 'react'
import { checkEventAvailability, initiateEventBooking } from '@/lib/api'

export default function APITestPage() {
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testAvailability = async () => {
    setLoading(true)
    addResult('Testing event availability check...')
    
    try {
      // Test with a sample event ID
      const availability = await checkEventAvailability('3d89a6f9-89b9-47e3-8dc8-ede8e143cb8c')
      if (availability) {
        addResult(`✅ Availability check successful: ${availability.remaining} seats available`)
      } else {
        addResult('❌ Availability check returned null')
      }
    } catch (error) {
      addResult(`❌ Availability check failed: ${error}`)
    }
    
    setLoading(false)
  }

  const testBooking = async () => {
    setLoading(true)
    addResult('Testing booking initiation...')
    
    try {
      const response = await initiateEventBooking(
        '3d89a6f9-89b9-47e3-8dc8-ede8e143cb8c',
        '+447700900123'
      )
      if (response) {
        addResult(`✅ Booking initiation successful: ${response.status}`)
      } else {
        addResult('❌ Booking initiation returned null')
      }
    } catch (error) {
      addResult(`❌ Booking initiation failed: ${error}`)
    }
    
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
      
      <div className="space-y-4 mb-8">
        <button
          onClick={testAvailability}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Test Event Availability
        </button>
        
        <button
          onClick={testBooking}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 ml-4"
        >
          Test Booking Initiation
        </button>
      </div>
      
      <div className="bg-gray-100 rounded p-4">
        <h2 className="text-xl font-bold mb-4">Test Results:</h2>
        {results.length === 0 ? (
          <p className="text-gray-500">No tests run yet</p>
        ) : (
          <pre className="whitespace-pre-wrap text-sm">
            {results.join('\n')}
          </pre>
        )}
      </div>
      
      <div className="mt-8 text-sm text-gray-600">
        <p>Environment Check:</p>
        <ul>
          <li>API Base URL: {typeof window === 'undefined' ? 'Server' : 'Client'} mode</li>
          <li>API Key: {process.env.ANCHOR_API_KEY ? '✅ Set' : '❌ Not available (expected on client)'}</li>
        </ul>
      </div>
    </div>
  )
}