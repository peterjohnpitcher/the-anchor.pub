import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input, Textarea } from '../Input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Input label="Email" placeholder="Enter email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Input variant="default" />)
    expect(screen.getByRole('textbox')).toHaveClass('border-gray-300')

    rerender(<Input variant="error" />)
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500')

    rerender(<Input variant="success" />)
    expect(screen.getByRole('textbox')).toHaveClass('border-green-500')
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Input size="sm" />)
    expect(screen.getByRole('textbox')).toHaveClass('text-sm')

    rerender(<Input size="lg" />)
    expect(screen.getByRole('textbox')).toHaveClass('text-lg')
  })

  it('shows error message', () => {
    render(<Input label="Username" error="Username is required" />)
    expect(screen.getByText('Username is required')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows helper text', () => {
    render(<Input label="Password" helperText="Must be 8 characters" />)
    expect(screen.getByText('Must be 8 characters')).toBeInTheDocument()
  })

  it('renders with left icon', () => {
    const icon = <span data-testid="search-icon">🔍</span>
    render(<Input leftIcon={icon} />)
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('pl-10')
  })

  it('renders with right icon', () => {
    const icon = <span data-testid="currency">USD</span>
    render(<Input rightIcon={icon} />)
    expect(screen.getByTestId('currency')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('pr-10')
  })

  it('handles user input', async () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'Hello')
    
    expect(handleChange).toHaveBeenCalledTimes(5)
    expect(input).toHaveValue('Hello')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Input ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('generates id from label when not provided', () => {
    render(<Input label="Email Address" />)
    const input = screen.getByLabelText('Email Address')
    expect(input).toHaveAttribute('id', 'email-address')
  })

  it('uses provided id over generated one', () => {
    render(<Input label="Email" id="custom-email" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('id', 'custom-email')
  })

  it('links error message with aria-describedby', () => {
    render(<Input label="Email" error="Invalid email" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-describedby', 'email-error')
  })

  it('disables input when disabled prop is true', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})

describe('Textarea', () => {
  it('renders textarea element', () => {
    render(<Textarea placeholder="Enter message" />)
    expect(screen.getByPlaceholderText('Enter message')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Textarea label="Message" />)
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('has default rows', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4')
  })

  it('accepts custom rows', () => {
    render(<Textarea rows={10} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '10')
  })

  it('shows error message', () => {
    render(<Textarea label="Comments" error="Comments are required" />)
    expect(screen.getByText('Comments are required')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows helper text', () => {
    render(<Textarea helperText="Max 500 characters" />)
    expect(screen.getByText('Max 500 characters')).toBeInTheDocument()
  })

  it('has resize class', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).toHaveClass('resize-y')
  })

  it('handles user input', async () => {
    const handleChange = jest.fn()
    render(<Textarea onChange={handleChange} />)
    
    const textarea = screen.getByRole('textbox')
    await userEvent.type(textarea, 'Hello World')
    
    expect(handleChange).toHaveBeenCalled()
    expect(textarea).toHaveValue('Hello World')
  })
})