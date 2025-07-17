import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { Metadata } from 'next'
import { generateBreadcrumbSchema } from '@/lib/enhanced-schemas'
import { CONTACT, BRAND } from '@/lib/constants'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Corporate Venue Near Heathrow | Meeting Room Hire | The Anchor',
  description: 'Professional corporate event venue 7 minutes from Heathrow. Meeting rooms, team building space, free parking. Perfect for business events, conferences, and corporate hospitality.',
  keywords: 'corporate venue near heathrow, meeting room heathrow, conference venue surrey, team building venue near heathrow, business meeting room staines, corporate events stanwell moor',
  openGraph: {
    title: 'Corporate Events & Meeting Rooms - The Anchor',
    description: 'Professional venue for business events near Heathrow. Free parking, flexible spaces, experienced team.',
    images: ['/images/events/corporate/the-anchor-meeting-room.jpg'],
  },
}

// TODO: Add corporateEventSchema when generateEventSchema is available
const corporateEventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Corporate Events at The Anchor",
  description: "Professional venue for business meetings, conferences, team building, and corporate hospitality near Heathrow Airport",
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  location: {
    "@type": "Place",
    name: "The Anchor",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Horton Road",
      addressLocality: "Stanwell Moor",
      addressRegion: "Surrey",
      postalCode: "TW19 6AQ"
    }
  },
  offers: {
    "@type": "Offer",
    price: "150",
    priceCurrency: "GBP",
    description: "Corporate packages from £150 minimum spend"
  }
}

