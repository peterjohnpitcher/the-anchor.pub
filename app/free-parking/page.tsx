import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui'
import { HeroWrapper } from '@/components/hero'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { BookTableButton } from '@/components/BookTableButton'
import { PageTitle } from '@/components/ui/typography/PageTitle'

export const metadata: Metadata = {
  title: 'Free Parking Near Heathrow | Park & Dine at The Anchor',
  description: 'FREE parking at The Anchor pub, just 7 minutes from Heathrow. Save £20-40 vs airport parking. 20 spaces, safe location, perfect for pre-flight meals or meetings.',
  keywords: 'free parking near heathrow, free parking stanwell moor, park and dine heathrow, free parking near terminal 5, pub with free parking, restaurant free parking heathrow',
  openGraph: {
    title: 'Free Parking at The Anchor - 7 Minutes from Heathrow',
    description: 'Save on expensive airport parking! Free parking for all customers, just minutes from all terminals.',
    images: ['/images/venue/the-anchor-free-parking.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'Free Parking at The Anchor - 7 Minutes from Heathrow',
    description: 'Save on expensive airport parking! Free parking for all customers, just minutes from all terminals.',
    images: ['/images/venue/the-anchor-free-parking.jpg']
  }),
  alternates: {
    canonical: '/free-parking'
  }
}

const parkingSchema = {
  "@context": "https://schema.org",
  "@type": "ParkingFacility",
  "@id": "https://www.the-anchor.pub/free-parking",
  "name": "The Anchor Free Customer Parking",
  "description": "Free parking for all customers at The Anchor pub. 20 spaces available, well-lit, safe location just 7 minutes from Heathrow Airport.",
  "maximumAttendeeCapacity": 20,
  "isAccessibleForFree": true,
  "publicAccess": true,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Horton Road",
    "addressLocality": "Stanwell Moor",
    "addressRegion": "Surrey",
    "postalCode": "TW19 6AQ",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.4592,
    "longitude": -0.5147
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
      "opens": "12:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Friday", "Saturday"],
      "opens": "12:00",
      "closes": "00:00"
    }
  ],
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Well Lit", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "CCTV Coverage", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Level Access", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Disabled Spaces", "value": true }
  ]
}

