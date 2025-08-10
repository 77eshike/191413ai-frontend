import type { Meta, StoryObj } from '@storybook/react'
import { Fieldset } from './Fieldset'

const meta: Meta<typeof Fieldset> = {
  title: 'UI/Fieldset',
  component: Fieldset,
}
export default meta

type Story = StoryObj<typeof Fieldset>

export const ExampleFieldset: Story = {
  args: {
    legend: '用户信息',
    children: (
      <div>
        <label>
          姓名：
          <input type="text" />
        </label>
      </div>
    ),
  },
}
