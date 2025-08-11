'use client'

import { analytics } from '@/lib/analytics'

interface PhoneLinkProps {
  phone: string
  source: string
  className?: string
  children?: React.ReactNode
  showIcon?: boolean
  onClick?: () => void
  role?: string
}

export function PhoneLink({ 
  phone, 
  source, 
  className = '', 
  children,
  showIcon = true,
  onClick,
  role
}: PhoneLinkProps) {
  // Convert UK phone number to international format for tel: links
  const formattedPhone = phone.replace(/\s/g, '').replace(/^01753/, '+441753')
  
  const handleClick = () => {
    analytics.phoneCall(phone, source)
    if (onClick) {
      onClick()
    }
  }

  return (
    <a 
      href={`tel:${formattedPhone}`} 
      className={className}
      onClick={handleClick}
      role={role}
    >
      {showIcon && '📞 '}
      {children || phone}
    </a>
  )
}