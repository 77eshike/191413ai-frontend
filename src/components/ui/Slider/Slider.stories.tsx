import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './Slider'
import ExampleSlider from './Example'

const meta: Meta<typeof Slider> = {
  title: 'Components/Form/Slider',
  component: Slider,
}

export default meta
type Story = StoryObj<typeof Slider>

export const usage: Story = {
  render: () => <ExampleSlider />,
}
