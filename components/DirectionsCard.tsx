interface DirectionsCardProps {
  from: string
  steps: string[]
  time?: string
  distance?: string
  icon?: string
  className?: string
}

export function DirectionsCard({ 
  from, 
  steps, 
  time,
  distance,
  icon = '📍',
  className = '' 
}: DirectionsCardProps) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm ${className}`}>
      <h3 className="text-xl font-bold mb-4 text-anchor-green">
        {icon} From {from}
      </h3>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-3">
            <span className="font-bold text-anchor-gold">{index + 1}.</span>
            <span className="text-gray-700">{step}</span>
          </li>
        ))}
      </ol>
      {(time || distance) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {time && (
            <p className="text-sm text-gray-700">
              <strong>Journey time:</strong> {time}
            </p>
          )}
          {distance && (
            <p className="text-sm text-gray-700">
              <strong>Distance:</strong> {distance}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

interface DirectionsGridProps {
  directions: DirectionsCardProps[]
  columns?: 1 | 2
  className?: string
}

export function DirectionsGrid({ directions, columns = 2, className = '' }: DirectionsGridProps) {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : ''

  return (
    <div className={`grid ${gridCols} gap-8 ${className}`}>
      {directions.map((direction, index) => (
        <DirectionsCard key={index} {...direction} />
      ))}
    </div>
  )
}