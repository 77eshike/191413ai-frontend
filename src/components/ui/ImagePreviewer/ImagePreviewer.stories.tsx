// src/components/ui/ImagePreviewer/ImagePreviewer.stories.tsx
import React, { useState } from 'react'
import { ImagePreviewer } from './ImagePreviewer'

export default {
  title: 'UI/ImagePreviewer',
  component: ImagePreviewer,
}

export const Default = () => {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      <ImagePreviewer file={file} onClear={() => setFile(null)} />
    </div>
  )
}
