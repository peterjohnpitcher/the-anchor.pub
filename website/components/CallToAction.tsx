'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CallToActionProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'white' | 'outline' | 'ghost' | 'yellow'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  external?: boolean
  className?: string
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  theme?: {
    primary?: string
    secondary?: string
    white?: string
    outline?: string
    ghost?: string
    yellow?: string
  }
  trackingLabel?: string
}

const defaultTheme = {
  primary: 'bg-anchor-gold text-white hover:bg-anchor-gold-light',
  secondary: 'bg-white text-anchor-green border-2 border-anchor-green hover:bg-anchor-green hover:text-white',
  white: 'bg-white text-anchor-green hover:bg-gray-100',
  outline: 'border-2 border-anchor-gold text-anchor-gold hover:bg-anchor-gold hover:text-white',
  ghost: 'text-anchor-green hover:bg-anchor-green/10',
  yellow: 'bg-yellow-400 text-red-900 hover:bg-yellow-300 font-bold'
}

const sizeClasses = {
  xs: 'px-3 py-1.5 text-xs',
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl'
}

export function CallToAction({ 
  href, 
  children, 
  variant = 'primary',
  size = 'md',
  external = false,
  className,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  theme = defaultTheme,
  trackingLabel
}: CallToActionProps) {
  const mergedTheme = { ...defaultTheme, ...theme }
  
  const baseClasses = cn(
    'inline-flex items-center justify-center font-semibold text-center transition-all duration-200 rounded-full',
    'focus:outline-none focus:ring-2 focus:ring-anchor-gold focus:ring-offset-2',
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-50 cursor-not-allowed',
    !disabled && !loading && 'cursor-pointer'
  )
  
  const combinedClassName = cn(
    baseClasses,
    mergedTheme[variant],
    sizeClasses[size],
    className
  )
  
  const handleClick = () => {
    // Call custom onClick if provided
    if (onClick) {
      onClick()
    }
  }

  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  )
  
  // Handle disabled or loading state
  if (disabled || loading) {
    return (
      <span className={combinedClassName}>
        {content}
      </span>
    )
  }
  
  // Handle external links or special protocols
  if (external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={combinedClassName}
        target={external && !href.startsWith('tel:') && !href.startsWith('mailto:') ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
      >
        {content}
      </a>
    )
  }
  
  // Handle internal links
  return (
    <Link 
      href={href} 
      className={combinedClassName}
      onClick={handleClick}
    >
      {content}
    </Link>
  )
}