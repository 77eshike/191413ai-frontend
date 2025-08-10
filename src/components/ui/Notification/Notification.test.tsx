// src/components/ui/Notification/Notification.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { Notification } from './Notification'

describe('Notification', () => {
  it('renders the message and calls onClose after duration', async () => {
    const handleClose = vi.fn()

    render(<Notification message="测试通知" duration={100} onClose={handleClose} />)

    expect(screen.getByText('测试通知')).toBeInTheDocument()

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled()
    })
  })

  it('does not call onClose before duration', async () => {
    vi.useFakeTimers()
    const handleClose = vi.fn()

    render(<Notification message="测试通知" duration={1000} onClose={handleClose} />)

    vi.advanceTimersByTime(500)
    expect(handleClose).not.toHaveBeenCalled()

    vi.useRealTimers()
  })
})
