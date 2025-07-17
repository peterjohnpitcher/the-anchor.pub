// Shared types for UI components

import { HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react'

// Common size variants
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Common color variants
export type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'

// Common status types
export type Status = 'info' | 'success' | 'warning' | 'error'

// Base component props that all components should extend
export interface BaseComponentProps {
  className?: string
  id?: string
  testId?: string
}

// Polymorphic component helper types
export type PolymorphicRef<C extends React.ElementType> = 
  React.ComponentPropsWithRef<C>['ref']

export type PropsOf<C extends React.ElementType> = 
  React.ComponentPropsWithoutRef<C>

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = Props & PropsOf<C> & {
  as?: C
  ref?: PolymorphicRef<C>
}

// Common prop patterns
export interface WithChildren {
  children?: React.ReactNode
}

export interface WithIcon {
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export interface WithLoading {
  loading?: boolean
  loadingText?: string
}

export interface WithDisabled {
  disabled?: boolean
}

// Utility types
export type Override<T, U> = Omit<T, keyof U> & U