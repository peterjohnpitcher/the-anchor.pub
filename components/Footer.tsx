import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { NavigationItem, SocialLink, ContactInfo, BusinessInfo } from '@/lib/types'

interface FooterSection {
  title: string
  items: (NavigationItem | string)[]
  titleClass?: string
  itemClass?: string
}

interface FooterProps {
  businessInfo?: BusinessInfo
  sections?: FooterSection[]
  contact?: ContactInfo & {
    social?: SocialLink[]
  }
  features?: string[]
  copyright?: {
    text?: string
    year?: number
    subtext?: string
  }
  theme?: {
    background?: string
    text?: string
    headingText?: string
    linkHover?: string
    borderColor?: string
  }
  className?: string
}

const defaultBusinessInfo: BusinessInfo = {
  name: 'The Anchor',
  description: 'Your local pub in Stanwell Moor, serving the community with great food, drinks, and entertainment since the 19th century.',
  logo: '/images/branding/the-anchor-pub-logo-white-transparent.png'
}

const defaultSections: FooterSection[] = [
  {
    title: 'Quick Links',
    titleClass: 'text-anchor-gold',
    items: [
      { label: "What's On", href: '/whats-on' },
      { label: 'Food Menu', href: '/food-menu' },
      { label: 'Sunday Roast', href: '/sunday-lunch' },
      { label: 'Drinks Menu', href: '/drinks' },
      { label: 'Book an Event', href: '/book-event' },
      { label: 'Sitemap', href: '/sitemap-page' }
    ]
  },
  {
    title: 'Private Events',
    titleClass: 'text-anchor-gold',
    items: [
      { label: 'Christmas Parties', href: '/christmas-parties' },
      { label: 'Corporate Events', href: '/corporate-events' },
      { label: 'Birthday Parties', href: '/private-party-venue' },
      { label: 'Function Room Hire', href: '/function-room-hire' }
    ]
  },
  {
    title: 'Special Features',
    titleClass: 'text-anchor-gold',
    items: [
      { label: 'Beer Garden & Plane Spotting', href: '/beer-garden' },
      { label: 'Tuesday Pizza BOGOF', href: '/food/pizza' },
      { label: 'Drag Shows', href: '/whats-on/drag-shows' },
      { label: 'Free Parking', href: '/find-us' }
    ]
  },
  {
    title: 'Near Heathrow',
    titleClass: 'text-anchor-gold',
    items: [
      { label: 'All Terminals', href: '/near-heathrow' },
      { label: 'Terminal 2', href: '/near-heathrow/terminal-2' },
      { label: 'Terminal 3', href: '/near-heathrow/terminal-3' },
      { label: 'Terminal 4', href: '/near-heathrow/terminal-4' },
      { label: 'Terminal 5', href: '/near-heathrow/terminal-5' }
    ]
  }
]

const defaultContact: ContactInfo & { social?: SocialLink[] } = {
  phone: '01753 682707',
  email: 'manager@the-anchor.pub',
  address: 'Horton Road, Stanwell Moor, Surrey, TW19 6AQ',
  social: [
    { platform: 'facebook', href: 'https://www.facebook.com/theanchorpubsm/', label: 'Facebook' },
    { platform: 'instagram', href: 'https://www.instagram.com/theanchor.pub/', label: 'Instagram' }
  ]
}

const defaultFeatures = [
  '♿ Step-Free Access',
  '🐕 Dog Friendly',
  '👨‍👩‍👧‍👦 Family Welcome',
  '🏳️‍🌈 LGBTQ+ Friendly',
  '🚗 Free Parking'
]

const defaultTheme = {
  background: 'bg-anchor-charcoal',
  text: 'text-gray-200',
  headingText: 'text-anchor-gold-light',  // Use lighter gold for dark backgrounds
  linkHover: 'hover:text-white',
  borderColor: 'border-gray-700'
}

