import type { Meta, StoryObj } from '@storybook/react'
import { Sheet } from './Sheet'
import ExampleSheet from './Example'

const meta: Meta<typeof Sheet> = {
  title: 'Components/Overlay/Sheet',
  component: Sheet,
}

export default meta
type Story = StoryObj<typeof Sheet>

export const usage: Story = {
  render: () => <ExampleSheet />,
}
