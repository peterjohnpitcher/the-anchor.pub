import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Container } from './layout/Container'

interface FullWidthSectionProps extends HTMLAttributes<HTMLDivElement> {
  containerClassName?: string
  innerClassName?: string
}

/**
 * FullWidthSection ensures background colors/images span the full viewport width
 * while keeping content constrained within Container max-widths
 * 
 * Usage:
 * <FullWidthSection className="bg-gray-50">
 *   <h2>Content here</h2>
 * </FullWidthSection>
 */
export const FullWidthSection = forwardRef<HTMLDivElement, FullWidthSectionProps>(
  ({ className, containerClassName, innerClassName, children, ...props }, ref) => {
    return (
      <section 
        ref={ref} 
        className={cn('w-full', className)} 
        {...props}
      >
        <Container className={containerClassName}>
          <div className={innerClassName}>
            {children}
          </div>
        </Container>
      </section>
    )
  }
)

FullWidthSection.displayName = 'FullWidthSection'