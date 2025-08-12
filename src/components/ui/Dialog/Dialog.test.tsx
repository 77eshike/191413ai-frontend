import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import * as Mod from './Dialog'

const Dialog: any = (Mod as any).Dialog ?? (Mod as any).default

describe('Dialog component', () => {
  it('renders correctly when open', () => {
    const { container } = render(
      <Dialog open title="Test Dialog" onClose={() => {}}>
        <div>Test Content</div>
      </Dialog>,
    )
    const dialog = within(container).getByRole('dialog')
    expect(within(dialog).getByText('Test Dialog')).toBeInTheDocument()
    expect(within(dialog).getByText('Test Content')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { container } = render(
      <Dialog open title="Test Dialog" onClose={onClose}>
        <div>Test Content</div>
      </Dialog>,
    )
    const dialog = within(container).getByRole('dialog')
    const closeBtn = within(dialog).getByRole('button', { name: /close|关闭/i })
    await user.click(closeBtn)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not render when closed', () => {
    render(
      <Dialog open={false} title="X" onClose={() => {}}>
        <div>Hidden</div>
      </Dialog>,
    )
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
