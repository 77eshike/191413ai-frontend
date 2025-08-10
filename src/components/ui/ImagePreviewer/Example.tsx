'use client'

import React, { useState } from 'react'
import { ImagePreviewer } from './ImagePreviewer'

export default function ImagePreviewerExample() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
    }
  }

  return (
    <div className="space-y-4 max-w-md">
      <label htmlFor="upload" className="block text-sm font-medium">
        上传图片
      </label>
      <input
        id="upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block"
      />
      {previewUrl && <ImagePreviewer src={previewUrl} alt="预览图像" />}
    </div>
  )
}
