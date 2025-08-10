import type { Meta, StoryObj } from '@storybook/react'
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from './Toast'
import { useState } from 'react'
import { Button } from '../Button'

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
}
export default meta

type Story = StoryObj<typeof Toast>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>显示 Toast</Button>
        <Toast open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>操作成功</ToastTitle>
            <ToastDescription>您的设置已保存。</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
  },
}
