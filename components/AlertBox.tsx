interface AlertBoxProps {
  title?: string
  content: React.ReactNode
  variant?: 'info' | 'warning' | 'success' | 'error' | 'tip'
  className?: string
}

export function AlertBox({ 
  title, 
  content, 
  variant = 'info',
  className = '' 
}: AlertBoxProps) {
  const variantStyles = {
    info: {
      container: 'bg-blue-50 border-blue-200',
      title: 'text-blue-800',
      content: 'text-blue-700'
    },
    warning: {
      container: 'bg-amber-50 border-amber-200',
      title: 'text-amber-800',
      content: 'text-amber-700'
    },
    success: {
      container: 'bg-green-50 border-green-200',
      title: 'text-green-800',
      content: 'text-green-700'
    },
    error: {
      container: 'bg-red-50 border-red-200',
      title: 'text-red-800',
      content: 'text-red-700'
    },
    tip: {
      container: 'bg-purple-50 border-purple-200',
      title: 'text-purple-800',
      content: 'text-purple-700'
    }
  }

  const styles = variantStyles[variant]

  return (
    <div className={`rounded-xl p-6 border-2 ${styles.container} ${className}`}>
      {title && (
        <h3 className={`text-lg font-bold mb-2 ${styles.title}`}>
          {title}
        </h3>
      )}
      <div className={`${styles.content}`}>
        {content}
      </div>
    </div>
  )
}