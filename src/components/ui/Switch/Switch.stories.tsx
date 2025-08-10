import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
}
export default meta

type Story = StoryObj<typeof Switch>

export const ToggleSwitch: Story = {
  args: {
    checked: true,
    onChange: val => console.log('开关状态:', val),
  },
}
