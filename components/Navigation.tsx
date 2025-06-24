'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-anchor-green shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/branding/the-anchor-pub-logo-white-transparent.png"
              alt="The Anchor pub logo"
              width={150}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/whats-on" 
              className="font-medium transition-colors hover:text-anchor-gold text-white"
            >
              What&apos;s On
            </Link>
            <Link 
              href="/food-menu" 
              className="font-medium transition-colors hover:text-anchor-gold text-white"
            >
              Food
            </Link>
            <Link 
              href="/drinks" 
              className="font-medium transition-colors hover:text-anchor-gold text-white"
            >
              Drinks
            </Link>
            <Link 
              href="/find-us" 
              className="font-medium transition-colors hover:text-anchor-gold text-white"
            >
              Find Us
            </Link>
            <Link 
              href="/near-heathrow" 
              className="font-medium transition-colors hover:text-anchor-gold text-white"
            >
              Near Heathrow
            </Link>
            <a 
              href="tel:01753682707" 
              className="font-semibold transition-all px-6 py-2 rounded-full bg-anchor-gold text-white hover:bg-anchor-gold-light"
            >
              📞 Book a Table
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
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
        <div className="md:hidden bg-anchor-green-dark border-t border-anchor-green-light shadow-lg">
          <div className="container mx-auto px-4 py-6 space-y-4">
            <Link 
              href="/whats-on" 
              className="block text-white hover:text-anchor-gold transition-colors text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              What&apos;s On
            </Link>
            <Link 
              href="/food-menu" 
              className="block text-white hover:text-anchor-gold transition-colors text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Food
            </Link>
            <Link 
              href="/drinks" 
              className="block text-white hover:text-anchor-gold transition-colors text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Drinks
            </Link>
            <Link 
              href="/find-us" 
              className="block text-white hover:text-anchor-gold transition-colors text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Find Us
            </Link>
            <Link 
              href="/near-heathrow" 
              className="block text-white hover:text-anchor-gold transition-colors text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Near Heathrow
            </Link>
            <a 
              href="tel:01753682707" 
              className="block text-center bg-anchor-gold text-white py-3 font-semibold rounded-full mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📞 Book a Table
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}