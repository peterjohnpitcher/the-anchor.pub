import Image from 'next/image'
import Link from 'next/link'
import { Button, Container, Section, Card, CardBody, Grid, Alert } from '@/components/ui'
import { StatusBar } from '@/components/StatusBar'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { Metadata } from 'next'
import { BusinessHours } from '@/components/BusinessHours'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { findUsPlaceSchema, generateBreadcrumbSchema, generateHowToDirectionsSchema } from '@/lib/enhanced-schemas'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { PhoneLink } from '@/components/PhoneLink'
import { EmailLink } from '@/components/EmailLink'
import { PhoneButton } from '@/components/PhoneButton'
import { DirectionsButton } from '@/components/DirectionsButton'
import { WhatsAppLink } from '@/components/WhatsAppLink'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { SpeakableSchema } from '@/components/seo/SpeakableSchema'
import { SpeakableContent } from '@/components/voice/SpeakableContent'
import { parkingFacilitySchema } from '@/lib/schemas/parking'

export const metadata: Metadata = {
  title: 'Find Us | The Anchor Stanwell Moor | Directions & Parking',
  description: 'Find The Anchor pub in Stanwell Moor, Surrey. Easy directions from Heathrow, M25, Staines, and local areas. Free parking available on Horton Road.',
  keywords: 'anchor pub directions, find anchor stanwell moor, pub near me directions, free parking pub',
  openGraph: {
    title: 'Find The Anchor - Directions & Location',
    description: 'Easy to find pub in Stanwell Moor with free parking. Just 7 minutes from Heathrow.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'Find The Anchor - Directions & Location',
    description: 'Easy to find pub in Stanwell Moor with free parking. Just 7 minutes from Heathrow.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg']
  })
}

