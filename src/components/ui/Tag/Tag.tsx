// src/components/ui/Tag/Tag.tsx
import React from 'react'

export interface TagProps {
  label: string
  color?: string
  onRemove?: () => void
}

export const Tag: React.FC<TagProps> = ({ label, color = 'gray', onRemove }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${color}-200 text-${color}-800`}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 text-xs text-red-500 hover:text-red-700"
          aria-label="Remove tag"
        >
          ×
        </button>
      )}
    </span>
  )
}
