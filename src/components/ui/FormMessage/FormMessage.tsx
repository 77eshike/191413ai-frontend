// src/components/ui/FormMessage/FormMessage.tsx
import React from 'react'
import { cn } from '@/lib/utils'

export interface FormMessageProps {
  children?: React.ReactNode
  className?: string
}

export const FormMessage = ({ children, className }: FormMessageProps) => {
  if (!children) return null
  return <p className={cn('text-sm text-red-600 mt-1', className)}>{children}</p>
}
