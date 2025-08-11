'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  title?: React.ReactNode
  side?: DrawerSide
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  okAriaLabel?: string
  cancelAriaLabel?: string
  showFooter?: boolean
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  side = 'right',
  okText = '确定',
  cancelText = '取消',
  okAriaLabel = 'confirm',
  cancelAriaLabel = 'cancel',
  showFooter = true,
  className,
  children,
  ...rest
}) => {
  const titleId = React.useId()
  if (!open) return null

  const basePanel =
    'fixed bg-white shadow-lg p-4 w-80 max-w-[90vw] h-auto max-h-[100vh] overflow-auto'

  const sideClass = {
    right: 'inset-y-0 right-0',
    left: 'inset-y-0 left-0',
    top: 'inset-x-0 top-0 w-full h-auto',
    bottom: 'inset-x-0 bottom-0 w-full h-auto',
  }[side]

  const stop = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      className="fixed inset-0 bg-black/30"
      onClick={onClose}
    >
      <div className={cn(basePanel, sideClass, className)} onClick={stop} {...rest}>
        {title ? (
          <h2 id={titleId} className="text-base font-medium mb-2">
            {title}
          </h2>
        ) : null}

        <div className="my-3">{children}</div>

        {showFooter && (
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              aria-label={cancelAriaLabel}
              data-testid="drawer-cancel-button"
              className="px-3 py-1 rounded border"
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button
              type="button"
              aria-label={okAriaLabel}
              data-testid="drawer-confirm-button"
              className="px-3 py-1 rounded bg-blue-600 text-white"
              onClick={onClose}
            >
              {okText}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Drawer
