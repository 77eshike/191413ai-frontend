// src/lib/api.ts

export interface Project {
  id: number
  name: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

// 获取项目列表
export async function fetchProjectList(): Promise<Project[]> {
  const res = await fetch('/api/projects/list')
  if (!res.ok) throw new Error('项目列表� 载失败')
  return res.json()
}

// 创建项目
export async function createProject(data: {
  name: string
  description?: string
}): Promise<Project> {
  const res = await fetch('/api/projects/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = (await res.json()) as { message?: string }
    throw new Error(error.message ?? '项目创建失败')
  }
  return res.json()
}

// 更新项目
export async function updateProject(
  id: number,
  data: { name?: string; description?: string },
): Promise<Project> {
  const res = await fetch('/api/projects/update', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...data }),
  })
  if (!res.ok) {
    const error = (await res.json()) as { message?: string }
    throw new Error(error.message ?? '项目更新失败')
  }
  return res.json()
}

// � 除项目
export async function deleteProject(id: number): Promise<{ message: string }> {
  const res = await fetch('/api/projects/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
  if (!res.ok) {
    const error = (await res.json()) as { message?: string }
    throw new Error(error.message ?? '项目� 除失败')
  }
  return res.json()
}

// 给 SWR 用的 fetcher
export const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('请求失败')
  return res.json()
}
