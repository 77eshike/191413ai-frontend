// src/components/ui/TooltipProvider/TooltipProvider.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { TooltipProvider } from './TooltipProvider'
import { Tooltip } from '../Tooltip'
import { Button } from '../Button'

const meta: Meta<typeof TooltipProvider> = {
  title: 'UI/TooltipProvider',
  component: TooltipProvider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TooltipProvider>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip content="提示信息">
        <Button>鼠标悬停</Button>
      </Tooltip>
    </TooltipProvider>
  ),
}
