import type { Meta, StoryObj } from '@storybook/react'
import { FormField } from './FormField'

const meta: Meta<typeof FormField> = {
  title: 'UI/FormField',
  component: FormField,
}
export default meta

type Story = StoryObj<typeof FormField>

export const WithInput: Story = {
  args: {
    label: '邮箱',
    children: <input type="email" placeholder="请输入邮箱" />,
  },
}
