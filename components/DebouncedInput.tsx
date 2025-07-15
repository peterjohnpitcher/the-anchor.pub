'use client'

import { useCallback, useState, useEffect, memo } from 'react'

interface DebouncedInputProps {
  value: string
  onChange: (value: string) => void
  delay?: number
  placeholder?: string
  type?: string
  id?: string
  className?: string
  disabled?: boolean
}

function DebouncedInputComponent({
  value: externalValue,
  onChange,
  delay = 300,
  placeholder,
  type = 'text',
  id,
  className,
  disabled
}: DebouncedInputProps) {
  const [internalValue, setInternalValue] = useState(externalValue)

  useEffect(() => {
    setInternalValue(externalValue)
  }, [externalValue])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (internalValue !== externalValue) {
        onChange(internalValue)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [internalValue, externalValue, onChange, delay])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value)
  }, [])

  return (
    <input
      type={type}
      id={id}
      value={internalValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
    />
  )
}

export const DebouncedInput = memo(DebouncedInputComponent)