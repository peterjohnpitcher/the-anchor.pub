// Central export file for all UI components
// This provides a single import point for consuming components

// Primitive components
export * from './primitives/Button'
export * from './primitives/Input'
export * from './primitives/Badge'

// Feedback components
export * from './feedback/Alert'

// Layout components
export * from './layout/Card'
export * from './layout/Container'
export * from './layout/Grid'

// Navigation components
export * from './navigation/Tabs'
export * from './navigation/Breadcrumb'
export * from './navigation/NavBar'

// Re-export component types
export type * from './types'

// Legacy exports for backward compatibility
// Section Components
export { CTASection } from '../CTASection'
export { SectionHeader } from '../SectionHeader'
export { BusinessHoursSection } from '../BusinessHoursSection'

// Card Components
export { FeatureCard, FeatureGrid } from '../FeatureCard'
export { InfoBox, InfoBoxGrid } from '../InfoBox'
export { DirectionsCard, DirectionsGrid } from '../DirectionsCard'

// List Components
export { AmenityList } from '../AmenityList'
export { QuickInfoGrid } from '../QuickInfoGrid'

// Alert/Notification Components
export { AlertBox } from '../AlertBox'