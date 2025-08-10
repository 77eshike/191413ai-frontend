'use client'

import React from 'react'
import type { Project } from '@/types/project'
import Dashboard from './Dashboard'

const Example = () => {
  const mockProjects: Project[] = [
    { id: 1, name: '演示项目 A', description: '这是一个测试项目' },
    { id: 2, name: '演示项目 B', description: '另一个项目描述' },
  ]

  return <Dashboard projects={mockProjects} />
}

export default Example
