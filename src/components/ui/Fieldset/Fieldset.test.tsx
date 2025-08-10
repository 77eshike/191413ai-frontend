// src/components/ui/Fieldset/Fieldset.test.tsx
import { render, screen } from '@testing-library/react'
import { Fieldset } from './Fieldset'

describe('Fieldset', () => {
  it('renders with legend and children', () => {
    render(
      <Fieldset legend="表单分区">
        <div>表单内容</div>
      </Fieldset>,
    )
    expect(screen.getByText('表单分区')).toBeInTheDocument()
    expect(screen.getByText('表单内容')).toBeInTheDocument()
  })

  it('renders without legend if not provided', () => {
    const { container } = render(
      <Fieldset>
        <span>无标题</span>
      </Fieldset>,
    )
    expect(container.querySelector('legend')).toBeNull()
  })
})
