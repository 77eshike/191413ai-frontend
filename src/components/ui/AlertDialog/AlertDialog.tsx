'use client'

import * as React from 'react'
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog'
import { cn } from '@/lib/utils'

export interface AlertDialogProps {
  title: string
  description?: string
  onConfirm: () => void
  trigger: React.ReactNode
  confirmText?: string
  cancelText?: string
}

export function AlertDialog({
  title,
  description,
  onConfirm,
  trigger,
  confirmText = '确认',
  cancelText = '取消',
}: AlertDialogProps) {
  return (
    <RadixAlertDialog.Root>
      <RadixAlertDialog.Trigger asChild>{trigger}</RadixAlertDialog.Trigger>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <RadixAlertDialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg',
          )}
        >
          <RadixAlertDialog.Title className="text-lg font-medium">{title}</RadixAlertDialog.Title>
          {description && (
            <RadixAlertDialog.Description className="mt-2 text-sm text-gray-500">
              {description}
            </RadixAlertDialog.Description>
          )}
          <div className="mt-4 flex justify-end gap-2">
            <RadixAlertDialog.Cancel className="px-4 py-2 text-sm rounded border">
              {cancelText}
            </RadixAlertDialog.Cancel>
            <RadixAlertDialog.Action
              onClick={onConfirm}
              className="px-4 py-2 text-sm rounded bg-red-500 text-white"
            >
              {confirmText}
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  )
}
