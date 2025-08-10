import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Popover } from './Popover'

describe('Popover', () => {
  it('点击按钮时显示内容', async () => {
    render(<Popover trigger={<button>打开</button>} content={<div>弹出内容</div>} />)

    expect(screen.queryByText('弹出内容')).not.toBeInTheDocument()

    await userEvent.click(screen.getByText('打开'))
    expect(screen.getByText('弹出内容')).toBeInTheDocument()
  })
})
