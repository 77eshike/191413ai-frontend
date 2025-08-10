import type { Meta } from '@storybook/react'
import Dashboard from './Dashboard'

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
  title: 'UI/Dashboard',
}

export default meta

export const Default = () => (
  <Dashboard
    projects={[
      { id: 1, name: '演示项目 A', description: '这是一个测试项目' },
      { id: 2, name: '演示项目 B', description: '另一个项目描述' },
    ]}
  />
)
