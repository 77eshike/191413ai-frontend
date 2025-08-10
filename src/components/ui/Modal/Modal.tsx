import React, { ReactNode } from 'react'
import clsx from 'clsx'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
  width?: 'sm' | 'md' | 'lg'
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = 'md',
}) => {
  if (!isOpen) return null

  const widthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
  }[width]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={clsx('bg-white rounded-lg shadow-lg w-full p-6', widthClass)}>
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        <div className="mb-4">{children}</div>
        {footer && <div className="mt-4">{footer}</div>}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  )
}
