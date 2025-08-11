'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface DropdownItem {
  key: string
  label: React.ReactNode
  onSelect?: () => void
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  items?: DropdownItem[]
  /** 是否显示页脚的确定/取消按钮 */
  confirmable?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: React.ReactNode
  cancelText?: React.ReactNode
  confirmAriaLabel?: string
  cancelAriaLabel?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  open,
  defaultOpen,
  onOpenChange,
  trigger = <button className="border rounded px-2 py-1">更多</button>,
  items = [],
  confirmable = false,
  onConfirm,
  onCancel,
  confirmText = '确定',
  cancelText = '取消',
  confirmAriaLabel = 'confirm',
  cancelAriaLabel = 'cancel',
  className,
  ...rest
}) => {
  const [innerOpen, setInnerOpen] = React.useState(!!defaultOpen)
  const isOpen = open ?? innerOpen

  const setOpen = (v: boolean) => {
    if (open === undefined) setInnerOpen(v)
    onOpenChange?.(v)
  }

  return (
    <div className={cn('relative inline-block', className)} {...rest}>
      <span onClick={() => setOpen(!isOpen)}>{trigger}</span>
      {isOpen && (
        <div role="menu" className="absolute z-10 mt-1 min-w-40 rounded border bg-white shadow">
          <ul className="py-1">
            {items.map(it => (
              <li key={it.key}>
                <button
                  role="menuitem"
                  className="w-full text-left px-3 py-1 hover:bg-gray-50"
                  onClick={() => {
                    it.onSelect?.()
                    setOpen(false)
                  }}
                >
                  {it.label}
                </button>
              </li>
            ))}
          </ul>
          {confirmable && (
            <div className="flex justify-end gap-2 border-t p-2">
              <button
                type="button"
                aria-label={cancelAriaLabel}
                data-testid="dropdown-cancel-button"
                className="px-2 py-1 rounded border"
                onClick={() => {
                  onCancel?.()
                  setOpen(false)
                }}
              >
                {cancelText}
              </button>
              <button
                type="button"
                aria-label={confirmAriaLabel}
                data-testid="dropdown-confirm-button"
                className="px-2 py-1 rounded bg-blue-600 text-white"
                onClick={() => {
                  onConfirm?.()
                  setOpen(false)
                }}
              >
                {confirmText}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Dropdown
