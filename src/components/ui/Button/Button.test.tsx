import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('displays loading state', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('applies variant styles', () => {
    const { container } = render(<Button variant="danger">Delete</Button>)
    expect(container.firstChild).toHaveClass('bg-red-600')
  })
})
