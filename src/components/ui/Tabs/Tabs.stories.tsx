import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'
import ExampleTabs from './Example'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
}

export default meta
type Story = StoryObj<typeof Tabs>

export const usage: Story = {
  render: () => <ExampleTabs />,
}
