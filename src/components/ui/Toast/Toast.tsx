// src/components/ui/Toast/Toast.tsx
import React from 'react'

export interface ToastProps {
  open?: boolean
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}

const ToastTitle: React.FC<React.PropsWithChildren> = ({ children }) => <div>{children}</div>
const ToastDescription: React.FC<React.PropsWithChildren> = ({ children }) => <div>{children}</div>
const ToastAction: React.FC<React.ComponentProps<'button'>> = ({ children, ...rest }) => (
  <button {...rest}>{children}</button>
)

// ✅ Minimal provider for tests (just renders children)
const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>

// Optional stubs used by stories; harmless for tests
const ToastClose: React.FC<React.ComponentProps<'button'>> = ({ children, ...rest }) => (
  <button aria-label="Close" {...rest}>
    {children ?? 'Close'}
  </button>
)
const ToastViewport: React.FC<React.ComponentProps<'div'>> = props => <div {...props} />

function ToastBase({ open = true, title, description, children }: ToastProps) {
  if (!open) return null
  return (
    <div role="alert">
      {title && <ToastTitle>{title}</ToastTitle>}
      {description && <ToastDescription>{description}</ToastDescription>}
      {children}
    </div>
  )
}

const Toast = Object.assign(ToastBase, {
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
})

export default Toast
export {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastProvider, // ← new
  ToastClose, // ← optional
  ToastViewport, // ← optional
}
