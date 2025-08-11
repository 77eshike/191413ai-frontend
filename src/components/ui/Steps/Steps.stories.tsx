import type { Meta, StoryObj } from '@storybook/react'
import { Steps } from './Steps'
import ExampleSteps from './Example'

const meta: Meta<typeof Steps> = {
  title: 'Components/Navigation/Steps',
  component: Steps,
}

export default meta
type Story = StoryObj<typeof Steps>

export const usage: Story = {
  render: () => <ExampleSteps />,
}
