import { Metadata } from 'next'
import Link from 'next/link'
import { HeroWrapper } from '@/components/hero/HeroWrapper'
import { Section, Card, CardBody, Button, Badge } from '@/components/ui'
import { BookTableButton } from '@/components/BookTableButton'
import { DirectionsButton } from '@/components/DirectionsButton'
import { generateBreadcrumbSchema } from '@/lib/enhanced-schemas'
import { DEFAULT_DRINKS_IMAGE } from '@/lib/image-fallbacks'

export const metadata: Metadata = {
  title: 'Baby Guinness Shot £3.50 | The Anchor - Heathrow Pub & Dining | Near Heathrow',
  description: 'Perfect Baby Guinness shots at The Anchor, just 7 minutes from Heathrow. £3.50 each or 2 for £6. Popular for hen parties and celebrations. Much cheaper than airport bars.',
  keywords: 'baby guinness, baby guinness shot, layered shot, kahlua baileys, pub shots, The Anchor - Heathrow Pub & Dining',
  alternates: {
    canonical: '/drinks/baby-guinness'
  },
  openGraph: {
    title: 'Baby Guinness Shot at The Anchor',
    description: 'The perfect layered shot that looks like a tiny Guinness. £3.50 each or 2 for £6.',
    images: [DEFAULT_DRINKS_IMAGE],
  }
}

