import type { Meta, StoryObj } from '@storybook/react'
import { Notification } from './Notification'
import ExampleNotification from './Example'

const meta: Meta<typeof Notification> = {
  title: 'Components/Feedback/Notification',
  component: Notification,
}

export default meta
type Story = StoryObj<typeof Notification>

export const usage: Story = {
  render: () => <ExampleNotification />,
}
