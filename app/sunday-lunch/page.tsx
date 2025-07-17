import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { HeroWrapper } from '@/components/hero'
import { Metadata } from 'next'
import { CTASection, SectionHeader, FeatureGrid, InfoBoxGrid, AlertBox } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Sunday Roast | The Anchor Stanwell Moor | Best Sunday Lunch Near Heathrow',
  description: 'Our renowned Sunday roasts at The Anchor pub in Surrey. Traditional British roast dinners served 12-5pm every Sunday. Pre-order required. Near Heathrow Airport.',
  keywords: 'sunday roast stanwell moor, sunday lunch near heathrow, best roast dinner surrey, traditional sunday lunch',
  openGraph: {
    title: 'Famous Sunday Roasts at The Anchor',
    description: 'Traditional British Sunday roast dinners. Pre-order by 1pm Saturday required. Regular menu also available.',
    images: ['/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg'],
  },
}

export default function SundayLunchPage() {
  return (
    <>
      
      {/* Hero Section */}
      <HeroWrapper
        route="/sunday-lunch"
        title="Sunday Roast at The Anchor"
        description="Traditional British roast dinners that locals rave about"
        size="large"
        showStatusBar={false}
        tags={[
          { label: "Every Sunday 12pm - 5pm", variant: "warning" }
        ]}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallToAction 
              href="tel:01753682707"
              variant="primary"
              size="lg"
            >
              📞 Book Your Table Now
            </CallToAction>
            
            <CallToAction 
              href="#menu"
              variant="white"
              size="lg"
            >
              View Sunday Menu
            </CallToAction>
          </div>
        }
      >
        <div className="mt-6 bg-red-600/90 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
          <p className="text-white font-bold text-lg mb-1">
            ⚠️ IMPORTANT: Pre-order & Payment Required
          </p>
          <p className="text-white text-sm">
            Sunday roasts must be pre-ordered and paid for by 1pm on Saturday
          </p>
          <p className="text-white/90 text-xs mt-2">
            Regular menu also available on Sundays without pre-order
          </p>
        </div>
      </HeroWrapper>

      {/* Why Our Roasts Are Special */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Why Sundays Are Special Here"
            subtitle="We've been perfecting our Sunday roast for years. It's not just a meal, it's a tradition."
          />
          
          <FeatureGrid
            columns={3}
            features={[
              {
                icon: "👨‍🍳",
                title: "Chef's Pride",
                description: "Our head chef takes personal pride in every roast. Meat is sourced locally and cooked to perfection.",
                className: "text-center"
              },
              {
                icon: "🥘",
                title: "Generous Portions",
                description: "No one leaves hungry! Proper portions with all the trimmings. Extra Yorkshire puddings? Just ask!",
                className: "text-center"
              },
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Family Atmosphere",
                description: "Sundays are for families. Relaxed atmosphere, kids welcome, and plenty of space for everyone.",
                className: "text-center"
              }
            ]}
            className="max-w-5xl mx-auto"
          />
        </div>
      </section>

      {/* Sunday Menu */}
      <section id="menu" className="section-spacing bg-anchor-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Sunday Roast Menu"
            />
            <AlertBox
              variant="warning"
              title="📝 Pre-Order System (New for 2025)"
              className="mb-8 max-w-3xl mx-auto"
              content={
                <>
                  <p className="text-gray-700 mb-4">
                    Our Sunday dinners are made from scratch and to order. <strong>All Sunday roasts must be 
                    pre-ordered and paid for by 1pm on Saturday.</strong> This ensures we can prepare your meal 
                    fresh to order - a delicious 'like home' Sunday lunch.
                  </p>
                  <div className="bg-white rounded-lg p-4 mt-4">
                    <p className="text-sm text-gray-600 text-center">
                      <strong>Can't pre-order?</strong> No problem! Our regular menu is also available on 
                      Sundays without pre-order requirement.
                    </p>
                  </div>
                </>
              }
            />
            <p className="text-center text-sm text-gray-600 italic mb-12">
              All dishes served with herb and garlic-crusted roast potatoes, seasonal vegetables, 
              Yorkshire pudding, and red wine gravy. Vegetarian gravy available on request.
            </p>
            
            {/* Main Roasts */}
            <div className="space-y-6 mb-12">
              {/* Roasted Chicken */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Roasted Chicken</h3>
                  <span className="text-2xl font-bold text-anchor-gold">£14.99</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Oven-roasted chicken breast with sage & onion stuffing balls, herb and garlic-crusted roast potatoes, 
                  seasonal vegetables, Yorkshire pudding, and red wine gravy. Vegetarian gravy available on request.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Pair with: El Pico Sauvignon Blanc – crisp and refreshing | Pint of Birra Moretti – smooth and well-rounded.
                </p>
              </div>
              
              {/* Slow-Cooked Lamb Shank */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Slow-Cooked Lamb Shank</h3>
                  <span className="text-2xl font-bold text-anchor-gold">£15.49</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Tender slow-braised lamb shank in rich red wine gravy, served with herb and garlic-crusted roast 
                  potatoes, seasonal vegetables, and a Yorkshire pudding. Vegetarian gravy available on request.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Pair with: Rocoso Malbec – bold and velvety | Pint of Guinness Draught – smooth and malty.
                </p>
              </div>
              
              {/* Crispy Pork Belly */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Crispy Pork Belly</h3>
                  <span className="text-2xl font-bold text-anchor-gold">£15.99</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Crispy crackling and tender slow-roasted pork belly with Bramley apple sauce, herb and garlic-crusted 
                  roast potatoes, seasonal vegetables, Yorkshire pudding, and red wine gravy. Vegetarian gravy available on request.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Pair with: Counterpoint Shiraz – rich and full-bodied | Pint of Orchard Thieves Cider – crisp and fruity.
                </p>
              </div>
              
              {/* Beetroot & Butternut Squash Wellington */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Beetroot & Butternut Squash Wellington</h3>
                  <span className="text-anchor-gold text-sm font-bold bg-green-100 px-2 py-1 rounded ml-2">(VG)</span>
                  <span className="text-2xl font-bold text-anchor-gold">£15.49</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Golden puff pastry filled with beetroot & butternut squash, served with herb and garlic-crusted roast 
                  potatoes, seasonal vegetables, and vegetarian gravy.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Pair with: Giotto Pinot Grigio – light and fresh | Pint of Pravha – clean and crisp.
                </p>
              </div>
              
              {/* Kids Roasted Chicken */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-anchor-green">Kids Roasted Chicken</h3>
                  <span className="text-2xl font-bold text-anchor-gold">£9.99</span>
                </div>
                <p className="text-gray-700 mb-4">
                  A smaller portion of our roasted chicken with herb and garlic-crusted roast potatoes, seasonal 
                  vegetables, Yorkshire pudding, and red wine gravy. Vegetarian gravy available on request.
                </p>
              </div>
              
            </div>
            
            {/* Optional Extras */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-12">
              <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">Optional Extras</h3>
              <div className="text-center">
                <div className="inline-block">
                  <div className="flex justify-between items-center gap-8">
                    <p className="font-semibold text-lg text-anchor-green">Cauliflower Cheese</p>
                    <span className="text-lg font-bold text-anchor-gold">£3.99</span>
                  </div>
                  <p className="text-gray-700 mt-2">
                    Creamy mature cheddar sauce, baked until golden and bubbling.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Allergen Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-700">
                All our dishes are prepared in a single kitchen where allergens are present. While we take every 
                precaution, we cannot guarantee dishes are free from cross-contamination. If you have allergies or 
                dietary requirements, please speak to a member of our team before ordering. We use vegetable oil 
                where necessary to keep dishes light yet warming during colder months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sunday Experience */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="The Sunday Experience"
            />
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-anchor-green mb-4">What to Expect</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Arrive to the smell of roasting meat and Yorkshire puddings in the oven</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Friendly service from our Sunday team who know their regulars by name</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Generous portions that'll have you loosening your belt</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>Kids running around while parents enjoy a proper Sunday pint</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">✓</span>
                    <span>That satisfied feeling of a proper Sunday done right</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-anchor-sand/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Sunday Timeline</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold">12:00pm</span>
                    <span className="text-gray-700">Kitchen opens - first roasts out</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold">1:00pm</span>
                    <span className="text-gray-700">Peak time begins - buzzing atmosphere</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold">3:00pm</span>
                    <span className="text-gray-700">Quieter period - perfect for families</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">5:00pm</span>
                    <span className="text-gray-700">Last orders for roasts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="What People Say About Our Sunday Roast"
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-anchor-gold">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Best Sunday roast in the area by far. The beef is always perfectly cooked 
                  and the Yorkshires are massive! Book early though - it gets packed."
                </p>
                <p className="font-semibold text-anchor-green">- Sarah M.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-anchor-gold">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "We drive from Heathrow every Sunday for this roast. Worth every minute 
                  of the journey. Proper pub, proper food, proper service."
                </p>
                <p className="font-semibold text-anchor-green">- Flight Crew Regular</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-anchor-gold">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Family tradition now - Sunday lunch at The Anchor. Kids love it, 
                  great atmosphere, and the food is consistently excellent."
                </p>
                <p className="font-semibold text-anchor-green">- The Johnson Family</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-anchor-gold">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Vegetarian wellington was gorgeous! So nice to have a proper veggie 
                  option that's not an afterthought. Will definitely be back."
                </p>
                <p className="font-semibold text-anchor-green">- Emma T.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Sunday Roast Tradition */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Why Sunday Roast at The Anchor is Special"
            />
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl text-center mb-8">
                In a world of chain restaurants and microwave meals, The Anchor keeps the great 
                British tradition of Sunday roast alive and thriving in Stanwell Moor.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">The Village Tradition</h3>
                  <p className="mb-4">
                    For generations, Sunday lunch at the village pub has been a cornerstone of British 
                    life. At The Anchor, we honour this tradition with pride. Every Sunday, our kitchen 
                    starts early, filling the pub with the comforting aromas of roasting meat and fresh 
                    Yorkshire puddings rising in the oven. It's the smell that draws locals from their 
                    Sunday papers and brings families together around our tables.
                  </p>
                  <p>
                    Our Sunday roast isn't just a meal - it's a weekly ritual for many Stanwell Moor 
                    families. Grandparents, parents, and children gather here, creating memories over 
                    generous plates of perfectly roasted meat and all the trimmings. It's these moments 
                    that make a pub truly part of the community.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-anchor-green mb-4">Cooked with Care</h3>
                  <p className="mb-4">
                    Our head chef takes Sunday roast seriously - perhaps too seriously, his wife might 
                    say! Each cut of meat is carefully selected from local suppliers, seasoned with 
                    herbs from our own garden when in season, and roasted to perfection. The vegetables 
                    are fresh, not frozen. The roast potatoes are par-boiled then roasted in goose fat 
                    until golden and crispy. The Yorkshire puddings? Made from scratch, naturally.
                  </p>
                  <p>
                    This attention to detail is why we introduced our pre-order system. By knowing 
                    exactly how many roasts we're serving, we can prepare each one fresh to order, 
                    ensuring every plate meets our exacting standards. It's more work for us, but 
                    the results speak for themselves.
                  </p>
                </div>
              </div>
              
              <div className="bg-anchor-cream rounded-2xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-anchor-green mb-4 text-center">
                  A Sunday Roast Near Heathrow
                </h3>
                <p className="text-gray-700 mb-4">
                  Being the closest traditional pub to Heathrow Airport brings us guests from around 
                  the world, and nothing delights us more than introducing international visitors to 
                  a proper British Sunday roast. Flight crews staying at nearby hotels have made The 
                  Anchor their Sunday tradition, and we regularly see business travelers extending 
                  their trips just to experience Sunday lunch before flying home.
                </p>
                <p className="text-gray-700">
                  "You haven't truly visited England until you've had a proper Sunday roast," one 
                  American guest told us. We couldn't agree more. It's not just about the food - 
                  it's about the experience of a leisurely Sunday afternoon in a real British pub, 
                  where time slows down and the outside world can wait.
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-4">
                  Whether you're a local looking for your regular Sunday spot, a visitor wanting to 
                  experience authentic British culture, or someone who simply appreciates a properly 
                  cooked roast dinner, you'll find what you're looking for at The Anchor. Just 
                  remember to book ahead - Sundays are our busiest day for a reason.
                </p>
                <p className="text-lg text-gray-700 italic">
                  "The best Sunday roast in the area" isn't just our claim - it's what our regulars 
                  tell their friends. Come and discover why.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <CTASection
        title="Don't Miss Out on Sunday Roast"
        description="Sunday roasts must be pre-ordered and paid for by 1pm on Saturday."
        buttons={[
          {
            text: "📞 Book Now: 01753 682707",
            href: "tel:01753682707",
            variant: "white"
          }
        ]}
        variant="green"
      >
        <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
          Can't pre-order? Our regular menu is available on Sundays too!
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
          <h3 className="font-bold text-xl mb-3 text-white">Sunday Roast Service</h3>
          <p className="mb-2 text-white">Every Sunday: 12:00 PM - 5:00 PM</p>
          <p className="text-sm text-white/90">Last orders 4:30 PM</p>
        </div>
      </CTASection>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "@id": "https://the-anchor.pub/#restaurant",
            "name": "The Anchor - Sunday Roast",
            "servesCuisine": ["British", "Sunday Roast"],
            "hasMenu": {
              "@type": "Menu",
              "name": "Sunday Roast Menu",
              "description": "Traditional British Sunday roast dinners",
              "hasMenuSection": {
                "@type": "MenuSection",
                "name": "Sunday Roasts",
                "description": "Served with roast potatoes, Yorkshire pudding, vegetables and gravy",
                "hasMenuItem": [
                  {
                    "@type": "MenuItem",
                    "name": "Roasted Chicken",
                    "description": "Oven-roasted chicken breast with sage & onion stuffing balls",
                    "offers": {
                      "@type": "Offer",
                      "price": "14.99",
                      "priceCurrency": "GBP"
                    }
                  },
                  {
                    "@type": "MenuItem",
                    "name": "Slow-Cooked Lamb Shank",
                    "description": "Tender slow-braised lamb shank in rich red wine gravy",
                    "offers": {
                      "@type": "Offer",
                      "price": "15.49",
                      "priceCurrency": "GBP"
                    }
                  },
                  {
                    "@type": "MenuItem",
                    "name": "Crispy Pork Belly",
                    "description": "Crispy crackling and tender slow-roasted pork belly with Bramley apple sauce",
                    "offers": {
                      "@type": "Offer",
                      "price": "15.99",
                      "priceCurrency": "GBP"
                    }
                  },
                  {
                    "@type": "MenuItem",
                    "name": "Beetroot & Butternut Squash Wellington",
                    "description": "Golden puff pastry filled with beetroot & butternut squash (Vegan)",
                    "offers": {
                      "@type": "Offer",
                      "price": "15.49",
                      "priceCurrency": "GBP"
                    },
                    "suitableForDiet": ["https://schema.org/VeganDiet", "https://schema.org/VegetarianDiet"]
                  }
                ]
              },
              "inLanguage": "en-GB"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />
    </>
  )
}