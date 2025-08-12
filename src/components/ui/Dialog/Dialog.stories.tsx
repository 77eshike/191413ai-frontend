import type { Meta, StoryObj } from '@storybook/react'
import Dialog from './Dialog' // ✅ Dialog 是默认导出（保持不变）
import { Button } from '../Button/Button' // ✅ Button 用命名导入

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
}
export default meta

type Story = StoryObj<typeof Dialog>

export const Basic: Story = {
  args: {
    open: true,
    title: '对话框标题',
    children: '这是对话框内容',
    footer: <Button>确定</Button>,
  },
}
