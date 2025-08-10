import type { Meta, StoryObj } from '@storybook/react'
import { FormMessage } from './FormMessage'

const meta: Meta<typeof FormMessage> = {
  title: 'UI/FormMessage',
  component: FormMessage,
}
export default meta

type Story = StoryObj<typeof FormMessage>

export const ErrorMessage: Story = {
  args: {
    children: '请输入有效的邮箱地址',
  },
}
