// src/components/ui/Label/Label.test.tsx
import { render, screen } from '@testing-library/react'
import { Label } from './Label'

describe('Label', () => {
  it('renders correctly with text', () => {
    render(<Label htmlFor="test-input">测试标签</Label>)
    expect(screen.getByText('测试标签')).toBeInTheDocument()
  })

  it('has correct htmlFor attribute', () => {
    render(<Label htmlFor="input-id">输入框</Label>)
    expect(screen.getByLabelText('输入框')).toHaveAttribute('id', 'input-id')
  })
})
