// src/components/ProjectCard/ProjectCard.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface ProjectCardProps {
  project: {
    id: number
    name: string
    description?: string
  }
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/dashboard/${project.id}`)}
      className="cursor-pointer rounded-lg border p-4 shadow-sm hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
      <p className="text-sm text-gray-600">{project.description || '暂无描述'}</p>
    </div>
  )
}
