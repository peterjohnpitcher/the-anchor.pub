import Link from 'next/link'

interface CallToActionProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'white'
  size?: 'small' | 'medium' | 'large'
  external?: boolean
  className?: string
}

export function CallToAction({ 
  href, 
  children, 
  variant = 'primary',
  size = 'medium',
  external = false,
  className = ''
}: CallToActionProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold text-center transition-all duration-200 btn-friendly rounded-full'
  
  const variantClasses = {
    primary: 'bg-anchor-gold text-white hover:bg-anchor-gold-light',
    secondary: 'bg-white text-anchor-green border-2 border-anchor-green hover:bg-anchor-green hover:text-white',
    white: 'bg-white text-anchor-green hover:bg-gray-100'
  }
  
  const sizeClasses = {
    small: 'px-5 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  }
  
  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  if (external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={combinedClassName}
        target={external && !href.startsWith('tel:') && !href.startsWith('mailto:') ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }
  
  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  )
}