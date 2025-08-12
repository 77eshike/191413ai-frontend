import type { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu } from './DropdownMenu'
// 若已有 Example 示例可引入；否则可使用默认展示
// import ExampleDropdownMenu from './Example'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Navigation/DropdownMenu',
  component: DropdownMenu,
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

// � 位示例
export const usage: Story = {
  render: () => <div className="p-4">DropdownMenu usage 示例未定义</div>,
}
