import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
}
export default meta

type Story = StoryObj<typeof Select>

export const BasicSelect: Story = {
  args: {
    options: [
      { label: '选项 A', value: 'a' },
      { label: '选项 B', value: 'b' },
    ],
    value: 'a',
    onChange: val => console.log('选中:', val),
  },
}
