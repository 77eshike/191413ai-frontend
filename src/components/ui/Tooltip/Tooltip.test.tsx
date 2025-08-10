import { render, screen, fireEvent } from '@testing-library/react'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('应能显示悬浮内容', async () => {
    render(
      <Tooltip content="提示内容">
        <button>按钮</button>
      </Tooltip>,
    )
    fireEvent.mouseOver(screen.getByText('按钮'))
    expect(await screen.findByText('提示内容')).toBeInTheDocument()
  })
})
