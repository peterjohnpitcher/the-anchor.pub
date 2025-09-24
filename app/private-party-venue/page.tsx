import Link from 'next/link'
import { Button } from '@/components/ui'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { Metadata } from 'next'
import { generateBreadcrumbSchema } from '@/lib/enhanced-schemas'
import { SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox, QuickInfoGrid, Container } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { EventSchema } from '@/components/EventSchema'
import { staticEvents } from '@/lib/static-events'
import { PhoneButton } from '@/components/PhoneButton'
import { BookTableButton } from '@/components/BookTableButton'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { DEFAULT_CORPORATE_IMAGE } from '@/lib/image-fallbacks'

export const metadata: Metadata = {
  title: 'Private Party Venue Near Heathrow | Birthday & Celebration Hire | The Anchor',
  description: 'Book The Anchor for private parties near Heathrow. Flexible 10-200 guest spaces, free parking, custom menus and dedicated event coordinators.',
  keywords: 'private party venue near heathrow, birthday venue stanwell moor, celebration hire staines, party room with parking, anniversary party venue surrey',
  openGraph: {
    title: 'Private Party Venue Near Heathrow - The Anchor Stanwell Moor',
    description: 'Flexible party spaces with free parking, custom menus and dedicated planners near Heathrow.',
    images: [DEFAULT_CORPORATE_IMAGE],
  },
  twitter: getTwitterMetadata({
    title: 'Private Party Venue Near Heathrow - The Anchor Stanwell Moor',
    description: 'Flexible party spaces with free parking, custom menus and dedicated planners near Heathrow.',
    images: [DEFAULT_CORPORATE_IMAGE]
  })
}


