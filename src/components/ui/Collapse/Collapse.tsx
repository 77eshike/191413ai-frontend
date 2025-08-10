// src/components/ui/Collapse/Collapse.tsx
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export interface CollapseProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export const Collapse: React.FC<CollapseProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border rounded">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full px-4 py-2 text-left font-medium flex justify-between items-center',
          'bg-gray-100 hover:bg-gray-200',
        )}
      >
        <span>{title}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  )
}
