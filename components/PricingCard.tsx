import React from 'react'

interface PricingCardProps {
  title: string
  currentPrice: string
  originalPrice: string
  savings?: string
  volume?: string
  featured?: boolean
  className?: string
}

export function PricingCard({
  title,
  currentPrice,
  originalPrice,
  savings,
  volume,
  featured = false,
  className = ''
}: PricingCardProps) {
  return (
    <div className={`
      relative overflow-hidden rounded-2xl p-8 text-center
      ${featured 
        ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-400 shadow-xl' 
        : 'bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl'
      }
      transition-all duration-300 hover:scale-105
      ${className}
    `}>
      {featured && (
        <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          BEST VALUE
        </div>
      )}
      
      <h3 className="text-2xl font-bold mb-2 text-gray-900">{title}</h3>
      {volume && (
        <p className="text-sm text-gray-600 mb-4">{volume}</p>
      )}
      
      <div className="mb-4">
        <div className="text-4xl font-bold text-anchor-green mb-1">{currentPrice}</div>
        <div className="text-lg text-gray-500 line-through">{originalPrice}</div>
      </div>
      
      {savings && (
        <div className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
          Save {savings}
        </div>
      )}
    </div>
  )
}