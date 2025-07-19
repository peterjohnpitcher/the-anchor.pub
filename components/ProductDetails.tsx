import React from 'react'

interface DetailItem {
  label: string
  value: string
}

interface ProductDetailsProps {
  title: string
  details: DetailItem[]
  variant?: 'default' | 'compact'
  className?: string
}

export function ProductDetails({
  title,
  details,
  variant = 'default',
  className = ''
}: ProductDetailsProps) {
  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <div className="flex flex-wrap gap-4">
          {details.map((detail, index) => (
            <div key={index} className="text-center">
              <p className="text-sm text-gray-600 mb-1">{detail.label}</p>
              <p className="font-semibold text-gray-900">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {details.map((detail, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
            <h4 className="text-sm text-gray-600 mb-2">{detail.label}</h4>
            <p className="text-lg font-semibold text-gray-900">{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}