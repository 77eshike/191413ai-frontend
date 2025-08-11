'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { Project } from '@/types'
import { getProjectById } from '@/lib/db/projects'
import { Spinner } from '@/components/ui/Spinner'

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return
      try {
        const data = await getProjectById(id)
        setProject(data)
      } catch (error) {
        console.error('� 载项目失败:', error)
      } finally {
        setLoading(false)
      }
    }

    void fetchProject()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    )
  }

  if (!project) {
    return <div className="text-center text-gray-500">未找到对应项目</div>
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <p className="text-gray-700">{project.description}</p>
      <div className="text-sm text-gray-400">项目ID: {project.id}</div>
    </div>
  )
}
