// src/hooks/useProjectAPI.ts
'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { fetcher } from '@/lib/api'

interface Project {
  id: number
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
}

// 获取项目列表
export function useProjectList() {
  const { data, error, isLoading, mutate } = useSWR<Project[]>('/api/projects/list', fetcher)

  return {
    projects: data || [],
    isLoading,
    isError: !!error,
    refresh: mutate,
  }
}

// 创建项目
export function useCreateProject() {
  const router = useRouter()

  const create = useCallback(
    async (name: string, description?: string) => {
      const res = await fetch('/api/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || '项目创建失败')
      }

      router.push('/dashboard')
    },
    [router],
  )

  return { create }
}

// 更新项目
export function useUpdateProject() {
  const update = useCallback(async (id: number, name: string, description: string) => {
    const res = await fetch('/api/projects/update', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, description }),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || '项目更新失败')
    }
  }, [])

  return { update }
}

// 删除项目
export function useDeleteProject() {
  const deleteProject = useCallback(async (id: number) => {
    const res = await fetch('/api/projects/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || '项目删除失败')
    }
  }, [])

  return { deleteProject }
}
