import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
}
export default meta

type Story = StoryObj<typeof DatePicker>

export const Basic: Story = {
  args: {
    value: new Date(),
    onChange: (date: Date) => {
      console.log('选择日期:', date)
    },
  },
}
