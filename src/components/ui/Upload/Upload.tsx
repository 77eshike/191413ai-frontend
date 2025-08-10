// src/components/ui/Upload/Upload.tsx
import React, { useRef } from 'react'

interface UploadProps {
  accept?: string
  onChange: (file: File | null) => void
  className?: string
  label?: string
}

export function Upload({ accept, onChange, className = '', label = '上传文件' }: UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    onChange(file)
  }

  return (
    <div className={`inline-block ${className}`}>
      <button
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleClick}
      >
        {label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
