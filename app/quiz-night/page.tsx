import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Metadata } from 'next'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { EventSchema } from '@/components/EventSchema'
import { staticEvents } from '@/lib/static-events'
import { PhoneButton } from '@/components/PhoneButton'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { Container } from '@/components/ui/layout/Container'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid } from '@/components/ui'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'

export const metadata: Metadata = {
  title: 'Quiz Night | The Anchor Stanwell Moor | Monthly Entertainment',
  description: 'Join our monthly quiz night at The Anchor. £3 entry, great prizes, fun atmosphere. Test your knowledge every month near Heathrow!',
  keywords: 'quiz night stanwell moor, pub quiz near heathrow, quiz night staines, monthly quiz surrey',
  openGraph: {
    title: 'Monthly Quiz Night at The Anchor',
    description: 'Join our monthly quiz night - £3 entry with great prizes including a £25 bar voucher!',
    images: ['/images/pub-interior/the-anchor-pub-interior.jpg'],
  },
  twitter: getTwitterMetadata({
    title: 'Monthly Quiz Night at The Anchor',
    description: 'Join our monthly quiz night - £3 entry with great prizes including a £25 bar voucher!',
    images: ['/images/pub-interior/the-anchor-pub-interior.jpg']
  })
}

export default function QuizNightPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWrapper
        route="/quiz-night"
        title="Quiz Night at The Anchor"
        description="Test your knowledge and win great prizes at our monthly quiz!"
        size="medium"
        showStatusBar={false}
        tags={[
          { label: "💷 £3 Entry", variant: "success" },
          { label: "🏆 £25 1st Prize", variant: "primary" },
          { label: "🍷 Wine for 2nd Last", variant: "warning" },
          { label: "📅 Monthly Event", variant: "default" }
        ]}
        cta={
          <PhoneButton
            phone="01753 682707"
            source="quiz_night_hero"
            variant="primary"
            size="lg"
          >
            📞 Book Your Team: 01753 682707
          </PhoneButton>
        }
      />

      {/* Page Title */}
      <div className="bg-white py-8">
        <Container>
          <PageTitle className="text-center text-anchor-green" seo={{ structured: true, speakable: true }}>
            Quiz Night - Monthly at The Anchor
          </PageTitle>
        </Container>
      </div>

      {/* About Quiz Night */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Join the Fun Every Month"
              subtitle="Our quiz night is one of Stanwell Moor's most popular events"
            />
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl mb-6 text-center">
                Challenge your brain and have a laugh with friends at The Anchor's legendary quiz night! 
                With a mix of general knowledge, current affairs, sport, and fun rounds, there's something 
                for everyone.
              </p>
              
              <FeatureGrid
                columns={3}
                features={[
                  {
                    icon: "🧠",
                    title: "Mixed Questions",
                    description: "General knowledge, sport, music, history, and more",
                    className: "text-center"
                  },
                  {
                    icon: "👥",
                    title: "Team Format",
                    description: "Teams of up to 6 people - come with friends or make new ones",
                    className: "text-center"
                  },
                  {
                    icon: "🎉",
                    title: "Great Atmosphere",
                    description: "Friendly competition with plenty of laughs",
                    className: "text-center"
                  }
                ]}
                className="mb-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Prize Details */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Prizes to Play For"
              subtitle="Great rewards for winners and fun prizes throughout"
            />
            
            <InfoBoxGrid
              columns={3}
              boxes={[
                {
                  title: "1st Place",
                  content: (
                    <div className="text-center">
                      <div className="text-4xl mb-2">🏆</div>
                      <p className="text-2xl font-bold text-anchor-gold mb-2">£25</p>
                      <p className="text-gray-700">Bar Voucher</p>
                    </div>
                  ),
                  variant: "colored",
                  color: "bg-yellow-50"
                },
                {
                  title: "2nd from Last",
                  content: (
                    <div className="text-center">
                      <div className="text-4xl mb-2">🍷</div>
                      <p className="text-xl font-bold text-purple-700 mb-2">Bottle of Wine</p>
                      <p className="text-gray-700">Consolation prize!</p>
                    </div>
                  ),
                  variant: "colored",
                  color: "bg-purple-50"
                },
                {
                  title: "Spot Prizes",
                  content: (
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎁</div>
                      <p className="text-lg font-bold text-green-700 mb-2">Random Rounds</p>
                      <p className="text-gray-700">Surprise prizes throughout</p>
                    </div>
                  ),
                  variant: "colored",
                  color: "bg-green-50"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="How It Works"
            />
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-6">Quiz Format</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">📝</span>
                    <span>6-8 rounds of questions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">⏱️</span>
                    <span>Picture rounds and music rounds</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">🎯</span>
                    <span>Mix of easy and challenging questions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">📊</span>
                    <span>Scores announced between rounds</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-anchor-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-6">Essential Info</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">⏰</span>
                    <span>Starts at 7:00 PM sharp</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">💷</span>
                    <span>£3 per person entry</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">👥</span>
                    <span>Maximum 6 people per team</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">🍕</span>
                    <span>Food available throughout</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Why Our Quiz Night is Special"
              subtitle="More than just questions - it's a proper night out"
            />
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-anchor-green mb-2">Friendly Competition</h3>
                  <p className="text-gray-700">
                    Our quiz master keeps things light and fun - it's competitive but never too serious. 
                    Whether you're a quiz veteran or first-timer, you'll feel welcome.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-anchor-green mb-2">Great Value Night Out</h3>
                  <p className="text-gray-700">
                    At just £3 entry, it's one of the best value entertainment nights in the area. 
                    Combine with our food deals for a perfect evening that won't break the bank.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-anchor-green mb-2">Local Community Feel</h3>
                  <p className="text-gray-700">
                    See familiar faces and make new friends. Our quiz night brings together locals 
                    from Stanwell Moor, Staines, and surrounding areas for a proper community night out.
                  </p>
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
            question: "When is quiz night at The Anchor?",
            answer: "Quiz night is held monthly (date varies), starting at 7pm. Entry is £3 per person. Check our social media or call us on 01753 682707 for the next quiz date!"
          },
          {
            question: "Do I need to book for quiz night?",
            answer: "While booking isn't essential, we recommend calling ahead, especially for larger teams. This ensures we have a table ready for you. Call us on 01753 682707."
          },
          {
            question: "How many people can be in a quiz team?",
            answer: "Teams can have up to 6 people. If you have more than 6, you'll need to split into multiple teams. Solo players and smaller groups are welcome - we can help match you with others if you'd like."
          },
          {
            question: "What are the quiz night prizes?",
            answer: "1st place wins a £25 bar voucher to spend at The Anchor. The 2nd from last team wins a bottle of wine (our fun consolation prize!). We also have spot prizes throughout the night."
          },
          {
            question: "Can I get food during quiz night?",
            answer: "Yes! Our full menu is available throughout quiz night. Many teams order sharing platters or pizzas. We recommend ordering before the quiz starts or during the break."
          },
          {
            question: "What types of questions are in the quiz?",
            answer: "Our quiz covers general knowledge, current affairs, sport, music, history, geography, and entertainment. We include picture rounds and music rounds too. Questions range from easy to challenging - something for everyone!"
          }
        ]}
        className="bg-white"
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Test Your Knowledge?"
        description="Gather your team and join us for the next quiz night"
        buttons={[
          {
            text: "📞 Call: 01753 682707",
            href: "tel:01753682707",
            isPhone: true,
            phoneSource: "quiz_night_cta",
            variant: "white"
          },
          {
            text: "View All Events",
            href: "/whats-on",
            variant: "secondary"
          }
        ]}
        variant="green"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto mt-8">
          <p className="font-semibold mb-2 text-white">Quiz Night Details</p>
          <p className="text-white">Monthly (check for dates)</p>
          <p className="text-white">Starts 7:00 PM • £3 entry</p>
          <p className="text-white">Teams up to 6 people</p>
        </div>
      </CTASection>

      {/* Event Schema */}
      <EventSchema event={staticEvents.quizNight} />
    </>
  )
}