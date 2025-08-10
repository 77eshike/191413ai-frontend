import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './Label'

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
}
export default meta

type Story = StoryObj<typeof Label>

export const AssociatedLabel: Story = {
  args: {
    htmlFor: 'input-id',
    children: '用户名',
  },
}
