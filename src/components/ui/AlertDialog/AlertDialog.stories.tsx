import type { Meta, StoryObj } from '@storybook/react'
import { AlertDialog } from './AlertDialog'

const meta: Meta<typeof AlertDialog> = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AlertDialog>

export const Default: Story = {
  args: {
    title: '确认� 除',
    description: '� 确定要� 除这条数据吗？操作不可撤销。',
    confirmText: '� 除',
    cancelText: '取消',
    trigger: <button className="px-3 py-1 bg-red-600 text-white rounded">� 除</button>,
    onConfirm: () => alert('已确认'),
  },
}
