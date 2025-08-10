// src/components/ui/Textarea/Textarea.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: '请输入内容...',
  },
}

export const WithError: Story = {
  args: {
    placeholder: '请输入描述...',
    error: '内容不能为空',
  },
}
