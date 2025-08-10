// src/components/ui/Card/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import Example from './Example'

const meta: Meta<typeof Card> = {
  title: 'components/ui/Card',
  component: Card,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => <Example />,
}
