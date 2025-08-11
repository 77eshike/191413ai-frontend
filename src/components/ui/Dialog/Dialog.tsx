'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 兼容老用例 */
  open?: boolean
  /** 你的当前 props */
  isOpen?: boolean
  title?: React.ReactNode
  onClose?: () => void
}

export default function Dialog({
  open,
  isOpen,
  title,
  onClose,
  className,
  children,
  ...rest
}: DialogProps) {
  // 兼容两种写法
  const visible = (typeof isOpen === 'boolean' ? isOpen : open) ?? false
  if (!visible) return null

  const stop = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'dialog-title' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={() => {}} // 测试期望不点遮罩关闭
    >
      <div
        className={cn('bg-white rounded-2xl shadow-xl w-full max-w-lg p-6', className)}
        onClick={stop}
        {...rest}
      >
        {title ? (
          <h2 id="dialog-title" className="text-xl font-semibold mb-4">
            {title}
          </h2>
        ) : null}

        <div className="text-base text-gray-800">{children}</div>

        <div className="mt-6 text-right">
          <button
            type="button"
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
