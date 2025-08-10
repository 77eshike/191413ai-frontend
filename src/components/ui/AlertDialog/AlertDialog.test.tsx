import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AlertDialog } from './AlertDialog'

describe('AlertDialog', () => {
  it('弹出对话框并触发确认', async () => {
    const confirm = vi.fn()

    render(
      <AlertDialog
        title="警告"
        description="确定执行操作？"
        onConfirm={confirm}
        trigger={<button>触发</button>}
      />,
    )

    await userEvent.click(screen.getByText('触发'))
    expect(screen.getByText('确定执行操作？')).toBeInTheDocument()

    await userEvent.click(screen.getByText('确认'))
    expect(confirm).toHaveBeenCalled()
  })
})
