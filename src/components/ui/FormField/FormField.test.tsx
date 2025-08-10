// src/components/ui/FormField/FormField.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { FormField } from './FormField'

describe('FormField', () => {
  it('renders with label and placeholder', () => {
    render(
      <FormField
        label="邮箱"
        value=""
        onChange={() => {}}
        name="email"
        type="email"
        placeholder="请输入邮箱"
      />,
    )
    expect(screen.getByLabelText('邮箱')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('请输入邮箱')).toBeInTheDocument()
  })

  it('updates value on input change', () => {
    const handleChange = jest.fn()
    render(<FormField label="账号" value="" onChange={handleChange} name="account" />)
    fireEvent.change(screen.getByLabelText('账号'), {
      target: { value: 'test123' },
    })
    expect(handleChange).toHaveBeenCalledWith('test123')
  })
})
