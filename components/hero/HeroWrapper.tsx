import { ReactNode } from 'react'
import { HeroSection, HeroSize } from './HeroSection'
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs'
import { HeroTag } from './HeroTag'
import { getPageHeaderImage, getDefaultHeaderImage } from '@/lib/page-header-images'
import { StatusBar } from '@/components/StatusBar'

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
  statusBarVariant?: 'default' | 'compact' | 'hero'
  statusBarTheme?: {
    background?: string
    border?: string
    text?: string
    accentText?: string
  }
  statusBarShowKitchen?: boolean
  
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
  showStatusBar = true,
  statusBarPosition = 'below',
  statusBarVariant = 'hero',
  statusBarTheme,
  statusBarShowKitchen = true,
  cta,
  children,
  className,
  contentClassName
}: HeroWrapperProps) {
  // Get the appropriate header image for this route
  const headerImage = getPageHeaderImage(route) || getDefaultHeaderImage()
  
  // Auto-generate breadcrumbs if not provided
  const breadcrumbItems = breadcrumbs || generateBreadcrumbsFromRoute(route)
  
  const heroStatusTheme = {
    background: 'bg-anchor-green',
    border: 'border-2 border-anchor-gold',
    text: 'text-white',
    accentText: 'text-amber-100/90',
    ...statusBarTheme
  }

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
              <StatusBar 
                variant={statusBarVariant}
                showKitchen={statusBarShowKitchen}
                theme={heroStatusTheme}
              />
            </div>
          )}
          {cta}
          {showStatusBar && statusBarPosition === 'below' && (
            <div className="mt-6">
              <StatusBar 
                variant={statusBarVariant}
                showKitchen={statusBarShowKitchen}
                theme={heroStatusTheme}
              />
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
