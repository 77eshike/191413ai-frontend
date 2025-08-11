// src/components/ui/Collapse/Collapse.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Collapse } from './Collapse'

describe('Collapse 组件', () => {
  it('应该渲染� �题', () => {
    render(
      <Collapse title="测试� �题" isOpen>
        <div>内容</div>
      </Collapse>,
    )
    expect(screen.getByText('测试� �题')).toBeInTheDocument()
  })

  it('应该显示内容（当 isOpen 为 true）', () => {
    render(
      <Collapse title="� �题" isOpen>
        <div>显示内容</div>
      </Collapse>,
    )
    expect(screen.getByText('显示内容')).toBeInTheDocument()
  })

  it('应该不显示内容（当 isOpen 为 false）', () => {
    render(
      <Collapse title="� �题" isOpen={false}>
        <div>隐藏内容</div>
      </Collapse>,
    )
    expect(screen.queryByText('隐藏内容')).not.toBeInTheDocument()
  })

  it('点击� �题应该调用 onToggle', () => {
    const onToggle = vi.fn()
    render(
      <Collapse title="点击测试" isOpen onToggle={onToggle}>
        <div>内容</div>
      </Collapse>,
    )
    fireEvent.click(screen.getByText('点击测试'))
    expect(onToggle).toHaveBeenCalledTimes(1)
  })
})
