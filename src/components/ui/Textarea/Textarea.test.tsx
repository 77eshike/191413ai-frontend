// src/components/ui/Textarea/Textarea.test.tsx
import { render, screen } from '@testing-library/react'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders placeholder text', () => {
    render(<Textarea placeholder="请输入内容" />)
    expect(screen.getByPlaceholderText('请输入内容')).toBeInTheDocument()
  })

  it('displays error message when provided', () => {
    render(<Textarea error="字段不能为空" />)
    expect(screen.getByText('字段不能为空')).toBeInTheDocument()
  })
})