export default function FreeParkingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(parkingSchema) }}
      />
      
      {/* Hero Section */}
      <HeroWrapper
        route="/free-parking"
        title="FREE Parking Near Heathrow"
        description="Save £20-40 on airport parking - dine with us instead!"
        size="large"
        showStatusBar={true}
        tags={[
          { label: "🚗 20 FREE Spaces", variant: "success" },
          { label: "✈️ 7 mins to Terminal 5", variant: "warning" },
          { label: "🔒 Safe & Secure", variant: "default" },
          { label: "💷 Save Money", variant: "primary" }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookTableButton
              variant="primary"
              size="lg"
              source="free_parking_hero"
            >
              📅 Book Table & Parking
            </BookTableButton>
            <Link href="https://maps.google.com/?q=The+Anchor+Stanwell+Moor">
              <Button variant="secondary" size="lg">
                📍 Get Directions
              </Button>
            </Link>
          </div>
        }
      >
        <div className="mt-6 bg-green-600/90 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
          <p className="text-white font-bold text-lg text-center">
            💰 Airport Parking: £25-45/day | The Anchor: FREE for all customers!
          </p>
        </div>
      </HeroWrapper>

      {/* Page Title for SEO */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <PageTitle 
            className="text-center text-anchor-green"
            seo={{ structured: true, speakable: true }}
          >
            Free Parking Near Heathrow Airport - The Anchor Pub & Restaurant
          </PageTitle>
        </div>
      </section>

      {/* Parking vs Airport Comparison */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Why Pay for Airport Parking?"
              subtitle="Compare the costs and see how much you save"
            />
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-red-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-red-800 mb-6">❌ Heathrow Parking</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center pb-3 border-b border-red-200">
                    <span>Short Stay (4 hours)</span>
                    <span className="font-bold text-red-600">£22.50</span>
                  </li>
                  <li className="flex justify-between items-center pb-3 border-b border-red-200">
                    <span>Terminal Parking (1 day)</span>
                    <span className="font-bold text-red-600">£39.00</span>
                  </li>
                  <li className="flex justify-between items-center pb-3 border-b border-red-200">
                    <span>Long Stay (1 day)</span>
                    <span className="font-bold text-red-600">£25.00</span>
                  </li>
                  <li className="flex justify-between items-center pb-3 border-b border-red-200">
                    <span>Meet & Greet</span>
                    <span className="font-bold text-red-600">£45.00+</span>
                  </li>
                  <li className="pt-3">
                    <p className="text-sm text-gray-600">Plus: Booking fees, walking distance, shuttle waits</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-green-800 mb-6">✅ The Anchor Parking</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center pb-3 border-b border-green-200">
                    <span>Quick drink/meal</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </li>
                  <li className="flex justify-between items-center pb-3 border-b border-green-200">
                    <span>All-day dining</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </li>
                  <li className="flex justify-between items-center pb-3 border-b border-green-200">
                    <span>Business meetings</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </li>
                  <li className="flex justify-between items-center pb-3 border-b border-green-200">
                    <span>Private events</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </li>
                  <li className="pt-3">
                    <p className="text-sm text-green-700 font-semibold">Plus: Great food, drinks, and atmosphere!</p>
                  </li>
                </ul>
              </div>
            </div>

            <AlertBox
              variant="success"
              title="💡 Smart Choice: Park, Dine & Save"
              className="max-w-4xl mx-auto"
              content={
                <p className="text-center text-lg">
                  Instead of paying £25-45 for airport parking, enjoy a delicious meal with us. 
                  You'll save money AND have a better experience!
                </p>
              }
            />
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Perfect Free Parking For..."
              subtitle="Whatever brings you near Heathrow, we've got you covered"
            />
            
            <div className="grid md:grid-cols-3 gap-6">
              <InfoBoxGrid
                columns={1}
                boxes={[
                  {
                    title: "✈️ Pre-Flight Dining",
                    content: (
                      <div>
                        <p className="text-gray-700 mb-3">
                          Start your journey right with a relaxed meal before your flight. 
                          No rush, no stress, no parking fees.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• 7 mins to Terminal 5</li>
                          <li>• 12 mins to Terminal 2 & 3</li>
                          <li>• 15 mins to Terminal 4</li>
                          <li>• Full menu until 9pm</li>
                        </ul>
                      </div>
                    ),
                    variant: "colored",
                    color: "bg-blue-50"
                  }
                ]}
              />
              
              <InfoBoxGrid
                columns={1}
                boxes={[
                  {
                    title: "🤝 Airport Meetings",
                    content: (
                      <div>
                        <p className="text-gray-700 mb-3">
                          Meet clients or colleagues without expensive airport prices. 
                          Professional, convenient, free parking.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Quiet spaces available</li>
                          <li>• Coffee & refreshments</li>
                          <li>• Business lunch menu</li>
                          <li>• WiFi available</li>
                        </ul>
                      </div>
                    ),
                    variant: "colored",
                    color: "bg-purple-50"
                  }
                ]}
              />
              
              <InfoBoxGrid
                columns={1}
                boxes={[
                  {
                    title: "👋 Pick-ups & Drop-offs",
                    content: (
                      <div>
                        <p className="text-gray-700 mb-3">
                          Avoid airport drop-off charges. Have a coffee while waiting 
                          for arrivals. Check flight status in comfort.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Real-time flight tracking</li>
                          <li>• Comfortable waiting area</li>
                          <li>• Quick access to all terminals</li>
                          <li>• No time restrictions</li>
                        </ul>
                      </div>
                    ),
                    variant: "colored",
                    color: "bg-green-50"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Parking Details */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="Our Free Parking Facilities"
              subtitle="Safe, convenient, and always available"
            />
            
            <FeatureGrid
              columns={4}
              features={[
                {
                  icon: "🚗",
                  title: "20 Spaces",
                  description: "Plenty of room for cars and small vans",
                  className: "text-center"
                },
                {
                  icon: "💡",
                  title: "Well Lit",
                  description: "Security lighting throughout",
                  className: "text-center"
                },
                {
                  icon: "♿",
                  title: "Accessible",
                  description: "Level access and disabled spaces",
                  className: "text-center"
                },
                {
                  icon: "🚪",
                  title: "Direct Entry",
                  description: "Steps from car to pub entrance",
                  className: "text-center"
                },
                {
                  icon: "🕐",
                  title: "No Time Limits",
                  description: "Stay as long as you like",
                  className: "text-center"
                },
                {
                  icon: "📍",
                  title: "Easy to Find",
                  description: "Clear signage from road",
                  className: "text-center"
                },
                {
                  icon: "🔒",
                  title: "Safe Area",
                  description: "Quiet village location",
                  className: "text-center"
                },
                {
                  icon: "🆓",
                  title: "Always Free",
                  description: "No tickets, no apps, no fees",
                  className: "text-center"
                }
              ]}
            />
            
            <div className="mt-12 bg-amber-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-anchor-green mb-4 text-center">
                Distance to Heathrow Terminals
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">By Car (Normal Traffic)</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>📍 Terminal 5: 7 minutes</li>
                    <li>📍 Terminal 2: 12 minutes</li>
                    <li>📍 Terminal 3: 12 minutes</li>
                    <li>📍 Terminal 4: 15 minutes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Taxi/Uber Costs (Approx)</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>💷 To Terminal 5: £10-12</li>
                    <li>💷 To Terminal 2/3: £15-18</li>
                    <li>💷 To Terminal 4: £18-20</li>
                    <li className="text-green-600 font-semibold">✓ Still cheaper than parking!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Area Benefits */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="More Parking Benefits"
              subtitle="Why we're better than other options"
            />
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-anchor-green mb-3">
                  🚫 Outside ULEZ Zone
                </h3>
                <p className="text-gray-700">
                  Save £12.50 per day if you're driving an older vehicle. We're just outside 
                  the Greater London ULEZ boundary, perfect for avoiding charges.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-anchor-green mb-3">
                  🛣️ Easy M25 Access
                </h3>
                <p className="text-gray-700">
                  Just 3 minutes from Junction 14 of the M25. Perfect meeting point for people 
                  coming from different directions. No complex airport road systems to navigate.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-anchor-green mb-3">
                  🏘️ Quiet Village Location
                </h3>
                <p className="text-gray-700">
                  Located in peaceful Stanwell Moor village, away from busy airport traffic. 
                  Your car is safe in our quiet residential area with regular customers around.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-anchor-green mb-3">
                  📱 No Apps or Registration
                </h3>
                <p className="text-gray-700">
                  Unlike airport parking or town centers, there's no need to download apps, 
                  create accounts, or remember to pay. Just park and enjoy your visit!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Why Customers Love Our Free Parking"
              subtitle="Real benefits for real people"
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl mb-3">✈️</div>
                <h3 className="font-bold mb-2">Pre-Flight Meals</h3>
                <p className="text-gray-700 text-sm mb-3">
                  "We always stop at The Anchor before early flights. Full English breakfast, 
                  free parking, and just minutes to Terminal 5. Beats airport prices every time!"
                </p>
                <p className="text-xs text-gray-500">- Regular customer from Guildford</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl mb-3">👨‍💼</div>
                <h3 className="font-bold mb-2">Business Meetings</h3>
                <p className="text-gray-700 text-sm mb-3">
                  "Perfect for meeting international clients. They land, I'm here in 10 minutes, 
                  free parking, proper lunch, back to the airport. Brilliant!"
                </p>
                <p className="text-xs text-gray-500">- Business owner from Reading</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
                <h3 className="font-bold mb-2">Family Pick-ups</h3>
                <p className="text-gray-700 text-sm mb-3">
                  "Kids love the garden while we wait for Grandma's flight. No stress about 
                  parking charges if the plane is delayed. Great food too!"
                </p>
                <p className="text-xs text-gray-500">- Family from Staines</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl mb-3">🚗</div>
                <h3 className="font-bold mb-2">Local Dining</h3>
                <p className="text-gray-700 text-sm mb-3">
                  "Living in London, parking is always expensive. Here I can relax, enjoy dinner, 
                  and never worry about parking tickets or charges."
                </p>
                <p className="text-xs text-gray-500">- Couple from Hounslow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "Is parking really free at The Anchor?",
            answer: "Yes, absolutely free for all our customers! We have 20 parking spaces available at no charge. There are no time limits, no tickets needed, and no apps to download. Just park and enjoy your visit."
          },
          {
            question: "How far is The Anchor from Heathrow Airport?",
            answer: "We're just 7 minutes from Terminal 5, 12 minutes from Terminals 2 & 3, and 15 minutes from Terminal 4 by car. Perfect for pre-flight meals, meeting arrivals, or business meetings near the airport."
          },
          {
            question: "Can I leave my car while catching a flight?",
            answer: "Our parking is for customers while they're dining or drinking with us. We're not a park-and-fly service. However, many customers enjoy a meal with us before taking a short taxi to the airport (£10-15), which still works out cheaper than airport parking!"
          },
          {
            question: "Is the car park safe and secure?",
            answer: "Yes, our car park is well-lit with security lighting and is located in a safe, quiet village setting. It's right next to the pub with regular foot traffic from customers and staff throughout opening hours."
          },
          {
            question: "Do I need to book parking in advance?",
            answer: "No booking needed for parking - it's first come, first served. However, we recommend booking a table, especially at busy times, to ensure you have a space inside. Call us on 01753 682707."
          },
          {
            question: "Is there disabled parking available?",
            answer: "Yes, we have designated disabled parking spaces close to the entrance with level access into the pub. The entire ground floor is wheelchair accessible."
          },
          {
            question: "What are the alternatives if your car park is full?",
            answer: "This rarely happens, but there's usually some on-street parking available in the village. We're in a residential area where parking is generally unrestricted. The car park is rarely completely full except during major events."
          },
          {
            question: "Are there height or vehicle restrictions?",
            answer: "Our car park accommodates standard cars and small vans. Very large vehicles, motorhomes, or coaches should call ahead on 01753 682707 to discuss options."
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <CTASection
        title="Save Money - Park FREE at The Anchor"
        description="Why pay airport prices? Enjoy great food and free parking instead"
        buttons={[
          {
            text: "📅 Book Your Table",
            href: "/book-table",
            variant: "primary"
          },
          {
            text: "📍 Get Directions",
            href: "https://maps.google.com/?q=The+Anchor+Stanwell+Moor",
            variant: "secondary"
          }
        ]}
        variant="green"
        footer="The Anchor • Horton Road, Stanwell Moor, TW19 6AQ • 20 FREE Parking Spaces"
      />
    </>
  )
}