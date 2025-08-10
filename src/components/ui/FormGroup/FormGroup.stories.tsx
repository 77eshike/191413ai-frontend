import type { Meta, StoryObj } from '@storybook/react'
import { FormGroup } from './FormGroup'

const meta: Meta<typeof FormGroup> = {
  title: 'UI/FormGroup',
  component: FormGroup,
}
export default meta

type Story = StoryObj<typeof FormGroup>

export const GroupExample: Story = {
  args: {
    children: (
      <>
        <input type="text" placeholder="姓名" />
        <input type="email" placeholder="邮箱" />
      </>
    ),
  },
}
