// src/components/ui/Dialog/Dialog.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Dialog } from './Dialog'

describe('Dialog component', () => {
  it('renders correctly when open', () => {
    const handleClose = vi.fn()

    render(
      <Dialog isOpen={true} onClose={handleClose} title="Test Dialog">
        <p>Test Content</p>
      </Dialog>,
    )

    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn()

    render(
      <Dialog isOpen={true} onClose={handleClose} title="Test Dialog">
        <p>Test Content</p>
      </Dialog>,
    )

    fireEvent.click(screen.getByText('Close'))
    expect(handleClose).toHaveBeenCalled()
  })

  it('does not render when isOpen is false', () => {
    const handleClose = vi.fn()

    render(
      <Dialog isOpen={false} onClose={handleClose} title="Should Not Appear">
        <p>Hidden Content</p>
      </Dialog>,
    )

    expect(screen.queryByText('Should Not Appear')).toBeNull()
    expect(screen.queryByText('Hidden Content')).toBeNull()
  })
})
