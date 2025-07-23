import Link from 'next/link'
import { Button } from './ui'
import { BookTableButton } from './BookTableButton'
import { PhoneButton } from './PhoneButton'
import { DirectionsButton } from './DirectionsButton'
import { EmailLink } from './EmailLink'

interface CTAButton {
  text: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'warning' | 'white'
  className?: string
  target?: string
  rel?: string
  external?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  bookingContext?: string // For booking buttons
  eventName?: string // For event-specific bookings
  isPhone?: boolean // For phone links
  phoneSource?: string // Tracking source for phone links
  isDirections?: boolean // For directions links
  directionsSource?: string // Tracking source for directions links
  isEmail?: boolean // For email links
  emailSource?: string // Tracking source for email links
}

interface CTASectionProps {
  title: string
  description?: string
  buttons: CTAButton[]
  variant?: 'green' | 'red' | 'dark'
  className?: string
  footer?: string
  children?: React.ReactNode
}

export function CTASection({ 
  title, 
  description, 
  buttons, 
  variant = 'green',
  className = '',
  footer,
  children
}: CTASectionProps) {
  const bgClasses = {
    green: 'bg-anchor-green text-white',
    red: 'bg-red-600 text-white',
    dark: 'bg-anchor-charcoal text-white'
  }

  return (
    <section className={`section-spacing ${bgClasses[variant]} ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          {buttons.map((button, index) => {
            // Check if this is a phone link
            if (button.isPhone && button.href.startsWith('tel:')) {
              const phone = button.href.replace('tel:', '').replace(/\D/g, '')
              const formattedPhone = phone.length === 11 ? 
                `${phone.slice(0, 5)} ${phone.slice(5)}` : phone
              
              // Map "white" variant to appropriate button variant
              const phoneVariant = button.variant === 'white' ? 'secondary' : (button.variant || 'primary')
              const phoneClassName = button.variant === 'white' 
                ? `flex-1 bg-white text-anchor-green hover:bg-gray-100 ${button.className || ''}`
                : `flex-1 ${button.className || ''}`
              
              return (
                <PhoneButton
                  key={index}
                  phone={formattedPhone}
                  source={button.phoneSource || 'cta_section'}
                  variant={phoneVariant}
                  size={button.size || 'lg'}
                  className={phoneClassName}
                >
                  {button.text}
                </PhoneButton>
              )
            }
            
            // Check if this is an email link
            const isEmailLink = button.isEmail || button.href.startsWith('mailto:')
            
            if (isEmailLink) {
              const emailMatch = button.href.match(/mailto:([^?]+)(\?subject=(.+))?/)
              if (emailMatch) {
                const email = emailMatch[1]
                const subject = emailMatch[3] ? decodeURIComponent(emailMatch[3]) : undefined
                
                // Map "white" variant to appropriate styling
                const emailClassName = button.variant === 'white' 
                  ? `flex-1 inline-flex items-center justify-center px-6 py-3 bg-white text-anchor-green hover:bg-gray-100 rounded-md font-semibold transition-colors ${button.className || ''}`
                  : `flex-1 inline-flex items-center justify-center px-6 py-3 bg-anchor-sand text-anchor-green hover:bg-anchor-sand-light rounded-md font-semibold transition-colors ${button.className || ''}`
                
                return (
                  <EmailLink
                    key={index}
                    email={email}
                    source={button.emailSource || 'cta_section'}
                    subject={subject}
                    className={emailClassName}
                    showIcon={false}
                  >
                    {button.text}
                  </EmailLink>
                )
              }
            }
            
            // Check if this is a directions link
            const isDirectionsLink = button.isDirections || 
              button.href.includes('maps.google.com') || 
              button.href.includes('google.com/maps') ||
              button.href.includes('maps.apple.com') ||
              button.href.includes('waze.com')
            
            if (isDirectionsLink) {
              // Map "white" variant to appropriate button variant
              const directionsVariant = button.variant === 'white' ? 'secondary' : (button.variant || 'primary')
              const directionsClassName = button.variant === 'white' 
                ? `flex-1 bg-white text-anchor-green hover:bg-gray-100 ${button.className || ''}`
                : `flex-1 ${button.className || ''}`
              
              return (
                <DirectionsButton
                  key={index}
                  href={button.href}
                  source={button.directionsSource || 'cta_section'}
                  variant={directionsVariant}
                  size={button.size || 'lg'}
                  className={directionsClassName}
                >
                  {button.text}
                </DirectionsButton>
              )
            }
            
            // Check if this is a booking link
            const isBookingLink = button.href.includes('ordertab.menu/theanchor/bookings')
            
            if (isBookingLink) {
              // Map "white" variant to appropriate button variant
              const bookingVariant = button.variant === 'white' ? 'secondary' : (button.variant || 'primary')
              
              return (
                <BookTableButton
                  key={index}
                  source="cta_section"
                  context={button.bookingContext || 'regular'}
                  eventName={button.eventName}
                  variant={bookingVariant}
                  size={button.size || 'lg'}
                  className="flex-1"
                  trackingLabel={button.text}
                >
                  {button.text}
                </BookTableButton>
              )
            }
            
            const isExternal = button.target === '_blank' || button.href.startsWith('http')
            // Map "white" variant to outline with custom styling
            const buttonVariant = button.variant === 'white' ? 'outline' : (button.variant || 'secondary')
            const buttonClassName = button.variant === 'white' 
              ? `flex-1 !text-white !border-white hover:!bg-white hover:!text-anchor-green ${button.className || ''}`
              : `flex-1 ${button.className || ''}`
            
            const buttonElement = (
              <Button 
                variant={buttonVariant} 
                size="lg" 
                className={buttonClassName}
              >
                {button.text}
              </Button>
            )
            
            return (
              <Link 
                key={index}
                href={button.href}
                target={button.target || (isExternal ? '_blank' : undefined)}
                rel={button.rel || (isExternal ? 'noopener noreferrer' : undefined)}
                className="flex-1"
              >
                {buttonElement}
              </Link>
            )
          })}
        </div>
        {footer && (
          <p className="mt-6 text-sm text-white/80">
            {footer}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}