import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { Container, Section, Grid, Badge, Icon } from '@/components/ui'
import { Card } from '@/components/ui/layout/Card'
import { ContactActions, PackageCard } from './client-components'

export const metadata: Metadata = {
  title: 'Christmas Party Venue Near Heathrow | Free Parking | From £38pp | The Anchor',
  description: 'Christmas party venue 5 mins from Heathrow Terminal 5. FREE PARKING for all guests. Office Christmas parties from £38pp. Outside ULEZ zone, near M25 Junction 14. Alternative to expensive airport hotels.',
  keywords: 'christmas party venue near heathrow, free parking near heathrow terminal 5, christmas parties m25 junction 14, office christmas party stanwell moor, corporate christmas heathrow terminal 5, christmas venue outside ulez, work christmas party free parking, company christmas party near terminal 5',
  openGraph: {
    title: 'Christmas Parties Near Heathrow Terminal 5 | Free Parking | The Anchor',
    description: 'Book your Christmas party 5 mins from Heathrow. FREE PARKING, outside ULEZ, from £38pp. Better value than airport hotels.',
    images: ['/images/hero/the-anchor-pub-interior-atmosphere.jpg'],
  },
  alternates: {
    canonical: '/christmas-parties',
  },
}

export default function ChristmasPartiesPage() {
  return (
    <>
      <HeroWrapper
        route="/christmas-parties"
        title="Christmas Party Venue Near Heathrow Terminal 5"
        description="Free parking for all guests • 5 minutes from Terminal 5 • Outside ULEZ zone"
      />

      {/* Intro Section with Better Keywords */}
      <Section className="py-12 bg-red-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl text-anchor-charcoal font-bold">
              Office Christmas Parties with Free Parking Near Heathrow
            </h2>
            <p className="text-lg text-gray-700">
              Skip the expensive Heathrow hotel Christmas packages. Your company Christmas party 
              at The Anchor includes <strong>FREE parking for all guests</strong>, saving each car 
              £20-40 vs airport venues. Just 5 minutes from Terminal 5 and 3 minutes from M25 Junction 14.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                <Icon name="car" className="mr-2" />
                FREE Parking (20 spaces)
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                <Icon name="plane" className="mr-2" />
                5 mins Terminal 5
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
                <Icon name="dollar" className="mr-2" />
                Outside ULEZ - Save £12.50
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
                <Icon name="navigation" className="mr-2" />
                M25 Junction 14
              </Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* Terminal Distance Section - NEW for SEO */}
      <Section className="py-12 bg-white">
        <Container>
          <h2 className="text-3xl text-center mb-8 font-bold">
            Christmas Party Venue Near All Heathrow Terminals
          </h2>
          <Grid cols={4} gap="md">
            <Card className="text-center p-4">
              <Icon name="plane" className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <h3 className="font-bold">Terminal 5</h3>
              <p className="text-2xl font-bold text-green-600">7 mins</p>
              <p className="text-sm text-gray-600">2.8 miles</p>
            </Card>
            <Card className="text-center p-4">
              <Icon name="plane" className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <h3 className="font-bold">Terminal 4</h3>
              <p className="text-2xl font-bold text-green-600">10 mins</p>
              <p className="text-sm text-gray-600">Perfect for BA staff parties</p>
            </Card>
            <Card className="text-center p-4">
              <Icon name="plane" className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <h3 className="font-bold">Terminals 2 & 3</h3>
              <p className="text-2xl font-bold text-green-600">15 mins</p>
              <p className="text-sm text-gray-600">Central terminals</p>
            </Card>
            <Card className="text-center p-4">
              <Icon name="car" className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <h3 className="font-bold">M25 Junction 14</h3>
              <p className="text-2xl font-bold text-green-600">3 mins</p>
              <p className="text-sm text-gray-600">Easy access</p>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Packages Section */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4 font-bold">
              Christmas Party Packages Near Heathrow - From £38pp
            </h2>
            <p className="text-lg text-gray-600">
              All packages include our delicious 3-course Christmas menu
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Full festive menu to be released November 2025
            </p>
          </div>

          <Grid cols={3} gap="lg" className="mb-8">
            <PackageCard
              title="FESTIVE BRONZE"
              subtitle="The perfect intimate celebration"
              price="£38"
              minGuests="15 guests"
              includes={[
                'Welcome drink',
                '3-course Christmas menu',
                'Coffee & mince pies',
                'Christmas crackers & decorations',
                'Background Christmas music',
                'Free parking (20 spaces)'
              ]}
              atmosphere="Authentic British pub charm with twinkling lights"
              availability="Sunday-Thursday"
            />
            
            <PackageCard
              title="FESTIVE SILVER"
              subtitle="Our signature celebration"
              price="£58"
              minGuests="15 guests"
              popular={true}
              includes={[
                '2 welcome drinks',
                '3-course Christmas menu',
                'Half bottle wine OR 4 drink tokens',
                'Coffee & mince pies',
                'Crackers & party favours',
                'Dedicated staff for your group',
                'Free parking (20 spaces)'
              ]}
              atmosphere="Your own festive corner to relax and celebrate"
              availability="Any day in December"
            />
            
            <PackageCard
              title="FESTIVE GOLD"
              subtitle="An unforgettable evening"
              price="£85"
              minGuests="30 guests"
              includes={[
                'Canapé reception (5pp)',
                '3-course menu with amuse-bouche',
                'Selection of wines with dinner',
                'Coffee & petit fours',
                'Enhanced decorations',
                'Personalised place cards',
                'Extended until midnight',
                'Dedicated coordinator'
              ]}
              atmosphere="Your private Christmas haven"
              availability="Limited dates"
            />
          </Grid>

          <div className="text-center bg-amber-50 rounded-lg p-6">
            <p className="text-lg font-semibold text-amber-900 mb-2">
              📢 Pre-Paid Bar Tabs Available
            </p>
            <p className="text-amber-800">
              All packages can include a pre-paid tab. Set your budget and we'll keep you updated.
            </p>
          </div>
        </Container>
      </Section>

      {/* Drinks & Entertainment Section */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl text-center mb-12 font-bold">
            Make It Your Own
          </h2>
          
          <Grid cols={2} gap="lg">
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="wine" className="text-red-600" />
                  Drinks Options
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold">All-Inclusive Package</span>
                    <Badge>£40pp</Badge>
                  </div>
                  <p className="text-sm text-gray-600 -mt-2 mb-3">
                    Unlimited house wines, beers, spirits & soft drinks (5 hours)
                  </p>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Premium Spirits</span>
                    <span className="text-gray-600">+£15pp</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Champagne Reception</span>
                    <span className="text-gray-600">+£10pp</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Wine Upgrade</span>
                    <span className="text-gray-600">+£15pp</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Festive Cocktails</span>
                    <span className="text-gray-600">+£18pp</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="music" className="text-red-600" />
                  Entertainment Add-Ons
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>DJ & Disco</span>
                    <span className="text-gray-600">+£450</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Live Band</span>
                    <span className="text-gray-600">+£850-1,500</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Photo Booth</span>
                    <span className="text-gray-600">+£595</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Close-Up Magician</span>
                    <span className="text-gray-600">+£450</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Comedy Act</span>
                    <span className="text-gray-600">+£750</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Karaoke Setup</span>
                    <span className="text-gray-600">+£250</span>
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Free Parking Section - HIGH SEO VALUE */}
      <Section className="py-16 bg-green-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl text-center mb-8 font-bold">
              Free Parking Near Heathrow for Christmas Parties
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-green-700">
                    🚗 FREE Parking at The Anchor
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="check" className="w-5 h-5 text-green-600 mt-0.5" />
                      <span><strong>20 free parking spaces</strong> on-site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="check" className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>No time limits or charges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="check" className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>CCTV monitored for safety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="check" className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>Level access to venue</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-red-700">
                    ❌ Heathrow Hotel Parking
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="close" className="w-5 h-5 text-red-600 mt-0.5" />
                      <span>£20-40 per car at airport hotels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="close" className="w-5 h-5 text-red-600 mt-0.5" />
                      <span>Terminal parking £25-89/day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="close" className="w-5 h-5 text-red-600 mt-0.5" />
                      <span>Often requires advance booking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="close" className="w-5 h-5 text-red-600 mt-0.5" />
                      <span>Long walks from car parks</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-amber-50 rounded-lg text-center">
                <p className="text-lg font-semibold">
                  💰 Save £500+ on parking for a 20-person Christmas party
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Plus we're outside the ULEZ zone - save another £12.50 per car!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Choose Us Section */}
      <Section className="py-16">
        <Container>
          <h2 className="text-3xl text-center mb-12 font-bold">
            Why Choose The Anchor Over Heathrow Hotels
          </h2>
          
          <Grid cols={3} gap="md">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="car" className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg">Free Parking Near Terminal 5</h3>
              <p className="text-gray-600 text-sm">
                20 free spaces vs £20-40 at Heathrow hotels
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="dollar" className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg">Outside ULEZ</h3>
              <p className="text-gray-600 text-sm">
                Save £12.50 per car - no congestion charges
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="plane" className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg">5 Mins from Heathrow</h3>
              <p className="text-gray-600 text-sm">
                Perfect for colleagues flying in - 7 mins from T5
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="heart" className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-lg">Family-Run Warmth</h3>
              <p className="text-gray-600 text-sm">
                Personal service from staff who remember your name
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="star" className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg">5-Star Food Hygiene</h3>
              <p className="text-gray-600 text-sm">
                Top-rated since 2019 for quality and safety
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="users" className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-bold text-lg">Flexible Spaces</h3>
              <p className="text-gray-600 text-sm">
                From 15 to 250 guests - perfect for any team size
              </p>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Booking Info Section */}
      <Section className="py-16 bg-red-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl text-center mb-12 font-bold">
              Booking Information
            </h2>
            
            <Grid cols={2} gap="lg" className="mb-12">
              <Card>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-4">Booking Terms</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Icon name="check" className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>£250 deposit secures your date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="check" className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>Balance due 14 days before</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="check" className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>Final numbers 7 days before</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="check" className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>Dietary requirements accommodated</span>
                    </li>
                  </ul>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-4">Special Offers</h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="font-semibold text-green-800">Early Bird</p>
                      <p className="text-sm text-green-700">Book by Sept 30th - Save 10%</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="font-semibold text-blue-800">January Parties</p>
                      <p className="text-sm text-blue-700">15% off all packages</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="font-semibold text-purple-800">Site Visits</p>
                      <p className="text-sm text-purple-700">Available anytime - just call ahead</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Grid>
          </div>
        </Container>
      </Section>

      {/* Related Links Section - Internal Linking for SEO */}
      <Section className="py-12 bg-white">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Explore More at The Anchor</h2>
            <p className="text-gray-600 mt-2">Perfect for planning your Christmas party</p>
          </div>
          <Grid cols={4} gap="sm">
            <Link href="/food-menu" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-center">
              <Icon name="utensils" className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <h3 className="font-semibold">View Our Menu</h3>
              <p className="text-sm text-gray-600">Award-winning food</p>
            </Link>
            <Link href="/beer-garden" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-center">
              <Icon name="sun" className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold">Beer Garden</h3>
              <p className="text-sm text-gray-600">Under the flight path</p>
            </Link>
            <Link href="/function-room-hire" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-center">
              <Icon name="users" className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">Function Rooms</h3>
              <p className="text-sm text-gray-600">Private party spaces</p>
            </Link>
            <Link href="/sunday-lunch" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-center">
              <Icon name="calendar" className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold">Sunday Roasts</h3>
              <p className="text-sm text-gray-600">Famous in Surrey</p>
            </Link>
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-20 bg-gradient-to-b from-red-600 to-red-700 text-white">
        <Container>
          <div className="text-center space-y-8">
            <h2 className="text-4xl text-white font-bold">
              Book Your Christmas Party Near Heathrow Terminal 5
            </h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Free parking for all guests • 5 minutes from Terminal 5 • Outside ULEZ zone • 
              Better value than airport hotels • From £38 per person
            </p>
            
            <ContactActions />
            
            <div className="pt-8 space-y-2">
              <p className="text-red-100">
                <Icon name="map" className="inline mr-2" />
                The Anchor, Horton Road, Stanwell Moor, Surrey TW19 6AQ (3 mins from M25 Junction 14)
              </p>
              <p className="text-red-100">
                <Icon name="clock" className="inline mr-2" />
                Site visits welcome - Free parking available for viewings
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: 'Christmas Party Venue Near Heathrow Terminal 5 - Free Parking',
            description: 'Office Christmas party packages 5 mins from Heathrow Terminal 5. FREE parking for all guests. Outside ULEZ zone, 3 mins from M25 Junction 14. From £38pp.',
            startDate: '2025-12-01',
            endDate: '2025-12-31',
            location: {
              '@type': 'Place',
              name: 'The Anchor - Christmas Party Venue Near Heathrow',
              description: 'Free parking Christmas party venue near all Heathrow terminals',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Horton Road',
                addressLocality: 'Stanwell Moor',
                addressRegion: 'Surrey',
                postalCode: 'TW19 6AQ',
                addressCountry: 'GB'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 51.462509,
                longitude: -0.502067
              },
              amenityFeature: [
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Free Parking',
                  value: '20 spaces'
                },
                {
                  '@type': 'LocationFeatureSpecification', 
                  name: 'Distance from Heathrow Terminal 5',
                  value: '7 minutes (2.8 miles)'
                }
              ]
            },
            offers: [
              {
                '@type': 'Offer',
                name: 'Festive Bronze Package',
                price: '38',
                priceCurrency: 'GBP',
                availability: 'https://schema.org/InStock'
              },
              {
                '@type': 'Offer',
                name: 'Festive Silver Package',
                price: '58',
                priceCurrency: 'GBP',
                availability: 'https://schema.org/InStock'
              },
              {
                '@type': 'Offer',
                name: 'Festive Gold Package',
                price: '85',
                priceCurrency: 'GBP',
                availability: 'https://schema.org/LimitedAvailability'
              }
            ],
            organizer: {
              '@type': 'Organization',
              name: 'The Anchor',
              url: 'https://www.the-anchor.pub'
            }
          })
        }}
      />
    </>
  )
}