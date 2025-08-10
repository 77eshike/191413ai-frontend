import type { Meta, StoryObj } from '@storybook/react'
import { Collapse } from './Collapse'
import ExampleCollapse from './Example'

const meta: Meta<typeof Collapse> = {
  title: 'Components/DataDisplay/Collapse',
  component: Collapse,
}

export default meta
type Story = StoryObj<typeof Collapse>

export const usage: Story = {
  render: () => <ExampleCollapse />,
}
