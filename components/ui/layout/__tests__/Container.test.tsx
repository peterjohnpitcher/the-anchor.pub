import { render, screen } from '@testing-library/react'
import { Container, Section } from '../Container'

describe('Container', () => {
  it('renders children correctly', () => {
    render(<Container>Container content</Container>)
    expect(screen.getByText('Container content')).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Container size="sm">Small</Container>)
    expect(screen.getByText('Small')).toHaveClass('max-w-3xl')

    rerender(<Container size="lg">Large</Container>)
    expect(screen.getByText('Large')).toHaveClass('max-w-7xl')

    rerender(<Container size="full">Full</Container>)
    expect(screen.getByText('Full')).toHaveClass('max-w-full')
  })

  it('applies padding classes correctly', () => {
    const { rerender } = render(<Container padding="none">No padding</Container>)
    expect(screen.getByText('No padding')).not.toHaveClass('px-')

    rerender(<Container padding="sm">Small padding</Container>)
    expect(screen.getByText('Small padding')).toHaveClass('px-4')

    rerender(<Container padding="lg">Large padding</Container>)
    expect(screen.getByText('Large padding')).toHaveClass('px-6')
  })

  it('renders as different HTML elements', () => {
    const { rerender } = render(<Container as="div">Div container</Container>)
    expect(screen.getByText('Div container').tagName).toBe('DIV')

    rerender(<Container as="section">Section container</Container>)
    expect(screen.getByText('Section container').tagName).toBe('SECTION')

    rerender(<Container as="main">Main container</Container>)
    expect(screen.getByText('Main container').tagName).toBe('MAIN')
  })

  it('applies custom className', () => {
    render(<Container className="custom-class">Custom</Container>)
    expect(screen.getByText('Custom')).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Container ref={ref}>Container</Container>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })
})

describe('Section', () => {
  it('renders as section element', () => {
    render(<Section>Section content</Section>)
    const section = screen.getByText('Section content')
    expect(section.tagName).toBe('SECTION')
  })

  it('applies spacing classes correctly', () => {
    const { rerender } = render(<Section spacing="none">No spacing</Section>)
    expect(screen.getByText('No spacing')).not.toHaveClass('py-')

    rerender(<Section spacing="sm">Small spacing</Section>)
    expect(screen.getByText('Small spacing')).toHaveClass('py-8')

    rerender(<Section spacing="lg">Large spacing</Section>)
    expect(screen.getByText('Large spacing')).toHaveClass('py-16')
  })

  it('inherits Container props', () => {
    render(<Section size="xl" padding="lg">Section</Section>)
    const section = screen.getByText('Section')
    expect(section).toHaveClass('max-w-[1440px]')
    expect(section).toHaveClass('px-6')
  })

  it('combines spacing and custom className', () => {
    render(<Section spacing="md" className="bg-gray-100">Section</Section>)
    const section = screen.getByText('Section')
    expect(section).toHaveClass('py-12', 'bg-gray-100')
  })
})