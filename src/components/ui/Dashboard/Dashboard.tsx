'use client'

import type { Project } from '@/types/project'
import Link from 'next/link'

export default function Dashboard({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-gray-500 border rounded-lg p-6 bg-gray-50 text-center">
        暂无项目，点击右上角“新建项目”按钮开始吧。
      </div>
    )
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {projects.map(project => (
        <Link
          key={project.id}
          href={`/dashboard/${project.id}`}
          className="block p-4 border rounded-lg shadow hover:bg-gray-50 transition"
        >
          <h2 className="text-lg font-semibold">{project.name}</h2>
          <p className="text-sm text-gray-500">{project.description}</p>
        </Link>
      ))}
    </div>
  )
}
