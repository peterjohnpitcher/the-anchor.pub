'use client'

import { pushToDataLayer } from '@/lib/gtm-events'
import { cn } from '@/lib/utils'

export type SocialPlatform = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'google'

interface SocialLinkProps {
  platform: SocialPlatform
  href: string
  source: string
  children: React.ReactNode
  className?: string
  showIcon?: boolean
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  ariaLabel?: string
}

const platformIcons: Record<SocialPlatform, string> = {
  facebook: '📘',
  instagram: '📷',
  twitter: '🐦',
  linkedin: '💼',
  youtube: '📺',
  google: '⭐'
}

export function SocialLink({
  platform,
  href,
  source,
  children,
  className,
  showIcon = false,
  iconPosition = 'left',
  onClick,
  ariaLabel
}: SocialLinkProps) {
  const handleClick = () => {
    // Track the social click event
    pushToDataLayer({
      event: 'social_click',
      event_category: 'Social Media',
      event_label: source,
      social_platform: platform,
      social_url: href,
      click_source: source
    })
    
    // Call any additional onClick handler
    if (onClick) {
      onClick()
    }
  }

  const icon = showIcon ? platformIcons[platform] : null
  const defaultAriaLabel = ariaLabel || `Visit our ${platform} page`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('inline-flex items-center gap-2', className)}
      onClick={handleClick}
      aria-label={defaultAriaLabel}
    >
      {icon && iconPosition === 'left' && <span aria-hidden="true">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span aria-hidden="true">{icon}</span>}
    </a>
  )
}