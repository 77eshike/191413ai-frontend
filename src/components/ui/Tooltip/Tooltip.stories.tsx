import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import ExampleTooltip from './Example'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Feedback/Tooltip',
  component: Tooltip,
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const usage: Story = {
  render: () => <ExampleTooltip />,
}
