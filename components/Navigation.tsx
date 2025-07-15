'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { NavigationItem, BusinessInfo } from '@/lib/types'

interface NavigationProps {
  logo?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  items?: NavigationItem[]
  ctaButton?: {
    label: string
    href: string
    icon?: string
    external?: boolean
  }
  theme?: {
    background?: string
    text?: string
    hoverText?: string
    ctaBackground?: string
    ctaText?: string
    ctaHoverBackground?: string
  }
  sticky?: boolean
  className?: string
  showStatus?: boolean
  statusComponent?: ReactNode
  showWeather?: boolean
  weatherComponent?: ReactNode
  mobileBreakpoint?: 'sm' | 'md' | 'lg'
}

const defaultTheme = {
  background: 'bg-anchor-green',
  text: 'text-white',
  hoverText: 'hover:text-anchor-gold',
  ctaBackground: 'bg-anchor-gold',
  ctaText: 'text-white',
  ctaHoverBackground: 'hover:bg-anchor-gold-light'
}

const defaultItems: NavigationItem[] = [
  { label: "What's On", href: '/whats-on' },
  { label: 'Food', href: '/food-menu' },
  { label: 'Drinks', href: '/drinks' },
  { label: 'Blog', href: '/blog' },
  { label: 'Find Us', href: '/find-us' },
  { label: 'Near Heathrow', href: '/near-heathrow' }
]

const defaultLogo = {
  src: '/images/branding/the-anchor-pub-logo-white-transparent.png',
  alt: 'The Anchor pub logo',
  width: 150,
  height: 60
}

export function Navigation({
  logo = defaultLogo,
  items = defaultItems,
  ctaButton = {
    label: '📅 Book a Table',
    href: 'https://ordertab.menu/theanchor/bookings',
    external: true
  },
  theme = defaultTheme,
  sticky = true,
  className,
  showStatus = true,
  statusComponent,
  showWeather = true,
  weatherComponent,
  mobileBreakpoint = 'md'
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const mergedTheme = { ...defaultTheme, ...theme }
  const breakpointClass = {
    sm: 'sm:hidden',
    md: 'md:hidden',
    lg: 'lg:hidden'
  }[mobileBreakpoint]

  useEffect(() => {
    if (!sticky) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sticky])

  const renderLink = (item: NavigationItem, isMobile = false) => {
    const linkClass = cn(
      'font-medium transition-colors',
      mergedTheme.text,
      mergedTheme.hoverText,
      isMobile && 'block text-lg py-2'
    )

    if (item.external) {
      return (
        <a
          key={item.href}
          href={item.href}
          className={linkClass}
          target="_blank"
          rel="noopener noreferrer"
          onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
        >
          {item.label}
        </a>
      )
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        className={linkClass}
        onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
      >
        {item.label}
      </Link>
    )
  }

  const renderCTA = (isMobile = false) => {
    if (!ctaButton) return null

    const ctaClass = cn(
      'font-semibold transition-all px-6 py-2 rounded-full',
      mergedTheme.ctaBackground,
      mergedTheme.ctaText,
      mergedTheme.ctaHoverBackground,
      isMobile && 'block text-center py-3 mt-4'
    )

    if (ctaButton.external) {
      return (
        <a
          href={ctaButton.href}
          className={ctaClass}
          target="_blank"
          rel="noopener noreferrer"
          onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
        >
          {ctaButton.icon} {ctaButton.label}
        </a>
      )
    }

    return (
      <Link
        href={ctaButton.href}
        className={ctaClass}
        onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
      >
        {ctaButton.icon} {ctaButton.label}
      </Link>
    )
  }

  return (
    <nav className={cn(
      'transition-all duration-300 shadow-md',
      sticky && 'fixed top-0 left-0 right-0 z-50',
      mergedTheme.background,
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Status */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-12 w-auto"
                priority
              />
            </Link>
            <div className={cn('hidden lg:flex items-center gap-6', mergedTheme.text)}>
              {showStatus && statusComponent}
              {showWeather && (
                <div className="border-l border-white/20 pl-6">
                  {weatherComponent}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className={cn('hidden items-center space-x-8', breakpointClass === 'md:hidden' ? 'md:flex' : breakpointClass === 'lg:hidden' ? 'lg:flex' : 'sm:flex')}>
            {items.map(item => renderLink(item))}
            {renderCTA()}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(breakpointClass, mergedTheme.text)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={cn(
          'bg-anchor-green-dark border-t border-anchor-green-light shadow-lg',
          breakpointClass
        )}>
          <div className="container mx-auto px-4 py-6 space-y-4">
            {items.map(item => renderLink(item, true))}
            {renderCTA(true)}
          </div>
        </div>
      )}
    </nav>
  )
}