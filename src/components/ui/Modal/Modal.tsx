'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose?: () => void
  className?: string
  children?: React.ReactNode
}

export default function Modal({ open, onClose, className, children }: ModalProps) {
  if (!open) return null

  const stop = (e: React.MouseEvent) => e.stopPropagation()

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 grid place-items-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        className={cn('relative z-10 bg-white rounded shadow p-4 min-w-[320px]', className)}
        onClick={stop}
      >
        <div className="text-right">
          <button type="button" onClick={onClose} className="px-2 py-1 text-sm bg-gray-200 rounded">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}
