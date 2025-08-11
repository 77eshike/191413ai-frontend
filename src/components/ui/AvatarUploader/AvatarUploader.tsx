import React, { useRef, useState } from 'react'

export interface AvatarUploaderProps {
  initialSrc?: string
  onChange?: (file: File) => void // 单个 File
  onUpload?: (file: File) => void // 兼容
  onSelect?: (files: FileList) => void // 兼容旧签名
  alt?: string
  label?: string
}

function AvatarUploaderBase({
  initialSrc,
  onChange,
  onUpload,
  onSelect,
  alt = 'avatar',
  label = '更换头像',
}: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [src, setSrc] = useState<string | undefined>(initialSrc)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const file = files?.[0]
    if (file) {
      // 预览可有可无，避免 JSDOM 报错做下兜底
      try {
        setSrc((URL as any)?.createObjectURL ? URL.createObjectURL(file) : src)
      } catch {}
      onSelect?.(files)
      onChange?.(file)
      onUpload?.(file)
    }
  }

  return (
    <div>
      <div
        role="img"
        aria-label={alt}
        style={{ width: 80, height: 80, borderRadius: '50%', background: '#eee' }}
      >
        {/* 需要的话可以加 <img src={src} alt={alt} /> */}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        data-testid="file-input"
        onChange={handleChange}
      />
      <button type="button" aria-label={label} onClick={() => inputRef.current?.click()}>
        {label}
      </button>
    </div>
  )
}

export default AvatarUploaderBase
export { AvatarUploaderBase as AvatarUploader }
