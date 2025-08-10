import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  args: {
    items: [
      {
        title: '第一项',
        content: '这里是第一项内容',
      },
      {
        title: '第二项',
        content: '这里是第二项内容',
      },
    ],
    defaultOpenIndex: 0,
  },
}
