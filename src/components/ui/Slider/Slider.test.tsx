import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Slider } from './Slider'

describe('Slider', () => {
  it('应正确渲染并可设置默认值', () => {
    render(<Slider defaultValue={[30]} max={100} />)
    const slider = screen.getByRole('slider')
    expect(slider).toBeInTheDocument()
    expect(slider).toHaveAttribute('aria-valuenow', '30')
  })

  it('应响应键盘交互（向右增� ）', async () => {
    const user = userEvent.setup()
    render(<Slider defaultValue={[20]} step={10} max={100} />)
    const slider = screen.getByRole('slider')
    await user.tab()
    await user.keyboard('[ArrowRight]')
    expect(slider).toHaveAttribute('aria-valuenow', '30')
  })
})
