// src/components/ui/Badge/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge' // ✅ 改为默认导入

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: { count: 5, children: <span>Inbox</span> },
}
