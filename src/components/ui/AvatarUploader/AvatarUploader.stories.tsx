import type { Meta, StoryObj } from '@storybook/react'
import { AvatarUploader } from './AvatarUploader'
import ExampleAvatarUploader from './Example'

const meta: Meta<typeof AvatarUploader> = {
  title: 'Components/Form/AvatarUploader',
  component: AvatarUploader,
}

export default meta
type Story = StoryObj<typeof AvatarUploader>

export const usage: Story = {
  render: () => <ExampleAvatarUploader />,
}
