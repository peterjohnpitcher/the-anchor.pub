'use client'

import { useCallback, useState, useEffect, memo } from 'react'

interface DebouncedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string
  onChange: (value: string) => void
  delay?: number
}

function DebouncedInputComponent({
  value: externalValue,
  onChange,
  delay = 300,
  ...rest
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
      {...rest}
      value={internalValue}
      onChange={handleChange}
    />
  )
}

export const DebouncedInput = memo(DebouncedInputComponent)