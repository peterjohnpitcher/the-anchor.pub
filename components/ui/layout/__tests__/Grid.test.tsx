import { render, screen } from '@testing-library/react'
import { Grid, GridItem } from '../Grid'

describe('Grid', () => {
  it('renders children correctly', () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('applies column classes correctly', () => {
    const { rerender } = render(<Grid cols={2}>Grid</Grid>)
    expect(screen.getByText('Grid')).toHaveClass('sm:grid-cols-2')

    rerender(<Grid cols={4}>Grid</Grid>)
    expect(screen.getByText('Grid')).toHaveClass('lg:grid-cols-4')

    rerender(<Grid cols="auto">Grid</Grid>)
    expect(screen.getByText('Grid')).toHaveClass('grid-cols-[repeat(auto-fit,minmax(250px,1fr))]')
  })

  it('applies gap classes correctly', () => {
    const { rerender } = render(<Grid gap="none">Grid</Grid>)
    expect(screen.getByText('Grid')).toHaveClass('gap-0')

    rerender(<Grid gap="sm">Grid</Grid>)
    expect(screen.getByText('Grid')).toHaveClass('gap-4')

    rerender(<Grid gap="xl">Grid</Grid>)
    expect(screen.getByText('Grid')).toHaveClass('gap-10')
  })

  it('applies alignment classes correctly', () => {
    const { rerender } = render(<Grid align="start">Grid</Grid>)
    expect(screen.getByText('Grid')).toHaveClass('items-start')

    rerender(<Grid align="center">Grid</Grid>)
    expect(screen.getByText('Grid')).toHaveClass('items-center')
  })

  it('applies justify classes correctly', () => {
    const { rerender } = render(<Grid justify="center">Grid</Grid>)
    expect(screen.getByText('Grid')).toHaveClass('justify-center')

    rerender(<Grid justify="between">Grid</Grid>)
    expect(screen.getByText('Grid')).toHaveClass('justify-between')
  })

  it('applies custom className', () => {
    render(<Grid className="custom-grid">Grid</Grid>)
    expect(screen.getByText('Grid')).toHaveClass('custom-grid')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Grid ref={ref}>Grid</Grid>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })
})

describe('GridItem', () => {
  it('renders children correctly', () => {
    render(<GridItem>Grid item content</GridItem>)
    expect(screen.getByText('Grid item content')).toBeInTheDocument()
  })

  it('applies span classes correctly', () => {
    const { rerender } = render(<GridItem span={2}>Item</GridItem>)
    expect(screen.getByText('Item')).toHaveClass('col-span-2')

    rerender(<GridItem span="full">Item</GridItem>)
    expect(screen.getByText('Item')).toHaveClass('col-span-full')
  })

  it('applies start classes correctly', () => {
    render(<GridItem start={3}>Item</GridItem>)
    expect(screen.getByText('Item')).toHaveClass('col-start-3')
  })

  it('applies order classes correctly', () => {
    const { rerender } = render(<GridItem order="first">Item</GridItem>)
    expect(screen.getByText('Item')).toHaveClass('order-first')

    rerender(<GridItem order="last">Item</GridItem>)
    expect(screen.getByText('Item')).toHaveClass('order-last')

    rerender(<GridItem order={5}>Item</GridItem>)
    expect(screen.getByText('Item')).toHaveClass('order-5')
  })

  it('combines multiple grid properties', () => {
    render(<GridItem span={3} start={2} order="first">Item</GridItem>)
    const item = screen.getByText('Item')
    expect(item).toHaveClass('col-span-3', 'col-start-2', 'order-first')
  })

  it('applies custom className', () => {
    render(<GridItem className="custom-item">Item</GridItem>)
    expect(screen.getByText('Item')).toHaveClass('custom-item')
  })
})

describe('Grid with GridItem composition', () => {
  it('renders grid layout correctly', () => {
    render(
      <Grid cols={3} gap="md">
        <GridItem span={2}>Wide item</GridItem>
        <GridItem>Normal item</GridItem>
        <GridItem span="full">Full width item</GridItem>
      </Grid>
    )

    expect(screen.getByText('Wide item')).toHaveClass('col-span-2')
    expect(screen.getByText('Normal item')).toBeInTheDocument()
    expect(screen.getByText('Full width item')).toHaveClass('col-span-full')
  })
})