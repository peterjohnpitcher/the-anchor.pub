'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { BookTableButton } from '@/components/BookTableButton'
import { Button } from '@/components/ui'
import { trackCtaClick } from '@/lib/gtm-events'

interface FoodStickyCtaBarProps {
  ctaContext: 'food' | 'sunday_roast' | 'pizza_tuesday' | 'heathrow_layover'
  whatsapp?: {
    href: string
    label?: string
    id?: string
  }
  label?: string
  variant?: 'primary' | 'secondary'
}

export function FoodStickyCtaBar({
  ctaContext,
  whatsapp,
  label = 'Book a Table',
  variant = 'primary'
}: FoodStickyCtaBarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const whatsappHref = useMemo(() => {
    if (!whatsapp?.href) return undefined
    try {
      const url = new URL(whatsapp.href, 'https://www.the-anchor.pub')
      url.searchParams.set('utm_source', 'website')
      url.searchParams.set('utm_medium', 'sticky_cta')
      url.searchParams.set('utm_campaign', 'food-growth')
      return url.toString()
    } catch {
      return whatsapp?.href
    }
  }, [whatsapp?.href])

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      setIsVisible(mobile)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isVisible || !isMobile) {
    return null
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] bg-white border-t border-gray-200 shadow-xl">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <div className="flex flex-col flex-1">
          <span className="text-sm font-semibold text-anchor-green">
            Ready to book?
          </span>
          <span className="text-xs text-gray-500">
            Reserve your table in under 60 seconds.
          </span>
        </div>
        <BookTableButton
          source={`sticky_${ctaContext}`}
          context={ctaContext}
          variant={variant}
          size="sm"
          className="flex-1"
        >
          {label}
        </BookTableButton>
        {whatsapp && whatsappHref && (
          <Link href={whatsappHref} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              className="border-anchor-green text-anchor-green hover:bg-anchor-green hover:text-white"
              onClick={() =>
                trackCtaClick({
                  id: whatsapp.id ?? `whatsapp_${ctaContext}`,
                  label: whatsapp.label ?? 'WhatsApp',
                  location: `sticky_${ctaContext}`,
                  destination: 'whatsapp',
                  context: ctaContext,
                  mode: 'whatsapp',
                  variant: 'outline'
                })
              }
            >
              {whatsapp.label ?? 'WhatsApp Us'}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
