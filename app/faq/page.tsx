import { Metadata } from 'next'
import { CallToAction } from '@/components/CallToAction'
import { faqSchema } from '@/lib/faq-schema'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | The Anchor Pub Near Heathrow',
  description: 'Find answers to common questions about The Anchor pub including opening hours, dog policy, parking, food service, events, and directions from Heathrow.',
  keywords: 'anchor pub faq, questions about the anchor, pub near heathrow questions, stanwell moor pub info',
}

export default function FAQPage() {
  const faqs = faqSchema.mainEntity

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-anchor-green to-anchor-green-dark" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Everything you need to know about The Anchor
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-anchor-cream rounded-xl p-6">
                  <h2 className="text-xl font-bold text-anchor-green mb-3">
                    {faq.name}
                  </h2>
                  <p className="text-gray-700">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Contact */}
            <div className="mt-12 bg-anchor-sand/30 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-anchor-green mb-4">
                Still Have Questions?
              </h2>
              <p className="text-gray-700 mb-6">
                We're here to help! Give us a call or visit us at the pub.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CallToAction 
                  href="tel:01753682707"
                  variant="primary"
                  size="lg"
                >
                  📞 Call: 01753 682707
                </CallToAction>
                <CallToAction 
                  href="/find-us"
                  variant="secondary"
                  size="lg"
                >
                  📍 Visit Us
                </CallToAction>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Quick Links */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-anchor-green mb-8 text-center">
              Popular Topics
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">🕐 Hours & Service</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Opening hours</li>
                  <li>• Kitchen times</li>
                  <li>• Sunday lunch service</li>
                  <li>• Holiday hours</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">🚗 Location & Access</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Directions from Heathrow</li>
                  <li>• Free parking</li>
                  <li>• Public transport</li>
                  <li>• Wheelchair access</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">🎉 Food & Events</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• BOGOF pizza deal</li>
                  <li>• Drag shows</li>
                  <li>• Quiz nights</li>
                  <li>• Private bookings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Visit?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We look forward to welcoming you to The Anchor
          </p>
          <CallToAction 
            href="/"
            variant="white"
            size="lg"
          >
            Back to Homepage
          </CallToAction>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
    </>
  )
}