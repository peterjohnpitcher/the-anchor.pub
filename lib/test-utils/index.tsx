import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Custom render function that includes providers
export function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  // Add any global providers here
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
  }

  return render(ui, { wrapper: AllTheProviders, ...options })
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Export userEvent setup
export const user = userEvent.setup()

// Common test utilities
export const mockConsole = () => {
  const originalError = console.error
  const originalWarn = console.warn
  
  beforeAll(() => {
    console.error = jest.fn()
    console.warn = jest.fn()
  })
  
  afterAll(() => {
    console.error = originalError
    console.warn = originalWarn
  })
  
  return {
    error: console.error as jest.Mock,
    warn: console.warn as jest.Mock
  }
}

// Accessibility testing helper
export async function checkAccessibility(container: HTMLElement) {
  // This is a placeholder for axe-core integration
  // In a real implementation, you would use:
  // const results = await axe(container)
  // expect(results).toHaveNoViolations()
  return true
}

// Common mock data generators
export const mockData = {
  event: (overrides = {}) => ({
    id: '1',
    name: 'Test Event',
    date: '2024-12-25',
    time: '19:00',
    description: 'Test event description',
    imageUrl: '/test-image.jpg',
    remainingAttendeeCapacity: 50,
    ...overrides
  }),
  
  menuItem: (overrides = {}) => ({
    id: '1',
    name: 'Test Item',
    description: 'Test item description',
    price: 9.99,
    category: 'Starters',
    dietary: [],
    ...overrides
  }),
  
  blogPost: (overrides = {}) => ({
    id: '1',
    title: 'Test Blog Post',
    slug: 'test-blog-post',
    excerpt: 'Test excerpt',
    content: 'Test content',
    date: '2024-01-01',
    author: 'Test Author',
    tags: ['test'],
    ...overrides
  })
}

// Wait for async updates
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0))

// Mock Next.js router
export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
}

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>
  },
}))