export default function FindUsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Find Us', url: '/find-us' }
  ])
  
  const howToFromHeathrowSchema = generateHowToDirectionsSchema(
    "Heathrow Terminal 5",
    "The Anchor Pub",
    [
      "Exit Terminal 5 following signs for M25/A30",
      "At roundabout, take A3044 towards Staines",
      "Continue straight for 1.5 miles through Stanwell",
      "Turn left onto Horton Road",
      "The Anchor is 200 yards on your right",
      "Free parking available on site"
    ]
  )


  return (
    <>
      <SpeakableSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([findUsPlaceSchema, breadcrumbSchema, howToFromHeathrowSchema, parkingFacilitySchema]) }}
      />
      {/* Hero Section */}
      <HeroWrapper
        route="/find-us"
        title="Find The Anchor"
        description="Easy to find, hard to leave!"
        size="small"
        showStatusBar={true}
        tags={[
          { label: "📍 Centre of Stanwell Moor village", variant: "default" },
          { label: "🚗 Free Parking", variant: "success" }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DirectionsButton
              href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor+TW19+6AQ"
              source="find_us_hero"
              variant="primary"
              size="lg"
            >
              📍 Get Directions
            </DirectionsButton>
            <PhoneButton 
              phone="01753682707" 
              source="find_us_hero"
              variant="secondary"
              size="lg"
            >
              📞 Call Us
            </PhoneButton>
          </div>
        }
      />

      {/* Page Title for SEO */}
      <div className="bg-white py-8">
        <Container>
          <PageTitle 
            className="text-center text-anchor-green"
            seo={{ structured: true, speakable: true }}
          >
            Find The Anchor Pub - Directions from Heathrow
          </PageTitle>
        </Container>
      </div>

      {/* Quick Info */}
      <div className="bg-anchor-cream section-spacing-md">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">📍</div>
              <p className="font-bold text-anchor-green">Stanwell Moor</p>
              <p className="text-sm text-gray-700">Surrey TW19 6AQ</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🚗</div>
              <p className="font-bold text-anchor-green">Free Parking</p>
              <p className="text-sm text-gray-700">20 spaces for pub guests</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">✈️</div>
              <p className="font-bold text-anchor-green">Near Heathrow</p>
              <p className="text-sm text-gray-700">7-12 minutes</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🚌</div>
              <p className="font-bold text-anchor-green">Bus Routes</p>
              <p className="text-sm text-gray-700">442</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">📶</div>
              <p className="font-bold text-anchor-green">Free WiFi</p>
              <p className="text-sm text-gray-700">Throughout the pub</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🎱</div>
              <p className="font-bold text-anchor-green">Pool & Darts</p>
              <p className="text-sm text-gray-700">Games available</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">💻</div>
              <p className="font-bold text-anchor-green">Work Friendly</p>
              <p className="text-sm text-gray-700">Tables with plugs</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🎵</div>
              <p className="font-bold text-anchor-green">Entertainment</p>
              <p className="text-sm text-gray-700">Jukebox & more</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">💳</div>
              <p className="font-bold text-anchor-green">Payment</p>
              <p className="text-sm text-gray-700">Cash & all cards inc. Amex</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Address & Contact */}
      <div className="bg-white section-spacing-md">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <SectionHeader
                  title="Our Address"
                />
                <div className="bg-anchor-cream rounded-2xl p-8">
                  <SpeakableContent selector="contact-info" priority="high">
                    <address className="not-italic text-lg space-y-2">
                      <p className="font-bold text-xl text-anchor-green">The Anchor</p>
                      <p>Horton Road</p>
                      <p>Stanwell Moor</p>
                      <p>Surrey</p>
                      <p className="font-bold">TW19 6AQ</p>
                    </address>
                    
                    <div className="mt-6 pt-6 border-t border-gray-300">
                      <p className="font-bold text-anchor-green mb-3">Contact</p>
                      <p className="mb-2">
                        <PhoneLink 
                          phone="01753682707" 
                          source="find_us_contact"
                          className="text-anchor-gold hover:text-anchor-gold-light"
                        />
                      </p>
                      <p className="mb-2">
                        <WhatsAppLink
                          phone="01753682707"
                          source="find_us_page"
                          className="text-anchor-gold hover:text-anchor-gold-light"
                          showIcon={false}
                        >
                          💬 WhatsApp: 01753682707
                        </WhatsAppLink>
                      </p>
                      <p>
                        <EmailLink
                          email="manager@the-anchor.pub"
                          source="find_us_contact"
                          className="text-anchor-gold hover:text-anchor-gold-light"
                          showIcon={true}
                        />
                      </p>
                    </div>
                  </SpeakableContent>
                </div>
              </div>
              
              <div>
                <SectionHeader
                  title="Landmarks"
                />
                <div className="bg-anchor-sand/30 rounded-2xl p-8">
                  <p className="text-lg font-semibold text-anchor-green mb-4">
                    Look out for these landmarks:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-anchor-gold">🏘️</span>
                      <span>Centre of Stanwell Moor village</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-anchor-gold">✈️</span>
                      <span>Under the Heathrow flight path</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-anchor-gold">🚗</span>
                      <span>Free parking for pub guests (20 spaces)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-anchor-gold">🌳</span>
                      <span>Traditional pub building with garden</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-700 italic">
                      "If you can hear the planes, you're close!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Business Hours & Weather */}
            <div className="mt-12">
              <SectionHeader
                title="Hours & Weather"
              />
              <SpeakableContent selector="opening-hours" priority="high">
                <div className="bg-anchor-green/95 rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
                  <BusinessHours variant="condensed" showKitchen={true} showWeather={true} />
                </div>
              </SpeakableContent>
            </div>
          </div>
        </Container>
      </div>

      {/* Directions */}
      <div className="bg-gray-50 section-spacing-md">
        <Container>
          <SectionHeader
            title="Directions from Popular Locations"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* From M25 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl text-anchor-green mb-4">From M25</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Exit Junction 14</li>
                <li>Take A3113 towards Stanwell Moor</li>
                <li>At roundabout, continue straight</li>
                <li>Turn left at Horton Road</li>
                <li>The Anchor is on your right</li>
              </ol>
              <p className="mt-4 text-sm text-gray-700">Journey time: 5 minutes from M25</p>
            </div>

            {/* From Staines */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl text-anchor-green mb-4">From Staines</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Head south on A30</li>
                <li>Turn right onto A3044</li>
                <li>Continue to Stanwell Moor</li>
                <li>Turn right onto Horton Road</li>
                <li>The Anchor is on your right</li>
              </ol>
              <p className="mt-4 text-sm text-gray-700">Journey time: 10 minutes</p>
            </div>

            {/* From Windsor */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl text-anchor-green mb-4">From Windsor</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Take A308 towards Staines</li>
                <li>Join M25 at Junction 13</li>
                <li>Exit at Junction 14</li>
                <li>Follow signs to Stanwell Moor</li>
                <li>Turn left at Horton Road</li>
              </ol>
              <p className="mt-4 text-sm text-gray-700">Journey time: 20 minutes</p>
            </div>

            {/* From Ashford */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl text-anchor-green mb-4">From Ashford</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Head north on A30</li>
                <li>Turn left onto A3044</li>
                <li>Continue through Stanwell</li>
                <li>Turn left onto Horton Road</li>
                <li>The Anchor is on your right</li>
              </ol>
              <p className="mt-4 text-sm text-gray-700">Journey time: 10 minutes</p>
            </div>

            {/* From Heathrow */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl text-anchor-green mb-4">From Heathrow</h3>
              <p className="text-gray-700 mb-3">See our detailed terminal guides:</p>
              <ul className="space-y-2">
                <li><Link href="/near-heathrow/terminal-2" className="text-anchor-gold hover:text-anchor-gold-light">→ From Terminal 2</Link></li>
                <li><Link href="/near-heathrow/terminal-3" className="text-anchor-gold hover:text-anchor-gold-light">→ From Terminal 3</Link></li>
                <li><Link href="/near-heathrow/terminal-4" className="text-anchor-gold hover:text-anchor-gold-light">→ From Terminal 4</Link></li>
                <li><Link href="/near-heathrow/terminal-5" className="text-anchor-gold hover:text-anchor-gold-light">→ From Terminal 5</Link></li>
              </ul>
            </div>

            {/* By Public Transport */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-xl text-anchor-green mb-4">By Bus</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Route 442:</strong> Staines - Stanwell Moor - Heathrow</p>
                <p className="text-sm">Ask driver for The Anchor stop</p>
                <p className="text-sm text-green-600 font-semibold">✓ ULEZ Free Route</p>
              </div>
              <p className="mt-4 text-sm text-gray-700">Regular service throughout the day</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Parking Information */}
      <div className="bg-white section-spacing-md">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Free Parking"
            />
            <div className="bg-anchor-cream rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl mb-3">🚗</div>
                  <h3 className="font-bold text-anchor-green mb-2">20 Spaces</h3>
                  <p className="text-gray-700">Free parking for pub guests</p>
                </div>
                <div>
                  <div className="text-4xl mb-3">♿</div>
                  <h3 className="font-bold text-anchor-green mb-2">Close to Building</h3>
                  <p className="text-gray-700">All spaces are near the entrance</p>
                </div>
                <div>
                  <div className="text-4xl mb-3">🔒</div>
                  <h3 className="font-bold text-anchor-green mb-2">Safe & Lit</h3>
                  <p className="text-gray-700">Well-lit parking area with CCTV</p>
                </div>
              </div>
              <p className="mt-6 text-gray-700 italic">
                Free parking for pub guests. Paid parking for longer term stays coming soon.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Facilities */}
      <div className="bg-anchor-sand/20 section-spacing-md">
        <Container>
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="Our Facilities"
            />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-anchor-green mb-6">Entertainment & Games</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">🎱</span>
                    <span><strong>Pool Table</strong> - Challenge your friends</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">🎯</span>
                    <span><strong>Darts Board</strong> - Professional setup with oche</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">🎵</span>
                    <span><strong>Jukebox</strong> - Wide selection of music</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">🎰</span>
                    <span><strong>Fruit Machine</strong> - Try your luck (18+)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">📺</span>
                    <span><strong>4 TVs</strong> - Terrestrial channels for sports & news</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-anchor-green mb-6">Work & Connectivity</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">📶</span>
                    <span><strong>Free WiFi</strong> - Fast, reliable, no time limits</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">🔌</span>
                    <span><strong>Power Points</strong> - Tables with plugs in dining room</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">☕</span>
                    <span><strong>Quiet Weekdays</strong> - Perfect for remote work</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">🚗</span>
                    <span><strong>Free Parking</strong> - No hourly fees</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">🧳</span>
                    <span><strong>Luggage Storage</strong> - Safe storage for travelers</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">Guest Services</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <span className="text-anchor-gold text-xl mt-1">🐕</span>
                  <div>
                    <strong>Dog Friendly</strong>
                    <p className="text-sm text-gray-700">Water bowls available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-anchor-gold text-xl mt-1">♿</span>
                  <div>
                    <strong>Accessible Entry</strong>
                    <p className="text-sm text-gray-700">Ramp available at back door</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-anchor-gold text-xl mt-1">💳</span>
                  <div>
                    <strong>All Cards Accepted</strong>
                    <p className="text-sm text-gray-700">Including American Express</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-700">
                <strong className="text-anchor-green">Digital Nomad Friendly:</strong> Our dining room is equipped with tables 
                featuring power points, making it perfect for remote workers and digital nomads. Combined with free WiFi 
                and a quiet weekday atmosphere, it's an ideal workspace near Heathrow.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "Is there parking at The Anchor pub?",
            answer: "Yes, The Anchor offers free parking for pub guests. Our car park has 20 spaces available. Paid parking for longer term stays will be available in the future."
          },
          {
            question: "How far is The Anchor from Heathrow Airport?",
            answer: "The Anchor is just 7 minutes from Terminal 5, 15 minutes from Terminals 2 & 3, and 10 minutes from Terminal 4. We're the closest traditional British pub to Heathrow Airport."
          },
          {
            question: "What areas does The Anchor serve?",
            answer: "We serve Stanwell Moor, Staines, Ashford, Feltham, Bedfont, and surrounding Surrey areas. We're also convenient for all Heathrow terminals and nearby hotels."
          },
          {
            question: "Is The Anchor accessible by public transport?",
            answer: "Yes! The 442 bus runs between Staines, Stanwell Moor and Heathrow, stopping nearby. This is a ULEZ-free route, making it an environmentally friendly option."
          },
          {
            question: "Can I walk to The Anchor from nearby hotels?",
            answer: "If you're staying at the Premier Inn Heathrow Terminal 5, we're about a 15-minute walk. From other Heathrow hotels, we recommend a taxi (around £25) or take the 442 bus which stops directly outside the pub."
          },
          {
            question: "What's the best way to find The Anchor?",
            answer: "If using sat nav, our postcode is TW19 6AQ. From the A3044, turn onto Horton Road and we're on your right with free parking available."
          },
          {
            question: "Is The Anchor wheelchair accessible?",
            answer: "The Anchor has a wheelchair ramp available at the back door for step-free access to the main areas. Please note that we do not currently have accessible toilet facilities."
          },
          {
            question: "What payment methods does The Anchor accept?",
            answer: "We accept cash and all major credit and debit cards, including American Express. Whether you're enjoying a meal, drinks, or booking an event, we make payment convenient with multiple options available."
          }
        ]}
        className="bg-gray-50"
      />

      {/* Map CTA */}
      <CTASection
        title="Get Directions"
        description="Use your preferred map service to navigate directly to The Anchor"
        buttons={[
          {
            text: "📍 Google Maps",
            href: "https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor+TW19+6AQ",
            variant: "white",
            external: true,
            isDirections: true,
            directionsSource: "find_us_cta_google"
          },
          {
            text: "📍 Apple Maps",
            href: "https://maps.apple.com/?q=The+Anchor+Stanwell+Moor+TW19+6AQ",
            variant: "white",
            external: true,
            isDirections: true,
            directionsSource: "find_us_cta_apple"
          },
          {
            text: "📍 Waze",
            href: "https://www.waze.com/ul?q=The+Anchor+Stanwell+Moor+TW19+6AQ",
            variant: "white",
            external: true,
            isDirections: true,
            directionsSource: "find_us_cta_waze"
          }
        ]}
        variant="green"
      >
        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
          <p className="font-semibold mb-2">Sat Nav Postcode</p>
          <p className="text-2xl font-bold">TW19 6AQ</p>
        </div>
      </CTASection>
    </>
  )
}