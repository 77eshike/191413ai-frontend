import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('renders fallback when no src is provided', () => {
    render(<Avatar fallback="AB" />)
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('renders image when src is provided', () => {
    render(<Avatar src="https://i.pravatar.cc/300" alt="Test User" />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', expect.stringContaining('pravatar'))
  })

  it('applies size classes', () => {
    const { container } = render(<Avatar size="lg" fallback="X" />)
    expect(container.firstChild).toHaveClass('h-14')
  })
})
