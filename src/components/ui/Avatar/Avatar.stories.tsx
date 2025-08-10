import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'User Avatar',
    size: 'md',
  },
}

export const WithFallback: Story = {
  args: {
    fallback: 'JD',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    fallback: 'A',
    size: 'lg',
  },
}
