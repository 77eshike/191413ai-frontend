// src/components/ui/FormMessage/FormMessage.test.tsx
import { render, screen } from '@testing-library/react'
import { FormMessage } from './FormMessage'

describe('FormMessage', () => {
  it('renders error message', () => {
    render(<FormMessage>字段不能为空</FormMessage>)
    expect(screen.getByText('字段不能为空')).toBeInTheDocument()
  })

  it('does not render when empty', () => {
    const { container } = render(<FormMessage />)
    expect(container).toBeEmptyDOMElement()
  })
})
