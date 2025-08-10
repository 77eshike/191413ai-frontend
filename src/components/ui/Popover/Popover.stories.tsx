import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './Popover'
import ExamplePopover from './Example'

const meta: Meta<typeof Popover> = {
  title: 'Components/Overlay/Popover',
  component: Popover,
}

export default meta
type Story = StoryObj<typeof Popover>

export const usage: Story = {
  render: () => <ExamplePopover />,
}
