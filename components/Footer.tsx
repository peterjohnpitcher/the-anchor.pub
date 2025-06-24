import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-anchor-charcoal text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Image
              src="/images/branding/the-anchor-pub-logo-white-transparent.png"
              alt="The Anchor pub logo"
              width={180}
              height={72}
              className="h-16 w-auto mb-4"
            />
            <p className="text-gray-200 leading-relaxed">
              Your local pub in Stanwell Moor, serving the community 
              with great food, drinks, and entertainment since the 19th century.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-anchor-gold">Quick Links</h4>
            <ul className="space-y-2 text-gray-200">
              <li><Link href="/whats-on" className="hover:text-white">What&apos;s On</Link></li>
              <li><Link href="/food-menu" className="hover:text-white">Food Menu</Link></li>
              <li><Link href="/sunday-lunch" className="hover:text-white">Sunday Roast</Link></li>
              <li><Link href="/drinks" className="hover:text-white">Drinks Menu</Link></li>
              <li><Link href="/book-event" className="hover:text-white">Book an Event</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-anchor-gold">Get in Touch</h4>
            <ul className="space-y-2 text-gray-200">
              <li>📞 <a href="tel:01753682707" className="hover:text-white">01753 682707</a></li>
              <li>✉️ <a href="mailto:manager@the-anchor.pub" className="hover:text-white">manager@the-anchor.pub</a></li>
              <li>📍 Horton Road, Stanwell Moor</li>
              <li className="pt-2">
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/theanchorpubsm/" className="hover:text-anchor-gold" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                  <a href="https://www.instagram.com/theanchor.pub/" className="hover:text-anchor-gold" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-anchor-gold">For Everyone</h4>
            <ul className="space-y-2 text-gray-200">
              <li>♿ Step-Free Access</li>
              <li>🐕 Dog Friendly</li>
              <li>👨‍👩‍👧‍👦 Family Welcome</li>
              <li>🏳️‍🌈 LGBTQ+ Friendly</li>
              <li>🚗 Free Parking</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>&copy; 2024 The Anchor, Stanwell Moor. All rights reserved.</p>
          <p className="mt-2 text-sm text-gray-400">
            Proud to be your local independent pub • Part of the community since the 1800s
          </p>
        </div>
      </div>
    </footer>
  )
}