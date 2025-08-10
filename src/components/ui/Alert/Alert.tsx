'use client'

import { cn } from '@/lib/utils'
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'
import * as React from 'react'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  title?: string
  description?: string
}

const variantIconMap = {
  info: <Info className="text-blue-500" />,
  success: <CheckCircle className="text-green-500" />,
  warning: <AlertTriangle className="text-yellow-500" />,
  error: <XCircle className="text-red-500" />,
}

const variantColorMap = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
}

export function Alert({ variant = 'info', title, description, className, ...props }: AlertProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 border rounded-md p-4',
        variantColorMap[variant],
        className,
      )}
      role="alert"
      {...props}
    >
      <div className="shrink-0">{variantIconMap[variant]}</div>
      <div className="flex flex-col">
        {title && <h3 className="font-semibold">{title}</h3>}
        {description && <p className="text-sm">{description}</p>}
      </div>
    </div>
  )
}
