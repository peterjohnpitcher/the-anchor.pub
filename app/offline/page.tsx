import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Offline | The Anchor Pub',
  description: 'You are currently offline. The Anchor pub content will be available when you reconnect.',
}

export default function OfflinePage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-anchor-cream">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="text-6xl mb-4">📡</div>
            <h1 className="text-4xl md:text-5xl font-bold text-anchor-green mb-4">
              You're Offline
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              It looks like you've lost your internet connection. Don't worry, we'll be here when you get back online!
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-anchor-green mb-4">
              While You're Here...
            </h2>
            <div className="text-left space-y-4 text-gray-700">
              <div>
                <h3 className="font-bold text-anchor-gold">📍 Find Us</h3>
                <p>The Anchor, Horton Road, Stanwell Moor, Surrey TW19 6AQ</p>
              </div>
              <div>
                <h3 className="font-bold text-anchor-gold">📞 Call Us</h3>
                <p>01753 682707</p>
              </div>
              <div>
                <h3 className="font-bold text-anchor-gold">🕐 Opening Hours</h3>
                <p>Mon-Thu: 4pm-10pm</p>
                <p>Fri: 4pm-midnight</p>
                <p>Sat: 12pm-midnight</p>
                <p>Sun: 12pm-10pm</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-anchor-gold text-white px-8 py-3 rounded-full font-semibold hover:bg-anchor-gold-light transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}