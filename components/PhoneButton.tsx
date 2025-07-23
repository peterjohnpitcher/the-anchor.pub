'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { analytics } from '@/lib/analytics'

interface PhoneButtonProps {
  phone: string
  source: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: React.ReactNode
}

export function PhoneButton({ 
  phone, 
  source, 
  variant = 'secondary',
  size = 'lg',
  className = '',
  children
}: PhoneButtonProps) {
  const formattedPhone = phone.replace(/\s/g, '')
  
  return (
    <Link 
      href={`tel:${formattedPhone}`}
      onClick={() => analytics.phoneCall(phone, source)}
    >
      <Button 
        variant={variant}
        size={size}
        className={className}
      >
        {children || `📞 Call ${phone}`}
      </Button>
    </Link>
  )
}