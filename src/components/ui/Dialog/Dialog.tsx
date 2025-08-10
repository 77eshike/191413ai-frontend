'use client'

import React, { useEffect } from 'react'

export interface DialogProps {
  isOpen: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
}

export const Dialog: React.FC<DialogProps> = ({ isOpen, title, onClose, children }) => {
  // 监听 ESC 关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'dialog-title' : undefined}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
        {title && (
          <h2 id="dialog-title" className="text-xl font-semibold mb-4">
            {title}
          </h2>
        )}
        <div className="text-base text-gray-800">{children}</div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
