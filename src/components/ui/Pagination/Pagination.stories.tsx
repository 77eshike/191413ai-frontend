import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
}
export default meta

type Story = StoryObj<typeof Pagination>

export const DefaultPagination: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: page => console.log(`切换到第 ${page} 页`),
  },
}
