import React, { useRef } from 'react'

export interface UploadProps {
  label?: string
  onChange?: (files: FileList) => void
  onSelect?: (files: FileList) => void
}

function UploadBase({ label = '上� 文件', onChange, onSelect }: UploadProps) {
  const ref = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      onChange?.(files)
      onSelect?.(files)
    }
  }

  return (
    <div>
      <input ref={ref} type="file" style={{ display: 'none' }} onChange={handleChange} />
      <button type="button" aria-label={label} onClick={() => ref.current?.click()}>
        {label}
      </button>
    </div>
  )
}

export default UploadBase
export { UploadBase as Upload }
