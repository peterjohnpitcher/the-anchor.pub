import { CallToAction } from '@/components/CallToAction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book an Event | The Anchor Stanwell Moor | Private Parties & Functions',
  description: 'Book The Anchor for your private event. Birthday parties, corporate events, wakes, and celebrations. Flexible spaces and custom menus available.',
  keywords: 'book private event stanwell moor, party venue near heathrow, function room hire, birthday party venue',
  openGraph: {
    title: 'Book Your Event at The Anchor',
    description: 'Private parties, functions, and celebrations. We make your event special.',
    images: ['/images/venue/the-anchor-pub-exterior-stanwell-moor.jpg'],
  },
}

export default function BookEventPage() {
  return (
    <>
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-anchor-green to-anchor-green-dark">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Host Your Event at The Anchor
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            From intimate gatherings to large celebrations
          </p>
          
          <CallToAction 
            href="tel:01753682707"
            variant="primary"
            size="lg"
          >
            📞 Call to Discuss: 01753 682707
          </CallToAction>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-4">
              Perfect for Every Occasion
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our flexible spaces and experienced team make any event special
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-6xl mb-4">🎂</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Birthday Parties</h3>
              <p className="text-gray-700">
                Milestone birthdays, surprise parties, or intimate celebrations. 
                Custom decorations and cake arrangements available.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Corporate Events</h3>
              <p className="text-gray-700">
                Team building, Christmas parties, leaving dos, or business meetings. 
                AV equipment and catering options.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">💑</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Celebrations</h3>
              <p className="text-gray-700">
                Engagements, anniversaries, baby showers, or any special occasion. 
                We'll help make it memorable.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">🕊️</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Wakes & Memorials</h3>
              <p className="text-gray-700">
                Respectful and caring service for life celebrations. 
                Flexible catering and private areas available.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">🎄</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Seasonal Parties</h3>
              <p className="text-gray-700">
                Christmas parties, New Year celebrations, or seasonal gatherings. 
                Festive menus and decorations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Private Functions</h3>
              <p className="text-gray-700">
                Reunions, club meetings, or any private gathering. 
                Exclusive use options available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-12 text-center">
              What We Offer
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-anchor-green mb-6">Spaces Available</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <div>
                      <strong>Main Bar Area</strong>
                      <p className="text-gray-600">Up to 80 guests for drinks receptions</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <div>
                      <strong>Restaurant Section</strong>
                      <p className="text-gray-600">Seated dining for up to 60 guests</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <div>
                      <strong>Beer Garden</strong>
                      <p className="text-gray-600">Outdoor space for summer events</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <div>
                      <strong>Exclusive Hire</strong>
                      <p className="text-gray-600">Whole venue for larger events</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-anchor-green mb-6">Services Included</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Dedicated event coordinator</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Custom menu planning</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Buffet or sit-down meal options</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Full bar service</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Background music system</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Free parking for all guests</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Decoration assistance</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Flexible timings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Options */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8">
              Catering Options
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              From finger buffets to three-course meals, we cater to your needs and budget
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">Light Bites</h3>
                <p className="text-gray-700 mb-4">From £8 per person</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Sandwiches & wraps</li>
                  <li>Sausage rolls</li>
                  <li>Crisps & nibbles</li>
                  <li>Tea & coffee</li>
                </ul>
              </div>
              
              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">Hot Buffet</h3>
                <p className="text-gray-700 mb-4">From £15 per person</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Selection of hot dishes</li>
                  <li>Vegetarian options</li>
                  <li>Salads & sides</li>
                  <li>Dessert selection</li>
                </ul>
              </div>
              
              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="font-bold text-xl text-anchor-green mb-3">Formal Dining</h3>
                <p className="text-gray-700 mb-4">From £25 per person</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Three-course meal</li>
                  <li>Table service</li>
                  <li>Choice of mains</li>
                  <li>Coffee & mints</li>
                </ul>
              </div>
            </div>
            
            <p className="mt-8 text-gray-600 italic">
              All menus can be customized. Dietary requirements catered for.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-16 md:py-20 bg-anchor-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-12 text-center">
              How to Book Your Event
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-anchor-gold text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Initial Enquiry</h3>
                  <p className="text-gray-700">
                    Call us on 01753 682707 or email manager@the-anchor.pub with your event details, 
                    preferred date, and approximate numbers.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-anchor-gold text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Discuss Requirements</h3>
                  <p className="text-gray-700">
                    We'll discuss your needs, show you the available spaces, and help plan 
                    your perfect event including menu options and timings.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-anchor-gold text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Confirm Booking</h3>
                  <p className="text-gray-700">
                    Once you're happy with everything, we'll confirm your booking. 
                    A small deposit may be required for larger events.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-anchor-gold text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-xl text-anchor-green mb-2">Enjoy Your Event</h3>
                  <p className="text-gray-700">
                    On the day, our team will ensure everything runs smoothly so you can 
                    relax and enjoy your special occasion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Let's Plan Your Perfect Event
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch today to discuss your requirements and check availability
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="lg"
            >
              📞 Call: 01753 682707
            </CallToAction>
            <CallToAction 
              href="mailto:manager@the-anchor.pub?subject=Event Enquiry"
              variant="white"
              size="lg"
            >
              ✉️ Email Us
            </CallToAction>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <p className="font-semibold mb-2">Office Hours</p>
            <p>Monday - Friday: 10am - 6pm</p>
            <p className="text-sm mt-2">Or leave a message anytime</p>
          </div>
        </div>
      </section>
    </>
  )
}