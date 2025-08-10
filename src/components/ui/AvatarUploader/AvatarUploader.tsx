// src/components/ui/AvatarUploader/AvatarUploader.tsx
import React, { useRef, useState } from 'react'

interface AvatarUploaderProps {
  defaultUrl?: string
  onUpload: (file: File) => Promise<string> // 上传文件后返回新 URL
}

export const AvatarUploader = ({ defaultUrl, onUpload }: AvatarUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState(defaultUrl || '')
  const [loading, setLoading] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const url = await onUpload(file)
      setPreview(url)
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={preview || '/avatar-placeholder.png'}
        alt="avatar"
        className="w-16 h-16 rounded-full object-cover border"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
        disabled={loading}
      >
        {loading ? '上传中…' : '更换头像'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
