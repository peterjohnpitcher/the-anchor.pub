'use client'

import { useState } from 'react'
import { CallToAction } from './CallToAction'

export function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Action Menu */}
        <div className={`absolute bottom-16 right-0 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
        }`}>
          <div className="bg-white rounded-2xl shadow-2xl p-3 min-w-[200px] space-y-2">
            <a
              href="https://ordertab.menu/theanchor/bookings"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 hover:bg-anchor-cream rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">📅</span>
              <span className="font-medium">Book a Table</span>
            </a>
            
            <a
              href="tel:01753682707"
              className="flex items-center gap-3 p-3 hover:bg-anchor-cream rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">📞</span>
              <span className="font-medium">Call Us</span>
            </a>
            
            <a
              href="https://wa.me/4401753682707"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 hover:bg-anchor-cream rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">💬</span>
              <span className="font-medium">WhatsApp</span>
            </a>
            
            <a
              href="/find-us"
              className="flex items-center gap-3 p-3 hover:bg-anchor-cream rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">📍</span>
              <span className="font-medium">Get Directions</span>
            </a>
            
            <a
              href="/food-menu"
              className="flex items-center gap-3 p-3 hover:bg-anchor-cream rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">🍽️</span>
              <span className="font-medium">View Menu</span>
            </a>
          </div>
        </div>
        
        {/* Main FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            bg-anchor-gold hover:bg-anchor-gold-light text-white 
            w-14 h-14 rounded-full shadow-lg hover:shadow-xl 
            transition-all duration-300 flex items-center justify-center
            ${isOpen ? 'rotate-45' : ''}
          `}
          aria-label="Quick actions menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
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