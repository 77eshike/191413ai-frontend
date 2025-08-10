import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './Table'

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
}
export default meta

type Story = StoryObj<typeof Table>

export const DefaultTable: Story = {
  args: {
    columns: [
      { key: 'name', label: '名称' },
      { key: 'age', label: '年龄' },
    ],
    data: [
      { name: '张三', age: 28 },
      { name: '李四', age: 35 },
    ],
  },
}
