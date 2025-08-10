import { render, screen } from '@testing-library/react'
import { ToastProvider, Toast, ToastTitle, ToastDescription } from './Toast'

describe('Toast', () => {
  it('应正常渲染 Toast 内容', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>测试标题</ToastTitle>
          <ToastDescription>描述内容</ToastDescription>
        </Toast>
      </ToastProvider>,
    )

    expect(screen.getByText('测试标题')).toBeInTheDocument()
    expect(screen.getByText('描述内容')).toBeInTheDocument()
  })
})
