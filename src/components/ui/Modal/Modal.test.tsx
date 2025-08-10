import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal', () => {
  it('should not render when closed', () => {
    const { queryByText } = render(
      <Modal isOpen={false} onClose={() => {}}>
        内容
      </Modal>,
    )
    expect(queryByText('内容')).toBeNull()
  })

  it('should render when open', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        模态框内容
      </Modal>,
    )
    expect(screen.getByText('模态框内容')).toBeInTheDocument()
  })

  it('should call onClose when close button clicked', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen onClose={onClose}>
        内容
      </Modal>,
    )
    fireEvent.click(screen.getByText('×'))
    expect(onClose).toHaveBeenCalled()
  })
})
