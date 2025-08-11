import type { Metadata } from 'next'
import { BookingWizard } from '@/components/features/BookingWizard'
import { getAvailabilityForNext30Days } from '@/lib/booking-helpers'

export const metadata: Metadata = {
  title: 'Book a Table Online | The Anchor - Stanwell Moor',
  description: 'Book your table at The Anchor in just 2 minutes. Simple booking for our restaurant, Sunday roasts, and special events.',
  keywords: 'book table stanwell moor, restaurant booking, pub reservation, sunday lunch booking',
  openGraph: {
    title: 'Book a Table at The Anchor',
    description: 'Quick and easy table booking. Sunday roasts, regular dining, and special events.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg']
  }
}

export default async function BookPage({
  searchParams
}: {
  searchParams: { step?: string; date?: string; type?: string }
}) {
  // Pre-load availability data on server
  const availabilityData = await getAvailabilityForNext30Days()
  
  // Determine initial step from URL params (for direct linking)
  const initialStep = parseInt(searchParams.step || '1', 10)
  const preselectedDate = searchParams.date
  const bookingType = searchParams.type as 'regular' | 'sunday_roast' | undefined
  
  return (
    <>
      {/* Schema.org markup for AI agents */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FoodEstablishmentReservation",
            "reservationFor": {
              "@type": "FoodEstablishment",
              "name": "The Anchor",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "High Street",
                "addressLocality": "Stanwell Moor",
                "postalCode": "TW19 6AB"
              }
            },
            "url": "https://www.the-anchor.pub/book",
            "potentialAction": {
              "@type": "ReserveAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.the-anchor.pub/api/booking/agent",
                "httpMethod": "POST",
                "encodingType": "application/json"
              },
              "result": {
                "@type": "FoodEstablishmentReservation"
              }
            }
          })
        }}
      />
      
      {/* Hidden form for AI agents - progressive enhancement approach */}
      <noscript>
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Book a Table</h1>
          <form action="/api/booking/submit" method="POST" className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                min={new Date().toISOString().split('T')[0]}
                max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label htmlFor="party_size" className="block text-sm font-medium mb-1">
                Number of People
              </label>
              <input
                type="number"
                id="party_size"
                name="party_size"
                min="1"
                max="20"
                required
                defaultValue="2"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium mb-1">
                Time
              </label>
              <select id="time" name="time" required className="w-full p-2 border rounded">
                <option value="">Select a time</option>
                <option value="12:00">12:00 PM</option>
                <option value="12:30">12:30 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="13:30">1:30 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="14:30">2:30 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="15:30">3:30 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="16:30">4:30 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="17:30">5:30 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="18:30">6:30 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="19:30">7:30 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="20:30">8:30 PM</option>
                <option value="21:00">9:00 PM</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                autoComplete="given-name"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                autoComplete="family-name"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                autoComplete="tel"
                pattern="[0-9+\-\s]+"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email (optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label htmlFor="special_requirements" className="block text-sm font-medium mb-1">
                Special Requirements (optional)
              </label>
              <textarea
                id="special_requirements"
                name="special_requirements"
                rows={3}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-anchor-green text-white py-3 px-6 rounded font-medium hover:bg-anchor-green-dark"
            >
              Book Table
            </button>
          </form>
        </div>
      </noscript>
      
      {/* AI Agent Helper Form - Hidden but parseable */}
      <div 
        data-ai-booking-form="true" 
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      >
        <form id="ai-booking-helper">
          <input type="text" name="ai_date" data-accepts="natural-language" placeholder="tomorrow, next Sunday, January 15" />
          <input type="number" name="ai_party_size" min="1" max="20" />
          <select name="ai_time" data-availability="preloaded">
            {/* Times will be populated based on availability */}
          </select>
          <input type="text" name="ai_booking_type" data-options="regular,sunday_roast" />
        </form>
      </div>
      
      {/* Main Booking Wizard Component */}
      <BookingWizard
        availabilityData={availabilityData}
        initialStep={initialStep}
        preselectedDate={preselectedDate}
        bookingType={bookingType}
      />
    </>
  )
}