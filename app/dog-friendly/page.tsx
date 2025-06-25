import Image from 'next/image'
import Link from 'next/link'
import { CallToAction } from '@/components/CallToAction'
import { Metadata } from 'next'
import { getUpcomingEvents } from '@/lib/anchorAPI'
import { EventCard } from '@/components/EventCard'
import { OpeningStatus } from '@/components/OpeningStatus'

export const metadata: Metadata = {
  title: 'Dog Friendly Pub Near Heathrow | The Anchor - Dogs Welcome',
  description: 'The Anchor is a dog-friendly pub near Heathrow Airport. Well-behaved dogs welcome in our bar and beer garden. Water bowls, treats, and a warm welcome for your four-legged friends.',
  keywords: 'dog friendly pub near me, dog friendly pub heathrow, dog friendly pub stanwell moor, dog friendly pub staines, dog friendly pub tw19, pubs that allow dogs, dog friendly beer garden',
  openGraph: {
    title: 'The Anchor - Dog Friendly Pub Near Heathrow',
    description: 'Dogs are always welcome at The Anchor! Spacious beer garden, water bowls, treats, and a warm welcome for well-behaved dogs.',
    images: ['/images/features/dog-friendly-pub-beer-garden.jpg'],
  },
}

export default async function DogFriendlyPage() {
  const upcomingEvents = await getUpcomingEvents(3)

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-anchor-green to-anchor-green-dark" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-anchor-gold text-lg mb-4">Four legs welcome!</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Dog Friendly Pub Near Heathrow
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Your furry friends are always welcome at The Anchor
            </p>
            
            <div className="mb-6">
              <OpeningStatus />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallToAction 
                href="tel:01753682707"
                variant="primary"
                size="lg"
              >
                📞 Book a Dog-Friendly Table
              </CallToAction>
              
              <CallToAction 
                href="#dog-policy"
                variant="white"
                size="lg"
              >
                🐕 Our Dog Policy
              </CallToAction>
            </div>
          </div>
        </div>
      </section>

      {/* Dog-Friendly Features */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🐕</div>
              <p className="font-bold text-anchor-green">Dogs</p>
              <p className="text-sm text-gray-600">Welcome</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">💧</div>
              <p className="font-bold text-anchor-green">Water</p>
              <p className="text-sm text-gray-600">Bowls</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🦴</div>
              <p className="font-bold text-anchor-green">Dog</p>
              <p className="text-sm text-gray-600">Treats</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🌳</div>
              <p className="font-bold text-anchor-green">Beer</p>
              <p className="text-sm text-gray-600">Garden</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dogs Love The Anchor */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Why Dogs (and Their Humans) Love The Anchor
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-anchor-green mb-4">A Genuine Welcome</h3>
                <p className="text-gray-700 mb-4">
                  At The Anchor, dogs aren't just tolerated - they're genuinely welcomed! Our 
                  staff love meeting your four-legged friends, and many of our regulars bring 
                  their dogs for a social drink or meal. It's not uncommon to see several dogs 
                  making friends while their owners enjoy a pint.
                </p>
                <p className="text-gray-700">
                  We believe pubs should be inclusive spaces where the whole family - including 
                  the furry members - can relax together. That's why well-behaved dogs are 
                  welcome throughout our bar area and beer garden.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-anchor-green mb-4">Perfect for Dog Walks</h3>
                <p className="text-gray-700 mb-4">
                  Our location in Stanwell Moor makes us the perfect pit stop for dog walkers. 
                  Whether you're exploring the local footpaths, walking around the reservoirs, 
                  or just out for a stroll through the village, The Anchor is ideally placed 
                  for a refreshing break.
                </p>
                <p className="text-gray-700">
                  Many local dog walkers make us their regular stop - dogs know they'll get 
                  water, treats, and plenty of fuss from our dog-loving staff and customers!
                </p>
              </div>
            </div>

            {/* Dog-Friendly Features Grid */}
            <div className="bg-anchor-cream rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">
                Everything Your Dog Needs
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🏠</div>
                  <h4 className="font-bold text-anchor-green mb-2">Indoor & Outdoor</h4>
                  <p className="text-sm text-gray-700">
                    Dogs welcome in bar area and throughout our spacious beer garden
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💦</div>
                  <h4 className="font-bold text-anchor-green mb-2">Fresh Water</h4>
                  <p className="text-sm text-gray-700">
                    Water bowls always available - just ask if you need one
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🍖</div>
                  <h4 className="font-bold text-anchor-green mb-2">Doggy Treats</h4>
                  <p className="text-sm text-gray-700">
                    Free dog treats at the bar for our four-legged guests
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dog Policy */}
      <section id="dog-policy" className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Our Dog-Friendly Policy
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Where Dogs Can Go */}
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">✅ Dogs Welcome In:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">•</span>
                    <span><strong>Bar Area:</strong> Dogs can join you for a drink in our main bar</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">•</span>
                    <span><strong>Beer Garden:</strong> Our spacious outdoor area is perfect for dogs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">•</span>
                    <span><strong>Covered Patio:</strong> Sheltered outdoor seating for all weather</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-anchor-gold">•</span>
                    <span><strong>Front Entrance:</strong> Easy access with space for dogs</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-anchor-cream rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> For hygiene reasons, dogs are not permitted in the 
                    restaurant dining area, but bar food service is available where dogs are welcome!
                  </p>
                </div>
              </div>

              {/* Dog Etiquette */}
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-anchor-green mb-4">🐕‍🦺 Good Dog Etiquette</h3>
                <div className="space-y-4 text-gray-700">
                  <p className="font-semibold">We ask that all dogs:</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Are kept on a lead at all times</li>
                    <li>• Are well-behaved and sociable</li>
                    <li>• Don't jump on furniture</li>
                    <li>• Are supervised by their owners</li>
                  </ul>
                  <div className="mt-4">
                    <p className="font-semibold mb-2">We provide:</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Water bowls on request</li>
                      <li>• Dog treats at the bar</li>
                      <li>• Plenty of space in the garden</li>
                      <li>• A warm welcome!</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-anchor-cream rounded-lg mt-4">
                    <p className="text-sm">
                      <strong>Tip:</strong> Visit during quieter times if your dog is nervous 
                      around other dogs or people.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Dog Features */}
            <div className="bg-anchor-sand/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-anchor-green mb-4 text-center">
                Special Features for Dogs
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-anchor-green mb-2">🌳 Spacious Beer Garden</h4>
                  <p className="text-gray-700">
                    Our large beer garden gives dogs plenty of space to relax. With both sunny 
                    spots and shaded areas under trees, it's comfortable for dogs in all weather. 
                    The garden is fully enclosed, giving you peace of mind.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-anchor-green mb-2">✈️ Plane Spotting Fun</h4>
                  <p className="text-gray-700">
                    Being under the Heathrow flight path, dogs often enjoy watching the planes 
                    overhead! Most dogs quickly get used to the sound, and many find it 
                    fascinating to watch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Dog Walking */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Dog Walking Near The Anchor
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 mb-12">
              <p className="text-xl text-center mb-8">
                The Anchor is perfectly positioned for dog walkers exploring the local area
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-3">
                    🚶 Local Walking Routes
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Stanwell Moor Village Loop:</strong> 30-minute circular walk through the village</li>
                    <li>• <strong>Reservoir Path:</strong> Scenic 45-minute walk around King George VI Reservoir</li>
                    <li>• <strong>Horton Road Fields:</strong> Open spaces perfect for energetic dogs</li>
                    <li>• <strong>Village Green Circuit:</strong> Short 15-minute walk for older dogs</li>
                  </ul>
                </div>

                <div className="bg-anchor-cream rounded-xl p-6">
                  <h3 className="font-bold text-xl text-anchor-green mb-3">
                    💡 Dog Walking Tips
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Park in our free car park while you walk</li>
                    <li>• Ask for a takeaway water bowl for your walk</li>
                    <li>• Join other dog walkers - morning walks are social!</li>
                    <li>• Muddy paws? We have outdoor taps for washing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-anchor-gold">
              <h3 className="text-2xl font-bold text-anchor-green mb-4 text-center">
                Meet the Local Pack! 🐕
              </h3>
              <p className="text-gray-700 text-center mb-6">
                The Anchor has become a meeting point for local dog owners. You'll often find 
                groups of regular "pub dogs" who've become best friends through their visits here!
              </p>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Sunday mornings and weekday afternoons are particularly popular with dog walkers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dog-Friendly Events */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="section-spacing bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                Dog-Friendly Events
              </h2>
              <p className="text-lg text-gray-700 text-center mb-8">
                Dogs are welcome at most of our events - perfect for socializing!
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <div className="text-center mt-8">
                <CallToAction href="/whats-on" variant="primary">
                  View All Events
                </CallToAction>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Perfect for Different Dogs */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              Perfect for Every Type of Dog
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">
                  🐕‍🦺 Nervous Dogs
                </h3>
                <p className="text-gray-700">
                  Quiet corners available in our bar and garden. Visit during off-peak hours 
                  (weekday afternoons) for a calmer experience.
                </p>
              </div>

              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">
                  🦮 Senior Dogs
                </h3>
                <p className="text-gray-700">
                  Easy access, no steps to the garden, and comfortable spots to rest. 
                  Soft bedding areas in sheltered spots.
                </p>
              </div>

              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">
                  🐕 Social Butterflies
                </h3>
                <p className="text-gray-700">
                  Meet other dogs and make friends! Our beer garden is perfect for sociable 
                  pups who love attention.
                </p>
              </div>

              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">
                  🐾 Puppies
                </h3>
                <p className="text-gray-700">
                  Great for socialization! Meet friendly dogs and people in a controlled 
                  environment. Puppy treats available!
                </p>
              </div>

              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">
                  🦴 Large Breeds
                </h3>
                <p className="text-gray-700">
                  Plenty of space in our beer garden. No size restrictions - all well-behaved 
                  dogs welcome regardless of size!
                </p>
              </div>

              <div className="bg-anchor-cream rounded-xl p-6">
                <h3 className="font-bold text-lg text-anchor-green mb-3">
                  🎾 Active Dogs
                </h3>
                <p className="text-gray-700">
                  Perfect rest stop after walks around the reservoirs or through the village. 
                  Water bowls to rehydrate!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-anchor-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Bring Your Best Friend to The Anchor! 🐕
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Dogs are always welcome at our dog-friendly pub near Heathrow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <CallToAction 
              href="tel:01753682707"
              variant="white"
              size="lg"
            >
              📞 Call: 01753 682707
            </CallToAction>
            <CallToAction 
              href="/find-us"
              variant="white"
              size="lg"
            >
              📍 Get Directions
            </CallToAction>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <p className="font-semibold mb-2">The Anchor</p>
            <p>Horton Road, Stanwell Moor</p>
            <p>Surrey TW19 6AQ</p>
            <p className="text-sm mt-2">Dogs Always Welcome!</p>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema with FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "The Anchor - Dog Friendly Pub",
              "description": "Dog-friendly pub near Heathrow Airport. Dogs welcome in bar and beer garden with water bowls and treats provided.",
              "image": "https://the-anchor.pub/images/features/dog-friendly-pub-beer-garden.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Horton Road",
                "addressLocality": "Stanwell Moor",
                "addressRegion": "Surrey",
                "postalCode": "TW19 6AQ",
                "addressCountry": "GB"
              },
              "amenityFeature": {
                "@type": "LocationFeatureSpecification",
                "name": "Dogs Allowed",
                "value": true
              },
              "knowsAbout": "Dog Friendly Pubs",
              "url": "https://the-anchor.pub/dog-friendly",
              "telephone": "+441753682707"
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Are dogs allowed at The Anchor pub?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Dogs are very welcome at The Anchor. Well-behaved dogs can join you in our bar area and throughout our spacious beer garden. We provide water bowls and free dog treats."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I bring my dog into the restaurant area?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For hygiene reasons, dogs are not permitted in the restaurant dining area. However, dogs are welcome in the bar area where full food service is available, and throughout our beer garden."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you provide water bowls for dogs?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we have water bowls available for dogs. Just ask any member of staff and we'll be happy to provide fresh water for your dog."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is The Anchor's beer garden dog-friendly?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! Our spacious beer garden is perfect for dogs. It's fully enclosed for safety, with both sunny and shaded areas. Dogs love watching the planes overhead!"
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do dogs need to be on a lead at The Anchor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we ask that all dogs are kept on leads at all times for the safety and comfort of all our guests, both human and canine."
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