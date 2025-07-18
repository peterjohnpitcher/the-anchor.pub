import { render, screen } from '@/lib/test-utils'
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '../Card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <CardBody>Card content</CardBody>
      </Card>
    )
    
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders different variants', () => {
    const { rerender } = render(
      <Card variant="default">
        <CardBody>Default</CardBody>
      </Card>
    )
    expect(screen.getByText('Default').parentElement?.parentElement).toHaveClass('border', 'border-gray-200')
    
    rerender(
      <Card variant="outlined">
        <CardBody>Outlined</CardBody>
      </Card>
    )
    expect(screen.getByText('Outlined').parentElement?.parentElement).toHaveClass('border-2', 'border-gray-300')
    
    rerender(
      <Card variant="elevated">
        <CardBody>Elevated</CardBody>
      </Card>
    )
    expect(screen.getByText('Elevated').parentElement?.parentElement).toHaveClass('shadow-lg')
  })

  it('renders with different padding options', () => {
    const { rerender } = render(
      <Card padding="none">
        <CardBody>No padding</CardBody>
      </Card>
    )
    expect(screen.getByText('No padding').parentElement?.parentElement).toHaveClass('p-0')
    
    rerender(
      <Card padding="sm">
        <CardBody>Small padding</CardBody>
      </Card>
    )
    expect(screen.getByText('Small padding').parentElement?.parentElement).toHaveClass('p-3')
    
    rerender(
      <Card padding="lg">
        <CardBody>Large padding</CardBody>
      </Card>
    )
    expect(screen.getByText('Large padding').parentElement?.parentElement).toHaveClass('p-8')
  })

  it('applies custom className', () => {
    render(
      <Card className="custom-card">
        <CardBody>Custom</CardBody>
      </Card>
    )
    
    expect(screen.getByText('Custom').parentElement?.parentElement).toHaveClass('custom-card')
  })

  it('renders with all sub-components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardBody>Card body content</CardBody>
        <CardFooter>Card footer</CardFooter>
      </Card>
    )
    
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card body content')).toBeInTheDocument()
    expect(screen.getByText('Card footer')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(
      <Card ref={ref}>
        <CardBody>With ref</CardBody>
      </Card>
    )
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })
})

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(
      <CardHeader>
        <CardTitle>Header Title</CardTitle>
      </CardHeader>
    )
    
    expect(screen.getByText('Header Title')).toBeInTheDocument()
  })

  it('applies correct styling', () => {
    render(<CardHeader>Header</CardHeader>)
    
    const header = screen.getByText('Header')
    expect(header).toHaveClass('border-b', 'border-gray-200')
  })

  it('applies custom className', () => {
    render(<CardHeader className="custom-header">Header</CardHeader>)
    
    expect(screen.getByText('Header')).toHaveClass('custom-header')
  })
})

describe('CardTitle', () => {
  it('renders as h3 by default', () => {
    render(<CardTitle>Title</CardTitle>)
    
    const title = screen.getByText('Title')
    expect(title.tagName).toBe('H3')
  })

  it('renders with correct styling', () => {
    render(<CardTitle>Title</CardTitle>)
    
    const title = screen.getByText('Title')
    expect(title).toHaveClass('text-lg', 'font-semibold', 'text-gray-900')
  })

  it('accepts custom as prop', () => {
    render(<CardTitle as="h2">Title</CardTitle>)
    
    const title = screen.getByText('Title')
    expect(title.tagName).toBe('H2')
  })
})

describe('CardBody', () => {
  it('renders children correctly', () => {
    render(<CardBody>Body content</CardBody>)
    
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })

  it('applies correct styling', () => {
    render(<CardBody>Body</CardBody>)
    
    const body = screen.getByText('Body')
    expect(body).toHaveClass('text-gray-600')
  })

})

describe('CardFooter', () => {
  it('renders children correctly', () => {
    render(<CardFooter>Footer content</CardFooter>)
    
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('applies correct styling', () => {
    render(<CardFooter>Footer</CardFooter>)
    
    const footer = screen.getByText('Footer')
    expect(footer).toHaveClass('border-t', 'border-gray-200')
  })

  it('applies custom className', () => {
    render(<CardFooter className="custom-footer">Footer</CardFooter>)
    
    expect(screen.getByText('Footer')).toHaveClass('custom-footer')
  })
})