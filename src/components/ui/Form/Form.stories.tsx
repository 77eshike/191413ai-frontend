import type { Meta, StoryObj } from '@storybook/react'
import { Form } from './Form'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Form>

export const Default: Story = {
  args: {
    fields: [
      { label: '姓名', name: 'name', type: 'text' },
      { label: '邮箱', name: 'email', type: 'email' },
    ],
    submitText: '提交',
    onChange: action('字段更改'),
    onSubmit: action('表单提交'),
  },
}
