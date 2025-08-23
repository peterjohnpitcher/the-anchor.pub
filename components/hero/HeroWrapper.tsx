import { ReactNode } from 'react'
import { HeroSection, HeroSize } from './HeroSection'
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs'
import { HeroTag } from './HeroTag'
import { getPageHeaderImage, getDefaultHeaderImage } from '@/lib/page-header-images'
import { StatusBarWrapper } from '@/components/StatusBarWrapper'

interface HeroWrapperProps {
  // Route & Content
  route: string
  title: string | ReactNode
  description?: string | ReactNode
  
  // Layout
  size?: HeroSize
  alignment?: 'left' | 'center' | 'right'
  overlay?: 'light' | 'medium' | 'dark' | 'gradient'
  
  // Features
  breadcrumbs?: BreadcrumbItem[]
  showBreadcrumbs?: boolean
  tags?: Array<{
    label: string
    icon?: ReactNode
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  }>
  showStatusBar?: boolean
  statusBarPosition?: 'above' | 'below' | 'none'
  
  // Actions
  cta?: ReactNode
  
  // Custom content
  children?: ReactNode
  
  // Styling
  className?: string
  contentClassName?: string
}

export function HeroWrapper({
  route,
  title,
  description,
  size = 'medium',
  alignment = 'center',
  overlay = 'gradient',
  breadcrumbs,
  showBreadcrumbs = true,
  tags,
  showStatusBar = false,
  statusBarPosition = 'below',
  cta,
  children,
  className,
  contentClassName
}: HeroWrapperProps) {
  // Get the appropriate header image for this route
  const headerImage = getPageHeaderImage(route) || getDefaultHeaderImage()
  
  // Auto-generate breadcrumbs if not provided
  const breadcrumbItems = breadcrumbs || generateBreadcrumbsFromRoute(route)
  
  return (
    <HeroSection
      title={title}
      description={description}
      image={{
        src: headerImage.src,
        alt: headerImage.alt,
        priority: true
      }}
      size={size}
      alignment={alignment}
      overlay={overlay}
      breadcrumbs={
        showBreadcrumbs && breadcrumbItems.length > 0 && (
          <Breadcrumbs items={breadcrumbItems} theme="dark" />
        )
      }
      tags={
        tags && tags.length > 0 && (
          <>
            {tags.map((tag, index) => (
              <HeroTag key={index} variant={tag.variant} icon={tag.icon}>
                {tag.label}
              </HeroTag>
            ))}
          </>
        )
      }
      cta={
        <>
          {showStatusBar && statusBarPosition === 'above' && (
            <div className="mb-6">
              <StatusBarWrapper />
            </div>
          )}
          {cta}
          {showStatusBar && statusBarPosition === 'below' && (
            <div className="mt-6">
              <StatusBarWrapper />
            </div>
          )}
        </>
      }
      className={className}
      contentClassName={contentClassName}
    >
      {children}
    </HeroSection>
  )
}

// Helper function to generate breadcrumbs from route
function generateBreadcrumbsFromRoute(route: string): BreadcrumbItem[] {
  if (!route || route === '/') return []
  
  const segments = route.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []
  
  segments.forEach((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/')
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    breadcrumbs.push({
      name,
      href: index < segments.length - 1 ? path : undefined
    })
  })
  
  return breadcrumbs
}