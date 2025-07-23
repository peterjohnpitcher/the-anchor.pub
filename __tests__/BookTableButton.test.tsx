import { render, screen, fireEvent } from '@testing-library/react'
import { BookTableButton } from '@/components/BookTableButton'
import { analytics } from '@/lib/analytics'
import { usePathname } from 'next/navigation'

// Mock dependencies
jest.mock('@/lib/analytics')
jest.mock('next/navigation')

describe('BookTableButton', () => {
  const mockAnalytics = analytics as jest.Mocked<typeof analytics>
  const mockUsePathname = usePathname as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    mockUsePathname.mockReturnValue('/test-page')
    
    // Mock window properties
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })
    Object.defineProperty(navigator, 'userAgent', { 
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 
      writable: true 
    })
    
    // Mock dataLayer
    ;(window as any).dataLayer = []
  })

  it('renders with default props', () => {
    render(<BookTableButton source="test" />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://ordertab.menu/theanchor/bookings')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByText('📅 Book a Table')).toBeInTheDocument()
  })

  it('renders with custom children', () => {
    render(<BookTableButton source="test">Custom Text</BookTableButton>)
    expect(screen.getByText('Custom Text')).toBeInTheDocument()
  })

  it('tracks analytics on click', () => {
    const mockDate = new Date('2024-01-15T14:30:00')
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

    render(
      <BookTableButton 
        source="homepage_hero" 
        context="special_event"
        eventName="Christmas Party"
      />
    )
    
    const link = screen.getByRole('link')
    fireEvent.click(link)

    expect(mockAnalytics.track).toHaveBeenCalledWith({
      action: 'click',
      category: 'booking',
      label: 'Book a Table',
      value: 1,
      metadata: expect.objectContaining({
        source: 'homepage_hero',
        context: 'special_event',
        eventName: 'Christmas Party',
        page: '/test-page',
        device: 'desktop',
        timeOfDay: 'afternoon',
        dayOfWeek: 'Monday',
        buttonLocation: 'homepage_hero',
        userAgent: expect.any(String),
        screenWidth: 1024,
        screenHeight: expect.any(Number),
        referrer: expect.any(String),
        timestamp: mockDate.toISOString()
      })
    })
  })

  it('detects mobile device correctly', () => {
    Object.defineProperty(navigator, 'userAgent', { 
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)', 
      writable: true 
    })
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true })

    render(<BookTableButton source="mobile_menu" />)
    
    const link = screen.getByRole('link')
    fireEvent.click(link)

    expect(mockAnalytics.track).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: expect.objectContaining({
          device: 'mobile'
        })
      })
    )
  })

  it('pushes event to dataLayer', () => {
    const mockDate = new Date('2024-01-15T20:00:00')
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

    render(<BookTableButton source="footer" context="regular" />)
    
    const link = screen.getByRole('link')
    fireEvent.click(link)

    expect((window as any).dataLayer).toContainEqual({
      event: 'table_booking_click',
      booking_source: 'footer',
      booking_context: 'regular',
      booking_event: undefined,
      booking_page: '/test-page',
      booking_device: 'desktop',
      booking_time_of_day: 'evening',
      booking_day_of_week: 'Monday',
      booking_timestamp: mockDate.toISOString()
    })
  })

  it('calls custom onClick handler after tracking', () => {
    const mockOnClick = jest.fn()
    
    render(
      <BookTableButton 
        source="test" 
        onClickAfterTracking={mockOnClick}
      />
    )
    
    const link = screen.getByRole('link')
    fireEvent.click(link)

    expect(mockOnClick).toHaveBeenCalled()
    expect(mockAnalytics.track).toHaveBeenCalledBefore(mockOnClick as any)
  })

  it('determines correct time of day', () => {
    const testCases = [
      { hour: 8, expected: 'morning' },
      { hour: 14, expected: 'afternoon' },
      { hour: 19, expected: 'evening' }
    ]

    testCases.forEach(({ hour, expected }) => {
      jest.clearAllMocks()
      const mockDate = new Date()
      mockDate.setHours(hour, 0, 0, 0)
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

      render(<BookTableButton source="test" />)
      
      const link = screen.getByRole('link')
      fireEvent.click(link)

      expect(mockAnalytics.track).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: expect.objectContaining({
            timeOfDay: expected
          })
        })
      )
    })
  })
})