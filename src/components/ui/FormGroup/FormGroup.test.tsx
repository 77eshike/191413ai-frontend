// src/components/ui/FormGroup/FormGroup.test.tsx
import { render, screen } from '@testing-library/react'
import { FormGroup } from './FormGroup'

describe('FormGroup', () => {
  it('renders label and description', () => {
    render(
      <FormGroup label="邮箱" description="我们不会泄露您的邮箱">
        <input type="email" />
      </FormGroup>,
    )
    expect(screen.getByText('邮箱')).toBeInTheDocument()
    expect(screen.getByText('我们不会泄露您的邮箱')).toBeInTheDocument()
  })
})
