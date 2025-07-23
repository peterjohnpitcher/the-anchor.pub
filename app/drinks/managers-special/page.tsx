import { Metadata } from 'next'
import { Button, Container, Section, FullWidthSection } from '@/components/ui'
import { StatusBar } from '@/components/StatusBar'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { generateBreadcrumbSchema } from '@/lib/enhanced-schemas'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import Link from 'next/link'
import managersSpecialData from '@/content/managers-special.json'
import { PricingCard } from '@/components/PricingCard'
import { ProductDetails } from '@/components/ProductDetails'
import { BotanicalsGrid } from '@/components/BotanicalsGrid'
import { FeatureGrid } from '@/components/ui'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { getManagersSpecialImage } from '@/lib/managers-special-image'
import { MenuPageTracker } from '@/components/MenuPageTracker'
import { PhoneButton } from '@/components/PhoneButton'

export const metadata: Metadata = {
  title: "Manager's Special - 25% OFF The Botanist Gin | The Anchor Stanwell Moor",
  description: "Enjoy 25% off The Botanist Islay Dry Gin throughout July at The Anchor pub. Singles £2.78 (was £3.70), Doubles £5.55 (was £7.40). Limited time offer.",
  keywords: 'the botanist gin offer, gin promotion stanwell moor, islay gin discount, pub drinks special heathrow',
  openGraph: {
    title: "Manager's Special - 25% OFF The Botanist Gin",
    description: 'Experience Islay\'s wild spirit with 25% off The Botanist throughout July. 22 hand-foraged botanicals in every bottle.',
    images: ['/images/spirits/the-botanist-gin.jpg'],
  },
  twitter: getTwitterMetadata({
    title: "Manager's Special - 25% OFF The Botanist",
    description: 'July Special: 25% off The Botanist Gin. Singles £2.78, Doubles £5.55. Limited time offer.',
    images: ['/images/spirits/the-botanist-gin.jpg']
  })
}

