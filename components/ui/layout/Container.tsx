import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { BaseComponentProps, WithChildren } from '../types'

const containerVariants = cva(
  'container mx-auto w-full',
  {
    variants: {
      size: {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl',
        xl: 'max-w-[1440px]',
        full: 'max-w-full'
      },
      padding: {
        none: '',
        sm: 'px-4 sm:px-6',
        md: 'px-4 sm:px-6 lg:px-8',
        lg: 'px-6 sm:px-8 lg:px-12'
      }
    },
    defaultVariants: {
      size: 'lg',
      padding: 'md'
    }
  }
)

export interface ContainerProps 
  extends BaseComponentProps,
    WithChildren,
    Omit<HTMLAttributes<HTMLDivElement>, 'className'>,
    VariantProps<typeof containerVariants> {
  as?: 'div' | 'section' | 'article' | 'main'
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    as: Component = 'div',
    className,
    size,
    padding,
    children,
    testId,
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ size, padding }), className)}
        data-testid={testId}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Container.displayName = 'Container'

// Section variant with vertical spacing
const sectionVariants = cva(
  '',
  {
    variants: {
      spacing: {
        none: '',
        tight: 'py-6 md:py-8',
        sm: 'py-8 md:py-10',
        md: 'py-10 md:py-12 lg:py-14',
        lg: 'py-12 md:py-14 lg:py-16'
      }
    },
    defaultVariants: {
      spacing: 'md'
    }
  }
)

export interface SectionProps 
  extends ContainerProps,
    VariantProps<typeof sectionVariants> {}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ 
    spacing,
    className,
    ...props 
  }, ref) => {
    return (
      <Container
        ref={ref}
        as="section"
        className={cn(sectionVariants({ spacing }), className)}
        {...props}
      />
    )
  }
)

Section.displayName = 'Section'
