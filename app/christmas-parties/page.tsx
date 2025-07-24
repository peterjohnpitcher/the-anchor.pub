import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { Metadata } from 'next'
import { generateBreadcrumbSchema } from '@/lib/enhanced-schemas'
import { CONTACT, BRAND } from '@/lib/constants'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { EventSchema } from '@/components/EventSchema'
import { staticEvents } from '@/lib/static-events'
import { PhoneButton } from '@/components/PhoneButton'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { Container } from '@/components/ui/layout/Container'

export const metadata: Metadata = {
  title: 'Christmas Party Venue Near Heathrow | The Anchor Stanwell Moor | Book Now',
  description: 'Book your Christmas party at The Anchor. Intimate venue for office parties & family celebrations. Free parking, festive menus, flexible packages.',
  keywords: 'christmas party venue surrey, christmas party venue staines, office christmas party heathrow, christmas party venue near me, festive party venue stanwell moor, corporate christmas party surrey',
  openGraph: {
    title: 'Christmas Parties at The Anchor - Book Now',
    description: 'Celebrate Christmas 2024/2025 at The Anchor. Festive menus, free parking, flexible spaces for 20-200 guests.',
    images: ['/images/events/christmas/the-anchor-christmas-party-venue.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'Christmas Parties at The Anchor - Book Now',
    description: 'Celebrate Christmas 2024/2025 at The Anchor. Festive menus, free parking, flexible spaces for 20-200 guests.',
    images: ['/images/events/christmas/the-anchor-christmas-party-venue.jpg']
  })
}


