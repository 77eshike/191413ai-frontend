'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProjectFormProps {
  onSuccess?: () => void
}

export default function ProjectForm({ onSuccess }: ProjectFormProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('项目名称不能为空')
      return
    }

    try {
      const res = await fetch('/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.message || '项目创建失败')
        return
      }

      setName('')
      setDescription('')
      setError('')
      if (onSuccess) onSuccess()
      router.push('/dashboard')
    } catch (err) {
      console.error('提交项目失败:', err)
      setError('请求失败，请稍后再试')
    }
  }

  return (
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
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        创建项目
      </button>
    </form>
  )
}
