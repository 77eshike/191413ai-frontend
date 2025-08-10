import { render } from '@testing-library/react'
import { Separator } from './Separator'

describe('Separator', () => {
  it('渲染水平分隔线', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toHaveClass('w-full h-px')
  })

  it('渲染垂直分隔线', () => {
    const { container } = render(<Separator orientation="vertical" />)
    expect(container.firstChild).toHaveClass('w-px h-full')
  })
})
