import type { Meta, StoryObj } from '@storybook/react'
import { Tree } from './Tree'
import ExampleTree from './Example'

const meta: Meta<typeof Tree> = {
  title: 'Components/DataDisplay/Tree',
  component: Tree,
}

export default meta
type Story = StoryObj<typeof Tree>

export const usage: Story = {
  render: () => <ExampleTree />,
}
