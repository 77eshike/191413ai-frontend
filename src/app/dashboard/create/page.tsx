// src/app/dashboard/create/page.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import ProjectForm from '@/components/ProjectForm'

export default function CreateProjectPage() {
  const router = useRouter()

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">创建新项目</h1>
        <button onClick={() => router.back()} className="text-sm text-gray-600 hover:text-black">
          返回
        </button>
      </div>

      <ProjectForm onSuccess={() => router.push('/dashboard')} />
    </div>
  )
}
