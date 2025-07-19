import React from 'react'

interface BotanicalsGridProps {
  botanicals: string[]
  title?: string
  description?: string
  columns?: 2 | 3 | 4 | 5 | 6
  className?: string
}

export function BotanicalsGrid({
  botanicals,
  title,
  description,
  columns = 4,
  className = ''
}: BotanicalsGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  }

  return (
    <div className={className}>
      {title && (
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
      )}
      <div className={`grid ${gridCols[columns]} gap-3`}>
        {botanicals.map((botanical, index) => (
          <div 
            key={index} 
            className="bg-green-50 hover:bg-green-100 transition-colors rounded-lg p-4 text-center border border-green-200"
          >
            <span className="text-sm text-gray-700 font-medium">{botanical}</span>
          </div>
        ))}
      </div>
    </div>
  )
}