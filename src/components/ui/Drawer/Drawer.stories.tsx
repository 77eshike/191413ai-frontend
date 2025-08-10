import type { Meta, StoryObj } from '@storybook/react'
import { Drawer } from './Drawer'
import ExampleDrawer from './Example'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Overlay/Drawer',
  component: Drawer,
}

export default meta
type Story = StoryObj<typeof Drawer>

export const usage: Story = {
  render: () => <ExampleDrawer />,
}
