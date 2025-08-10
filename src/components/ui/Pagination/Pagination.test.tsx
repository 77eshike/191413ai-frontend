// src/components/ui/Pagination/Pagination.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('calls onChange when a page is clicked', () => {
    const mockChange = vi.fn()
    render(<Pagination current={1} total={3} onChange={mockChange} />)

    fireEvent.click(screen.getByText('2'))
    expect(mockChange).toHaveBeenCalledWith(2)
  })
})
