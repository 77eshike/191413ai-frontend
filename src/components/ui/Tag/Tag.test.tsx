// src/components/ui/Tag/Tag.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Tag } from './Tag'

describe('Tag 组件', () => {
  it('应正确渲染标签文本', () => {
    render(<Tag label="测试标签" color="green" />)
    expect(screen.getByText('测试标签')).toBeInTheDocument()
  })

  it('应显示颜色类名', () => {
    const { container } = render(<Tag label="Color Test" color="red" />)
    expect(container.firstChild).toHaveClass('bg-red-100')
  })

  it('应在点击移除按钮时触发 onRemove 回调', () => {
    const handleRemove = vi.fn()
    render(<Tag label="可移除" color="blue" onRemove={handleRemove} />)

    const removeBtn = screen.getByRole('button', { name: /×/i })
    fireEvent.click(removeBtn)

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })
})
