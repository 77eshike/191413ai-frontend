// src/lib/api.ts
export async function fetchProjectList() {
  const res = await fetch('/api/projects/list')
  if (!res.ok) {
    throw new Error('项目列表加载失败')
  }
  return res.json()
}
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

  if (!res.ok) {
    throw new Error('项目列表加载失败')
  }

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
    const error = await res.json()
    throw new Error(error.message || '项目创建失败')
  }

  return res.json()
}

// 更新项目（根据你的业务，如只支持修改描述）
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
    const error = await res.json()
    throw new Error(error.message || '项目更新失败')
  }

  return res.json()
}

// 删除项目
export async function deleteProject(id: number): Promise<{ message: string }> {
  const res = await fetch('/api/projects/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || '项目删除失败')
  }

  return res.json()
}
