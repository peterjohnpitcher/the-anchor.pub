'use client'

import { useState } from 'react'
import { PhoneLink } from '@/components/PhoneLink'
import { DirectionsLink } from '@/components/DirectionsButton'
import { WhatsAppLink } from '@/components/WhatsAppLink'
import { trackTableBookingClick } from '@/lib/gtm-events'

export function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          role="presentation"
          aria-hidden="true"
        />
      )}
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Action Menu */}
        <div 
          className={`absolute bottom-16 right-0 transition-all duration-300 ${
            isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="floating-action-button"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-3 min-w-[200px] space-y-2">
            <a
              href="/book-table"
              onClick={() => {
                trackTableBookingClick('floating_actions')
                setIsOpen(false)
              }}
              className="flex items-center gap-3 p-3 hover:bg-anchor-cream rounded-lg transition-colours w-full justify-start text-left"
              role="menuitem"
            >
              <span className="flex items-center gap-3 whitespace-nowrap">
                <span className="text-2xl" aria-hidden="true">📅</span>
                <span className="font-medium">Book a Table</span>
              </span>
            </a>
            
            <PhoneLink
              phone="01753682707"
              source="floating_actions"
              className="flex items-center gap-3 p-3 hover:bg-anchor-cream rounded-lg transition-colours"
              showIcon={false}
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              <span className="text-2xl" aria-hidden="true">📞</span>
              <span className="font-medium">Call Us</span>
            </PhoneLink>
            
            <WhatsAppLink
              phone="01753682707"
              source="floating_actions"
              className="flex items-center gap-3 p-3 hover:bg-anchor-cream rounded-lg transition-colors w-full"
              showIcon={false}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl" aria-hidden="true">💬</span>
              <span className="font-medium">WhatsApp</span>
            </WhatsAppLink>
            
            <div onClick={() => setIsOpen(false)} role="menuitem">
              <DirectionsLink
                href="https://maps.google.com/maps?q=The+Anchor+Stanwell+Moor+TW19+6AQ"
                source="floating_actions"
                className="flex items-center gap-3 p-3 hover:bg-anchor-cream rounded-lg transition-colours w-full"
              >
                <span className="text-2xl" aria-hidden="true">📍</span>
                <span className="font-medium">Get Directions</span>
              </DirectionsLink>
            </div>
            
            <a
              href="/food-menu"
              className="flex items-center gap-3 p-3 hover:bg-anchor-cream rounded-lg transition-colours"
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              <span className="text-2xl" aria-hidden="true">🍽️</span>
              <span className="font-medium">View Menu</span>
            </a>
          </div>
        </div>
        
        {/* Main FAB Button */}
        <button
          id="floating-action-button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            bg-anchor-gold hover:bg-anchor-gold-light text-white 
            w-14 h-14 rounded-full shadow-lg hover:shadow-xl 
            transition-all duration-300 flex items-center justify-center
            ${isOpen ? 'rotate-45' : ''}
          `}
          aria-label="Quick actions menu"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
        </button>
      </div>

    </>
  )
}