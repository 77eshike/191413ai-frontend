import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Alert>

export const Info: Story = {
  args: {
    title: '通知',
    description: '系统将在今晚 0 点更新维护。',
    variant: 'info',
  },
}

export const Error: Story = {
  args: {
    title: '错误',
    description: '� 法连接到服务器，请检查网络。',
    variant: 'error',
  },
}
