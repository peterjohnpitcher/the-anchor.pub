// Form validation utilities

export interface ValidationRule {
  required?: boolean | string
  minLength?: { value: number; message?: string }
  maxLength?: { value: number; message?: string }
  min?: { value: number | string; message?: string }
  max?: { value: number | string; message?: string }
  pattern?: { value: RegExp; message?: string }
  validate?: Record<string, (value: any) => boolean | string>
  email?: boolean | string
  url?: boolean | string
  phone?: boolean | string
}

export interface ValidationError {
  field: string
  message: string
}

// Common validation patterns
export const patterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  ukPhone: /^(?:(?:\+44|0044|0)7(?:\d{9}))$/,
  postcode: /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  numeric: /^[0-9]+$/,
  alpha: /^[a-zA-Z]+$/
}

// Validate a single field
export function validateField(
  value: any,
  rules: ValidationRule,
  fieldName: string
): string | null {
  // Required validation
  if (rules.required) {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return typeof rules.required === 'string' 
        ? rules.required 
        : `${fieldName} is required`
    }
  }

  // Skip other validations if value is empty and not required
  if (!value) return null

  // String validations
  if (typeof value === 'string') {
    // Min length
    if (rules.minLength && value.length < rules.minLength.value) {
      return rules.minLength.message || 
        `${fieldName} must be at least ${rules.minLength.value} characters`
    }

    // Max length
    if (rules.maxLength && value.length > rules.maxLength.value) {
      return rules.maxLength.message || 
        `${fieldName} must be no more than ${rules.maxLength.value} characters`
    }

    // Email validation
    if (rules.email) {
      if (!patterns.email.test(value)) {
        return typeof rules.email === 'string' 
          ? rules.email 
          : 'Please enter a valid email address'
      }
    }

    // URL validation
    if (rules.url) {
      if (!patterns.url.test(value)) {
        return typeof rules.url === 'string' 
          ? rules.url 
          : 'Please enter a valid URL'
      }
    }

    // Phone validation (UK)
    if (rules.phone) {
      const cleaned = value.replace(/[\s-()]/g, '')
      if (!patterns.ukPhone.test(cleaned)) {
        return typeof rules.phone === 'string' 
          ? rules.phone 
          : 'Please enter a valid UK mobile number'
      }
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.value.test(value)) {
      return rules.pattern.message || `${fieldName} format is invalid`
    }
  }

  // Number validations
  if (typeof value === 'number' || !isNaN(Number(value))) {
    const numValue = Number(value)

    // Min value
    if (rules.min !== undefined) {
      const minValue = typeof rules.min.value === 'string' 
        ? Number(rules.min.value) 
        : rules.min.value
      
      if (numValue < minValue) {
        return rules.min.message || `${fieldName} must be at least ${minValue}`
      }
    }

    // Max value
    if (rules.max !== undefined) {
      const maxValue = typeof rules.max.value === 'string' 
        ? Number(rules.max.value) 
        : rules.max.value
      
      if (numValue > maxValue) {
        return rules.max.message || `${fieldName} must be no more than ${maxValue}`
      }
    }
  }

  // Custom validations
  if (rules.validate) {
    for (const [key, validator] of Object.entries(rules.validate)) {
      const result = validator(value)
      if (result !== true) {
        return typeof result === 'string' ? result : `${fieldName} validation failed`
      }
    }
  }

  return null
}

// Validate entire form
export function validateForm(
  formData: FormData | Record<string, any>,
  validationRules: Record<string, ValidationRule>
): ValidationError[] {
  const errors: ValidationError[] = []
  
  // Convert FormData to object if needed
  const data = formData instanceof FormData 
    ? Object.fromEntries(formData.entries())
    : formData

  // Validate each field
  for (const [field, rules] of Object.entries(validationRules)) {
    const value = data[field]
    const error = validateField(value, rules, field)
    
    if (error) {
      errors.push({ field, message: error })
    }
  }

  return errors
}

// Helper to format UK phone numbers
export function formatUKPhone(phone: string): string {
  const cleaned = phone.replace(/[\s-()]/g, '')
  
  if (cleaned.startsWith('+44')) {
    return cleaned
  } else if (cleaned.startsWith('0044')) {
    return '+44' + cleaned.substring(4)
  } else if (cleaned.startsWith('07')) {
    return '+44' + cleaned.substring(1)
  }
  
  return cleaned
}

// Helper to format UK postcodes
export function formatPostcode(postcode: string): string {
  const cleaned = postcode.toUpperCase().replace(/\s+/g, '')
  
  if (cleaned.length === 6 || cleaned.length === 7) {
    return cleaned.slice(0, -3) + ' ' + cleaned.slice(-3)
  }
  
  return cleaned
}

// Date validation helpers
export function isDateInFuture(date: string): boolean {
  return new Date(date) > new Date()
}

export function isDateInPast(date: string): boolean {
  return new Date(date) < new Date()
}

export function isDateBetween(date: string, min: string, max: string): boolean {
  const dateObj = new Date(date)
  return dateObj >= new Date(min) && dateObj <= new Date(max)
}

// Common validation rules presets
export const commonRules = {
  email: {
    required: 'Email is required',
    email: true
  } as ValidationRule,
  
  phone: {
    required: 'Phone number is required',
    phone: true
  } as ValidationRule,
  
  password: {
    required: 'Password is required',
    minLength: { value: 8, message: 'Password must be at least 8 characters' },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must contain uppercase, lowercase and numbers'
    }
  } as ValidationRule,
  
  postcode: {
    required: 'Postcode is required',
    pattern: {
      value: patterns.postcode,
      message: 'Please enter a valid UK postcode'
    }
  } as ValidationRule,
  
  name: {
    required: 'Name is required',
    minLength: { value: 2 },
    maxLength: { value: 50 }
  } as ValidationRule
}