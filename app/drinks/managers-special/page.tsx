import { Metadata } from 'next'
import Image from 'next/image'
import { Button, Container, Section, FullWidthSection } from '@/components/ui'
import { StatusBar } from '@/components/StatusBar'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { generateBreadcrumbSchema } from '@/lib/enhanced-schemas'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import Link from 'next/link'
import { PricingCard } from '@/components/PricingCard'
import { ProductDetails } from '@/components/ProductDetails'
import { BotanicalsGrid } from '@/components/BotanicalsGrid'
import { FeatureGrid } from '@/components/ui'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { MenuPageTracker } from '@/components/MenuPageTracker'
import { PhoneButton } from '@/components/PhoneButton'
import { BookTableButton } from '@/components/BookTableButton'
import { PageTitle } from '@/components/ui/typography/PageTitle'
import { getCurrentPromotion, getPromotionImage } from '@/lib/managers-special-utils'
import { notFound } from 'next/navigation'

// This function runs at build time and request time
export async function generateMetadata(): Promise<Metadata> {
  const currentPromotion = getCurrentPromotion()
  
  if (!currentPromotion) {
    return {
      title: "Manager's Special | The Anchor - Heathrow Pub & Dining",
      description: "Check back soon for our latest Manager's Special offers at The Anchor.",
    }
  }

  const { promotion } = currentPromotion
  
  return {
    title: promotion.metaTitle || `Manager's Special - ${currentPromotion.spirit.name} | The Anchor - Heathrow Pub & Dining`,
    description: promotion.metaDescription || `Enjoy ${currentPromotion.spirit.discount} off ${currentPromotion.spirit.name} at The Anchor. Limited time offer.`,
    keywords: `${currentPromotion.spirit.name.toLowerCase()} offer, gin promotion stanwell moor, pub drinks special heathrow`,
    openGraph: {
      title: promotion.metaTitle || `Manager's Special - ${currentPromotion.spirit.discount} ${currentPromotion.spirit.name}`,
      description: promotion.metaDescription || currentPromotion.spirit.description,
      images: [getPromotionImage(currentPromotion.imageFolder) || '/images/spirits/default.jpg'],
    },
    twitter: getTwitterMetadata({
      title: promotion.metaTitle || `Manager's Special - ${currentPromotion.spirit.discount} ${currentPromotion.spirit.name}`,
      description: promotion.metaDescription || currentPromotion.spirit.description,
      images: [getPromotionImage(currentPromotion.imageFolder) || '/images/spirits/default.jpg']
    })
  }
}

