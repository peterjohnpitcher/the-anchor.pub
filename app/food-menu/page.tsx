import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { StatusBar } from '@/components/StatusBar'
import { MenuRenderer } from '@/components/MenuRenderer'
import { DailySpecials } from '@/components/DailySpecials'
import { PageHeaderWrapper } from '@/components/ui/PageHeaderWrapper'
import { FAQAccordionWithSchema } from '@/components/FAQAccordionWithSchema'
import { parseMenuMarkdown } from '@/lib/menu-parser'
import { getBusinessHours } from '@/lib/api'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Food Menu Near Me | The Anchor Stanwell Moor | Traditional British Pub Food',
  description: 'Enjoy traditional British pub food at The Anchor. Famous Sunday roasts, stone-baked pizzas, burgers, and family-friendly meals. Kitchen open Tuesday-Sunday.',
  keywords: 'pub food stanwell moor, sunday roast near heathrow, british pub menu, family restaurant stanwell',
  openGraph: {
    title: 'Food Menu - The Anchor Pub',
    description: 'Traditional British pub food, famous Sunday roasts, and family-friendly dining near Heathrow.',
    images: ['/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg'],
  },
}

export default async function FoodMenuPage() {
  const [menuData, businessHours] = await Promise.all([
    parseMenuMarkdown('food'),
    getBusinessHours()
  ])
  
  if (!menuData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Menu temporarily unavailable. Please call us on 01753 682707.</p>
      </div>
    )
  }

  const isOpen = businessHours?.currentStatus?.isOpen || false

  // Create schemas
  const pizzaBOGOFSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "Buy One Get One Free Pizza - Every Tuesday",
    "description": "BOGOF on all stone-baked pizzas every Tuesday at The Anchor. Dine-in and takeaway available.",
    "url": "https://the-anchor.pub/food-menu#pizza",
    "priceCurrency": "GBP",
    "eligibleRegion": {
      "@type": "Place",
      "name": "Stanwell Moor, Staines, Ashford, Feltham, and surrounding Surrey areas"
    },
    "availabilityStarts": "2025-01-01",
    "availabilityEnds": "2025-12-31",
    "validFrom": "16:00",
    "validThrough": "22:00",
    "dayOfWeek": "https://schema.org/Tuesday",
    "itemOffered": {
      "@type": "Product",
      "name": "Stone-Baked Pizzas",
      "category": "Pizza"
    },
    "seller": {
      "@type": "LocalBusiness",
      "name": "The Anchor",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Stanwell Moor",
        "addressRegion": "Surrey"
      }
    }
  }

  const fridayFishOfferSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "50% Off Fish & Chips for Over 65s - Every Friday",
    "description": "Half price fish and chips for senior citizens every Friday at The Anchor pub.",
    "url": "https://the-anchor.pub/food-menu#mains",
    "priceCurrency": "GBP",
    "eligibleRegion": {
      "@type": "Place",
      "name": "Stanwell Moor and surrounding areas"
    },
    "eligibleCustomerType": "Senior Citizens (65+)",
    "dayOfWeek": "https://schema.org/Friday",
    "seller": {
      "@type": "LocalBusiness",
      "name": "The Anchor"
    }
  }

  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Food Menu",
    "hasMenuSection": []
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([menuSchema, pizzaBOGOFSchema, fridayFishOfferSchema]) }}
      />
      {/* Hero Section */}
      <PageHeaderWrapper
        route="/food-menu"
        title="Good Food, Good Company"
        description="Great memories start with great food"
        minHeight="min-h-[50vh]"
        showStatusBar={true}
      >
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="tag bg-white/90 backdrop-blur-sm">🍖 Sunday Roasts</span>
          <span className="tag bg-white/90 backdrop-blur-sm">🍕 Stone-Baked Pizzas</span>
          <span className="tag bg-white/90 backdrop-blur-sm">🍔 Burgers & Stacks</span>
          <span className="tag bg-white/90 backdrop-blur-sm">🌱 Veggie Options</span>
        </div>
        
        <CallToAction 
          href="#menu"
          variant="primary"
          size="lg"
          className="bg-white text-anchor-green hover:bg-gray-100"
        >
          📖 Jump to Menu
        </CallToAction>
      </PageHeaderWrapper>

      {/* Daily Specials - Shows only on relevant days */}
      <DailySpecials isOpen={isOpen} />

      {/* Perfect Pre-Flight Meal Section */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Perfect Pre-Flight Meal - 5 Minutes from Heathrow
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="font-bold text-xl text-anchor-green mb-4">✈️ Quick Access from All Terminals</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">T2 & T3:</span>
                    <span>5 minutes by taxi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">T4:</span>
                    <span>7 minutes via Southern Perimeter Road</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">T5:</span>
                    <span>8 minutes via M25</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">Free parking available - no airport fees!</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="font-bold text-xl text-anchor-green mb-4">🍽️ Why Eat at the Airport?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Proper portions at pub prices</li>
                  <li>• Relaxed atmosphere without the rush</li>
                  <li>• Real food, freshly cooked to order</li>
                  <li>• Free WiFi to check flight status</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">Most meals served within 15 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staines & Local Authority Content */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8">
              Staines' Favourite Traditional Pub Food
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Serving Stanwell Moor, Staines, and surrounding areas with proper British pub grub since opening our doors. 
              Where Heathrow workers grab lunch, families gather for Sunday roasts, and locals know they'll always get a warm welcome.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">🐟</div>
                <h3 className="font-bold text-lg mb-2">Famous Fish & Chips</h3>
                <p className="text-gray-700">Beer-battered to order, served with proper mushy peas</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">🥧</div>
                <h3 className="font-bold text-lg mb-2">Homestyle Pies</h3>
                <p className="text-gray-700">Beef & ale, chicken & mushroom - proper comfort food</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl mb-3">🍖</div>
                <h3 className="font-bold text-lg mb-2">Sunday Roasts</h3>
                <p className="text-gray-700">The talk of Stanwell Moor - book early to avoid disappointment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food & Drink Pairings */}
      <section className="section-spacing bg-anchor-gold/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Perfect Pairings - Food & Drinks Together
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl text-anchor-green mb-4">🍔 With Our Burgers</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Beef Burger:</strong> Pairs perfectly with a pint of Stella or Carlsberg</li>
                  <li><strong>Spicy Chicken:</strong> Cool it down with a crisp Birra Moretti</li>
                  <li><strong>Veggie Stack:</strong> Try with our refreshing Aspall cider</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-xl text-anchor-green mb-4">🍕 With Our Pizzas</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Fully Loaded:</strong> Italian Peroni is the classic choice</li>
                  <li><strong>Nice & Spicy:</strong> Smirnoff & lemonade cuts through the heat</li>
                  <li><strong>Garden Club:</strong> Light Pinot Grigio complements perfectly</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-xl text-anchor-green mb-4">🐟 With Fish & Chips</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Classic pairing:</strong> Greene King IPA or Abbot Ale</li>
                  <li><strong>Lighter option:</strong> Sauvignon Blanc cuts through the batter</li>
                  <li><strong>Traditional choice:</strong> A proper cup of tea!</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-xl text-anchor-green mb-4">🥘 With Sunday Roast</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Beef:</strong> Full-bodied Shiraz or a pint of bitter</li>
                  <li><strong>Chicken:</strong> Chardonnay or a smooth Carlsberg</li>
                  <li><strong>Lamb:</strong> Malbec brings out the flavours beautifully</li>
                </ul>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-8">
              Ask our staff for recommendations - they know their stuff!
            </p>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <div id="menu">
        <MenuRenderer menuData={menuData} />
      </div>

      {/* Additional Information */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-lg text-anchor-green mb-2">Allergen Information</h3>
              <p className="text-gray-700">
                All our dishes are prepared in a single kitchen where allergens are present. While we take every 
                precaution, we cannot guarantee dishes are free from cross-contamination. If you have allergies or 
                dietary requirements, please speak to a member of our team before ordering. We use vegetable oil 
                where necessary to keep dishes light yet warming during colder months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordionWithSchema 
        faqs={[
          {
            question: "What time is the kitchen open at The Anchor?",
            answer: "Our kitchen is open Tuesday to Friday from 6pm-9pm, Saturday from 1pm-7pm, and Sunday from 12pm-5pm for our famous Sunday roasts. The kitchen is closed Mondays. During busy periods we recommend booking ahead."
          },
          {
            question: "Do you serve Sunday roast at The Anchor?",
            answer: "Yes! Our celebrated Sunday roasts are served every Sunday from 12pm-5pm. We offer beef, chicken, lamb, and vegetarian options. All Sunday roasts must be ordered and paid for by 1pm on Saturday. Booking is essential as we're very popular - many say we serve the best Sunday roast in Surrey!"
          },
          {
            question: "Is there a children's menu at The Anchor?",
            answer: "Yes, we have a dedicated children's menu with smaller portions and kid-friendly options. Children are always welcome at The Anchor with no time restrictions. We also provide high chairs and colouring activities to keep the little ones entertained."
          },
          {
            question: "What's the Tuesday pizza deal at The Anchor?",
            answer: "Every Tuesday we offer Buy One Get One Free (BOGOF) on all our stone-baked pizzas! This applies to eat-in and takeaway. It's our most popular offer - perfect for families and pizza lovers."
          },
          {
            question: "Do you cater for dietary requirements?",
            answer: "Yes, we have vegetarian options marked on our menu and can accommodate most dietary requirements. Please inform our staff about any allergies or dietary needs when ordering. Note that all dishes are prepared in the same kitchen where allergens are present."
          },
          {
            question: "Can I book a table for food at The Anchor?",
            answer: "Absolutely! We recommend booking ahead, especially for Sunday roasts and weekend evenings. Call us on 01753 682707 to reserve your table. We can accommodate large groups with advance notice."
          },
          {
            question: "Do you offer takeaway food?",
            answer: "Yes, our entire food menu is available for takeaway. Call ahead on 01753 682707 to place your order and we'll have it ready for collection. Tuesday pizza BOGOF deal applies to takeaway too!"
          },
          {
            question: "What's the best pub food near Heathrow Airport?",
            answer: "The Anchor is just 7 minutes from Terminal 5 and serves traditional British pub food at local prices - much better value than airport restaurants! We're perfect for pre-flight meals with free parking and quick service."
          },
          {
            question: "What payment methods are accepted at The Anchor?",
            answer: "We accept cash and all major credit and debit cards, including American Express. Whether you're dining in, getting takeaway, or just having drinks, we make payment easy and convenient."
          }
        ]}
        className="bg-white"
      />

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Hungry? Book Your Table Now
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our kitchen gets busy, especially on weekends. Book ahead to avoid disappointment!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="lg"
            >
              📞 Call: 01753 682707
            </CallToAction>
            <CallToAction 
              href="/drinks"
              variant="white"
              size="lg"
            >
              🍺 View Drinks Menu
            </CallToAction>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Menu",
              "name": "The Anchor Food Menu",
              "description": "Traditional British pub food menu",
              "hasMenuSection": menuData.categories.map(category => ({
                "@type": "MenuSection",
                "name": category.title,
                "hasMenuItem": category.sections.flatMap(section => 
                  section.items.map(item => ({
                    "@type": "MenuItem",
                    "name": item.name,
                    "description": item.description,
                    "offers": {
                      "@type": "Offer",
                      "price": item.price.replace(/[£$]/, '').split(' / ')[0],
                      "priceCurrency": "GBP"
                    },
                    ...(item.vegetarian && {
                      "suitableForDiet": ["https://schema.org/VegetarianDiet"]
                    })
                  }))
                )
              })),
              "inLanguage": "en-GB",
              "provider": {
                "@type": "Restaurant",
                "name": "The Anchor",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Horton Road",
                  "addressLocality": "Stanwell Moor",
                  "addressRegion": "Surrey",
                  "postalCode": "TW19 6AQ"
                }
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What time is the kitchen open at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our kitchen is open Tuesday to Friday from 6pm-9pm, Saturday from 1pm-7pm, and Sunday from 12pm-5pm for our famous Sunday roasts. The kitchen is closed Mondays. During busy periods we recommend booking ahead."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you serve Sunday roast at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our celebrated Sunday roasts are served every Sunday from 12pm-5pm. We offer beef, chicken, lamb, and vegetarian options. All Sunday roasts must be ordered and paid for by 1pm on Saturday. Booking is essential as we're very popular - many say we serve the best Sunday roast in Surrey!"
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there a children's menu at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we have a dedicated children's menu with smaller portions and kid-friendly options. Children are always welcome at The Anchor with no time restrictions. We also provide high chairs and colouring activities to keep the little ones entertained."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What's the Tuesday pizza deal at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Every Tuesday we offer Buy One Get One Free (BOGOF) on all our stone-baked pizzas! This applies to eat-in and takeaway. It's our most popular offer - perfect for families and pizza lovers."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you cater for dietary requirements?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we have vegetarian options marked on our menu and can accommodate most dietary requirements. Please inform our staff about any allergies or dietary needs when ordering. Note that all dishes are prepared in the same kitchen where allergens are present."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I book a table for food at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! We recommend booking ahead, especially for Sunday roasts and weekend evenings. Call us on 01753 682707 to reserve your table. We can accommodate large groups with advance notice."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer takeaway food?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our entire food menu is available for takeaway. Call ahead on 01753 682707 to place your order and we'll have it ready for collection. Tuesday pizza BOGOF deal applies to takeaway too!"
                  }
                },
                {
                  "@type": "Question",
                  "name": "What's the best pub food near Heathrow Airport?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Anchor is just 7 minutes from Terminal 5 and serves traditional British pub food at local prices - much better value than airport restaurants! We're perfect for pre-flight meals with free parking and quick service."
                  }
                }
              ]
            }
          ])
        }}
      />
    </>
  )
}