export default function ManagersSpecialPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Drinks Menu', url: '/drinks' },
    { name: "Manager's Special", url: '/drinks/managers-special' }
  ])

  const { spirit, promotion } = managersSpecialData
  const dynamicImagePath = getManagersSpecialImage()

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": spirit.name,
    "description": spirit.longDescription,
    "brand": {
      "@type": "Brand",
      "name": spirit.distillery
    },
    "offers": {
      "@type": "Offer",
      "url": "https://the-anchor.pub/drinks/managers-special",
      "priceCurrency": "GBP",
      "price": "2.78",
      "priceValidUntil": promotion.validUntil,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "BarOrPub",
        "name": "The Anchor",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Horton Road",
          "addressLocality": "Stanwell Moor",
          "addressRegion": "Surrey",
          "postalCode": "TW19 6AQ"
        }
      }
    }
  }

  return (
    <>
      <MenuPageTracker 
        menuType="managers_special"
        specialOffers={[
          `${spirit.discount} ${spirit.name} - Valid until ${new Date(promotion.validUntil).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, breadcrumbSchema]) }}
      />
      
      {/* Hero Section */}
      <HeroWrapper
        route="/drinks/managers-special"
        title={`${spirit.discount} ${spirit.name}`}
        description={promotion.subheadline}
        size="medium"
        showStatusBar={true}
        tags={[
          { label: '🎯 Limited Time', variant: 'primary' },
          { label: `Valid until ${new Date(promotion.validUntil).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`, variant: 'default' },
          { label: spirit.abv, variant: 'default' },
          { label: spirit.origin, variant: 'default' }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/drinks#spirits">
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white text-anchor-green hover:bg-gray-100"
              >
                📖 View Full Drinks Menu
              </Button>
            </Link>
            <PhoneButton
              phone="01753 682707"
              source="managers_special_hero"
              variant="secondary"
              size="lg"
            >
              📞 Reserve Your Table
            </PhoneButton>
          </div>
        }
      />

      {/* Special Pricing Section */}
      <FullWidthSection className="bg-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Experience Islay's Wild Spirit
            </h2>
            
            <div className="grid md:grid-cols-12 gap-8 items-center">
              {/* Left side - Product Image (40% width) */}
              {(dynamicImagePath || spirit.image) && (
                <div className="md:col-span-5">
                  <div className="max-w-md mx-auto md:mx-0">
                    <img 
                      src={dynamicImagePath || spirit.image} 
                      alt={spirit.name}
                      className="w-full h-auto rounded-2xl shadow-xl"
                    />
                  </div>
                </div>
              )}
              
              {/* Right side - Pricing (60% width) */}
              <div className={`${(dynamicImagePath || spirit.image) ? 'md:col-span-7' : 'md:col-span-12'}`}>
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <PricingCard
                    title="Single"
                    volume="25ml"
                    currentPrice={spirit.specialPrice}
                    originalPrice={spirit.originalPrice}
                    savings="92p per drink"
                  />
                  <PricingCard
                    title="Double"
                    volume="50ml"
                    currentPrice={spirit.specialPriceDouble}
                    originalPrice={spirit.originalPriceDouble}
                    savings="£1.85 per drink"
                    featured={true}
                  />
                </div>
                <p className="text-center text-gray-700">
                  Served with your choice of premium mixer<br />
                  <span className="text-sm text-gray-600">(Mixers available from £1 additional)</span>
                </p>
              </div>
            </div>
          </div>
      </FullWidthSection>

      {/* About The Botanist */}
      <FullWidthSection className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About {spirit.name}</h2>
              <p className="text-xl text-gray-700 mb-4">{spirit.description}</p>
              <p className="text-gray-600 max-w-3xl mx-auto">{spirit.longDescription}</p>
            </div>
            
            <ProductDetails
              title="Key Details"
              details={[
                { label: 'Category', value: spirit.category },
                { label: 'ABV', value: spirit.abv },
                { label: 'Origin', value: spirit.origin }
              ]}
            />
          </div>
      </FullWidthSection>

      {/* Tasting Notes */}
      <FullWidthSection className="bg-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Tasting Experience</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">👃</span>
                  Flavour Profile
                </h3>
                <div className="space-y-4">
                  {spirit.tastingNotes.map((note, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-anchor-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-700">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">🥃</span>
                  Perfect Serves
                </h3>
                <div className="space-y-4">
                  {spirit.servingsuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-anchor-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-700">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </FullWidthSection>

      {/* 22 Botanicals */}
      <FullWidthSection className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-5xl mx-auto">
            <BotanicalsGrid
              title="22 Hand-Foraged Botanicals"
              description="Each bottle contains a unique blend of botanicals foraged from the windswept hills of Islay"
              botanicals={spirit.botanicals}
              columns={4}
            />
          </div>
      </FullWidthSection>

      {/* The Story Behind The Botanist */}
      <FullWidthSection className="bg-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              The Heritage of Islay's Wild Spirit
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p className="mb-6">
                The Botanist stands as a testament to Islay's rich botanical heritage. Crafted at the legendary Bruichladdich Distillery, this exceptional gin represents a radical departure from conventional gin-making. While most gins use between 6-10 botanicals, The Botanist daringly incorporates 22 hand-foraged local botanicals alongside 9 classic gin aromatics.
              </p>
              <p className="mb-6">
                Master Distiller Jim McEwan and botanist Richard Gulliver spent years exploring Islay's wild landscape, identifying native plants that could contribute unique flavours to their vision of the ultimate gin. From the coastal meadows to the inland hills, each botanical is sustainably foraged by a dedicated team who understand the island's delicate ecosystem.
              </p>
              <p>
                The result is a gin of unparalleled complexity - a true expression of place that captures the essence of Islay in every sip. The unique Lomond still, affectionately named "Ugly Betty," allows for an extraordinarily slow distillation process that preserves the delicate flavours of each botanical.
              </p>
            </div>
          </div>
      </FullWidthSection>

      {/* Why This Month's Special */}
      <FullWidthSection className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Why The Botanist for July?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-amber-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">☀️</span>
                  Perfect Summer Spirit
                </h3>
                <p className="text-gray-700">
                  As summer reaches its peak, The Botanist's fresh, floral notes make it the ideal gin for long, lazy afternoons in our beer garden. Its complexity shines in simple serves - a quality tonic, a twist of lemon, and you're transported to Islay's wild coastline.
                </p>
              </div>
              <div className="bg-green-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">💷</span>
                  Exceptional Value
                </h3>
                <p className="text-gray-700">
                  At 25% off, you're enjoying one of Scotland's most awarded gins at exceptional value. Compare our £2.78 single to London's £6+ and you'll see why locals and Heathrow travelers alike are making The Anchor their gin destination.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-700 italic">
                "We've selected The Botanist as our July special because it perfectly captures the essence of British summer. It's a gin that tells a story with every sip - and at these prices, everyone deserves to hear it."
              </p>
              <p className="text-sm text-gray-600 mt-2">- The Anchor Management Team</p>
            </div>
          </div>
      </FullWidthSection>

      {/* Food Pairing Suggestions */}
      <FullWidthSection className="bg-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Food Pairings to Enhance Your Botanist Experience
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3">Seafood Perfection</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Fish & Chips (£14.99)</li>
                  <li>• Scampi & Chips (£12.99)</li>
                  <li>• Salt & Chilli Squid (£7.49)</li>
                  <li>• Fish Finger Wrap (£9.99)</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3">Light Bites</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• The Garden Club Pizza (£12.99)</li>
                  <li>• Chicken Goujons (£7.49)</li>
                  <li>• Onion Rings (£3.49)</li>
                  <li>• Sweet Potato Fries (£4.49)</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3">Classic Combinations</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Rustic Classic Pizza (£10.49)</li>
                  <li>• Garlic Bread (£9.49)</li>
                  <li>• Chunky Chips (£4.49)</li>
                  <li>• Half Fish & Chips (£11.99)</li>
                </ul>
              </div>
            </div>
            <p className="text-center text-gray-700">
              The botanical complexity of The Botanist pairs beautifully with our seafood dishes and crispy sides. 
              The citrus notes complement fish perfectly, while the herbal elements enhance lighter fare.
            </p>
          </div>
      </FullWidthSection>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "Is the 25% discount available all day?",
            answer: "Yes! The Manager's Special discount on The Botanist is available during all opening hours throughout July. Whether you're joining us for lunch, after-work drinks, or evening entertainment, you'll enjoy the same great price."
          },
          {
            question: "What mixers do you recommend with The Botanist?",
            answer: "We recommend Fever-Tree Mediterranean or Elderflower tonic to complement The Botanist's complex botanical profile. However, it's equally stunning with classic Indian tonic or even soda water. All our premium mixers are available from £1."
          },
          {
            question: "Can I book a gin tasting experience?",
            answer: "While we don't offer formal tastings, our knowledgeable bar staff are happy to talk you through The Botanist's unique production and botanical blend. For groups interested in learning more, please call 01753 682707 to arrange."
          },
          {
            question: "Do you sell bottles of The Botanist to take away?",
            answer: "We're licensed for on-premises consumption only. However, you're welcome to enjoy as many serves as you like during your visit! For bottle purchases, we recommend Majestic Wine in nearby Staines."
          },
          {
            question: "Is this offer available to Heathrow staff?",
            answer: "Absolutely! We love serving the airport community. The Botanist special is perfect for crews celebrating completed rosters or ground staff after a long shift."
          },
          {
            question: "Will you have different spirits on special in future months?",
            answer: "Yes! Our Manager's Special changes monthly, featuring premium spirits at exceptional prices. Follow us on social media or join our mailing list to be first to know about upcoming offers."
          }
        ]}
        title="Questions About Our Botanist Special"
        className="bg-white"
      />

      {/* Local Area Connection */}
      <FullWidthSection className="bg-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Your Premium Gin Destination Near Heathrow
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p className="mb-6">
                Just 5 minutes from Heathrow Airport, The Anchor has become the discerning gin lover's choice for quality serves without airport prices. Our Manager's Special makes premium gin accessible to everyone - from BA cabin crew unwinding after long-haul flights to local Stanwell Moor residents enjoying their Friday evening.
              </p>
              <p className="mb-6">
                Unlike airport bars where a G&T can cost £12+, we believe great gin should be enjoyed, not rationed. That's why we're offering The Botanist - winner of 'World's Best Gin' at the World Gin Awards - at prices that encourage exploration and experimentation.
              </p>
              <p>
                Whether you're killing time before a flight, meeting friends after landing, or simply seeking Stanwell Moor's best gin selection, The Anchor provides the perfect setting. Our knowledgeable staff, quality serves, and welcoming atmosphere have made us the area's premier destination for gin enthusiasts.
              </p>
            </div>
          </div>
      </FullWidthSection>

      {/* CTA Section */}
      <FullWidthSection className="bg-gradient-to-br from-anchor-green to-emerald-800 text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
          }}></div>
        </div>
        <div className="relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              LIMITED TIME OFFER
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience The Botanist Today</h2>
            <p className="text-xl mb-8 text-emerald-100">Join us for Islay's wild spirit with 25% off throughout July</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <PhoneButton
                phone="01753 682707"
                source="managers_special_reserve"
                size="lg"
                className="bg-white text-anchor-green hover:bg-gray-100"
              >
                <span className="mr-2">📞</span> Reserve Your Table
              </PhoneButton>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-anchor-green"
                asChild
              >
                <Link href="/find-us">
                  <span className="mr-2">📍</span> Find Us
                </Link>
              </Button>
            </div>
            <div className="inline-flex items-center gap-2 text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-amber-300">⏰</span>
              <span>Offer ends {new Date(promotion.validUntil).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </FullWidthSection>
    </>
  )
}