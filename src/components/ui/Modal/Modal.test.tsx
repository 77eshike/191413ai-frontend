import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import * as Mod from './Modal'

const Modal: any = (Mod as any).Modal ?? (Mod as any).default

describe('Modal', () => {
  it('should not render when closed', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        内容
      </Modal>,
    )
    expect(screen.queryByText('内容')).toBeNull()
  })

  it('should render when open', () => {
    render(
      <Modal open onClose={() => {}}>
        模态框内容
      </Modal>,
    )
    expect(screen.getByText('模态框内容')).toBeInTheDocument()
  })

  it('should call onClose when close button clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Modal open onClose={onClose}>
        内容
      </Modal>,
    )
    // 更稳：在模态框内部找按钮，避免误点其它按钮
    const dialog = screen.getByRole('dialog')
    const closeBtn =
      within(dialog).queryByRole('button', { name: /关闭|close|×/i }) ??
      within(dialog).getByRole('button') // 兜底：第一个按钮
    await user.click(closeBtn!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
