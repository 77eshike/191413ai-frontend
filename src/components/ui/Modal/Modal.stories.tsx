import type { Meta, StoryObj } from '@storybook/react'
import Modal from './Modal' // ✅ 默认导入

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
}
export default meta

type Story = StoryObj<typeof Modal>

export const OpenModal: Story = {
  args: {
    isOpen: true,
    onClose: () => alert('Modal 关闭'),
    children: <p>这是模态框内容</p>,
  },
}
