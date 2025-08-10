// src/components/ui/Card/Card.test.tsx
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>测试内容</Card>)
    expect(screen.getByText('测试内容')).toBeInTheDocument()
  })

  it('applies additional classNames', () => {
    const { container } = render(<Card className="bg-red-500">内容</Card>)
    expect(container.firstChild).toHaveClass('bg-red-500')
  })
})
