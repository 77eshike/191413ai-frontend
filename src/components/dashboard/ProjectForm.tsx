'use client'

import { useState } from 'react'

export default function ProjectForm({ initialData, onSubmit }: any) {
  const [form, setForm] = useState(initialData)

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onSubmit(form)
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm">项目名称</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm">项目描述</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        保存
      </button>
    </form>
  )
}
