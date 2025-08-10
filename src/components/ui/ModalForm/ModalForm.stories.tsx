import type { Meta, StoryObj } from '@storybook/react'
import { ModalForm } from './ModalForm'
import ExampleModalForm from './Example'

const meta: Meta<typeof ModalForm> = {
  title: 'Components/Form/ModalForm',
  component: ModalForm,
}

export default meta
type Story = StoryObj<typeof ModalForm>

export const usage: Story = {
  render: () => <ExampleModalForm />,
}
