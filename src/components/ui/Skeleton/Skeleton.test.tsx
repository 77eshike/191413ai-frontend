// src/components/ui/Skeleton/Skeleton.test.tsx
import { render } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders with default dimensions', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveStyle('width: 100%')
    expect(container.firstChild).toHaveStyle('height: 1rem')
  })

  it('renders as a circle when specified', () => {
    const { container } = render(<Skeleton circle width="50px" height="50px" />)
    expect(container.firstChild).toHaveClass('rounded-full')
  })
})