export default function ChristmasPartiesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Private Events', url: '/book-event' },
    { name: 'Christmas Parties', url: '/christmas-parties' }
  ])

  const currentYear = new Date().getFullYear()
  const nextYear = currentYear + 1
  const isNovemberOrDecember = new Date().getMonth() >= 10

  return (
    <>
      <EventSchema event={staticEvents.christmasParties} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Hero Section */}
      <HeroWrapper
        route="/christmas-parties"
        title="Christmas Party Venue"
        description={`Book your ${isNovemberOrDecember ? currentYear : nextYear} festive celebration at The Anchor`}
        size="large"
        showStatusBar={false}
        tags={[
          { label: "🎄 Dates Filling Fast", variant: "danger" },
          { label: "👥 20-200 Guests", variant: "success" },
          { label: "🚗 Free Parking", variant: "default" },
          { label: "📍 Near Heathrow", variant: "default" }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={CONTACT.phoneHref}>
              <Button variant="primary" size="lg">
                📞 Cheque Availability
              </Button>
            </Link>
            <Link href="#packages">
              <Button variant="secondary" size="lg">
                🎁 View Packages
              </Button>
            </Link>
          </div>
        }
      >
        <AlertBox
          variant="warning"
          title="Limited December Dates Available"
          className="mt-6 max-w-2xl mx-auto"
          content={
            <p className="text-center">
              Popular dates are booking fast. Secure your Christmas party now to avoid disappointment.
            </p>
          }
        />
      </HeroWrapper>

      {/* Page Title */}
      <div className="bg-white py-8">
        <Container>
          <PageTitle className="text-center text-anchor-green" seo={{ structured: true, speakable: true }}>
            Christmas Parties - Book Your Festive Event
          </PageTitle>
        </Container>
      </div>

      {/* Why Choose The Anchor */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="The Perfect Christmas Party Venue"
            subtitle="Everything you need for a memorable festive celebration"
          />
          
          <FeatureGrid
            columns={4}
            features={[
              {
                icon: "🎄",
                title: "Festive Atmosphere",
                description: "Beautifully decorated venue with traditional Christmas charm",
                className: "text-center"
              },
              {
                icon: "🍽️",
                title: "Delicious Menus",
                description: "Traditional Christmas fare with vegetarian & vegan options",
                className: "text-center"
              },
              {
                icon: "🚗",
                title: "Free Parking",
                description: "20 spaces - no expensive taxi fares for drivers",
                className: "text-center"
              },
              {
                icon: "🎉",
                title: "Entertainment Ready",
                description: "Music system, dance floor space, and festive games",
                className: "text-center"
              }
            ]}
            className="mb-12"
          />

          <InfoBoxGrid
            columns={2}
            boxes={[
              {
                title: "Perfect for Office Parties",
                content: (
                  <>
                    <p className="mb-4">The Anchor is the ideal venue for your company Christmas celebration:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Private areas available for corporate groups</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>7 minutes from Heathrow - perfect for international teams</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Great value venue hire - contact us for rates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Flexible timings for lunch or evening parties</span>
                      </li>
                    </ul>
                  </>
                ),
                variant: "colored",
                color: "bg-red-50"
              },
              {
                title: "Family & Friends Celebrations",
                content: (
                  <>
                    <p className="mb-4">Create magical Christmas memories with loved ones:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Welcoming atmosphere for all ages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Children's menu available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Flexible space for small or large groups</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Traditional pub setting with festive decorations</span>
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

      {/* Christmas Party Options */}
      <section id="packages" className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Christmas Party Options"
            subtitle="Flexible packages tailored to your celebration - all dietary requirements catered for"
          />
          
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-lg text-gray-700 mb-8">
              We offer a range of festive options to suit every group and budget. 
              Contact us for personalised pricing based on your requirements.
            </p>
            
            <InfoBoxGrid
              columns={3}
              boxes={[
                {
                  title: "Festive Lunch",
                  content: (
                    <>
                      <p className="text-lg font-semibold text-anchor-green mb-4">Afternoon Celebrations</p>
                      <ul className="space-y-2 mb-4 text-gray-700">
                        <li>✓ 2 or 3-course Christmas menu</li>
                        <li>✓ Available 12pm-3pm</li>
                        <li>✓ Welcome drinks available</li>
                        <li>✓ Christmas crackers</li>
                        <li>✓ Perfect for office lunches</li>
                      </ul>
                      <Link href={CONTACT.phoneHref}>
                        <Button variant="primary" fullWidth>
                          Get Lunch Quote
                        </Button>
                      </Link>
                    </>
                  ),
                  variant: "default"
                },
                {
                  title: "Evening Celebration",
                  content: (
                    <>
                      <div className="absolute top-0 right-0 bg-anchor-gold text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">Most Popular</div>
                      <p className="text-lg font-semibold text-anchor-green mb-4">Evening Festivities</p>
                      <ul className="space-y-2 mb-4 text-gray-700">
                        <li>✓ Full Christmas dinner menu</li>
                        <li>✓ Available from 6pm</li>
                        <li>✓ Welcome drinks & canapés</li>
                        <li>✓ Christmas atmosphere</li>
                        <li>✓ Dancing & entertainment space</li>
                      </ul>
                      <Link href={CONTACT.phoneHref}>
                        <Button variant="primary" fullWidth>
                          Get Evening Quote
                        </Button>
                      </Link>
                    </>
                  ),
                  variant: "default",
                  className: "relative border-2 border-anchor-gold"
                },
                {
                  title: "Bespoke Package",
                  content: (
                    <>
                      <p className="text-lg font-semibold text-anchor-green mb-4">Create Your Perfect Party</p>
                      <ul className="space-y-2 mb-4 text-gray-700">
                        <li>✓ Customised menu options</li>
                        <li>✓ Drinks packages available</li>
                        <li>✓ Entertainment arrangements</li>
                        <li>✓ Exclusive area options</li>
                        <li>✓ Flexible timing</li>
                      </ul>
                      <Link href={CONTACT.phoneHref}>
                        <Button variant="primary" fullWidth>
                          Discuss Options
                        </Button>
                      </Link>
                    </>
                  ),
                  variant: "default"
                }
              ]}
            />
            
            <div className="mt-12 bg-anchor-cream rounded-xl p-6 text-center">
              <p className="text-xl font-semibold text-anchor-green mb-3">
                Pricing Available on Request
              </p>
              <p className="text-gray-700 mb-4">
                Every party is unique - we'll create a package that works for your group size and budget
              </p>
              <PhoneButton
                phone="01753 682707"
                source="christmas_parties_cta"
                variant="primary"
                size="lg"
              >
                📞 Call for Pricing: 01753 682707
              </PhoneButton>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Information */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Your Intimate Christmas Venue"
            subtitle="A warm, personal setting that makes every guest feel special"
          />
          
          <div className="max-w-4xl mx-auto">
            <InfoBoxGrid
              columns={1}
              boxes={[
                {
                  title: "Flexible Spaces for Your Celebration",
                  content: (
                    <div className="space-y-6">
                      <p className="text-center text-lg text-gray-700 mb-6">
                        The Anchor offers a cosy, family-feeling venue perfect for creating 
                        memorable Christmas celebrations. Our flexible spaces can be configured 
                        to suit your party style.
                      </p>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <h4 className="font-semibold text-anchor-green mb-2">Dining Room</h4>
                          <p className="text-sm text-gray-700">
                            Up to 26 seated for formal dining<br/>
                            Up to 40 for standing reception<br/>
                            Perfect for intimate parties
                          </p>
                        </div>
                        <div className="text-center">
                          <h4 className="font-semibold text-anchor-green mb-2">Main Pub Area</h4>
                          <p className="text-sm text-gray-700">
                            Up to 50 seated guests<br/>
                            Up to 60 standing<br/>
                            Great for casual celebrations
                          </p>
                        </div>
                        <div className="text-center">
                          <h4 className="font-semibold text-anchor-green mb-2">Combined Spaces</h4>
                          <p className="text-sm text-gray-700">
                            Exclusive venue hire available<br/>
                            Garden available (weather permitting)<br/>
                            Create your perfect party layout
                          </p>
                        </div>
                      </div>
                      <p className="text-center text-sm text-gray-700 mt-4">
                        <em>Minimum 30 guests for exclusive venue hire</em>
                      </p>
                    </div>
                  ),
                  variant: "default"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Location Benefits */}
      <section className="section-spacing bg-anchor-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              title="Perfectly Located for Your Christmas Party"
            />
            
            <FeatureGrid
              columns={3}
              features={[
                {
                  icon: "✈️",
                  title: "Near Heathrow",
                  description: "7 mins from T5 - ideal for companies with international staff",
                  className: "text-center"
                },
                {
                  icon: "🚗",
                  title: "Easy Access",
                  description: "Just off M25 J14 - convenient for Surrey & West London",
                  className: "text-center"
                },
                {
                  icon: "🚫",
                  title: "Outside ULEZ",
                  description: "Save money - no ULEZ charges for your party guests",
                  className: "text-center"
                }
              ]}
            />
            
            <div className="mt-8 grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3">Quick Journey Times</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Staines: 8 minutes</li>
                  <li>• Ashford: 10 minutes</li>
                  <li>• Feltham: 10 minutes</li>
                  <li>• Windsor: 15 minutes</li>
                  <li>• Egham: 12 minutes</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3">Why Location Matters</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Central for all team members</li>
                  <li>• Free parking (saves £££)</li>
                  <li>• Easy taxi access</li>
                  <li>• Safe, well-lit car park</li>
                  <li>• No city centre prices</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="Easy Booking Process"
              subtitle="We make organising your Christmas party simple and stress-free"
            />
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Check Availability</h3>
                  <p className="text-gray-700">Call us on {CONTACT.phone} to check your preferred dates. December Fridays and Saturdays book up fast!</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Choose Your Package</h3>
                  <p className="text-gray-700">Select from our packages or create a custom menu. We'll send you a full quote.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Secure Your Date</h3>
                  <p className="text-gray-700">Small deposit secures your booking. Final numbers confirmed 1 week before.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Enjoy Your Party!</h3>
                  <p className="text-gray-700">Arrive and relax - we'll take care of everything else.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "When should I book my Christmas party?",
            answer: "We recommend booking as early as possible, especially for Friday and Saturday nights in December. Popular dates typically book up by early November. Weekday parties often have more availability."
          },
          {
            question: "Is there a minimum number for Christmas party bookings?",
            answer: "Yes, our minimum is 10 people for lunch parties and 15 for evening celebrations. For exclusive venue hire, we typically require a minimum of 100 guests or a minimum spend guarantee."
          },
          {
            question: "Can you accommodate dietary requirements?",
            answer: "Absolutely! We cater for all dietary requirements including vegetarian, vegan, gluten-free, and other allergies. Just let us know when booking and we'll ensure everyone is well catered for."
          },
          {
            question: "Is there a deposit required?",
            answer: "Yes, we require a £250 deposit to secure your booking, which is deducted from your final bill. Please contact us to discuss our cancellation policy."
          },
          {
            question: "Do you have parking for our Christmas party?",
            answer: "Yes! We have 20 free parking spaces available for our guests. This is a huge advantage as it saves on expensive taxis. The car park is well-lit and just steps from our entrance."
          },
          {
            question: "Can we have exclusive use of the venue?",
            answer: "Yes, exclusive venue hire is available for larger parties (typically 100+ guests) or with a minimum spend guarantee. This gives you the entire pub including our bar, dining areas, and garden space if weather permits."
          },
          {
            question: "What entertainment options are available?",
            answer: "We have a music system for background music or party playlists, space for dancing, and can accommodate DJs or live entertainment. We can also organise festive games and activities."
          },
          {
            question: "What time do Christmas parties finish?",
            answer: "Evening parties typically run until midnight on Fridays and Saturdays, or 11pm on weeknights. Extended hours may be available for exclusive hire bookings."
          }
        ]}
        className="bg-white"
      />

      {/* CTA Section */}
      <CTASection
        title="Book Your Christmas Party Today"
        description="Limited dates available - don't miss out on your perfect Christmas celebration"
        buttons={[
          {
            text: `📞 Call Now: ${CONTACT.phone}`,
            href: `tel:${CONTACT.phone}`,
            variant: "white"
          },
          {
            text: "📧 Email Enquiry",
            href: `mailto:${CONTACT.email}?subject=Christmas Party Enquiry`,
            variant: "secondary",
            emailSource: "christmas_parties_cta"
          }
        ]}
        variant="red"
      >
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
          <p className="text-white text-center text-lg">
            <strong>Office Hours:</strong> Monday-Friday 10am-6pm<br />
            <strong>Response Time:</strong> We'll get back to you within 24 hours
          </p>
        </div>
      </CTASection>
    </>
  )
}