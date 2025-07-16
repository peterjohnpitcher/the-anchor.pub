import { CallToAction, CallToActionProps } from './CallToAction'

interface CTAButton extends Omit<CallToActionProps, 'children'> {
  text: string
}

interface CTASectionProps {
  title: string
  description?: string
  buttons: CTAButton[]
  variant?: 'green' | 'red' | 'dark'
  className?: string
  footer?: string
}

export function CTASection({ 
  title, 
  description, 
  buttons, 
  variant = 'green',
  className = '',
  footer
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
          {buttons.map((button, index) => (
            <CallToAction
              key={index}
              {...button}
              className={`flex-1 ${button.className || ''}`}
            >
              {button.text}
            </CallToAction>
          ))}
        </div>
        {footer && (
          <p className="mt-6 text-sm text-white/80">
            {footer}
          </p>
        )}
      </div>
    </section>
  )
}