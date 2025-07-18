import React from 'react'

interface HeroBadgeProps {
  text?: string
  variant?: 'new' | 'featured' | 'special' | 'limited'
  position?: 'absolute' | 'inline'
  className?: string
}

export function HeroBadge({ 
  text = 'NEW', 
  variant = 'new',
  position = 'absolute',
  className = ''
}: HeroBadgeProps) {
  // Color schemes for different variants
  const variantStyles = {
    new: 'bg-red-500 text-white',
    featured: 'bg-amber-500 text-white',
    special: 'bg-green-600 text-white',
    limited: 'bg-purple-600 text-white'
  }

  const baseStyles = variantStyles[variant] || variantStyles.new

  if (position === 'absolute') {
    return (
      <span 
        className={`
          absolute -top-2 -left-2 z-10
          px-3 py-1 
          text-xs font-bold uppercase
          rounded-full shadow-md
          transform -rotate-12
          ${baseStyles}
          ${className}
          md:block
          hidden
        `}
      >
        {text}
      </span>
    )
  }

  // Inline version for mobile
  return (
    <span 
      className={`
        inline-block ml-3
        px-2 py-0.5
        text-xs font-bold uppercase
        rounded-full
        ${baseStyles}
        ${className}
        md:hidden
      `}
    >
      {text}
    </span>
  )
}

// Wrapper component for menu items with hero badges
interface HeroItemProps {
  children: React.ReactNode
  badgeText?: string
  badgeVariant?: 'new' | 'featured' | 'special' | 'limited'
  showBadge?: boolean
  className?: string
}

export function HeroItem({ 
  children, 
  badgeText = 'NEW',
  badgeVariant = 'new',
  showBadge = false,
  className = ''
}: HeroItemProps) {
  if (!showBadge) {
    return <>{children}</>
  }

  return (
    <div className={`relative ${className}`}>
      <HeroBadge 
        text={badgeText} 
        variant={badgeVariant} 
        position="absolute" 
      />
      {children}
    </div>
  )
}