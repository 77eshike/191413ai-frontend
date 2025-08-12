import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import * as Mod from './Tag'

const Tag: any = (Mod as any).Tag ?? (Mod as any).default

describe('Tag 组件', () => {
  it('应正确渲染标签文本', () => {
    render(<Tag>Hello</Tag>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('应显示颜色类名', () => {
    const { container } = render(<Tag color="success">OK</Tag>)
    expect(container.firstChild).toHaveClass('bg-green-100')
  })

  it('应在点击移除按钮时触发 onRemove 回调', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(
      <Tag closable onRemove={onRemove}>
        X
      </Tag>,
    )
    await user.click(screen.getByRole('button', { name: /remove tag/i }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})
