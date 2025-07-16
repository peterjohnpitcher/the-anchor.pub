interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

export function SectionHeader({ 
  title, 
  subtitle, 
  align = 'center',
  className = '' 
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <div className={`${alignClasses[align]} mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-anchor-green mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-xl text-gray-700 ${align === 'center' ? 'max-w-3xl mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}