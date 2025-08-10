import { render, screen } from '@testing-library/react'
import { Alert } from './Alert'

describe('Alert', () => {
  it('应能正确显示标题和内容', () => {
    render(<Alert title="警告" description="操作无效" variant="warning" />)
    expect(screen.getByText('警告')).toBeInTheDocument()
    expect(screen.getByText('操作无效')).toBeInTheDocument()
  })
})
