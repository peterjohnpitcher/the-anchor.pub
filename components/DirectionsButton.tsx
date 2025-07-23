'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { pushToDataLayer } from '@/lib/gtm-events'

interface DirectionsButtonProps {
  href: string
  source: string
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  destination?: string
  mapPlatform?: 'google_maps' | 'apple_maps' | 'waze'
  fromLocation?: string
  asLink?: boolean
}

export function DirectionsButton({ 
  href, 
  source, 
  children, 
  className,
  variant = 'primary',
  size = 'md',
  destination = 'The Anchor Stanwell Moor',
  mapPlatform,
  fromLocation,
  asLink = false
}: DirectionsButtonProps) {
  // Determine map platform from URL if not provided
  const platform = mapPlatform || (() => {
    if (href.includes('maps.google.com') || href.includes('google.com/maps')) return 'google_maps'
    if (href.includes('maps.apple.com')) return 'apple_maps'
    if (href.includes('waze.com')) return 'waze'
    return 'google_maps' // default
  })()

  // Extract from location from URL if not provided
  const extractedFromLocation = fromLocation || (() => {
    const saddrMatch = href.match(/saddr=([^&]+)/)
    if (saddrMatch) {
      return decodeURIComponent(saddrMatch[1].replace(/\+/g, ' '))
    }
    return 'User Location'
  })()

  const handleClick = () => {
    // Track the directions click
    pushToDataLayer({
      event: 'directions_click',
      event_category: 'Navigation',
      event_label: source,
      source_page: source,
      destination_address: destination,
      map_platform: platform,
      from_location: extractedFromLocation
    })
  }

  if (asLink) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={className}
      >
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      <Button 
        variant={variant === 'link' ? 'ghost' : variant}
        size={size}
        className={className}
      >
        {children}
      </Button>
    </Link>
  )
}

// Wrapper component for inline text links
export function DirectionsLink({ 
  href, 
  source, 
  children, 
  className = 'text-anchor-gold hover:text-anchor-gold-light',
  destination = 'The Anchor Stanwell Moor',
  mapPlatform,
  fromLocation
}: Omit<DirectionsButtonProps, 'variant' | 'size' | 'asLink'>) {
  return (
    <DirectionsButton
      href={href}
      source={source}
      destination={destination}
      mapPlatform={mapPlatform}
      fromLocation={fromLocation}
      className={className}
      asLink={true}
    >
      {children}
    </DirectionsButton>
  )
}