export default function PrivatePartyVenuePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Private Events', url: '/book-event' },
    { name: 'Private Parties', url: '/private-party-venue' }
  ])

  return (
    <>
      <EventSchema event={staticEvents.privateParties} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Hero Section */}
      <HeroWrapper
        route="/private-party-venue"
        title="Private Party Venue"
        description="Create unforgettable celebrations at The Anchor"
        size="large"
        tags={[
          { label: "🎉 10-200 Guests", variant: "success" },
          { label: "🎂 All Occasions", variant: "default" },
          { label: "🚗 Free Parking", variant: "default" },
          { label: "🍽️ Custom Menus", variant: "success" }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookTableButton
              source="private_party_hero"
              variant="primary"
              size="lg"
              context="private_party"
              fullWidth
              className="w-full sm:w-auto"
            >
              🎉 Book Your Party
            </BookTableButton>
            <PhoneButton
              phone="01753 682707"
              source="private_party_hero"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              📞 Call: 01753 682707
            </PhoneButton>
            <Link 
              href="https://wa.me/441753682707?text=Hi,%20I" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button 
                variant="secondary"
                size="lg"
                fullWidth
                className="sm:w-auto"
              >
                💬 WhatsApp Us
              </Button>
            </Link>
          </div>
        }
      >
        <AlertBox
          variant="success"
          title="Popular dates book fast!"
          className="mt-6 max-w-2xl mx-auto"
          content={
            <p className="text-center">
              Saturdays are our most requested days. Contact us early to secure your preferred date.
            </p>
          }
        />
      </HeroWrapper>

      {/* Page Title */}
      <section className="py-8 bg-white">
        <Container size="md">
          <div className="text-center">
            <PageTitle
              seo={{
                structured: true,
                speakable: true
              }}
              className="text-anchor-green mb-4"
            >
              Private Party Venue - Celebrations at The Anchor
            </PageTitle>
            <p className="text-lg text-gray-700">
              Create unforgettable memories with flexible spaces for birthdays, anniversaries, and special occasions
            </p>
          </div>
        </Container>
      </section>

      {/* Perfect For Section */}
      <section className="section-spacing bg-gray-50">
        <Container>
          <SectionHeader
            title="Perfect for Every Celebration"
            subtitle="From milestone birthdays to surprise parties, we make your special day unforgettable"
          />
          
          <FeatureGrid
            columns={3}
            features={[
              {
                icon: "🎂",
                title: "Birthday Parties",
                description: "18th, 21st, 30th, 40th, 50th and beyond - celebrate every milestone",
                className: "text-center"
              },
              {
                icon: "💑",
                title: "Anniversaries",
                description: "Silver, gold, or any year worth celebrating with family and friends",
                className: "text-center"
              },
              {
                icon: "🎓",
                title: "Graduation Parties",
                description: "Mark academic achievements with a memorable celebration",
                className: "text-center"
              },
              {
                icon: "👶",
                title: "Baby Showers",
                description: "Welcome new arrivals with a special gathering",
                className: "text-center"
              },
              {
                icon: "💍",
                title: "Engagement Parties",
                description: "Toast the happy couple in style",
                className: "text-center"
              },
              {
                icon: "🏆",
                title: "Achievement Celebrations",
                description: "New job, retirement, or any personal milestone",
                className: "text-center"
              }
            ]}
            className="mb-16"
          />

          <InfoBoxGrid
            columns={2}
            boxes={[
              {
                title: "Why Families Choose The Anchor",
                content: (
                  <>
                    <p className="mb-4">We understand what makes a great party venue:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Flexible spaces</strong> - From intimate gatherings to large celebrations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Your music, your way</strong> - Bring your playlist or DJ</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Decoration freedom</strong> - Make the space your own</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>All ages welcome</strong> - Family-friendly environment</span>
                      </li>
                    </ul>
                  </>
                ),
                variant: "colored",
                color: "bg-pink-50"
              },
              {
                title: "Stress-Free Planning",
                content: (
                  <>
                    <p className="mb-4">Let us handle the details while you enjoy the party:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Dedicated coordinator</strong> - One point of contact throughout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Custom menus</strong> - Catering to match your taste and budget</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Setup assistance</strong> - We help create your vision</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span><strong>Clean-up included</strong> - Just enjoy your event</span>
                      </li>
                    </ul>
                  </>
                ),
                variant: "colored",
                color: "bg-blue-50"
              }
            ]}
          />
        </Container>
      </section>


      {/* What's Included */}
      <section className="section-spacing bg-white">
        <Container size="md">
            <SectionHeader
              title="Everything You Need for a Perfect Party"
            />
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-anchor-green mb-6">Venue Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold">🏠</span>
                    <div>
                      <strong>Flexible Spaces</strong>
                      <p className="text-sm text-gray-700">Configure for your party size and style</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold">🎵</span>
                    <div>
                      <strong>Music System</strong>
                      <p className="text-sm text-gray-700">Connect your playlist or bring a DJ</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold">🌟</span>
                    <div>
                      <strong>Party Lighting</strong>
                      <p className="text-sm text-gray-700">Create the perfect atmosphere</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold">🚗</span>
                    <div>
                      <strong>Free Parking for Guests</strong>
                      <p className="text-sm text-gray-700">20 spaces while attending your event</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold">♿</span>
                    <div>
                      <strong>Full Accessibility</strong>
                      <p className="text-sm text-gray-700">Everyone can join the celebration</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-anchor-green mb-6">Food & Drink Options</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold">🍽️</span>
                    <div>
                      <strong>Buffet Service</strong>
                      <p className="text-sm text-gray-700">Hot and cold options to suit all tastes</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold">🍕</span>
                    <div>
                      <strong>Pizza Parties</strong>
                      <p className="text-sm text-gray-700">Perfect for casual celebrations</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold">🥂</span>
                    <div>
                      <strong>Drinks Packages</strong>
                      <p className="text-sm text-gray-700">From welcome drinks to full bar tabs</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold">🎂</span>
                    <div>
                      <strong>Cake Service</strong>
                      <p className="text-sm text-gray-700">We'll serve your celebration cake</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-anchor-gold">🌱</span>
                    <div>
                      <strong>Dietary Options</strong>
                      <p className="text-sm text-gray-700">Vegetarian, vegan, and allergy-friendly</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
        </Container>
      </section>

      {/* Add-On Services */}
      <section className="section-spacing bg-anchor-cream">
        <Container>
          <SectionHeader
            title="Make It Extra Special"
            subtitle="Additional services to enhance your celebration"
          />
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🎈</div>
              <h4 className="font-bold mb-2">Decorations</h4>
              <p className="text-sm text-gray-700">Balloons, banners, table decorations</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">📸</div>
              <h4 className="font-bold mb-2">Photography</h4>
              <p className="text-sm text-gray-700">Capture every special moment</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🎭</div>
              <h4 className="font-bold mb-2">Entertainment</h4>
              <p className="text-sm text-gray-700">DJs, performers, sound system</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🌺</div>
              <h4 className="font-bold mb-2">Flowers</h4>
              <p className="text-sm text-gray-700">Beautiful arrangements and centerpieces</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Party Planning Timeline */}
      <section className="section-spacing bg-white">
        <Container size="sm">
            <SectionHeader
              title="Simple Party Planning Process"
              subtitle="We make organising your celebration easy"
            />
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Initial Enquiry</h3>
                  <p className="text-gray-700">Call, WhatsApp, or email us with your party date and guest numbers</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Discuss Your Vision</h3>
                  <p className="text-gray-700">We'll chat about your ideas, menu preferences, and any special requirements</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Receive Your Quote</h3>
                  <p className="text-gray-700">Clear pricing with no hidden extras - know exactly what you're paying</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Secure Your Date</h3>
                  <p className="text-gray-700">Small deposit holds your booking - fully refundable if plans change (14 days notice)</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Final Details</h3>
                  <p className="text-gray-700">Confirm numbers and any last-minute changes a week before</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">6</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Party Time!</h3>
                  <p className="text-gray-700">Arrive and enjoy - we'll handle everything else</p>
                </div>
              </div>
            </div>
        </Container>
      </section>

      {/* Location Benefits */}
      <section className="section-spacing bg-gray-50">
        <Container size="md">
          <div className="text-center">
            <SectionHeader
              title="Easy to Reach from Everywhere"
              subtitle="Central location with free parking makes party planning simple"
            />
            
            <QuickInfoGrid
              items={[
                { icon: "📍", title: "Staines: 8 minutes" },
                { icon: "📍", title: "Ashford: 10 minutes" },
                { icon: "📍", title: "Feltham: 10 minutes" },
                { icon: "📍", title: "Heathrow: 7 minutes" },
                { icon: "📍", title: "Sunbury: 15 minutes" },
                { icon: "📍", title: "Egham: 12 minutes" }
              ]}
              columns={3}
              className="mb-8"
            />
            
            <InfoBoxGrid
              columns={1}
              boxes={[
                {
                  title: "Why Location Matters for Parties",
                  content: (
                    <div className="text-center">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <div className="text-2xl mb-2">🚗</div>
                          <h4 className="font-semibold mb-1">Free Parking</h4>
                          <p className="text-sm text-gray-700">No expensive taxis needed - everyone can drive</p>
                        </div>
                        <div>
                          <div className="text-2xl mb-2">🚌</div>
                          <h4 className="font-semibold mb-1">Public Transport</h4>
                          <p className="text-sm text-gray-700">Bus stops nearby for non-drivers</p>
                        </div>
                        <div>
                          <div className="text-2xl mb-2">🏘️</div>
                          <h4 className="font-semibold mb-1">Central Location</h4>
                          <p className="text-sm text-gray-700">Easy for guests from multiple areas</p>
                        </div>
                      </div>
                    </div>
                  ),
                  variant: "default"
                }
              ]}
            />
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "How far in advance should I book my party?",
            answer: "We recommend booking 4-6 weeks ahead for weekend parties, especially Saturdays. Weekday celebrations often have more availability. Popular times like summer weekends book up quickly."
          },
          {
            question: "Can I bring my own decorations?",
            answer: "Absolutely! You're welcome to decorate the space to match your theme. We just ask that you avoid anything that might damage walls or ceilings. We can also arrange decorations for you if preferred."
          },
          {
            question: "Do you allow external catering or can I bring my own cake?",
            answer: "You're welcome to bring your own celebration cake - we'll provide plates and serve it for you. All other food must be provided by us for food safety reasons, but we're very flexible with menu options."
          },
          {
            question: "What's included in venue hire?",
            answer: "Venue hire includes exclusive use of your party space, basic decorations, dedicated staff, and setup/cleanup. Food and drink are priced per person based on your menu choices. We offer flexible pricing tailored to your celebration."
          },
          {
            question: "Can children attend parties at The Anchor?",
            answer: "Yes! We're a family-friendly venue and welcome guests of all ages. Children must be supervised, and we stop serving alcohol to under-18s at 9pm. We have children's menu options available."
          },
          {
            question: "Is there a minimum spend for private parties?",
            answer: "Yes, minimum spends vary depending on the day and time. Typically from £200 for weekday daytime parties to £500 for Saturday evenings. We'll discuss this when you enquire."
          },
          {
            question: "Can we have music and dancing?",
            answer: "Of course! You can connect your phone/device to our sound system or bring a DJ. We have space for dancing and party lighting to create the right atmosphere."
          },
          {
            question: "What time do private parties have to finish?",
            answer: "Standard finish time is 11:30pm on Fridays and Saturdays, 11pm on other nights. Extended hours may be available for exclusive venue hire - just ask when booking."
          }
        ]}
        className="bg-white"
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Let's Plan Your Perfect Party
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get in touch today to check availability and discuss your celebration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookTableButton
                source="private_party_cta"
                size="lg"
                variant="secondary"
                context="private_party"
                fullWidth
                className="w-full sm:w-auto bg-white text-red-600 hover:bg-gray-100"
              >
                🎉 Book Your Party
              </BookTableButton>
              <Link href="tel:+441753682707" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" fullWidth className="sm:w-auto bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                  📞 Call: 01753 682707
                </Button>
              </Link>
              <Link 
                href="https://wa.me/441753682707?text=Hi,%20I'd%20like%20to%20enquire%20about%20private%20party%20venue%20hire" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" variant="secondary" fullWidth className="sm:w-auto bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                  💬 WhatsApp Us
                </Button>
              </Link>
              <Link href="mailto:manager@the-anchor.pub?subject=Private Party Enquiry" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" fullWidth className="sm:w-auto bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20">
                  📧 Email Enquiry
                </Button>
              </Link>
            </div>
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-white text-center">
                <strong>Quick Response Promise</strong><br />
                We'll get back to you within 2 hours during opening hours<br />
                <strong>WhatsApp:</strong> 01753 682707 for instant chat
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
