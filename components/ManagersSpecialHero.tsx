'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { getCurrentPromotionClient } from '@/lib/managers-special-utils-client'

export function ManagersSpecialHero() {
  const [currentPromotion, setCurrentPromotion] = useState<any>(null)
  const [imagePath, setImagePath] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Get current promotion from API
    getCurrentPromotionClient()
      .then(promo => {
        if (promo) {
          setCurrentPromotion(promo)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch current promotion:', err)
        setLoading(false)
      })
    
    // Fetch the dynamic image path
    fetch('/api/managers-special-image')
      .then(res => res.json())
      .then(data => {
        if (data.found && data.image) {
          setImagePath(data.image)
        }
      })
      .catch(err => console.error('Failed to fetch manager\'s special image:', err))
  }, [])

  if (loading || !currentPromotion) return null

  // The API returns { active: true, promotion: {...}, image: "..." }
  // currentPromotion.promotion contains the full promotion data from JSON
  if (!currentPromotion.promotion) {
    return null
  }
  
  const { spirit, promotion } = currentPromotion.promotion
  
  // Ensure spirit and promotion exist
  if (!spirit || !promotion) {
    return null
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-anchor-green to-emerald-800">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
        }}></div>
      </div>
      
      <div className="relative z-10 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              {/* Left side - Product Image (33% width) */}
              {(imagePath || spirit?.image) && (
                <div className="md:col-span-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/20 max-w-sm mx-auto md:mx-0">
                    <img 
                      src={imagePath || spirit?.image} 
                      alt={spirit?.name || 'Manager\'s Special'}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              )}
              
              {/* Right side - Text content & Pricing (67% width) */}
              <div className={`${(imagePath || spirit?.image) ? 'md:col-span-8' : 'md:col-span-12'} text-white`}>
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-red-600 text-white font-bold rounded-full text-sm uppercase tracking-wide">
                    {promotion?.headline || 'Manager\'s Special'}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  {spirit?.discount || ''} {spirit?.name || 'Featured Spirit'}
                </h2>
                <p className="text-xl mb-6 text-emerald-100">
                  {spirit?.category || ''} {spirit?.category && spirit?.abv ? '•' : ''} {spirit?.abv || ''} {spirit?.abv && spirit?.origin ? '•' : ''} {spirit?.origin || ''}
                </p>
                <p className="text-lg mb-8 text-emerald-50">
                  {spirit?.description || ''}
                </p>
                
                {/* Pricing Info */}
                {spirit?.specialPrice && (
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
                      <span className="text-sm text-emerald-100">Single (25ml)</span>
                      <div>
                        <span className="text-gray-300 line-through text-sm mr-2">{spirit?.originalPrice || ''}</span>
                        <span className="text-2xl font-bold text-white">{spirit?.specialPrice || ''}</span>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
                      <span className="text-sm text-emerald-100">Double (50ml)</span>
                      <div>
                        <span className="text-gray-300 line-through text-sm mr-2">{spirit?.originalPriceDouble || ''}</span>
                        <span className="text-2xl font-bold text-white">{spirit?.specialPriceDouble || ''}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* CTA Button */}
                <div className="flex flex-wrap gap-4 items-center">
                  <Button 
                    size="lg"
                    className="bg-white text-anchor-green hover:bg-gray-100"
                    asChild
                  >
                    <Link href="/drinks/managers-special">
                      View Full Details & Tasting Notes
                    </Link>
                  </Button>
                  <div className="text-white">
                    <span className="text-sm">Valid until</span>
                    <span className="block text-lg font-bold">
                      {currentPromotion?.endDate 
                        ? new Date(currentPromotion.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                        : 'While stocks last'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}