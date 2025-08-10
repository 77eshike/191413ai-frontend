// src/components/ui/Form/Form.test.tsx
import { fireEvent, render, screen } from '@testing-library/react'
import { Form } from './Form'

describe('Form', () => {
  it('submits form data', () => {
    const mockSubmit = jest.fn()
    render(
      <Form onSubmit={mockSubmit}>
        <input name="testField" defaultValue="test" />
        <button type="submit">提交</button>
      </Form>,
    )

    fireEvent.click(screen.getByRole('button', { name: '提交' }))
    expect(mockSubmit).toHaveBeenCalledWith({ testField: 'test' })
  })
})
