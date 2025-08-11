'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ModalFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'title'> {
  open: boolean
  title?: React.ReactNode
  onClose: () => void
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  /** 用于测试/可访问性：提交按钮的 aria-label */
  okAriaLabel?: string
  /** 用于测试/可访问性：取消按钮的 aria-label */
  cancelAriaLabel?: string
  /** 点击外层是否关闭，默认 true */
  closeOnBackdrop?: boolean
  className?: string
  bodyClassName?: string
  footerClassName?: string
}

export const ModalForm = ({
  open,
  title,
  onClose,
  okText = '提交',
  cancelText = '取消',
  okAriaLabel = 'confirm',
  cancelAriaLabel = 'cancel',
  closeOnBackdrop = true,
  className,
  bodyClassName,
  footerClassName,
  children,
  onSubmit,
  ...formProps
}: ModalFormProps) => {
  const titleId = React.useId()

  if (!open) return null

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const handleDialogClick = () => {
    if (closeOnBackdrop) onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      className="fixed inset-0 grid place-items-center"
      onClick={handleDialogClick}
    >
      <div
        className={cn('bg-white rounded shadow p-4 min-w-[320px]', className)}
        onClick={handleContainerClick}
      >
        {title ? (
          <h2 id={titleId} className="text-base font-medium mb-2">
            {title}
          </h2>
        ) : null}

        <form onSubmit={onSubmit} {...formProps}>
          <div className={cn('my-3', bodyClassName)}>{children}</div>

          <div className={cn('flex gap-2 justify-end', footerClassName)}>
            <button
              type="button"
              aria-label={cancelAriaLabel}
              data-testid="modal-cancel-button"
              onClick={onClose}
              className="px-3 py-1 rounded border"
            >
              {cancelText}
            </button>
            <button
              type="submit"
              aria-label={okAriaLabel}
              data-testid="modal-confirm-button"
              className="px-3 py-1 rounded bg-blue-600 text-white"
            >
              {okText}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalForm
