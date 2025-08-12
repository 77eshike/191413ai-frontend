import type { Meta, StoryObj } from '@storybook/react'
import { Upload } from './Upload'
import ExampleUpload from './Example'

const meta: Meta<typeof Upload> = {
  title: 'Components/Form/Upload',
  component: Upload,
}

export default meta
type Story = StoryObj<typeof Upload>

export const usage: Story = {
  render: () => <ExampleUpload />,
}
