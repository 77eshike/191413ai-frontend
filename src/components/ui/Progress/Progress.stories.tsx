import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
}
export default meta

type Story = StoryObj<typeof Progress>

export const HalfProgress: Story = {
  args: {
    value: 50,
    max: 100,
  },
}
