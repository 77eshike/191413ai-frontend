'use client'

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import { ModalForm } from './ModalForm'

describe('ModalForm', () => {
  it('renders with title and children when open', () => {
    render(
      <ModalForm isOpen={true} onClose={vi.fn()} title="测试标题" onSubmit={vi.fn()}>
        <div>内容区域</div>
      </ModalForm>,
    )

    expect(screen.getByText('测试标题')).toBeInTheDocument()
    expect(screen.getByText('内容区域')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '提交' })).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    const { container } = render(
      <ModalForm isOpen={false} onClose={vi.fn()} title="关闭测试" onSubmit={vi.fn()}>
        <div>隐藏内容</div>
      </ModalForm>,
    )

    expect(container.firstChild).toBeNull()
  })

  it('calls onClose when cancel is clicked', () => {
    const handleClose = vi.fn()
    render(
      <ModalForm isOpen={true} onClose={handleClose} title="取消测试" onSubmit={vi.fn()}>
        <div>测试内容</div>
      </ModalForm>,
    )

    fireEvent.click(screen.getByRole('button', { name: '取消' }))
    expect(handleClose).toHaveBeenCalled()
  })

  it('submits form data correctly', async () => {
    const handleSubmit = vi.fn()
    render(
      <ModalForm isOpen={true} onClose={vi.fn()} title="提交测试" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">邮箱</label>
          <input name="email" id="email" defaultValue="test@example.com" />
        </div>
      </ModalForm>,
    )

    fireEvent.click(screen.getByRole('button', { name: '提交' }))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({ email: 'test@example.com' })
    })
  })
})
