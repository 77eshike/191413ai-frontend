import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'
import ExampleTag from './Example'

const meta: Meta<typeof Tag> = {
  title: 'Components/DataDisplay/Tag',
  component: Tag,
}

export default meta
type Story = StoryObj<typeof Tag>

export const usage: Story = {
  render: () => <ExampleTag />,
}
