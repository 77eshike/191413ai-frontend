// src/app/dashboard/[id]/edit/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useProjectList, useUpdateProject } from '@/hooks/useProjectAPI'

export default function EditProjectPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const { projects, isLoading } = useProjectList()
  const { update } = useUpdateProject()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  // 找到当前编辑的项目
  useEffect(() => {
    if (!isLoading && projects.length > 0) {
      const project = projects.find(p => p.id === Number(id))
      if (project) {
        setName(project.name)
        setDescription(project.description)
      } else {
        setError('项目未找到')
      }
    }
  }, [id, projects, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('项目名称不能为空')
      return
    }

    try {
      await update(Number(id), name, description)
      router.push('/dashboard')
    } catch (err) {
      setError((err as Error).message)
    }
  }

  if (isLoading) return <p>加载中...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">编辑项目</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">项目名称</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">项目描述</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          保存修改
        </button>
      </form>
    </div>
  )
}
