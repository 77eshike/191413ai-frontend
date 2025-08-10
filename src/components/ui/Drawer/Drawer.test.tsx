// src/components/ui/Drawer/Drawer.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('renders drawer content when open and closes on background click', () => {
    const handleClose = vi.fn()

    render(
      <Drawer isOpen={true} onClose={handleClose} title="Test Drawer">
        <p>Test Content</p>
      </Drawer>,
    )

    expect(screen.getByText('Test Drawer')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Close'))
    expect(handleClose).toHaveBeenCalled()
  })
})
