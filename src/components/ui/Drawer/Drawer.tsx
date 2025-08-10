// src/components/ui/Drawer/Drawer.tsx
import React from 'react'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  side?: 'left' | 'right'
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose} />
      <div
        className={`fixed top-0 ${side === 'right' ? 'right-0' : 'left-0'} h-full w-80 bg-white shadow-lg p-6`}
      >
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        <div>{children}</div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  )
}