export default function CorporateEventsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Private Events', url: '/book-event' },
    { name: 'Corporate Events', url: '/corporate-events' }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([corporateEventSchema, breadcrumbSchema]) }}
      />
      
      {/* Hero Section */}
      <HeroWrapper
        route="/corporate-events"
        title="Corporate Event Venue Near Heathrow"
        description="Professional meeting spaces and business event hosting 7 minutes from Terminal 5"
        size="large"
        showStatusBar={false}
        tags={[
          { label: "✈️ 7 mins from Heathrow", variant: "success" },
          { label: "🚗 Free Parking", variant: "default" },
          { label: "📊 AV Equipment", variant: "default" },
          { label: "🚫 Outside ULEZ", variant: "success" }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallToAction 
              href={`tel:${CONTACT.phone}`}
              variant="primary"
              size="lg"
            >
              📞 Discuss Your Event
            </CallToAction>
            <CallToAction 
              href="#packages"
              variant="secondary"
              size="lg"
            >
              💼 View Corporate Packages
            </CallToAction>
          </div>
        }
      />

      {/* Why Choose The Anchor for Business */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Why Leading Companies Choose The Anchor"
            subtitle="The smart choice for business events near Heathrow"
          />
          
          <FeatureGrid
            columns={4}
            features={[
              {
                icon: "✈️",
                title: "Heathrow Proximity",
                description: "7 minutes from T5 - perfect for international teams & clients",
                className: "text-center"
              },
              {
                icon: "🚗",
                title: "Free Parking",
                description: "20 spaces on-site - saves £££ compared to city venues",
                className: "text-center"
              },
              {
                icon: "💷",
                title: "No Venue Fee",
                description: "No hire charges - just straightforward minimum spend",
                className: "text-center"
              },
              {
                icon: "🏢",
                title: "Flexible Spaces",
                description: "Configure for 10-200 guests - meetings to conferences",
                className: "text-center"
              }
            ]}
            className="mb-12"
          />

          <InfoBoxGrid
            columns={2}
            boxes={[
              {
                title: "Perfect Location for Business",
                content: (
                  <>
                    <p className="mb-4">Strategic advantages for your corporate events:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Outside ULEZ zone</strong> - no charges for attendees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>M25 Junction 14</strong> - 3 minutes away</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Heathrow hotels</strong> - 5-10 minutes for overnight guests</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Central location</strong> - accessible from London & Surrey</span>
                      </li>
                    </ul>
                  </>
                ),
                variant: "colored",
                color: "bg-blue-50"
              },
              {
                title: "Professional Service",
                content: (
                  <>
                    <p className="mb-4">Everything you need for successful business events:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Dedicated event coordinator</strong> for seamless planning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Professional catering</strong> from working breakfasts to formal dinners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Tech support</strong> for presentations and video calls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Flexible timings</strong> - early starts and late finishes available</span>
                      </li>
                    </ul>
                  </>
                ),
                variant: "colored",
                color: "bg-green-50"
              }
            ]}
          />
        </div>
      </section>

      {/* Event Types */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Corporate Event Solutions"
            subtitle="From board meetings to company celebrations"
          />
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-anchor-green mb-3">Business Meetings</h3>
              <p className="text-gray-700 mb-4">
                Private space for confidential discussions, client meetings, and presentations. 
                Configurable for boardroom or theatre style.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 10-50 attendees</li>
                <li>• Presentation facilities</li>
                <li>• WiFi & power points</li>
                <li>• Coffee & refreshments</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-anchor-green mb-3">Team Building</h3>
              <p className="text-gray-700 mb-4">
                Bring your team together for workshops, training sessions, and team building 
                activities in a relaxed environment.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Interactive spaces</li>
                <li>• Breakout areas</li>
                <li>• Team lunch options</li>
                <li>• Evening social space</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-anchor-green mb-3">Corporate Hospitality</h3>
              <p className="text-gray-700 mb-4">
                Impress clients and reward staff with corporate entertainment, celebrations, 
                and networking events.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Client entertainment</li>
                <li>• Awards ceremonies</li>
                <li>• Product launches</li>
                <li>• Networking events</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 max-w-4xl mx-auto">
            <AlertBox
              variant="info"
              title="Also Perfect For:"
              content={
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <ul className="space-y-1">
                    <li>• AGMs and shareholder meetings</li>
                    <li>• Training workshops and seminars</li>
                    <li>• Sales conferences and kick-offs</li>
                    <li>• Executive away days</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Recruitment assessment centres</li>
                    <li>• Company milestone celebrations</li>
                    <li>• Retirement parties</li>
                    <li>• Long service awards</li>
                  </ul>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Corporate Packages */}
      <section id="packages" className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Corporate Event Packages"
            subtitle="Flexible options to suit your business needs and budget"
          />
          
          <InfoBoxGrid
            columns={3}
            boxes={[
              {
                title: "Half Day Meeting",
                content: (
                  <>
                    <p className="text-lg font-semibold text-anchor-gold mb-4">Morning or Afternoon Sessions</p>
                    <ul className="space-y-2 mb-4">
                      <li>✓ 4 hours venue use</li>
                      <li>✓ Meeting room setup</li>
                      <li>✓ Tea/coffee on arrival</li>
                      <li>✓ Mid-session refreshments</li>
                      <li>✓ WiFi & AV facilities</li>
                      <li>✓ Free parking</li>
                      <li>✓ 15-30 guests</li>
                    </ul>
                    <CallToAction href={`tel:${CONTACT.phone}`} variant="primary" fullWidth>
                      Get Quote
                    </CallToAction>
                  </>
                ),
                variant: "default"
              },
              {
                title: "Full Day Package",
                content: (
                  <>
                    <div className="absolute top-0 right-0 bg-anchor-gold text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">Most Popular</div>
                    <p className="text-3xl font-bold text-anchor-green mb-2">£300</p>
                    <p className="text-gray-600 mb-4">minimum spend</p>
                    <ul className="space-y-2 mb-4">
                      <li>✓ 8 hours venue use</li>
                      <li>✓ Flexible room layouts</li>
                      <li>✓ Arrival refreshments</li>
                      <li>✓ Working lunch included</li>
                      <li>✓ Afternoon refreshments</li>
                      <li>✓ Full AV support</li>
                      <li>✓ Breakout spaces</li>
                      <li>✓ Up to 50 guests</li>
                    </ul>
                    <CallToAction href={`tel:${CONTACT.phone}`} variant="primary" fullWidth>
                      Book Full Day
                    </CallToAction>
                  </>
                ),
                variant: "default",
                className: "relative border-2 border-anchor-gold"
              },
              {
                title: "Conference & Events",
                content: (
                  <>
                    <p className="text-3xl font-bold text-anchor-green mb-2">£500+</p>
                    <p className="text-gray-600 mb-4">tailored quote</p>
                    <ul className="space-y-2 mb-4">
                      <li>✓ Full venue access</li>
                      <li>✓ Multiple room options</li>
                      <li>✓ Welcome reception</li>
                      <li>✓ Full catering service</li>
                      <li>✓ Bar facilities</li>
                      <li>✓ Evening options</li>
                      <li>✓ Dedicated coordinator</li>
                      <li>✓ 50-200 guests</li>
                    </ul>
                    <CallToAction href={`tel:${CONTACT.phone}`} variant="primary" fullWidth>
                      Get Quote
                    </CallToAction>
                  </>
                ),
                variant: "default"
              }
            ]}
          />

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 mb-6">
              All packages can be customized. No hidden venue hire fees - just minimum spend requirements.
            </p>
            <CallToAction href="/food-menu" variant="secondary" size="lg">
              View Catering Options
            </CallToAction>
          </div>
        </div>
      </section>

      {/* Facilities & Amenities */}
      <section className="section-spacing bg-anchor-cream">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Professional Facilities"
            subtitle="Everything you need for productive business events"
          />
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-anchor-green mb-4">Technology & Equipment</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">📡</span>
                    <div>
                      <strong>High-speed WiFi</strong>
                      <p className="text-sm text-gray-600">Reliable connection for video calls and presentations</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🖥️</span>
                    <div>
                      <strong>Presentation Equipment</strong>
                      <p className="text-sm text-gray-600">Projector/screen available, laptop connections</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🔌</span>
                    <div>
                      <strong>Power Access</strong>
                      <p className="text-sm text-gray-600">Multiple power points for devices</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🎤</span>
                    <div>
                      <strong>Audio System</strong>
                      <p className="text-sm text-gray-600">Microphone and speakers for larger groups</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-anchor-green mb-4">Comfort & Convenience</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🌡️</span>
                    <div>
                      <strong>Climate Control</strong>
                      <p className="text-sm text-gray-600">Air conditioning and heating for year-round comfort</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">💡</span>
                    <div>
                      <strong>Natural Light</strong>
                      <p className="text-sm text-gray-600">Bright spaces with blackout options available</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">♿</span>
                    <div>
                      <strong>Full Accessibility</strong>
                      <p className="text-sm text-gray-600">Wheelchair access and accessible facilities</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold text-xl">🚻</span>
                    <div>
                      <strong>Private Facilities</strong>
                      <p className="text-sm text-gray-600">Dedicated restrooms for your event</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-anchor-green mb-4 text-center">Additional Services</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">📋</div>
                  <h4 className="font-semibold mb-1">Event Planning</h4>
                  <p className="text-sm text-gray-600">Dedicated coordinator to manage every detail</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🍽️</div>
                  <h4 className="font-semibold mb-1">Bespoke Catering</h4>
                  <p className="text-sm text-gray-600">Menus tailored to your requirements</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎪</div>
                  <h4 className="font-semibold mb-1">Outdoor Options</h4>
                  <p className="text-sm text-gray-600">Garden space for breaks or evening BBQs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Location Advantages */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Strategic Location for Business"
            />
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-anchor-sand/20 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Quick Access From</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>🏢 <strong>Heathrow Business Parks:</strong> 5-10 mins</li>
                  <li>🏨 <strong>Heathrow Hotels:</strong> 5-10 mins</li>
                  <li>🌆 <strong>Central London:</strong> 45 mins</li>
                  <li>🏛️ <strong>Staines:</strong> 8 mins</li>
                  <li>🏰 <strong>Windsor:</strong> 15 mins</li>
                  <li>🌳 <strong>Woking:</strong> 20 mins</li>
                </ul>
              </div>
              
              <div className="bg-anchor-sand/20 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Transport Links</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>🚗 <strong>M25 Junction 14:</strong> 3 mins</li>
                  <li>✈️ <strong>Heathrow T5:</strong> 7 mins</li>
                  <li>🚂 <strong>Staines Station:</strong> 10 mins</li>
                  <li>🚌 <strong>Local Bus Routes:</strong> Regular service</li>
                  <li>🚕 <strong>Taxi/Uber:</strong> Readily available</li>
                  <li>🚗 <strong>Free Parking:</strong> 20 spaces</li>
                </ul>
              </div>
            </div>
            
            <AlertBox
              variant="success"
              title="Cost Savings for Your Business"
              content={
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <strong>No ULEZ Charges</strong>
                    <p className="text-sm">Save £12.50 per attendee</p>
                  </div>
                  <div>
                    <strong>Free Parking</strong>
                    <p className="text-sm">Save £20-40 per day</p>
                  </div>
                  <div>
                    <strong>No Venue Hire Fee</strong>
                    <p className="text-sm">Save £200-500+</p>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "What makes The Anchor ideal for corporate events near Heathrow?",
            answer: "We're just 7 minutes from Terminal 5 with free parking, making us perfect for international teams. We offer flexible spaces for 10-200 guests, professional catering, and no venue hire fees - just minimum spend. Being outside the ULEZ zone saves your attendees money too."
          },
          {
            question: "What technology and equipment do you provide for business meetings?",
            answer: "We provide high-speed WiFi, projector and screen, audio system with microphones, and multiple power points throughout our spaces. We can also arrange additional AV equipment through our suppliers if needed."
          },
          {
            question: "Can you accommodate different types of corporate events?",
            answer: "Yes! We regularly host board meetings, training workshops, team building days, product launches, corporate celebrations, conferences, and networking events. Our spaces are flexible and can be configured to suit your needs."
          },
          {
            question: "What are your corporate catering options?",
            answer: "We offer everything from working breakfasts and coffee breaks to buffet lunches and formal dinners. All menus can be customized to your requirements and dietary needs. We also provide drinks packages and bar tabs."
          },
          {
            question: "Is there a venue hire fee for corporate events?",
            answer: "No venue hire fees! We work on a minimum spend basis which varies depending on the day, time, and size of your event. This typically starts from £150 for small meetings."
          },
          {
            question: "How early can we access the venue for setup?",
            answer: "We're flexible with access times. For full-day events, you can typically access the venue from 8am. Earlier access can be arranged if needed. We'll work around your schedule."
          },
          {
            question: "Do you have experience with international business guests?",
            answer: "Absolutely. Our proximity to Heathrow means we regularly host international teams. We understand the needs of global businesses and can accommodate different time zones, dietary requirements, and cultural preferences."
          },
          {
            question: "Can we book regular corporate events?",
            answer: "Yes, many businesses use us for regular meetings, training sessions, or team events. We can arrange preferential rates for regular bookings and ensure consistency in setup and service."
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <CTASection
        title="Plan Your Corporate Event Today"
        description="Professional venue • Strategic location • No hidden fees"
        buttons={[
          {
            text: "📞 Call: 01753 682707",
            href: "tel:01753682707",
            variant: "white"
          },
          {
            text: "💬 WhatsApp Us",
            href: "https://wa.me/441753682707?text=Hi,%20I'd%20like%20to%20enquire%20about%20corporate%20events",
            variant: "secondary"
          },
          {
            text: "📧 Email Enquiry",
            href: "mailto:manager@the-anchor.pub?subject=Corporate Event Enquiry",
            variant: "outline",
            className: "!text-white !border-white hover:!bg-white hover:!text-blue-600"
          }
        ]}
        variant="dark"
      >
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
          <p className="text-white text-center text-lg">
            <strong>Quick Response Guaranteed</strong><br />
            We understand business moves fast. We'll respond to your enquiry within 2 hours during business hours.
          </p>
        </div>
      </CTASection>
    </>
  )
}