export function Footer({
  businessInfo = defaultBusinessInfo,
  sections = defaultSections,
  contact = defaultContact,
  features = defaultFeatures,
  copyright = {
    text: 'The Anchor, Stanwell Moor. All rights reserved.',
    year: new Date().getFullYear(),
    subtext: 'Proud to be your local independent pub • Part of the community since the 1800s'
  },
  theme = defaultTheme,
  className
}: FooterProps) {
  const mergedTheme = { ...defaultTheme, ...theme }

  const renderLink = (item: NavigationItem | string) => {
    if (typeof item === 'string') {
      return <li key={item}>{item}</li>
    }

    if (item.external) {
      return (
        <li key={item.href}>
          <a 
            href={item.href} 
            className={mergedTheme.linkHover}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.label}
          </a>
        </li>
      )
    }

    return (
      <li key={item.href}>
        <Link href={item.href} className={mergedTheme.linkHover}>
          {item.label}
        </Link>
      </li>
    )
  }

  return (
    <footer className={cn(mergedTheme.background, 'text-white py-12', className)}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Business Info */}
          <div>
            {businessInfo.logo && (
              <Image
                src={businessInfo.logo}
                alt="The Anchor pub logo - white anchor symbol with traditional pub lettering on dark background"
                width={180}
                height={72}
                className="h-16 w-auto mb-4"
                sizes="180px"
              />
            )}
            <p className={cn(mergedTheme.text, 'leading-relaxed')}>
              {businessInfo.description}
            </p>
          </div>
          
          {/* Dynamic Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className={cn('font-bold text-lg mb-4', section.titleClass || mergedTheme.headingText)}>
                {section.title}
              </h4>
              <ul className={cn('space-y-2', section.itemClass || mergedTheme.text)}>
                {section.items.map(item => renderLink(item))}
              </ul>
            </div>
          ))}
          
          {/* Contact Info */}
          {contact && (
            <div>
              <h4 className={cn('font-bold text-lg mb-4', mergedTheme.headingText)}>
                Get in Touch
              </h4>
              <ul className={cn('space-y-2', mergedTheme.text)}>
                {contact.phone && (
                  <>
                    <li>
                      📞 <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className={mergedTheme.linkHover}>
                        {contact.phone}
                      </a>
                    </li>
                    <li>
                      💬 <a href={`https://wa.me/44${contact.phone.replace(/\s/g, '').replace(/^0/, '')}`} className={mergedTheme.linkHover} target="_blank" rel="noopener noreferrer">
                        WhatsApp Us
                      </a>
                    </li>
                  </>
                )}
                {contact.email && (
                  <li>
                    ✉️ <a href={`mailto:${contact.email}`} className={mergedTheme.linkHover}>
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.address && (
                  <li itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    📍 <span itemProp="streetAddress">Horton Road</span>, 
                    <span itemProp="addressLocality">Stanwell Moor</span>, 
                    <span itemProp="addressRegion">Surrey</span>, 
                    <span itemProp="postalCode">TW19 6AQ</span>
                  </li>
                )}
                {contact.social && contact.social.length > 0 && (
                  <li className="pt-2">
                    <div className="flex gap-4">
                      {contact.social.map(social => (
                        <a 
                          key={social.platform}
                          href={social.href} 
                          className={cn(mergedTheme.linkHover, 'hover:text-anchor-gold')}
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`Visit our ${social.label || social.platform} page`}
                        >
                          {social.label || social.platform}
                        </a>
                      ))}
                    </div>
                  </li>
                )}
              </ul>
            </div>
          )}
          
          {/* Features */}
          {features && features.length > 0 && (
            <div>
              <h4 className={cn('font-bold text-lg mb-4', mergedTheme.headingText)}>
                For Everyone
              </h4>
              <ul className={cn('space-y-2', mergedTheme.text)}>
                {features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Copyright */}
        {copyright && (
          <div className={cn('border-t pt-8 text-center text-gray-600', mergedTheme.borderColor)}>
            <p>
              &copy; {copyright.year} {copyright.text}
            </p>
            {copyright.subtext && (
              <p className="mt-2 text-sm text-gray-600">
                {copyright.subtext}
              </p>
            )}
            <p className="mt-3 text-sm text-gray-600">
              Serving Stanwell Moor, Staines, Ashford, Feltham, Bedfont, and surrounding Surrey areas
            </p>
          </div>
        )}
      </div>
    </footer>
  )
}