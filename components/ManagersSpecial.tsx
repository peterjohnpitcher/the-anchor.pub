'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { HeroBadge } from './HeroBadge'

interface ManagersSpecialProps {
  variant?: 'full' | 'compact'
  className?: string
}

interface PromotionData {
  active: boolean
  promotion?: any
  image?: string | null
}

export function ManagersSpecial({ variant = 'full', className = '' }: ManagersSpecialProps) {
  const [promotionData, setPromotionData] = useState<PromotionData | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Fetch current promotion from API
    fetch('/api/managers-special')
      .then(res => res.json())
      .then(data => {
        setPromotionData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch promotion:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return null
  if (!promotionData?.active || !promotionData.promotion) return null

  const { spirit, promotion } = promotionData.promotion

  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-400 rounded-2xl p-6 shadow-lg ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {promotion.headline} - {spirit.name}
            </h3>
            <p className="text-gray-700">{spirit.discount} • Was {spirit.originalPrice}, now {spirit.specialPrice}</p>
          </div>
          <div className="text-3xl font-bold text-amber-600">
            {spirit.discount}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Full width background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {promotion.headline}
            </h2>
            <p className="text-xl text-purple-100">{promotion.subheadline}</p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Product Info */}
              <div className="p-8 md:p-12">
                <div className="relative mb-6">
                  <HeroBadge 
                    text={spirit.discount} 
                    variant="featured" 
                    position="absolute"
                    className="!text-lg !px-6 !py-2 !-top-4 !-left-4"
                  />
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {spirit.name}
                  </h3>
                  <p className="text-xl text-gray-600">{spirit.category}</p>
                </div>

                <div className="mb-6">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    {spirit.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {spirit.longDescription}
                  </p>
                </div>

                {/* Price Box */}
                <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 line-through text-xl">{spirit.originalPrice}</span>
                    <span className="text-4xl font-bold text-amber-600">{spirit.specialPrice}</span>
                  </div>
                  <p className="text-center text-gray-700 font-medium">{promotion.offerText}</p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">ABV</p>
                    <p className="font-bold">{spirit.abv}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Origin</p>
                    <p className="font-bold">{spirit.origin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Distillery</p>
                    <p className="font-bold">{spirit.distillery}</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Tasting & Serving */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12">
                {/* Tasting Notes */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Tasting Notes</h4>
                  <ul className="space-y-2">
                    {spirit.tastingNotes.map((note: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span className="text-gray-700">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Serving Suggestions */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Perfect Serves</h4>
                  <div className="space-y-3">
                    {spirit.servingsuggestions.map((suggestion: string, index: number) => (
                      <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-gray-700">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botanicals */}
                {spirit.botanicals && spirit.botanicals.length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {spirit.botanicals.length === 22 ? '22 Hand-Foraged ' : ''}Botanicals
                    </h4>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {spirit.botanicals.join(' • ')}
                      </p>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-8 text-center">
                  <p className="text-2xl font-bold text-amber-600 mb-2">{promotion.ctaText}</p>
                  <p className="text-sm text-gray-600">
                    Valid until {new Date(promotionData.promotion.endDate).toLocaleDateString('en-GB', { 
                      day: 'numeric', 
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}