export default function BabyGuinnessPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Drinks', url: '/drinks' },
    { name: 'Baby Guinness', url: '/drinks/baby-guinness' }
  ])

  return (
    <>
      <HeroWrapper
        route="/drinks/baby-guinness"
        title="Baby Guinness Shot"
        description="Stanwell Moor's Favourite Party Starter"
        overlay="gradient"
        className="min-h-[40vh]"
        breadcrumbs={[
          { name: 'Drinks', href: '/drinks' },
          { name: 'Baby Guinness' }
        ]}
      />

      {/* Main Content */}
      <Section background="white" spacing="lg" container containerSize="md">
        <article className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-3xl md:text-4xl font-bold text-anchor-green mb-6">
                Baby Guinness Shot at The Anchor - Heathrow Pub & Dining's Favourite Party Starter
              </h1>
              
              {/* Price Badge */}
              <div className="flex gap-4 mb-8">
                <Badge variant="primary" className="text-lg px-4 py-2">
                  £3.50 each
                </Badge>
                <Badge variant="success" className="text-lg px-4 py-2">
                  2 for £6
                </Badge>
              </div>

              {/* What is a Baby Guinness */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-anchor-green mb-4">What is a Baby Guinness?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Baby Guinness is our most popular layered shot that looks exactly like a tiny pint 
                  of Guinness - complete with the distinctive dark body and creamy white head. Despite its 
                  name, it contains no actual Guinness! Instead, it's made with coffee liqueur (usually Kahlúa) 
                  as the base and Irish cream liqueur (typically Bailey's) floated on top.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This clever visual trick makes it one of the most Instagram-worthy shots you can order, 
                  and at The Anchor, we've perfected the art of pouring them. Located just 7 minutes from 
                  Heathrow Terminal 5, we're the perfect spot for pre-flight celebrations or welcoming 
                  friends back from their travels.
                </p>
              </section>

              {/* Recipe Card */}
              <Card className="bg-anchor-sand/20 mb-12">
                <CardBody>
                  <h3 className="text-xl font-bold text-anchor-green mb-4">How We Make Our Baby Guinness</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Ingredients:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="mr-2">☕</span>
                          <span>2/3 shot Kahlúa coffee liqueur (bottom layer)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">🥛</span>
                          <span>1/3 shot Bailey's Irish Cream (floated on top)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">🥃</span>
                          <span>Served in a shot glass</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">The Perfect Pour:</h4>
                      <ol className="space-y-2">
                        <li>1. Fill shot glass 2/3 with Kahlúa</li>
                        <li>2. Hold spoon upside down over the Kahlúa</li>
                        <li>3. Slowly pour Bailey's over the spoon</li>
                        <li>4. The Bailey's will float on top</li>
                        <li>5. Admire, photograph, then shoot!</li>
                      </ol>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Perfect For Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-anchor-green mb-4">Perfect for Celebrations at The Anchor</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">🎉 Party Occasions</h3>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Hen parties and stag dos</li>
                      <li>• Birthday celebrations</li>
                      <li>• Work leaving parties</li>
                      <li>• Pre-flight send-offs</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">🍽️ Perfect Timing</h3>
                    <ul className="space-y-1 text-gray-700">
                      <li>• After your Sunday roast</li>
                      <li>• Before our monthly quiz night</li>
                      <li>• During drag show events</li>
                      <li>• Happy endings to any meal</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* History Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-anchor-green mb-4">The History of the Baby Guinness</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Baby Guinness shot was invented in the 1980s and has become a staple of British and Irish 
                  pub culture. The genius behind this shot was its visual appeal - creating something that looked 
                  exactly like a miniature pint of Ireland's most famous stout, but tasted completely different.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The combination of coffee and cream flavours makes it surprisingly smooth and easy to drink, 
                  which is why it's become one of the most ordered shots in pubs across the UK. At The Anchor, 
                  we've been serving Baby Guinness shots for years, and they remain one of our top sellers - 
                  especially on Tuesday pizza nights and during our weekend events.
                </p>
              </section>

              {/* Variations */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-anchor-green mb-4">Variations We Also Serve</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardBody className="text-center">
                      <h3 className="font-semibold mb-2">Classic Baby Guinness</h3>
                      <p className="text-sm text-gray-600">Kahlúa & Bailey's</p>
                      <p className="text-anchor-gold font-bold">£3.50</p>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="text-center">
                      <h3 className="font-semibold mb-2">Slippery Nipple</h3>
                      <p className="text-sm text-gray-600">Vodka, Bailey's & Grenadine</p>
                      <p className="text-anchor-gold font-bold">£4.00</p>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="text-center">
                      <h3 className="font-semibold mb-2">B52</h3>
                      <p className="text-sm text-gray-600">Kahlúa, Bailey's & Grand Marnier</p>
                      <p className="text-anchor-gold font-bold">£4.50</p>
                    </CardBody>
                  </Card>
                </div>
              </section>

              {/* Why Choose The Anchor */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-anchor-green mb-4">
                  Why Order Baby Guinness at The Anchor?
                </h2>
                <div className="bg-anchor-green/10 rounded-lg p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-anchor-gold mr-3">✓</span>
                      <span><strong>Better Value:</strong> £3.50 vs £8+ at Heathrow Airport bars</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-anchor-gold mr-3">✓</span>
                      <span><strong>Perfect Location:</strong> Just 7 minutes from Terminal 5</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-anchor-gold mr-3">✓</span>
                      <span><strong>Experienced Staff:</strong> We make hundreds every month</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-anchor-gold mr-3">✓</span>
                      <span><strong>Great Atmosphere:</strong> Friendly local pub, not a chain</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-anchor-gold mr-3">✓</span>
                      <span><strong>FREE Parking:</strong> No airport parking fees here!</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* FAQs */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-anchor-green mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Does a Baby Guinness contain actual Guinness?</h3>
                    <p className="text-gray-700">No, despite the name, there's no Guinness in a Baby Guinness. 
                    It's called that because it looks like a tiny pint of Guinness when properly layered.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">How strong is a Baby Guinness?</h3>
                    <p className="text-gray-700">It's relatively mild at around 17% ABV when mixed. The Kahlúa 
                    is 20% ABV and Bailey's is 17% ABV, making it lighter than most straight spirits.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Can I order Baby Guinness for a large group?</h3>
                    <p className="text-gray-700">Absolutely! They're perfect for celebrations. For groups of 
                    10 or more, give us a heads up and we'll have them ready when you arrive.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Do you offer any deals on Baby Guinness shots?</h3>
                    <p className="text-gray-700">Yes! Get 2 for £6 - perfect for sharing with a friend or 
                    for when one just isn't enough!</p>
                  </div>
                </div>
              </section>
            </div>
          </article>
      </Section>

      {/* CTA Section */}
      <Section background="dark" spacing="md" container containerSize="md">
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for a Baby Guinness?</h2>
            <p className="text-xl mb-8">Visit The Anchor today for the perfect shot</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <BookTableButton
                source="baby_guinness_page"
                variant="outline"
                size="lg"
                className="!text-white !border-white hover:!bg-white hover:!text-anchor-green"
              />
              <Link href="/drinks">
                <Button variant="outline" size="lg" className="!text-white !border-white hover:!bg-white hover:!text-anchor-green">
                  View Full Drinks Menu
                </Button>
              </Link>
            </div>
            
            <div className="text-white/90">
              <p className="mb-2">📍 Just 7 minutes from Heathrow Terminal 5</p>
              <p className="mb-2">🚗 FREE parking available</p>
              <p>📞 Call: 01753 682707</p>
            </div>
          </div>
      </Section>

      {/* Recipe Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Recipe",
            "name": "Baby Guinness Shot",
            "description": "A layered shot that looks like a tiny pint of Guinness, made with Kahlúa and Bailey's",
            "image": `https://www.the-anchor.pub${DEFAULT_DRINKS_IMAGE}`,
            "author": {
              "@type": "Organization",
              "name": "The Anchor"
            },
            "prepTime": "PT1M",
            "cookTime": "PT0M",
            "totalTime": "PT1M",
            "recipeYield": "1 shot",
            "recipeCategory": "Shot",
            "recipeCuisine": "British",
            "keywords": "baby guinness, shot, layered shot, kahlua, baileys",
            "recipeIngredient": [
              "20ml Kahlúa coffee liqueur",
              "10ml Bailey's Irish Cream"
            ],
            "recipeInstructions": [
              {
                "@type": "HowToStep",
                "text": "Fill shot glass 2/3 with Kahlúa"
              },
              {
                "@type": "HowToStep",
                "text": "Hold a spoon upside down over the Kahlúa"
              },
              {
                "@type": "HowToStep",
                "text": "Slowly pour Bailey's over the spoon to create a layer"
              },
              {
                "@type": "HowToStep",
                "text": "Serve immediately"
              }
            ],
            "nutrition": {
              "@type": "NutritionInformation",
              "servingSize": "1 shot (30ml)",
              "calories": "95 calories"
            }
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
