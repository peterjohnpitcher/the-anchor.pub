'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { NavigationItem, BusinessInfo } from '@/lib/types'
import { useFocusTrap } from '@/hooks/useFocusTrap'

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
  { label: 'Events', href: '/book-event' },
  { label: 'Blog', href: '/blog' },
  { label: 'Find Us', href: '/find-us' },
  { label: 'Near Heathrow', href: '/near-heathrow' }
]

const defaultLogo = {
  src: '/images/branding/the-anchor-pub-logo-white-transparent.png',
  alt: 'The Anchor pub logo - traditional anchor symbol with elegant typography',
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
  const focusTrapRef = useFocusTrap(isMobileMenuOpen)

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

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const renderLink = (item: NavigationItem, isMobile = false) => {
    const linkClass = cn(
      'font-medium transition-colours',
      'text-sm xl:text-base', // Responsive text sizing
      mergedTheme.text,
      mergedTheme.hoverText,
      isMobile && 'block text-lg py-3 min-h-[44px] flex items-center'
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
      'font-semibold transition-all rounded-full',
      'px-4 py-1.5 text-sm xl:px-6 xl:py-2 xl:text-base', // Responsive sizing
      mergedTheme.ctaBackground,
      mergedTheme.ctaText,
      mergedTheme.ctaHoverBackground,
      isMobile && 'block text-center py-3 mt-4 text-base px-6'
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
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-anchor-gold focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-anchor-gold-light"
      >
        Skip to main content
      </a>
      
      <nav 
        className={cn(
          'transition-all duration-300 shadow-md',
          sticky && 'fixed top-0 left-0 right-0 z-50',
          mergedTheme.background,
          className
        )}
        role="navigation"
        aria-label="Main navigation"
        itemScope 
        itemType="https://schema.org/SiteNavigationElement"
      >
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
                sizes="150px"
              />
            </Link>
            {/* Status on desktop */}
            <div className={cn('hidden lg:flex items-center gap-6', mergedTheme.text)}>
              {showStatus && statusComponent}
              {showWeather && (
                <div className="border-l border-white/20 pl-6">
                  {weatherComponent}
                </div>
              )}
            </div>
            {/* Status on mobile - show next to logo */}
            {showStatus && statusComponent && (
              <div className={cn('lg:hidden', mergedTheme.text)}>
                {statusComponent}
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className={cn('hidden lg:flex items-center lg:space-x-6 xl:space-x-8')}>
            {items.map(item => renderLink(item))}
            {renderCTA()}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn('lg:hidden', mergedTheme.text)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
        <div 
          ref={focusTrapRef}
          className={cn(
            'lg:hidden bg-anchor-green-dark border-t border-anchor-green-light shadow-lg'
          )}
          role="dialog"
          aria-label="Mobile navigation menu"
          aria-modal="true"
        >
          <div className="container mx-auto px-4 py-6 space-y-4">
            {/* Status Bar for Mobile */}
            {showStatus && statusComponent && (
              <div className="pb-4 mb-4 border-b border-white/20">
                {statusComponent}
              </div>
            )}
            {items.map(item => renderLink(item, true))}
            {renderCTA(true)}
          </div>
        </div>
      )}
      </nav>
    </>
  )
}