import Link from 'next/link'
import { Metadata } from 'next'
import { Button, CTASection, SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox, QuickInfoGrid, Container } from '@/components/ui'
import { HeroWrapper } from '@/components/hero'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { BookTableButton } from '@/components/BookTableButton'
import { PhoneLink } from '@/components/PhoneLink'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { GoogleReviews } from '@/components/reviews'
import { HEATHROW_TIMES } from '@/lib/constants'
import { DEFAULT_NEAR_HEATHROW_IMAGE } from '@/lib/image-fallbacks'

export const metadata: Metadata = {
  title: 'Restaurant Near Heathrow Airport | The Anchor - Better Than Terminal Dining',
  description: 'Traditional British restaurant 7 minutes from Heathrow Terminal 5. Free parking saves £20-40. Proper meals at pub prices, not airport prices. Fresh food, full bar service.',
  keywords: 'restaurants near heathrow, places to eat near heathrow airport, dining near heathrow, restaurant near terminal 5, heathrow restaurants, where to eat near heathrow',
  openGraph: {
    title: 'Restaurant Near Heathrow - The Anchor',
    description: 'Skip expensive airport dining. Traditional British food, free parking, 7 minutes from Terminal 5.',
    images: [DEFAULT_NEAR_HEATHROW_IMAGE],
  },
  twitter: getTwitterMetadata({
    title: 'Restaurant Near Heathrow - The Anchor',
    description: 'Skip expensive airport dining. Traditional British food, free parking, 7 minutes from Terminal 5.',
    images: [DEFAULT_NEAR_HEATHROW_IMAGE]
  }),
  alternates: {
    canonical: '/restaurants-near-heathrow'
  }
}

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://www.the-anchor.pub/restaurants-near-heathrow",
  "name": "The Anchor",
  "description": "Traditional British restaurant near Heathrow Airport offering better value than terminal dining with free parking",
  "url": "https://www.the-anchor.pub/restaurants-near-heathrow",
  "telephone": "+441753682707",
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
    "latitude": 51.462509,
    "longitude": -0.502067
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "18:00",
      "closes": "21:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "13:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "12:00",
      "closes": "17:00"
    }
  ],
  "servesCuisine": ["British", "Traditional British", "Pub Food"],
  "priceRange": "££",
  "acceptsReservations": true,
  "menu": "https://www.the-anchor.pub/food-menu",
  "hasMenu": {
    "@type": "Menu",
    "url": "https://www.the-anchor.pub/food-menu",
    "hasMenuSection": [
      {
        "@type": "MenuSection",
        "name": "Sunday Roast",
        "description": "Traditional British Sunday roasts (pre-order required)"
      },
      {
        "@type": "MenuSection",
        "name": "Pizza",
        "description": "Stone-baked pizzas with Tuesday BOGOF deal"
      },
      {
        "@type": "MenuSection",
        "name": "Traditional Mains",
        "description": "British pub classics including fish & chips"
      }
    ]
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Free Parking",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "WiFi",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Outdoor Seating",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Dog Friendly",
      "value": true
    }
  ]
}

export default function RestaurantsNearHeathrowPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      
      {/* Hero Section */}
      <HeroWrapper
        route="/restaurants-near-heathrow"
        title="Restaurant Near Heathrow Airport"
        description="Skip the expensive terminal dining - proper British food just 7 minutes away"
        size="large"
        showStatusBar={true}
        tags={[
          { label: "✅ Free Parking Saves £20-40", variant: "success" },
          { label: "⏱️ 7 mins from Terminal 5", variant: "warning" },
          { label: "💷 50% Less Than Airport Prices", variant: "primary" },
          { label: "🍽️ Cooked Fresh to Order", variant: "default" }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookTableButton
              variant="primary"
              size="lg"
              source="restaurants_near_heathrow_hero"
            >
              📅 Book a Table
            </BookTableButton>
            <Link href="/food-menu">
              <Button variant="secondary" size="lg">
                🍽️ View Full Menu
              </Button>
            </Link>
          </div>
        }
      />

      {/* Page Title for SEO */}
      <section className="bg-white py-8">
        <Container>
          <PageTitle 
            className="text-center text-anchor-green"
            seo={{ structured: true, speakable: true }}
          >
            Restaurant Near Heathrow - Traditional British Dining Alternative to Airport Food
          </PageTitle>
        </Container>
      </section>

      {/* Why Choose Us Over Airport Dining */}
      <section className="section-spacing bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Why Smart Travellers Choose The Anchor Over Airport Restaurants"
              subtitle="Better food, better prices, better atmosphere - just minutes from all terminals"
            />
            
            <InfoBoxGrid
              columns={2}
              boxes={[
                {
                  title: "💰 Save Money on Every Meal",
                  content: (
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-bold text-anchor-green mb-2">Price Comparison:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>✈️ <strong>Airport Burger & Chips:</strong> £18-22</li>
                          <li>🍺 <strong>Our Burger & Chips:</strong> Under £12</li>
                          <li className="text-green-600 font-bold">You Save: £6-10 per meal</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-sm font-semibold text-green-800">
                          Plus: FREE parking saves another £20-40!
                        </p>
                      </div>
                    </div>
                  ),
                  variant: "colored",
                  color: "bg-amber-50 rounded-2xl p-8"
                },
                {
                  title: "🚗 Free Parking Worth £20-40",
                  content: (
                    <div className="space-y-3">
                      <p className="font-semibold text-gray-800">Airport Parking Costs:</p>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Terminal 5: £39/day</li>
                        <li>• Terminals 2/3: £42/day</li>
                        <li>• Short stay: £8.50/hour</li>
                      </ul>
                      <div className="bg-green-100 rounded-lg p-4 mt-4">
                        <p className="font-bold text-green-900">The Anchor: Always FREE</p>
                        <p className="text-sm text-green-700 mt-1">20 spaces for our guests</p>
                      </div>
                    </div>
                  ),
                  variant: "colored",
                  color: "bg-sky-50 rounded-2xl p-8"
                }
              ]}
              className="mb-12"
            />

            {/* Distance to Terminals */}
            <AlertBox
              variant="info"
              title="📍 Quick Drive from All Terminals"
              className="max-w-4xl mx-auto"
              content={
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <p className="font-bold text-lg">Terminal 5</p>
                    <p className="text-2xl font-bold text-blue-600">7 mins</p>
                    <p className="text-sm text-gray-600">2.8 miles</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">Terminal 4</p>
                    <p className="text-2xl font-bold text-blue-600">10 mins</p>
                    <p className="text-sm text-gray-600">4.2 miles</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">Terminal 2</p>
                    <p className="text-2xl font-bold text-blue-600">15 mins</p>
                    <p className="text-sm text-gray-600">5.8 miles</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">Terminal 3</p>
                    <p className="text-2xl font-bold text-blue-600">15 mins</p>
                    <p className="text-sm text-gray-600">5.8 miles</p>
                  </div>
                </div>
              }
            />
          </div>
        </Container>
      </section>

      {/* Menu Highlights */}
      <section className="section-spacing bg-anchor-cream">
        <Container>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Traditional British Restaurant Menu"
              subtitle="Proper pub food cooked fresh to order - no heat lamps, no microwaves"
            />
            
            <FeatureGrid
              columns={3}
              features={[
                {
                  icon: "🥘",
                  title: "Famous Sunday Roasts",
                  description: "Traditional roast dinners with Yorkshire puddings, roast potatoes & homemade gravy. £14.99-£15.99 (pre-order required)",
                  className: "text-center"
                },
                {
                  icon: "🐟",
                  title: "Fish & Chips",
                  description: "Beer-battered cod with triple-cooked chips, mushy peas & tartare sauce. Senior citizens 50% off Fridays!",
                  className: "text-center"
                },
                {
                  icon: "🍕",
                  title: "Tuesday Pizza BOGOF",
                  description: "Buy One Get One FREE on all stone-baked pizzas every Tuesday. Perfect for families!",
                  className: "text-center"
                },
                {
                  icon: "🍔",
                  title: "Burgers & Classics",
                  description: "Proper pub burgers, steaks, and British classics. All cooked fresh within 15 minutes.",
                  className: "text-center"
                },
                {
                  icon: "🌱",
                  title: "Dietary Options",
                  description: "Vegetarian options available. Small kitchen means we can't guarantee no cross-contamination.",
                  className: "text-center"
                },
                {
                  icon: "🍺",
                  title: "Full Bar Service",
                  description: "9 draught beers, premium spirits, wines, and cocktails. A pint costs what a pint should cost!",
                  className: "text-center"
                }
              ]}
            />
            
            <div className="text-center mt-8">
              <Link href="/food-menu">
                <Button variant="primary" size="lg">
                  View Full Menu & Prices
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Perfect For Section */}
      <section className="section-spacing bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Perfect Restaurant for Every Occasion"
            />
            
            <InfoBoxGrid
              columns={2}
              boxes={[
                {
                  title: "✈️ Pre-Flight Dining",
                  content: (
                    <ul className="space-y-2 text-gray-700">
                      <li>• Eat proper food before your flight</li>
                      <li>• Park free while you dine</li>
                      <li>• Quick 7-minute drive to Terminal 5</li>
                      <li>• Avoid airport queues and prices</li>
                      <li>• Luggage storage available</li>
                    </ul>
                  ),
                  variant: "default"
                },
                {
                  title: "🛬 Post-Flight Recovery",
                  content: (
                    <ul className="space-y-2 text-gray-700">
                      <li>• Traditional British welcome home</li>
                      <li>• Proper meal after airline food</li>
                      <li>• Relax before the drive home</li>
                      <li>• Full English breakfast alternatives</li>
                      <li>• Free WiFi to catch up</li>
                    </ul>
                  ),
                  variant: "default"
                },
                {
                  title: "💼 Business Meetings",
                  content: (
                    <ul className="space-y-2 text-gray-700">
                      <li>• Quiet environment for discussions</li>
                      <li>• Free parking for all attendees</li>
                      <li>• Private dining room available</li>
                      <li>• Power points in dining room</li>
                      <li>• Much cheaper than hotel restaurants</li>
                    </ul>
                  ),
                  variant: "default"
                },
                {
                  title: "👨‍✈️ Crew & Airport Workers",
                  content: (
                    <ul className="space-y-2 text-gray-700">
                      <li>• Regular stop for flight crews</li>
                      <li>• Popular with Heathrow workers</li>
                      <li>• Quick service for tight schedules</li>
                      <li>• Takeaway available (20-25 mins)</li>
                      <li>• Staff who remember your name</li>
                    </ul>
                  ),
                  variant: "default"
                }
              ]}
            />
          </div>
        </Container>
      </section>

      {/* Opening Hours */}
      <section className="section-spacing bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Restaurant Opening Hours"
              subtitle="Kitchen hours for fresh-cooked meals"
            />
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-anchor-green">Kitchen Hours</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="font-medium">Monday:</span>
                      <span className="text-red-600 font-semibold">CLOSED</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Tuesday-Friday:</span>
                      <span>6pm - 9pm</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Saturday:</span>
                      <span>1pm - 7pm</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Sunday:</span>
                      <span>12pm - 5pm</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4">
                    Sunday: Regular menu available without pre-order
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-4 text-anchor-green">Bar Hours</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="font-medium">Mon-Thu:</span>
                      <span>4pm - 10pm</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Friday:</span>
                      <span>4pm - 12am</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Saturday:</span>
                      <span>12pm - 12am</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Sunday:</span>
                      <span>12pm - 10pm</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4">
                    Full bar service during all opening hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Customer Reviews */}
      <section className="section-spacing bg-anchor-sand/10">
        <Container>
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="What Diners Say About Our Restaurant"
              subtitle="Real reviews from Google"
            />
            <GoogleReviews 
              layout="grid"
              showTitle={false}
            />
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "How far is The Anchor restaurant from Heathrow Airport?",
            answer: "We're just 7 minutes from Terminal 5, 10 minutes from Terminal 4, and 15 minutes from Terminals 2 & 3. Much quicker than navigating airport restaurants!"
          },
          {
            question: "Is parking really free at your restaurant?",
            answer: "Yes! We have 20 free parking spaces for our guests. This saves you £20-40 compared to airport parking, and there's no time limit while you're dining with us."
          },
          {
            question: "What type of food does your restaurant serve?",
            answer: "We serve traditional British pub food including famous Sunday roasts (£14.99-£15.99), fish & chips, burgers, steaks, and stone-baked pizzas. Everything is cooked fresh to order within 15 minutes."
          },
          {
            question: "Are you cheaper than airport restaurants?",
            answer: "Yes, significantly! Our meals are typically 50% less than airport prices. A burger that costs £18-22 at the airport is under £12 here. Plus, you save £20-40 on parking."
          },
          {
            question: "Do you take reservations?",
            answer: "Yes, we recommend booking a table, especially for Sunday lunch which requires pre-ordering by 1pm Saturday. Call 01753 682707 or book online."
          },
          {
            question: "Can I get takeaway if I'm in a hurry?",
            answer: "Yes! All menu items are available for takeaway with a 20-25 minute wait time. Perfect if you want to eat proper food on your journey instead of expensive airport snacks."
          }
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <CTASection
        title="Skip the Airport Restaurants"
        description="Better food, better prices, free parking - just minutes from all terminals"
        buttons={[
          {
            text: "📅 Book a Table",
            href: "/book-table",
            variant: "primary"
          },
          {
            text: "📞 Call: 01753 682707",
            href: "tel:+441753682707",
            variant: "secondary"
          }
        ]}
        variant="green"
        footer="Open Tuesday-Sunday • Kitchen closes 9pm weekdays • Free parking always available"
      />
    </>
  )
}
