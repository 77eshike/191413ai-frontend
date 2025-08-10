import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from './Switch'

describe('Switch', () => {
  it('应能默认渲染为选中状态', () => {
    render(<Switch defaultChecked />)
    const toggle = screen.getByRole('switch')
    expect(toggle).toBeChecked()
  })

  it('应能响应点击切换状态', async () => {
    const user = userEvent.setup()
    render(<Switch />)
    const toggle = screen.getByRole('switch')
    expect(toggle).not.toBeChecked()
    await user.click(toggle)
    expect(toggle).toBeChecked()
  })
})
