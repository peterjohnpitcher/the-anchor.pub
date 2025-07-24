interface InfoBoxProps {
  title: string
  content: React.ReactNode
  footnote?: string
  variant?: 'default' | 'colored'
  color?: string
  icon?: string
  className?: string
}

export function InfoBox({ 
  title, 
  content, 
  footnote,
  variant = 'default',
  color,
  icon,
  className = ''
}: InfoBoxProps) {
  const baseClasses = 'rounded-xl p-6'
  
  const variantClasses = {
    default: 'bg-white shadow-sm',
    colored: color || 'bg-gray-50'
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} overflow-hidden ${className}`}>
      <h3 className={`text-xl font-bold mb-4 ${
        variant === 'colored' && color?.includes('amber') ? 'text-amber-800' :
        variant === 'colored' && color?.includes('blue') ? 'text-blue-800' :
        variant === 'colored' && color?.includes('red') ? 'text-red-800' :
        'text-anchor-green'
      }`}>
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h3>
      <div className="text-gray-700">
        {content}
      </div>
      {footnote && (
        <p className={`mt-3 text-sm ${
          variant === 'colored' && color?.includes('amber') ? 'text-amber-700' :
          variant === 'colored' && color?.includes('blue') ? 'text-blue-700' :
          variant === 'colored' && color?.includes('red') ? 'text-red-700' :
          'text-gray-700'
        }`}>
          {footnote}
        </p>
      )}
    </div>
  )
}

interface InfoBoxGridProps {
  boxes: InfoBoxProps[]
  columns?: 1 | 2 | 3
  className?: string
}

export function InfoBoxGrid({ boxes, columns = 2, className = '' }: InfoBoxGridProps) {
  const gridCols = {
    1: '',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3'
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {boxes.map((box, index) => (
        <InfoBox key={index} {...box} />
      ))}
    </div>
  )
}