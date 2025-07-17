import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '../Card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Card variant="default">Default</Card>)
    expect(screen.getByText('Default')).toHaveClass('border-gray-200')

    rerender(<Card variant="outlined">Outlined</Card>)
    expect(screen.getByText('Outlined')).toHaveClass('border-2')

    rerender(<Card variant="elevated">Elevated</Card>)
    expect(screen.getByText('Elevated')).toHaveClass('shadow-lg')
  })

  it('applies padding classes correctly', () => {
    const { rerender } = render(<Card padding="none">No padding</Card>)
    expect(screen.getByText('No padding')).not.toHaveClass('p-')

    rerender(<Card padding="sm">Small padding</Card>)
    expect(screen.getByText('Small padding')).toHaveClass('p-4')

    rerender(<Card padding="lg">Large padding</Card>)
    expect(screen.getByText('Large padding')).toHaveClass('p-8')
  })

  it('applies custom className', () => {
    render(<Card className="custom-card">Custom</Card>)
    expect(screen.getByText('Custom')).toHaveClass('custom-card')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Card ref={ref}>Card</Card>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })
})

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(<CardHeader>Header content</CardHeader>)
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('has correct default styling', () => {
    render(<CardHeader>Header</CardHeader>)
    const header = screen.getByText('Header')
    expect(header).toHaveClass('px-6', 'py-4', 'border-b')
  })
})

describe('CardTitle', () => {
  it('renders as h3 by default', () => {
    render(<CardTitle>Title</CardTitle>)
    const title = screen.getByText('Title')
    expect(title.tagName).toBe('H3')
  })

  it('renders with custom heading level', () => {
    render(<CardTitle as="h1">Main Title</CardTitle>)
    const title = screen.getByText('Main Title')
    expect(title.tagName).toBe('H1')
  })

  it('has correct styling', () => {
    render(<CardTitle>Styled Title</CardTitle>)
    expect(screen.getByText('Styled Title')).toHaveClass('text-lg', 'font-semibold')
  })
})

describe('CardBody', () => {
  it('renders children correctly', () => {
    render(<CardBody>Body content</CardBody>)
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })

  it('has correct default padding', () => {
    render(<CardBody>Body</CardBody>)
    expect(screen.getByText('Body')).toHaveClass('p-6')
  })
})

describe('CardFooter', () => {
  it('renders children correctly', () => {
    render(<CardFooter>Footer content</CardFooter>)
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('has correct styling', () => {
    render(<CardFooter>Footer</CardFooter>)
    const footer = screen.getByText('Footer')
    expect(footer).toHaveClass('px-6', 'py-4', 'border-t', 'bg-gray-50')
  })
})

describe('Card composition', () => {
  it('renders complete card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardBody>
          <p>Card body content</p>
        </CardBody>
        <CardFooter>
          Footer content
        </CardFooter>
      </Card>
    )

    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(screen.getByText('Card body content')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })
})