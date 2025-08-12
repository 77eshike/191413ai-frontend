// src/app/dashboard/page.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useProjectList } from '@/hooks/useProjectAPI'

export default function DashboardPage() {
  const { projects, isLoading } = useProjectList()
  const router = useRouter()

  if (isLoading) {
    return <p className="p-6">� 载中...</p>
  }

  if (projects.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">暂� 项目</h2>
        <p className="text-gray-500 mb-4">� 还没有创建任何项目，立即开始吧！</p>
        <button
          onClick={() => router.push('/dashboard/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          创建新项目
        </button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">项目列表</h1>
        <button
          onClick={() => router.push('/dashboard/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          创建新项目
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="border rounded p-4 shadow">
            <h2 className="text-lg font-bold">{project.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{project.description}</p>
            <div className="text-right">
              <button
                onClick={() => router.push(`/dashboard/${project.id}/edit`)}
                className="text-blue-600 hover:underline text-sm"
              >
                编辑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