export default function ManagersSpecialPage() {
  const currentPromotion = getCurrentPromotion()
  
  // If no active promotion, show 404
  if (!currentPromotion) {
    notFound()
  }
  
  const { spirit, promotion } = currentPromotion
  const dynamicImagePath = getPromotionImage(currentPromotion.imageFolder)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Drinks Menu', url: '/drinks' },
    { name: "Manager's Special", url: '/drinks/managers-special' }
  ])

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
      "url": "https://www.the-anchor.pub/drinks/managers-special",
      "priceCurrency": "GBP",
      "price": spirit.specialPrice.replace('£', ''),
      "priceValidUntil": currentPromotion.endDate,
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

  const faqs = spirit.name.includes('Botanist') ? [
    {
      question: "What makes The Botanist gin special?",
      answer: "The Botanist features 22 hand-foraged botanicals from the Isle of Islay, making it one of the most complex gins in the world. Each botanical is picked at its peak and contributes to the gin's unique layered flavor profile."
    },
    {
      question: "How should I serve The Botanist?",
      answer: "The Botanist is versatile - try it with premium tonic and lemon peel, elderflower tonic with fresh thyme, in a classic martini, or neat over ice to appreciate its complexity. Each serve highlights different botanical notes."
    },
    {
      question: "What's included in the 25% off offer?",
      answer: "The discount applies to all serves of The Botanist throughout the promotion period. Singles are £2.78 (was £3.70). The offer is available at the bar - no booking required."
    },
    {
      question: "Can I book a table to try The Botanist?",
      answer: "Walk-ins are always welcome at The Anchor! While you don't need to book for drinks, if you're planning to dine with us too, you can book a table online or call 01753 682707."
    }
  ] : spirit.name.includes('Warners') ? [
    {
      question: "What makes Warners Elderflower gin special?",
      answer: "Warners Elderflower gin is infused with fresh elderflowers handpicked from the hedgerows surrounding Falls Farm in Northamptonshire. It captures the essence of British summertime with natural floral sweetness balanced by classic gin botanicals."
    },
    {
      question: "What's the best way to serve Warners Elderflower?",
      answer: "We recommend pairing it with Schweppes Slimline Elderflower tonic and fresh lime for a double elderflower experience. The elderflower tonic amplifies the gin's floral notes while keeping things light and refreshing."
    },
    {
      question: "What's included in the 25% off offer?",
      answer: "The discount applies to all serves of Warners Elderflower throughout August. Singles are £2.85 (was £3.80). Available every day at the bar - no booking required."
    },
    {
      question: "Is Warners Elderflower good for gin cocktails?",
      answer: "Absolutely! Beyond G&Ts, try it in an Elderflower Collins with lemon and soda, or with premium tonic and cucumber ribbon. The natural elderflower sweetness makes it perfect for refreshing summer cocktails."
    }
  ] : spirit.name.includes('Redleg') ? [
    {
      question: "What makes Redleg Spiced Rum special?",
      answer: "Redleg is a Caribbean spiced rum infused with Jamaican ginger and vanilla. Named after the red leg hermit crab, it brings authentic island warmth with its smooth blend of spices - perfect for those first chilly autumn evenings."
    },
    {
      question: "What's the best way to serve Redleg?",
      answer: "Redleg shines with premium ginger beer and fresh lime for a warming serve, or keep it classic with cola and a lime squeeze. As September nights draw in, it's also exceptional neat over ice to appreciate the vanilla and spice notes."
    },
    {
      question: "What's included in the 25% off offer?",
      answer: "The discount applies to all serves of Redleg Spiced Rum throughout September. Singles are £3.00 (was £4.00). Available every day at the bar - no booking required."
    },
    {
      question: "Why is spiced rum perfect for September?",
      answer: "As summer transitions to autumn, Redleg's warming spices - ginger, vanilla, and cinnamon - provide the perfect golden glow for cooler evenings. It's like Caribbean sunshine in a glass, ideal for the changing season."
    }
  ] : []

  return (
    <>
      <MenuPageTracker 
        menuType="managers_special"
        specialOffers={[
          `${spirit.discount} ${spirit.name} - Valid until ${new Date(currentPromotion.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`
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
          { label: `Valid until ${new Date(currentPromotion.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`, variant: 'default' },
          { label: spirit.abv, variant: 'default' },
          { label: spirit.origin, variant: 'default' }
        ]}
        breadcrumbs={[
          { name: 'Drinks', href: '/drinks' },
          { name: "Manager's Special" }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookTableButton
              source="managers_special_hero"
              variant="secondary"
              size="lg"
              className="bg-white text-purple-700 hover:bg-gray-100"
            />
            <Link href="#details">
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                🍸 View Details
              </Button>
            </Link>
            <PhoneButton
              phone="01753 682707"
              variant="secondary"
              size="lg"
              className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              source="managers_special_hero"
            />
          </div>
        }
      />

      {/* Page Title for SEO */}
      <Section className="py-4 md:py-6">
        <Container>
          <PageTitle 
            className="text-center text-purple-700"
            seo={{ structured: true }}
          >
            {promotion.headline} - {spirit.name} at The Anchor
          </PageTitle>
        </Container>
      </Section>

      {/* Product showcase with image */}
      <FullWidthSection id="details" className="bg-gradient-to-br from-purple-50 to-purple-100/50 py-12 md:py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            {/* Product Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                {dynamicImagePath && (
                  <Image 
                    src={dynamicImagePath}
                    alt={`${spirit.name} - ${promotion.headline}`}
                    width={400}
                    height={600}
                    className="w-full h-auto rounded-lg"
                    unoptimized
                  />
                )}
                <div className="absolute -top-6 -right-6 bg-gradient-to-br from-amber-400 to-amber-500 text-white px-6 py-3 rounded-full shadow-lg font-bold text-xl transform rotate-12">
                  {spirit.discount}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <ProductDetails 
              title="Spirit Details"
              details={[
                { label: "ABV", value: spirit.abv },
                { label: "Origin", value: spirit.origin },
                { label: "Distillery", value: spirit.distillery },
                { label: "Category", value: spirit.category }
              ]}
            />
          </div>
        </Container>
      </FullWidthSection>

      {/* Pricing Section */}
      <Section className="py-12 md:py-20 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Special Prices This {new Date(currentPromotion.startDate).toLocaleDateString('en-GB', { month: 'long' })}
              </h2>
              <p className="text-xl text-gray-600">
                Available at the bar • No booking required • While stocks last
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <PricingCard
                title="Single Measure"
                currentPrice={spirit.specialPrice}
                originalPrice={spirit.originalPrice}
                savings={spirit.discount}
                featured={true}
              />
              <p className="text-center text-gray-600 mt-4">
                Doubles available at bar prices
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Tasting & Botanicals */}
      <FullWidthSection className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Tasting Notes */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Tasting Notes</h2>
                <div className="space-y-4">
                  {spirit.tastingNotes.map((note: string, index: number) => (
                    <div key={index} className="flex items-start bg-white rounded-xl shadow-sm p-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-purple-600 font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 text-lg">{note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perfect Serves */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Perfect Serves</h2>
                <div className="space-y-4">
                  {spirit.servingsuggestions.map((suggestion: string, index: number) => (
                    <div key={index} className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">🍸</span>
                        <h3 className="font-semibold text-gray-900">Serve {index + 1}</h3>
                      </div>
                      <p className="text-gray-700">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </FullWidthSection>

      {/* Botanicals Grid */}
      {spirit.botanicals && spirit.botanicals.length > 0 && (
        <Section className="py-12 md:py-20 bg-purple-50">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {spirit.botanicals.length === 22 ? '22 Hand-Foraged ' : ''}Botanicals
                </h2>
                {spirit.name.includes('Botanist') && (
                  <p className="text-xl text-gray-600">
                    Foraged from the hills, shores and bogs of Islay
                  </p>
                )}
              </div>
              
              <BotanicalsGrid botanicals={spirit.botanicals} />
            </div>
          </Container>
        </Section>
      )}

      {/* Story Section */}
      <FullWidthSection className="py-12 md:py-20 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="bg-white border-2 border-purple-200 rounded-xl p-8 md:p-12 lg:p-16">
            <div className="flex items-center justify-center mb-6">
              <span className="text-5xl">🌿</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-anchor-green mb-8">
              The {spirit.name} Story
            </h2>
            <div className="space-y-6 text-gray-700 max-w-none">
              <p className="text-lg md:text-xl leading-relaxed">{spirit.longDescription}</p>
              {spirit.name.includes('Botanist') ? (
                <>
                  <p className="text-lg leading-relaxed">
                    Created at the Bruichladdich Distillery on Islay, The Botanist represents a unique 
                    approach to gin-making. Master Distiller Jim McEwan set out to create a gin that 
                    would reflect the wild, untamed nature of the Hebridean island.
                  </p>
                  <p className="text-lg leading-relaxed">
                    The result is a gin that tells the story of Islay in every sip - from the coastal 
                    herbs that face the Atlantic storms to the delicate flowers found in sheltered glens.
                  </p>
                </>
              ) : spirit.name.includes('Warners') ? (
                <>
                  <p className="text-lg leading-relaxed">
                    Founded by farmer Tom Warner, Warners Distillery began as a way to use surplus 
                    produce from Falls Farm. What started in a barn has grown into one of Britain's 
                    most celebrated craft distilleries.
                  </p>
                  <p className="text-lg leading-relaxed">
                    The elderflowers are picked at their peak in early summer, when the hedgerows are 
                    heavy with creamy white blossoms. These are then infused into their award-winning 
                    gin, creating that distinctive floral character.
                  </p>
                </>
              ) : spirit.name.includes('Redleg') ? (
                <>
                  <p className="text-lg leading-relaxed">
                    Named after the red leg hermit crab native to the Caribbean, Redleg represents 
                    the spirit of island life - vibrant, warm, and full of character. This spiced 
                    rum captures the essence of the tropics in every golden drop.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Distilled using traditional Jamaican pot stills and aged in oak barrels, Redleg 
                    is then infused with vanilla and ginger from the islands. The result is a smooth, 
                    warming rum that brings Caribbean sunshine to even the greyest British autumn day.
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </FullWidthSection>

      {/* FAQs */}
      <FAQAccordionWithSchema 
        title="Frequently Asked Questions"
        faqs={faqs}
        className="bg-gray-50"
      />

      {/* CTA Section */}
      <FullWidthSection className="bg-gradient-to-br from-purple-600 to-purple-800 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {promotion.ctaText}
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Visit The Anchor this {new Date(currentPromotion.startDate).toLocaleDateString('en-GB', { month: 'long' })} 
              and discover why {spirit.name} is our Manager's Special
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookTableButton
                source="managers_special_cta"
                size="lg"
                variant="secondary"
                className="bg-white text-purple-700 hover:bg-gray-100"
              />
              <Link href="/find-us">
                <Button size="lg" variant="secondary" className="bg-purple-700 text-white hover:bg-purple-600">
                  📍 Get Directions
                </Button>
              </Link>
              <PhoneButton
                phone="01753 682707"
                size="lg"
                variant="secondary"
                className="bg-purple-700 text-white hover:bg-purple-600"
                source="managers_special_cta"
              />
            </div>
            <p className="text-purple-200 mt-6">
              Offer valid until {new Date(currentPromotion.endDate).toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </Container>
      </FullWidthSection>
    </>
  )
}