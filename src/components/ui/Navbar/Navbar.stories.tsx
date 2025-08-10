import type { Meta, StoryObj } from '@storybook/react'
import Navbar from './Navbar'

const meta: Meta<typeof Navbar> = {
  title: 'UI/Navbar',
  component: Navbar,
}
export default meta

type Story = StoryObj<typeof Navbar>

export const DefaultNavbar: Story = {
  args: {
    // 如果 Navbar 支持 props，可在此定义，否则展示默认结构
  },
}
