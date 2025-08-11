import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Metadata } from 'next'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { PhoneButton } from '@/components/PhoneButton'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { Container } from '@/components/ui/layout/Container'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid } from '@/components/ui'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'

export const metadata: Metadata = {
  title: 'Live Music & Local Entertainment | The Anchor',
  description: 'Enjoy live music at The Anchor. From acoustic sessions to full bands, experience great local talent near Heathrow. Check our events calendar!',
  keywords: 'live music stanwell moor, pub with live music near heathrow, live bands staines, acoustic nights surrey',
  openGraph: {
    title: 'Live Music at The Anchor',
    description: 'Experience live music events at The Anchor - from acoustic sessions to full bands!',
    images: ['/images/pub-interior/the-anchor-pub-interior.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'Live Music at The Anchor',
    description: 'Experience live music events at The Anchor - from acoustic sessions to full bands!',
    images: ['/images/pub-interior/the-anchor-pub-interior.jpg']
  })
}

export default function LiveMusicPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWrapper
        route="/live-music"
        title="Live Music at The Anchor"
        description="Experience the best local talent in an intimate pub setting"
        size="medium"
        showStatusBar={false}
        tags={[
          { label: "🎸 Live Bands", variant: "primary" },
          { label: "🎤 Acoustic Sessions", variant: "success" },
          { label: "🎵 Local Artists", variant: "warning" },
          { label: "🍺 Great Atmosphere", variant: "default" }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/whats-on">
              <Button 
                variant="primary"
                size="lg"
              >
                📅 View Upcoming Music Events
              </Button>
            </Link>
            <PhoneButton
              phone="01753 682707"
              source="live_music_hero"
              variant="secondary"
              size="lg"
            >
              📞 Book a Table
            </PhoneButton>
          </div>
        }
      />

      {/* Page Title */}
      <div className="bg-white py-8">
        <Container>
          <PageTitle className="text-center text-anchor-green" seo={{ structured: true, speakable: true }}>
            Live Music - Events at The Anchor
          </PageTitle>
        </Container>
      </div>

      {/* About Live Music */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Your Local Live Music Venue"
              subtitle="Supporting local talent and bringing great music to Stanwell Moor"
            />
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl mb-6 text-center">
                The Anchor is proud to host live music events throughout the year, showcasing 
                talented local musicians and touring artists in our welcoming pub atmosphere.
              </p>
              
              <FeatureGrid
                columns={4}
                features={[
                  {
                    icon: "🎸",
                    title: "Diverse Genres",
                    description: "Rock, pop, folk, blues, and more",
                    className: "text-center"
                  },
                  {
                    icon: "🎤",
                    title: "Quality Sound",
                    description: "Great acoustics in our intimate venue",
                    className: "text-center"
                  },
                  {
                    icon: "🍻",
                    title: "Pub Atmosphere",
                    description: "Enjoy great music with a proper pint",
                    className: "text-center"
                  },
                  {
                    icon: "🎟️",
                    title: "Free Entry",
                    description: "Most events are free - just turn up!",
                    className: "text-center"
                  }
                ]}
                className="mb-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Types of Music Events */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="Music Events at The Anchor"
              subtitle="From intimate acoustic sets to full band performances"
            />
            
            <InfoBoxGrid
              columns={2}
              boxes={[
                {
                  title: "Acoustic Sessions",
                  content: (
                    <>
                      <p className="mb-4">Intimate performances featuring solo artists and duos:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">♪</span>
                          <span>Singer-songwriters showcasing original material</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">♪</span>
                          <span>Classic covers in stripped-back arrangements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">♪</span>
                          <span>Perfect background music for dining</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">♪</span>
                          <span>Usually early evening performances</span>
                        </li>
                      </ul>
                    </>
                  ),
                  variant: "colored",
                  color: "bg-blue-50"
                },
                {
                  title: "Live Bands",
                  content: (
                    <>
                      <p className="mb-4">Full band performances that get the whole pub rocking:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">♫</span>
                          <span>Local bands playing crowd-pleasing covers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">♫</span>
                          <span>Rock, pop, indie, and blues bands</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">♫</span>
                          <span>Dancing encouraged!</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">♫</span>
                          <span>Usually Saturday night performances</span>
                        </li>
                      </ul>
                    </>
                  ),
                  variant: "colored",
                  color: "bg-purple-50"
                }
              ]}
            />
            
            <div className="mt-12 bg-anchor-cream rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">Special Music Events</h3>
              <p className="text-gray-700 mb-6">
                Throughout the year we host special music events including tribute nights, 
                seasonal performances, and charity fundraisers featuring multiple acts.
              </p>
              <Link href="/whats-on">
                <Button variant="primary">
                  Check What's Coming Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Information */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="The Perfect Music Venue"
              subtitle="Why musicians and music lovers choose The Anchor"
            />
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-anchor-green mb-4">For Musicians</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Appreciative, music-loving audience</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Good acoustics and sight lines</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Flexible performance space</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Supportive, professional team</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Complimentary refreshments</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-anchor-green mb-4">For Music Fans</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Intimate venue - get close to the action</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Quality local and touring acts</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>No expensive ticket prices</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Great beer and food available</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Free parking on-site</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white border-2 border-anchor-green rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4 text-center">Venue Features</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">🎙️</div>
                  <p className="font-semibold">Performance Area</p>
                  <p className="text-sm text-gray-700">Dedicated space with good visibility</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🔊</div>
                  <p className="font-semibold">Sound System</p>
                  <p className="text-sm text-gray-700">Quality PA available for performers</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">💡</div>
                  <p className="font-semibold">Stage Lighting</p>
                  <p className="text-sm text-gray-700">Atmospheric lighting setup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Local Music */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Supporting Local Music"
              subtitle="The Anchor's commitment to the local music scene"
            />
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 mb-6">
                At The Anchor, we believe in supporting local musicians and providing a platform 
                for both established and emerging artists. Our live music events create a vibrant 
                atmosphere that brings our community together.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-anchor-green mb-3">For Local Artists</h3>
                  <p className="text-gray-700">
                    We're always looking for talented local musicians to perform. Whether you're 
                    a solo artist or part of a band, get in touch to discuss performance opportunities.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-anchor-green mb-3">Regular Attendees</h3>
                  <p className="text-gray-700">
                    Join our growing community of music lovers who regularly attend our events. 
                    Follow our social media to stay updated on upcoming performances.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-700 mb-4">
                  <strong>Musicians interested in performing?</strong>
                </p>
                <PhoneButton
                  phone="01753 682707"
                  source="live_music_musicians"
                  variant="primary"
                >
                  Contact Us About Performing
                </PhoneButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "When does The Anchor have live music?",
            answer: "Live music events vary throughout the year. We typically host acoustic sessions on selected weekday evenings and full band performances on Saturday nights. Check our What's On page or follow our social media for the latest schedule."
          },
          {
            question: "Is there a cover charge for live music?",
            answer: "Most of our live music events are free entry! Occasionally, special events or touring acts may have a small cover charge, which will be clearly advertised in advance."
          },
          {
            question: "Can I book a table for live music nights?",
            answer: "Yes, we recommend booking a table, especially for Saturday night performances as they get busy. Call us on 01753 682707 to reserve your spot."
          },
          {
            question: "What time does live music usually start?",
            answer: "Acoustic sessions typically start around 6-7pm, perfect for enjoying with dinner. Full band performances usually begin at 9pm on Saturday nights. Specific times are posted for each event."
          },
          {
            question: "Can I hire The Anchor for a private music event?",
            answer: "Absolutely! We can arrange private events with live music for parties, celebrations, or corporate functions. Contact us to discuss your requirements and we can help arrange suitable entertainment."
          },
          {
            question: "How can I perform at The Anchor?",
            answer: "We're always interested in hearing from talented musicians! Send us a message via our social media or call 01753 682707 to discuss performance opportunities. We support both established acts and emerging artists."
          }
        ]}
        className="bg-white"
      />

      {/* CTA Section */}
      <CTASection
        title="Experience Live Music at The Anchor"
        description="Check our events calendar and plan your next night out"
        buttons={[
          {
            text: "View Upcoming Events",
            href: "/whats-on",
            variant: "white"
          },
          {
            text: "📞 Book a Table: 01753 682707",
            href: "tel:+441753682707",
            isPhone: true,
            phoneSource: "live_music_cta",
            variant: "secondary"
          }
        ]}
        variant="green"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto mt-8">
          <p className="font-semibold mb-2 text-white">Stay Updated</p>
          <p className="text-white">Follow us on social media for the latest</p>
          <p className="text-white">live music announcements and updates</p>
        </div>
      </CTASection>
    </>
  )
}