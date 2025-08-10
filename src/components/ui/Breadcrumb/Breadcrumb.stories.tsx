import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
}
export default meta

type Story = StoryObj<typeof Breadcrumb>

export const Basic: Story = {
  args: {
    items: [
      { label: '首页', href: '/' },
      { label: '组件', href: '/components' },
      { label: 'Breadcrumb', href: '/components/breadcrumb' },
    ],
  },
}
