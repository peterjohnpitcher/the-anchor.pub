export default function APIStatusPage() {
  const apiKey = process.env.ANCHOR_API_KEY;
  const hasKey = !!apiKey;
  const keyPreview = hasKey ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}` : 'Not configured';
  
  return (
    <div className="container mx-auto px-4 py-8 mt-20 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">API Configuration Status</h1>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-amber-900 mb-4">⚠️ Booking System Status</h2>
        
        <div className="space-y-4 text-amber-800">
          <div>
            <h3 className="font-semibold">Current Status:</h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>✅ API authentication is working correctly</li>
              <li>✅ Event listings and categories are loading</li>
              <li>❌ Booking initiation is failing with "Failed to create confirmation link" error</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold">What This Means:</h3>
            <p className="mt-2">
              The booking system's SMS/confirmation link service appears to be experiencing issues. 
              This is a server-side problem that needs to be resolved by the API provider.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold">Temporary Solution:</h3>
            <p className="mt-2">
              Customers can still book by calling <strong>01753 682707</strong> directly.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">API Configuration</h2>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Base URL:</span>
            <code className="bg-white px-2 py-1 rounded text-sm">https://management.orangejelly.co.uk/api</code>
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">Environment:</span>
            <span>{process.env.NODE_ENV}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">API Key Status:</span>
            <span className={hasKey ? 'text-green-600' : 'text-red-600'}>
              {hasKey ? '✅ Configured' : '❌ Missing'}
            </span>
          </div>
          
          {hasKey && (
            <div className="flex justify-between">
              <span className="font-semibold">API Key:</span>
              <code className="bg-white px-2 py-1 rounded text-sm">{keyPreview}</code>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-green-900 mb-4">✅ Working Features</h2>
        <ul className="list-disc list-inside space-y-1 text-green-800">
          <li>Event listings and search</li>
          <li>Event categories</li>
          <li>Event availability checking</li>
          <li>Event details and information</li>
          <li>Business hours display</li>
        </ul>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> The API uses server-side proxy routes to avoid CORS issues. All client-side requests go through <code className="bg-blue-100 px-1">/api/*</code> routes.
        </p>
      </div>
      
      <div className="mt-8">
        <a 
          href="/api-diagnostics" 
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Run Full API Diagnostics
        </a>
      </div>
    </div>
  )
}