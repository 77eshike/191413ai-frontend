'use client'

import { useState } from 'react'
import { AvatarUploader } from './AvatarUploader'

export default function ExampleAvatarUploader() {
  const [avatarUrl, setAvatarUrl] = useState<string>('')

  return (
    <div className="p-4 space-y-4">
      <AvatarUploader value={avatarUrl} onChange={url => setAvatarUrl(url)} />
      {avatarUrl && (
        <img src={avatarUrl} alt="上� 后的头像" className="w-16 h-16 rounded-full border" />
      )}
    </div>
  )
}
