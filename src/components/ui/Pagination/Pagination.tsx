// src/components/ui/Pagination/Pagination.tsx
import React from 'react'

export interface PaginationProps {
  current: number
  total: number
  onChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ current, total, onChange }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1)

  return (
    <div className="flex gap-2 items-center">
      {pages.map(page => (
        <button
          key={page}
          className={`px-3 py-1 border rounded ${
            page === current ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
          }`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
