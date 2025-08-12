import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './Dropdown'
import ExampleDropdown from './Example'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Form/Dropdown',
  component: Dropdown,
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const usage: Story = {
  render: () => <ExampleDropdown />,
}
