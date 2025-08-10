// src/components/ui/ImagePreviewer/ImagePreviewer.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface ImagePreviewerProps {
  file: File | null
  onClear?: () => void
  className?: string
}

export const ImagePreviewer = ({ file, onClear, className }: ImagePreviewerProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])

  if (!file || !previewUrl) return null

  return (
    <div className={cn('relative w-32 h-32 rounded overflow-hidden', className)}>
      <Image src={previewUrl} alt="预览图" fill className="object-cover" />
      {onClear && (
        <button
          onClick={onClear}
          className="absolute top-1 right-1 bg-black/50 text-white text-xs px-1 rounded"
        >
          清除
        </button>
      )}
    </div>
  )
}
