import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { BaseComponentProps, WithChildren } from '../types'

const gridVariants = cva(
  'grid',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
        6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
        auto: 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-2',
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
        xl: 'gap-10'
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch'
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly'
      }
    },
    defaultVariants: {
      cols: 1,
      gap: 'md',
      align: 'stretch'
    }
  }
)

export interface GridProps 
  extends BaseComponentProps,
    WithChildren,
    Omit<HTMLAttributes<HTMLDivElement>, 'className'>,
    VariantProps<typeof gridVariants> {}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ 
    className,
    cols,
    gap,
    align,
    justify,
    children,
    testId,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ cols, gap, align, justify }), className)}
        data-testid={testId}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Grid.displayName = 'Grid'

// Grid Item component for more control
export interface GridItemProps 
  extends BaseComponentProps,
    WithChildren,
    Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 'full'
  start?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  order?: 'first' | 'last' | 'none' | number
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ 
    className,
    span,
    start,
    order,
    children,
    testId,
    ...props 
  }, ref) => {
    const spanClasses = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5',
      6: 'col-span-6',
      full: 'col-span-full'
    }

    const startClasses = {
      1: 'col-start-1',
      2: 'col-start-2',
      3: 'col-start-3',
      4: 'col-start-4',
      5: 'col-start-5',
      6: 'col-start-6',
      7: 'col-start-7'
    }

    const orderClasses = {
      first: 'order-first',
      last: 'order-last',
      none: 'order-none'
    }

    return (
      <div
        ref={ref}
        className={cn(
          span && spanClasses[span],
          start && startClasses[start],
          order && (typeof order === 'string' ? orderClasses[order] : `order-${order}`),
          className
        )}
        data-testid={testId}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GridItem.displayName = 'GridItem'