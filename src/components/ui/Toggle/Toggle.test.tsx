import { render, fireEvent } from '@testing-library/react'
import { Toggle } from './Toggle'

describe('Toggle', () => {
  it('应能切换状态', () => {
    const { getByRole } = render(<Toggle aria-label="测试切换" />)
    const toggle = getByRole('button')
    expect(toggle.getAttribute('data-state')).toBe('off')
    fireEvent.click(toggle)
    expect(toggle.getAttribute('data-state')).toBe('on')
  })
})
