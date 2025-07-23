import Link from 'next/link'
import { Metadata } from 'next'
import { HeroWrapper } from '@/components/hero'
import { Button } from '@/components/ui'
import { getTwitterMetadata } from '@/lib/twitter-metadata'
import { PhoneLink } from '@/components/PhoneLink'
import { EmailLink } from '@/components/EmailLink'

export const metadata: Metadata = {
  title: 'Sitemap | The Anchor Stanwell Moor',
  description: 'Complete sitemap of The Anchor pub website. Find all our pages including menus, events, location information and special offers.',
  robots: {
    index: true,
    follow: true,
  },
  twitter: getTwitterMetadata({
    title: 'Sitemap | The Anchor Stanwell Moor',
    description: 'Complete sitemap of The Anchor pub website. Find all our pages including menus, events, location information and special offers.'
  })
}

const sitemapSections = [
  {
    title: 'Main Pages',
    links: [
      { label: 'Home', href: '/' },
      { label: "What's On", href: '/whats-on' },
      { label: 'Food Menu', href: '/food-menu' },
      { label: 'Drinks Menu', href: '/drinks' },
      { label: 'Find Us', href: '/find-us' },
    ]
  },
  {
    title: 'Food & Drink',
    links: [
      { label: 'Full Food Menu', href: '/food-menu' },
      { label: 'Sunday Lunch Menu', href: '/sunday-lunch' },
      { label: 'Tuesday Pizza BOGOF', href: '/food/pizza' },
      { label: 'Drinks Menu', href: '/drinks' },
    ]
  },
  {
    title: 'Events & Entertainment',
    links: [
      { label: 'All Events', href: '/whats-on' },
      { label: 'Saturday Drag Shows', href: '/whats-on/drag-shows' },
      { label: 'Book an Event', href: '/book-event' },
    ]
  },
  {
    title: 'Near Heathrow',
    links: [
      { label: 'All Terminals', href: '/near-heathrow' },
      { label: 'Terminal 2', href: '/near-heathrow/terminal-2' },
      { label: 'Terminal 3', href: '/near-heathrow/terminal-3' },
      { label: 'Terminal 4', href: '/near-heathrow/terminal-4' },
      { label: 'Terminal 5', href: '/near-heathrow/terminal-5' },
    ]
  },
  {
    title: 'Special Features',
    links: [
      { label: 'Beer Garden & Plane Spotting', href: '/beer-garden' },
      { label: 'Dog Friendly Guide', href: '/dog-friendly', note: 'Coming Soon' },
      { label: 'Family Friendly', href: '/family-friendly', note: 'Coming Soon' },
    ]
  },
  {
    title: 'Location Pages',
    links: [
      { label: 'Staines Pub', href: '/staines-pub', note: 'Coming Soon' },
      { label: 'Stanwell Moor Pub', href: '/stanwell-moor-pub', note: 'Coming Soon' },
      { label: 'TW19 Area', href: '/locations/tw19', note: 'Coming Soon' },
    ]
  }
]

export default function SitemapPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWrapper
        route="/sitemap-page"
        title="Sitemap"
        description="Find your way around The Anchor website"
        size="small"
        showStatusBar={false}
        cta={
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="primary" size="lg">
                🏠 Back to Home
              </Button>
            </Link>
            <Link href="/find-us">
              <Button variant="secondary" size="lg">
                📍 Find Us
              </Button>
            </Link>
          </div>
        }
      />

      {/* Sitemap Links */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sitemapSections.map((section) => (
                <div key={section.title} className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-anchor-green mb-4">
                    {section.title}
                  </h2>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        {link.note ? (
                          <span className="text-gray-700">
                            {link.label} <span className="text-sm">({link.note})</span>
                          </span>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-anchor-gold hover:text-anchor-gold-light transition-colors"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <div className="mt-12 bg-anchor-sand/30 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-anchor-green mb-4">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-gray-700 mb-6">
                Give us a call and we'll be happy to help
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <PhoneLink 
                  phone="01753 682707" 
                  source="sitemap_contact"
                  className="text-lg font-semibold text-anchor-gold hover:text-anchor-gold-light"
                  showIcon={false}
                >
                  📞 01753 682707
                </PhoneLink>
                <span className="text-gray-600">|</span>
                <EmailLink
                  email="manager@the-anchor.pub"
                  source="sitemap_contact"
                  className="text-lg font-semibold text-anchor-gold hover:text-anchor-gold-light"
                  showIcon={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}