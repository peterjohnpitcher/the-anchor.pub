import Link from 'next/link'
import { Button } from './ui'

interface CTAButton {
  text: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'warning' | 'white'
  className?: string
  target?: string
  rel?: string
  external?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
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