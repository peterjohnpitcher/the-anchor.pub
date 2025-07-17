'use client'

import { useState, useEffect } from 'react'
import { anchorAPI } from '@/lib/api'

interface TestResult {
  endpoint: string
  method: string
  status: 'pending' | 'success' | 'error' | 'running'
  message: string
  timestamp: string
  details?: any
}

export default function APIDiagnosticsPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [running, setRunning] = useState(false)
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'present' | 'missing'>('checking')

  useEffect(() => {
    // Check if API key is configured (server-side check)
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setApiKeyStatus(data.apiKeyConfigured ? 'present' : 'missing')
      })
      .catch(() => setApiKeyStatus('missing'))
  }, [])

  const addResult = (result: Omit<TestResult, 'timestamp'>) => {
    setResults(prev => [...prev, {
      ...result,
      timestamp: new Date().toLocaleTimeString()
    }])
  }

  const updateResult = (endpoint: string, update: Partial<TestResult>) => {
    setResults(prev => prev.map(r => 
      r.endpoint === endpoint ? { ...r, ...update } : r
    ))
  }

  const runDiagnostics = async () => {
    setRunning(true)
    setResults([])

    const tests = [
      {
        name: 'Health Check',
        endpoint: '/api/health',
        method: 'GET',
        test: async () => {
          const res = await fetch('/api/health')
          const data = await res.json()
          return { ok: res.ok, status: res.status, data }
        }
      },
      {
        name: 'Events List',
        endpoint: '/api/events',
        method: 'GET',
        test: async () => {
          const res = await fetch('/api/events?limit=5')
          const data = await res.json()
          return { ok: res.ok, status: res.status, data }
        }
      },
      {
        name: 'Event Categories',
        endpoint: '/api/event-categories',
        method: 'GET',
        test: async () => {
          const res = await fetch('/api/event-categories')
          const data = await res.json()
          return { ok: res.ok, status: res.status, data }
        }
      },
      {
        name: 'Today\'s Events',
        endpoint: '/api/events?today=true',
        method: 'GET',
        test: async () => {
          const res = await fetch('/api/events?today=true')
          const data = await res.json()
          return { ok: res.ok, status: res.status, data }
        }
      },
      {
        name: 'Check Availability',
        endpoint: '/api/events/{id}/availability',
        method: 'POST',
        test: async () => {
          // First get an event to test with
          const eventsRes = await fetch('/api/events?limit=1')
          const eventsData = await eventsRes.json()
          
          if (!eventsData.events || eventsData.events.length === 0) {
            return { ok: false, status: 0, data: { error: 'No events found to test with' } }
          }
          
          const eventId = eventsData.events[0].id
          const res = await fetch(`/api/events/${eventId}/availability`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seats: 1 })
          })
          const data = await res.json()
          return { ok: res.ok, status: res.status, data, eventId }
        }
      },
      {
        name: 'Booking Initiation',
        endpoint: '/api/bookings/initiate',
        method: 'POST',
        test: async () => {
          // First get an event to test with
          const eventsRes = await fetch('/api/events?limit=1')
          const eventsData = await eventsRes.json()
          
          if (!eventsData.events || eventsData.events.length === 0) {
            return { ok: false, status: 0, data: { error: 'No events found to test with' } }
          }
          
          const eventId = eventsData.events[0].id
          const res = await fetch('/api/bookings/initiate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event_id: eventId,
              mobile_number: '+447700900123' // Test number
            })
          })
          const data = await res.json()
          return { ok: res.ok, status: res.status, data }
        }
      }
    ]

    for (const test of tests) {
      addResult({
        endpoint: test.endpoint,
        method: test.method,
        status: 'running',
        message: 'Testing...'
      })

      try {
        const result = await test.test()
        
        if (result.ok) {
          updateResult(test.endpoint, {
            status: 'success',
            message: `✅ Success (${result.status})`,
            details: result.data
          })
        } else {
          const errorMsg = result.data?.error || `HTTP ${result.status}`
          updateResult(test.endpoint, {
            status: 'error',
            message: `❌ Failed: ${errorMsg}`,
            details: result.data
          })
        }
      } catch (error: any) {
        updateResult(test.endpoint, {
          status: 'error',
          message: `❌ Exception: ${error.message}`,
          details: { error: error.message }
        })
      }
    }

    setRunning(false)
  }

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return 'text-green-600'
      case 'error': return 'text-red-600'
      case 'running': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">API Diagnostics</h1>
      
      {apiKeyStatus === 'missing' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-red-900 mb-2">⚠️ API Key Not Configured</h2>
          <p className="text-red-800">
            The ANCHOR_API_KEY environment variable is not set. All API calls will fail.
          </p>
          <p className="text-red-800 mt-2">
            Please add your API key to the <code className="bg-red-100 px-1">.env.local</code> file:
          </p>
          <pre className="bg-red-100 p-2 mt-2 rounded text-sm">
            ANCHOR_API_KEY=your_api_key_here
          </pre>
        </div>
      )}
      
      <div className="mb-8 bg-gray-100 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">System Information</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold">API Base URL:</span>
            <code className="bg-white px-2 py-1 rounded">https://management.orangejelly.co.uk/api</code>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Environment:</span>
            <span>{process.env.NODE_ENV}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">API Key Status:</span>
            <span className={apiKeyStatus === 'present' ? 'text-green-600' : 'text-red-600'}>
              {apiKeyStatus === 'checking' ? '⏳ Checking...' : 
               apiKeyStatus === 'present' ? '✅ Configured' : '❌ Missing'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Current Time:</span>
            <span>{new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</span>
          </div>
        </div>
      </div>

      <button
        onClick={runDiagnostics}
        disabled={running || apiKeyStatus === 'missing'}
        className="mb-8 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {running ? 'Running Diagnostics...' : 'Run API Diagnostics'}
      </button>

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Test Results</h2>
          
          {results.map((result, index) => (
            <div key={index} className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-semibold">{result.method}</span>
                  <code className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">{result.endpoint}</code>
                </div>
                <span className="text-xs text-gray-500">{result.timestamp}</span>
              </div>
              
              <p className={`mt-2 ${getStatusColor(result.status)}`}>
                {result.message}
              </p>
              
              {result.details && result.status === 'error' && (
                <div className="mt-3 bg-red-50 p-3 rounded text-sm">
                  <p className="font-semibold text-red-900 mb-1">Error Details:</p>
                  <pre className="text-red-800 overflow-x-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </div>
              )}
              
              {result.details && result.status === 'success' && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                    View Response Data
                  </summary>
                  <pre className="mt-2 bg-gray-50 p-3 rounded text-xs overflow-x-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-amber-900 mb-4">Common Issues & Solutions</h2>
        
        <div className="space-y-4 text-amber-800">
          <div>
            <h3 className="font-semibold">401 Unauthorized Errors</h3>
            <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
              <li>API key is invalid or has been revoked</li>
              <li>API key lacks necessary permissions (needs <code className="bg-amber-100 px-1">read:events</code>)</li>
              <li>API key has expired</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold">404 Not Found Errors</h3>
            <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
              <li>Event ID doesn't exist</li>
              <li>Endpoint path is incorrect</li>
              <li>API version has changed</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold">405 Method Not Allowed</h3>
            <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
              <li>Using GET instead of POST (check-availability requires POST)</li>
              <li>Missing request body for POST endpoints</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}