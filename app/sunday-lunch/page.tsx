import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sunday Roast | The Anchor Stanwell Moor | Best Sunday Lunch Near Heathrow',
  description: 'Award-winning Sunday roasts at The Anchor. Traditional British roast dinners served 12-5pm every Sunday. Book early - very popular with locals and Heathrow travelers.',
  keywords: 'sunday roast stanwell moor, sunday lunch near heathrow, best roast dinner surrey, traditional sunday lunch',
  openGraph: {
    title: 'Famous Sunday Roasts at The Anchor',
    description: 'Traditional British Sunday roast dinners. Book early to avoid disappointment!',
    images: ['/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg'],
  },
}

export default function SundayLunchPage() {
  return (
    <>
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center mt-20">
        <div className="absolute inset-0">
          <Image
            src="/images/food/sunday-roast/the-anchor-sunday-roast-stanwell-moor.jpg"
            alt="The Anchor famous Sunday roast dinner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-anchor-gold text-lg mb-4 drop-shadow">Every Sunday 12pm - 5pm</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Sunday Roast at The Anchor
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
              Traditional British roast dinners that locals rave about
            </p>
            
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
            
            <p className="mt-6 text-white/80 text-sm drop-shadow">
              ⚠️ Pre-order at the bar by 1pm on Saturday for Sunday lunch
            </p>
          </div>
        </div>
      </section>

      {/* Why Our Roasts Are Special */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
              Why Sundays Are Special Here
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We've been perfecting our Sunday roast for years. It's not just a meal, it's a tradition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl mb-4">👨‍🍳</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Chef's Pride</h3>
              <p className="text-gray-700">
                Our head chef takes personal pride in every roast. Meat is sourced locally 
                and cooked to perfection.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🥘</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Generous Portions</h3>
              <p className="text-gray-700">
                No one leaves hungry! Proper portions with all the trimmings. 
                Extra Yorkshire puddings? Just ask!
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-bold text-anchor-green mb-3">Family Atmosphere</h3>
              <p className="text-gray-700">
                Sundays are for families. Relaxed atmosphere, kids welcome, 
                and plenty of space for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sunday Menu */}
      <section id="menu" className="py-16 md:py-20 bg-anchor-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4 text-center">
              Sunday Roast Menu
            </h2>
            <p className="text-center text-lg text-gray-700 mb-8">
              Our Sunday dinners are made from scratch and to order. As of 2025, we are now taking pre-orders 
              up until 1pm on Saturday for a Sunday lunch. Doing so means we can prepare your meal fresh to 
              order, a delicious 'like home' Sunday lunch.
            </p>
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
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-12 text-center">
              The Sunday Experience
            </h2>
            
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
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-12 text-center">
              What People Say About Our Sunday Roast
            </h2>
            
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

      {/* Booking CTA */}
      <section className="py-16 md:py-20 bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't Miss Out on Sunday Roast
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're usually fully booked by Saturday evening. Call now to reserve your table.
          </p>
          
          <CallToAction 
            href="tel:01753682707"
            variant="white"
            size="lg"
            className="mb-8"
          >
            📞 Book Now: 01753 682707
          </CallToAction>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <h3 className="font-bold text-xl mb-3">Sunday Roast Service</h3>
            <p className="mb-2">Every Sunday: 12:00 PM - 5:00 PM</p>
            <p className="text-sm">Last orders 4:30 PM</p>
          </div>
        </div>
      </section>

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